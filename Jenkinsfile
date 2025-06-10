pipeline {
    agent any

    tools {
        nodejs 'node-18'
    }

    options {
        timestamps()
    }

    stages {
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
