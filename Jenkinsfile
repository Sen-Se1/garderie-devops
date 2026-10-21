
pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials'
        FRONTEND_IMAGE = 'garderie-frontend'
        BACKEND_IMAGE = 'garderie-backend'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'git log -1 --oneline'
            }
        }

        stage('Install') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                dir('frontend') {
                    sh 'npm test -- --runInBand'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                    docker build \
                      -t "$DOCKERHUB_USER/$FRONTEND_IMAGE:$BUILD_NUMBER" \
                      -t "$DOCKERHUB_USER/$FRONTEND_IMAGE:latest" \
                      ./frontend
                '''
            }
        }

        stage('Build Backend') {
            steps {
                sh '''
                    docker build \
                      -t "$DOCKERHUB_USER/$BACKEND_IMAGE:$BUILD_NUMBER" \
                      -t "$DOCKERHUB_USER/$BACKEND_IMAGE:latest" \
                      ./backend
                '''
            }
        }

        stage('Push Frontend') {
            steps {
                sh '''
                    docker push "$DOCKERHUB_USER/$FRONTEND_IMAGE:$BUILD_NUMBER"
                    docker push "$DOCKERHUB_USER/$FRONTEND_IMAGE:latest"
                '''
            }
        }

        stage('Push Backend') {
            steps {
                sh '''
                    docker push "$DOCKERHUB_USER/$BACKEND_IMAGE:$BUILD_NUMBER"
                    docker push "$DOCKERHUB_USER/$BACKEND_IMAGE:latest"
                '''
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
        success {
            echo 'CI/CD réussi : tests, builds et publications terminés.'
        }
        failure {
            echo 'CI/CD échoué. Consulte les logs de l’étape en erreur.'
        }
    }
}
