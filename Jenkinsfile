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
        DOCKER_HUB_CREDS = credentials('docker-cred')
    }

    stages {
        stage('Checkout code') {
            steps { checkout scm }
        }

        stage('Install and Build') {
            steps {
                sh 'npm ci'
                sh 'CI=false npm run build'
            }
        }

        stage('Create Image and Push') {
            steps {
                script {
                    def dockerImage = "${DOCKER_USER}/${IMAGE_NAME}:${env.BUILD_NUMBER}"
                    // Build using --no-cache to avoid saving extra data if space is tight
                    sh "docker build --no-cache -t ${dockerImage} ."
                    
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-cred') {
                        docker.image(dockerImage).push()
                        docker.image(dockerImage).push('latest')
                    }
                }
            }
        }
    }

    // THIS IS THE FIX FOR YOUR SPACE ISSUE
    post {
        always {
            script {
                echo "Cleaning up workspace and Docker layers..."
                // 1. Remove the specific images we just built locally
                sh "docker rmi ${DOCKER_USER}/${IMAGE_NAME}:${env.BUILD_NUMBER} || true"
                sh "docker rmi ${DOCKER_USER}/${IMAGE_NAME}:latest || true"
                
                // 2. Prune build cache (This deletes the heavy 'Build Stage' layers)
                sh "docker builder prune -f"
                
                // 3. Delete the Jenkins workspace to free up npm/node_modules space
                cleanWs()
            }
        }
    }
}
