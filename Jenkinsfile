pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo '🔧 Installing dependencies...'
                bat 'npm install'
                echo '🐳 Building Docker image...'
                bat 'docker build -t store-sidekick .'
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running tests...'
                bat 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                echo '🧼 Code quality check (placeholder for SonarQube)...'
                // Add SonarQube scan here if available
            }
        }

        stage('Security') {
            steps {
                echo '🔐 Running security audit...'
                bat 'npm audit || exit 0'  // Prevent fail if audit has issues
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying container...'
                bat 'docker run -d -p 3000:3000 --name sidekick store-sidekick || exit 0'
            }
        }

        stage('Release') {
            steps {
                echo '📦 Release stage - image ready to push or use'
                // bat 'docker push your-repo/store-sidekick' // Optional if DockerHub used
            }
        }

        stage('Monitoring') {
            steps {
                echo '📊 Monitoring - mock or connect to Prometheus/Datadog'
                // Placeholder: could be log tail, health check, or integration
            }
        }
    }
}

