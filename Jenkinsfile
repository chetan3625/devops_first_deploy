pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        AWS_DEFAULT_REGION = 'us-east-1'
        ECR_ENDPOINT       = 'http://10.6.117.1:4566'

        ECR_REGISTRY       = '10.6.117.1:5100'
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
                       --username AWS \
                        --password-stdin $ECR_REGISTRY

                    '''
                }
            }
        }

        stage('Tag Docker Image') {
            steps {
                sh '''
                docker tag $IMAGE_NAME:$IMAGE_TAG $ECR_REGISTRY/000000000000/us-east-1/$ECR_REPOSITORY:$IMAGE_TAG
                 '''
            }
        }

        stage('Push Docker Image to ECR') {
            steps {
                sh '''
                docker push $ECR_REGISTRY/000000000000/us-east-1/$ECR_REPOSITORY:$IMAGE_TAG 
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
}