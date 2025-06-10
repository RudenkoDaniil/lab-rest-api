pipeline {
    agent any

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
