pipeline {
    agent {
        docker {
            image 'node:16-alpine'
        }
    }
	stages{
		step('Checkout code'){
			checkout scm
		}
	}
}

