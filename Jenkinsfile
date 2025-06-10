pipeline {
    agent any

    options {
        timestamps()
    }

    environment {
        PATH = "/Users/daniil/.jenkins/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/node-18/bin:$PATH"
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
