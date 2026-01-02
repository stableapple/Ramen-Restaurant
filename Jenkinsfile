pipeline {
    agent {
        docker {
            image 'node:16-alpine'
        }
    }
	stages{
		stage('Checkout code'){
			step{
				checkout scm
			}
			
		}
	}
}

