pipeline{
    agent any
    stage("build web"){
        steps{
            script{

                sh 'flutter pub get'
                sh 'flutter build web'
                echo "build web success"
            }
        }

    }
    stage("create docker image"){
        steps{
            script{
                withCredentials([usernamePassword(credentialsId:"github-ssh-key",passwordVariable:'PASS',usernameVariable:"USER")]){
                    sh 'docker build -t myapp:latest .'
                    sh "docker login -u $USER -p $PASS"
                    sh 'docker push myapp:latest'

                }
               
            }
        }
    }
    stage("deploy"){
        steps{
            script{

            }
        }
    }
    
}