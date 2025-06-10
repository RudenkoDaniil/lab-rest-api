pipeline {
    agent any

    options {
        timestamps()
    }

    stages {
        stage('Install') {
            steps {
                withNodeJS(nodeJSInstallationName: 'node-18') {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                withNodeJS(nodeJSInstallationName: 'node-18') {
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                withNodeJS(nodeJSInstallationName: 'node-18') {
                    sh 'npm run test'
                }
            }
        }
    }

    post {
        always {
            junit 'junit.xml'
        }
    }
}
