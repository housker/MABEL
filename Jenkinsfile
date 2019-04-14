pipeline {
    agent any

    stages {
        stage('Build') {
            app = docker.build("housker/mabel/1.0.0")       
        }
        stage('Run') {
            app.withRun("-p 443:443 housker/mabel:1.0.0")      
        }
    }
}