
pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    environment {
        FRONTEND_IMAGE = 'garderie-frontend'
        BACKEND_IMAGE  = 'garderie-backend'
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

        stage('Docker Hub Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    sh '''
                        set -eu

                        if [ -z "$DOCKERHUB_USER" ]; then
                            echo "ERROR: Docker Hub username is empty."
                            exit 1
                        fi

                        echo "$DOCKERHUB_TOKEN" | docker login \
                            --username "$DOCKERHUB_USER" \
                            --password-stdin
                    '''
                }
            }
        }

        stage('Build Frontend') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    sh '''
                        set -eu

                        docker build \
                            -t "$DOCKERHUB_USER/$FRONTEND_IMAGE:$BUILD_NUMBER" \
                            -t "$DOCKERHUB_USER/$FRONTEND_IMAGE:latest" \
                            ./frontend
                    '''
                }
            }
        }

        stage('Build Backend') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    sh '''
                        set -eu

                        docker build \
                            -t "$DOCKERHUB_USER/$BACKEND_IMAGE:$BUILD_NUMBER" \
                            -t "$DOCKERHUB_USER/$BACKEND_IMAGE:latest" \
                            ./backend
                    '''
                }
            }
        }

        stage('Push Frontend') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    sh '''
                        set -eu

                        docker push \
                            "$DOCKERHUB_USER/$FRONTEND_IMAGE:$BUILD_NUMBER"

                        docker push \
                            "$DOCKERHUB_USER/$FRONTEND_IMAGE:latest"
                    '''
                }
            }
        }

        stage('Push Backend') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    sh '''
                        set -eu

                        docker push \
                            "$DOCKERHUB_USER/$BACKEND_IMAGE:$BUILD_NUMBER"

                        docker push \
                            "$DOCKERHUB_USER/$BACKEND_IMAGE:latest"
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }

        success {
            echo '''
            =========================================
            CI/CD SUCCESSFUL!
            Tests passed.
            Frontend image built and pushed.
            Backend image built and pushed.
            =========================================
            '''
        }

        failure {
            echo '''
            =========================================
            CI/CD FAILED!
            Check the first failed stage in the logs.
            Docker images may not have been published.
            =========================================
            '''
        }
    }
}
