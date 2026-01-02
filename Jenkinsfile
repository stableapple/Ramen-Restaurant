pipeline {
    agent {
        docker {
            image 'node:16-alpine'
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
				sh 'npm install'
			}
		}
		stage('Build'){
			steps{
				sh 'npm run build'
			}
	}
}

