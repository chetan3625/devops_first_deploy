pipeline {
    agent any

    stages {

        stage('Build Web') {
            steps {
                script {
                    sh 'flutter pub get'
                    sh 'flutter build web'
                    echo 'Build Web Success'
                }
            }
        }

        stage('Create Docker Image') {
            steps {
                script {
                    withCredentials([
                        usernamePassword(
                            credentialsId: 'dockerhub-credentials',
                            usernameVariable: 'USER',
                            passwordVariable: 'PASS'
                        )
                    ]) {
                        sh 'docker build -t myapp:latest .'
                        sh 'echo $PASS | docker login -u $USER --password-stdin'
                        sh 'docker push <your-dockerhub-username>/myapp:latest'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
}