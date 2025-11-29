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
    curl -H 'Content-Type: application/json' -X POST -d '{
      "content": "**⏱ Build Started**",
      "embeds": [
        {
          "title": "🚧 Pipeline Info",
          "color": 5814783,
          "fields": [
            { "name": "Job", "value": "${env.JOB_NAME}", "inline": true },
            { "name": "Build", "value": "#${env.BUILD_NUMBER}", "inline": true },
            { "name": "Branch", "value": "${env.GIT_BRANCH}", "inline": false }
          ]
        }
      ]
    }' $DISCORD_WEBHOOK
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
    curl -H 'Content-Type: application/json' -X POST -d '{
      "content": "**✅ Build Succeeded**",
      "embeds": [
        {
          "title": "🎉 Success",
          "color": 3066993,
          "fields": [
            { "name": "Job", "value": "${env.JOB_NAME}", "inline": true },
            { "name": "Build", "value": "#${env.BUILD_NUMBER}", "inline": true },
            { "name": "URL", "value": "${env.BUILD_URL}" }
          ]
        }
      ]
    }' $DISCORD_WEBHOOK
    """
  }
  failure {
    sh """
    curl -H 'Content-Type: application/json' -X POST -d '{
      "content": "**❌ Build Failed**",
      "embeds": [
        {
          "title": "🚨 Failure",
          "color": 15158332,
          "fields": [
            { "name": "Job", "value": "${env.JOB_NAME}", "inline": true },
            { "name": "Build", "value": "#${env.BUILD_NUMBER}", "inline": true },
            { "name": "URL", "value": "${env.BUILD_URL}" }
          ]
        }
      ]
    }' $DISCORD_WEBHOOK
    """
  }
}
}