pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION = 'us-east-1'
        ECR_ENDPOINT       = 'http://10.43.37.199:4566'

        ECR_REGISTRY       = '10.43.37.199:5100'
        ECR_REPOSITORY     = 'my-test-repo'

        IMAGE_NAME         = 'my-app'
        IMAGE_TAG          = 'latest'
    }

    stages {

        stage('Login to AWS ECR') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    sh '''
                        aws ecr get-login-password \
                        --endpoint-url $ECR_ENDPOINT \
                        --region $AWS_DEFAULT_REGION  \
                        | docker login \
\                        --username AWS \
                        --password-stdin $ECR_REGISTRY

                    '''
                }
            }
        }

        stage('Build Web') {
            steps {
                echo 'Building Web Application...'
            }
        }

        stage('Create Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
}