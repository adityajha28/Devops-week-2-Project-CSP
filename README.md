# Docker Image CI/CD with GitHub Actions

This repository automates the building and deployment of Docker images for the backend and frontend of CSP (Customer Success Platform) application using GitHub Actions. The workflow includes building Docker images, pushing them to Docker Hub, and deploying them to an EC2 instance.

## Workflow Overview

- **Trigger Events**: The workflow triggers on pushes to the `main` branch and pull requests targeting the `main` branch.
- **Jobs**:
  - `build_backend`: Builds the Docker image for the backend application.
  - `build_frontend`: Builds the Docker image for the frontend application.
  - `deploy_to_ec2`: Deploys the Docker images to an EC2 instance.
- **Steps**:
  - Checkout repository
  - Build Backend/Frontend Docker Image
  - Login to DockerHub
  - Push Backend/Frontend Docker Image
  - SSH into EC2 Instance and Pull Docker Image

## Workflow Code
```markdown

name: Docker Image CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build_backend:
    runs-on: ubuntu-latest  

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Build Backend Docker Image
      run: |
        docker build -t ${{ secrets.DOCKER_USERNAME }}/mybackend2:latest -f Dockerfile_backend .
      working-directory: ./Backend

    - name: Login to DockerHub
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Push Backend Docker Image
      run: |
        docker push ${{ secrets.DOCKER_USERNAME }}/mybackend2:latest

  build_frontend:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Build Frontend Docker Image
      run: |
        docker build -t ${{ secrets.DOCKER_USERNAME }}/myfrontend:latest -f Dockerfile_frontend .
      working-directory: ./Frontend  

    - name: Login to DockerHub
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Push Frontend Docker Image
      run: |
        docker push ${{ secrets.DOCKER_USERNAME }}/myfrontend:latest

  deploy_to_ec2:
    runs-on: ubuntu-latest

    needs: [build_backend, build_frontend]

    steps:
    - name: SSH into EC2 Instance and Pull Docker Image
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.EC2_INSTANCE_IP }}
        username: ec2-user
        key: ${{ secrets.EC2_SSH_KEY }}
        script: |
          sudo docker stop backend-container
          sudo docker rm backend-container
          sudo docker pull ${{ secrets.DOCKER_USERNAME }}/mybackend2:latest
          sudo docker run -d -p 8081:8081 --name backend-container ${{ secrets.DOCKER_USERNAME }}/mybackend2:latest

          sudo docker stop frontend-container
          sudo docker rm frontend-container
          sudo docker pull ${{ secrets.DOCKER_USERNAME }}/myfrontend:latest
          sudo docker run -d -p 3000:3000 --restart always --name frontend-container ${{ secrets.DOCKER_USERNAME }}/myfrontend:latest
```

## Dockerfiles

### Dockerfile_backend

This Dockerfile is responsible for building the backend image for your application. It follows these steps:
1. **Base Image:** Uses Maven 3.9.5 as the base image.
2. **Working Directory:** Sets the working directory to `/app`.
3. **Copy Source Code:** Copies the source code from the repository into the container.
4. **Maven Build:** Runs `mvn clean install -DskipTests=true` to build the backend application, skipping tests.
5. **Add Jar File:** Adds the built JAR file (`Promact_Customer_Success-0.0.1-SNAPSHOT.jar`) to the container.
6. **Entrypoint:** Specifies the command to execute when the container starts, which is `java -jar app.jar`.
7. **Exposed Port:** Exposes port 8081 to allow external communication with the backend application.

### Dockerfile_frontend

This Dockerfile is responsible for building the frontend image for your application. It follows these steps:
1. **Base Image:** Uses Node.js 18 as the base image.
2. **Working Directory:** Sets the working directory to `/usr/src/app`.
3. **Copy Package Files:** Copies `package.json` and `package-lock.json` to the container.
4. **Install Dependencies:** Runs `npm install` to install dependencies based on the package files.
5. **Copy Source Code:** Copies the rest of the source code from the repository into the container.
6. **Exposed Port:** Exposes port 3000 to allow external communication with the frontend application.
7. **Command:** Specifies the command to start the frontend application, which is `npm run start`.

## Usage

1. Ensure your backend and frontend applications are correctly configured with the provided Dockerfiles.
2. Update the paths in the workflow to point to your backend and frontend directories.
3. Set up secrets for DockerHub credentials, EC2 instance details, and SSH key.
4. Commit and push the workflow file (`.github/workflows/dev-deploy.yml`) to your repository.
5. Workflow will automatically trigger on pushes to the `main` branch and pull requests targeting `main`.

# Results

![Screenshot 2024-04-03 165107](https://github.com/adityajha28/GitHub-Actions-Assignment-2/assets/127980079/9607e8db-52a2-423b-a911-dbf7225d8406)

## Deployed app:

![Screenshot 2024-04-03 155004](https://github.com/adityajha28/GitHub-Actions-Assignment-2/assets/127980079/d13d8fc9-6568-42c0-ac94-b6517885c701)
![Screenshot 2024-04-03 155110](https://github.com/adityajha28/GitHub-Actions-Assignment-2/assets/127980079/4d4b9e86-a394-46bc-8995-8735641ca701)

- Link to access: [https://43.204.140.185:3000/](https://43.204.140.185:3000/)



