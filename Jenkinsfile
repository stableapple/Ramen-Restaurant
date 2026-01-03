pipeline {
    agent {
        docker {
			image 'ri25/node-docker:latest'
            args '-u root -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    
    environment {
        DOCKER_USER = 'ri25'
        IMAGE_NAME  = 'ramen'
        // Using the credential ID 'docker-cred' to match your push step
        DOCKER_HUB_CREDS = credentials('docker-cred')
    }

    stages {
        stage('Checkout code') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'CI=false npm run build'
            }
        }

        stage('Create Image and Push') {
            environment {
                // Defining a specific image tag for this build
                DOCKER_IMAGE = "${DOCKER_USER}/${IMAGE_NAME}:${env.BUILD_NUMBER}"
            }
            steps {
                script {
                    // Build the image
                    sh "docker build -t ${DOCKER_IMAGE} ."
                    
                    // Log in and push using the Docker DSL
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-cred') {
                        docker.image("${DOCKER_IMAGE}").push()
                        docker.image("${DOCKER_IMAGE}").push('latest')
                    }
                }
            }
        }
    }
}
