pipeline {
    agent {
        docker {
            image 'node:16-alpine'
			args '-u root'
        }
	environment {
        // Replace with your actual DockerHub username and repo name
        DOCKER_USER = 'ri25'
        IMAGE_NAME  = 'ramen'
        // This references the ID you created in Step 1
        DOCKER_HUB_CREDS = credentials('docker-hub-creds')
    }
    }
	stages{
		stage('Checkout code'){
			steps{
				checkout scm
			}
			
		}
		stage('Install dependencies'){
			steps{
				sh 'npm ci'
			}
		}
		stage('Build'){
			steps{
				sh 'CI=false npm run build'
			}
		}
	    stage('Image build'){
			steps{
				sh 'docker build -t ${DOCKER_USER}/ramen:${ENV.BUILD_NUMBER} .'
				sh "docker tag ${DOCKER_USER}/${IMAGE_NAME}:${env.BUILD_NUMBER} ${DOCKER_USER}/${IMAGE_NAME}:latest"
			}
		}
	    stage('Push artifacts'){
			environment {
				DOCKER_IMAGE = "{DOCKER_USER}/ultimate-cicd:${BUILD_NUMBER}"
        // DOCKERFILE_LOCATION = "java-maven-sonar-argocd-helm-k8s/spring-boot-app/Dockerfile"
				REGISTRY_CREDENTIALS = credentials('docker-cred')
      }
      stage('Create Image and Push') {
            environment {
                DOCKER_IMAGE = "${DOCKER_USER}5/ramen:${env.BUILD_NUMBER}"
            }
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE} ."
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-cred') {
                        docker.image("${DOCKER_IMAGE}").push()
                    }
                }
            }
        }
		

		
	}
}

