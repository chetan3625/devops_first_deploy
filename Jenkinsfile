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

        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }
        stage('Increment Version'){
            steps{
                script{
                    echo 'Incrementing version...'
                    sh 'dart pub global activate cider'
                    sh 'cider bump minor'
                    sh 'flutter clean'
                    sh 'flutter pub get'
                    readFile('pubspec.yaml').eachLine { line ->
                        if (line.startsWith('version:')) {
                            def version = line.split(':')[1].trim()
                            env.IMAGE_TAG = version
                            echo "New version: ${env.IMAGE_TAG}-${env.BUILD_NUMBER}"
                          }
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t $IMAGE_NAME:$IMAGE_TAG .
                '''
            }
        }
        

        stage('Login to AWS ECR') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    sh '''
                        aws ecr get-login-password \
                        --endpoint-url $ECR_ENDPOINT \
                        --region $AWS_DEFAULT_REGION \
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
                    docker tag $IMAGE_NAME:$IMAGE_TAG \
                    $ECR_REGISTRY/000000000000/us-east-1/$ECR_REPOSITORY:$IMAGE_TAG
                '''
            }
        }

        stage('Push Docker Image to ECR') {
            steps {
                sh '''
                    docker push \
                    $ECR_REGISTRY/000000000000/us-east-1/$ECR_REPOSITORY:$IMAGE_TAG
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