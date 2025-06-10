pipeline {
    agent any

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'github-credentials', url: 'https://github.com/RudenkoDaniil/lab-rest-api.git'
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
    }

    post {
        always {
            junit 'junit.xml'
        }
    }
}
