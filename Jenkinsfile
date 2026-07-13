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
                    sshagent(credentials:['github-ssh-key']) {
                        
                        sh 'docker build -t myapp:latest .'
                        sh 'echo $PASS | docker login -u $USER --password-stdin'
                        sh 'docker push <cc3625>/myapp:latest'
                    
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