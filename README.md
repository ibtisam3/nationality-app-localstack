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

3. Build the React app:
  ```bash
 npm run build   
```

3. Move the disc file :
  ```bash
 mv dist nationality-app-bucket
   ```

3. start LocalStack :
  ```bash
 docker compose up -d
   ```

3. Enter the LocalStack container:
   ```bash
   docker exec -it nationality-app-localstack-1 bash
```

3. verify folder structure :
  ```bash
 ls
   ```

3. Navigate back into bucket :
  ```bash
 cd nationality-app-bucket
 ```


4. Create the S3 bucket:
   ```bash
      awslocal s3api create-bucket --bucket nationality-app-bucket
 ```

4. Move into the disc folder:
   ```bash
      cd dist
 ```
4. Upload index.html:
   ```bash
      awslocal s3 website s3://nationality-app-bucket --index-document index.html
 ```

5. Upload the files from the `dist/` directory:
   ```bash
    cd..
    awslocal s3 sync ./dist s3://nationality-app-bucket
 ```

5. Set Permissions:
   ```bash
   awslocal s3api put-bucket-policy --bucket your-bucket-name --policy file://policy.json
 ```
8. Configure website hosting:
   ```bash
      awslocal s3 sync ./dist s3://nationality-app-bucket
 ```


6. Access your deployed app:
   ```
(http://nationality-app-bucket.s3.localhost.localstack.cloud:4566/index.html)
 ```

## Files Included:
- `docker-compose.yml`: Configuration for Docker Compose to set up LocalStack.
- `policy.json`: The policy configuration for the S3 bucket.
