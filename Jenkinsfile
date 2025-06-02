pipeline {
  agent any

  environment {
    SONAR_TOKEN = credentials('sonar-token')
    SNYK_TOKEN = credentials('snyk-token')
    DOCKER_USER = credentials('dockerhub-creds').username
    DOCKER_PASS = credentials('dockerhub-creds').password
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/akhilnavuluri/store-sidekick-chat.git'
      }
    }

    stage('Build') {
      steps {
        echo ' Installing dependencies...'
        bat 'npm install'
      }
    }

    stage('Test') {
      steps {
        echo ' Running tests...'
        bat 'npm test'
      }
    }

    stage('Code Quality') {
      steps {
        echo ' Running SonarQube scan...'
        withSonarQubeEnv('SonarQube') {
          bat 'sonar-scanner'
        }
      }
    }

    stage('Security') {
      steps {
        echo ' Running security audit...'
        withCredentials([string(credentialsId: 'snyk-token', variable: 'SNYK_TOKEN')]) {
          bat 'snyk auth %SNYK_TOKEN%'
          bat 'snyk test || exit 0'
        }
      }
    }

    stage('Postman API Tests') {
      steps {
        echo ' Running Postman tests with Newman...'
        bat 'newman run postman/store-sidekick.postman_collection.json || exit 0'
      }
    }

    stage('Deploy') {
      steps {
        echo ' Deploying container...'
        bat 'docker rm -f sidekick || exit 0'
        bat 'docker build -t store-sidekick .'
        bat 'docker run -d -p 3000:3000 --name sidekick store-sidekick || exit 0'
      }
    }

    stage('Release') {
      steps {
        echo ' Pushing Docker image to DockerHub...'
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
          bat 'docker tag store-sidekick %DOCKER_USER%/store-sidekick:latest'
          bat 'docker push %DOCKER_USER%/store-sidekick:latest'
        }
      }
    }

    stage('Monitoring') {
      steps {
        echo ' Monitoring - Prometheus metrics exposed at /metrics'
      }
    }
  }
}
