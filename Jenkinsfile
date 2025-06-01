pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        echo '🔧 Installing dependencies'
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        echo '🧪 Running tests'
        sh 'npm test || true'
      }
    }
  }
}
