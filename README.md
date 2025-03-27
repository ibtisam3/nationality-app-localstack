# React Project Deployment to LocalStack S3

This project demonstrates how I deployed my Nationality-App React project to an S3 bucket using LocalStack and Docker.


## Prerequisites:
- Docker
- Docker Compose
- Node.js (for building the React app)

## Steps to Deploy:

1. Navigate to project directory:
  ```bash
 cd nationality-app   
```

2. Install dependencies:
  ```bash
 npm install   
```

1. Build the React app:
  ```bash
 npm run build   
```

2. Create the LocalStack container with the following command:
   ```bash
   docker-compose up
   ```

3. Enter the LocalStack container:
   ```bash
   docker exec -it <container_id> bash
   ```

4. Create the S3 bucket:
   ```bash
      awslocal s3api create-bucket --bucket nationality-app-bucket
 ```


8. Configure website hosting
   ```bash
      awslocal s3 sync ./dist s3://nationality-app-bucket
 ```

5. Upload the files from the `dist/` directory:
   ```bash
      aws --endpoint-url=http://localhost:4566 s3 cp ./dist s3://<nationality-app-bucket>/ --recursive
   ```

6. Access your deployed app:
   ```text
   http://<bucket-name>.s3.localhost.localstack.cloud:4566/index.html
   ```

## Files Included:
- `docker-compose.yml`: Configuration for Docker Compose to set up LocalStack.
- `policy.json`: The policy configuration for the S3 bucket.
