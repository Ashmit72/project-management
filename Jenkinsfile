pipeline {
  agent any

  environment {
    NODE_ENV = "production"
    IMAGE_NAME = "abhishekram404/workpulse-frontend"
    IMAGE_TAG = "latest"
    DISCORD_WEBHOOK = credentials('discord-webhook-url')

    VITE_BACKEND_URL = "https://workpulse-api.shufflebit.tech"
    VITE_FRONTEND_URL = "https://workpulse.shufflebit.tech"
  }

  stages {
    stage('Notify Start') {
      steps {
        sh """
        curl -H 'Content-Type: application/json' -X POST -d '{ "content": "⏱ Job Started: ${env.JOB_NAME} #${env.BUILD_NUMBER}" }' $DISCORD_WEBHOOK
        """
      }
    }

    stage('Checkout') {
      steps {
        echo "Checking out code"
        checkout scm
      }
    }

    stage('Build Docker image') {
      steps {
        sh '''
          echo "Building Docker image..."
          DOCKER_BUILDKIT=1 docker build \
            --build-arg VITE_BACKEND_URL=$VITE_BACKEND_URL \
            --build-arg VITE_FRONTEND_URL=$VITE_FRONTEND_URL \
            -t $IMAGE_NAME:$IMAGE_TAG .
        '''
      }
    }

    stage('Push to Registry') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $IMAGE_NAME:$IMAGE_TAG
          '''
        }
      }
    }
  }

  post {
    success {
      sh """
      curl -H 'Content-Type: application/json' -X POST -d '{ "content": "✅ Job SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)" }' $DISCORD_WEBHOOK
      """
    }
    failure {
      sh """
      curl -H 'Content-Type: application/json' -X POST -d '{ "content": "❌ Job FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)" }' $DISCORD_WEBHOOK
      """
    }
  }
}