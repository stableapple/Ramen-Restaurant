pipeline {
    agent {
        docker {
            image 'node:16-alpine'
			args '-u root'
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
	}
}

