pipeline {
    agent any

    options {
        timestamps()
    }

    stages {
        stage('Install') {
            steps {
                script {
                    withNodeJS(nodeJSInstallationName: 'node-18') {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    withNodeJS(nodeJSInstallationName: 'node-18') {
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    withNodeJS(nodeJSInstallationName: 'node-18') {
                        sh 'npm run test'
                    }
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
