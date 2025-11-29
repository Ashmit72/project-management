# Stage 1: Build
FROM node:20-alpine AS builder

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Accept build-time env vars
ARG VITE_BACKEND_URL
ARG VITE_FRONTEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_FRONTEND_URL=$VITE_FRONTEND_URL

# Copy lockfile and package.json first to leverage caching
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the Vite app
RUN pnpm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default static files
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]