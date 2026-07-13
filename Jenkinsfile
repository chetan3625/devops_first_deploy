pipeline {
    agent any
    environment{
        AWS_DEFAULT_REGION = 'us-east-1'
        ECR_ENDPOINT = 'http://10.43.37.199:4566'
        
        ECR_REGISTRY='10.43.37.199:5100'
        ECR_REPOSITORY = 'my-test-repo'

        IMAGE_NAME = 'my-app'
        IMAGE_TAG = 'latest'
    }

        stage('Login to AWS ECR') {
    steps {
        withCredentials([
            string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
            string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
        ]) {
            sh '''
                echo "Checking credentials..."
                env | grep AWS

                aws configure list

                aws ecr get-login-password \
                  --endpoint-url=http://10.43.37.199:4566 \
                  --region us-east-1 | wc -c
            '''
        }
    }
}
        stage('Build Web') {
            steps {
                script {
                    echo 'Building Web Application...'
                }
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
