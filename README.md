
# Nestwise Backend Express

This is an Express.js backend for the Nestwise property management platform.

---

## Features

- User authentication (register, login)
- Property listing management (CRUD)
- PostgreSQL database via Sequelize ORM
- JWT-based authentication and role-based authorization

---

## Local Development

1. **Clone the repository:**

   ```sh
   git clone <repo-url>
   cd nestwise-backend-express
   ```

2. **Copy and configure environment variables:**

   ```sh
    # Generate a secure JWT secret with:
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

    # Edit .env with your local settings
    cp .env.example .env

    # Never commit your real .env file to version control. Use .env.example as a template
   ```

3. **Install dependencies:**

   ```sh
   npm install
   ```

4. **Start the development server:**

   ```sh
   npm run dev
   ```

---

## Deploying to AWS ECS Fargate

### 1. Dockerize the Application

Use the Dockerfile in the repo

### 2A. Build and Test the Docker Image Locally (FOR AWS ECR)

```sh
docker build -t nestwise-backend .
docker run -p 3000:3000 --env-file .env nestwise-backend
```

### 2.B. The Nestwise API requires a PostgreSQL database (RECOMMENDED)

This can be orchestrated using the docker-compose.yml file for functional testing locally

```sh
docker-compose up --build -d
```

Check the home route runs at [http://localhost:3000/api](http://localhost:3000/api)

## API Endpoints

### Health Check

- **GET** `/api/`
  - Returns API status and version.

---

### Authentication

- **POST** `/api/auth/register`
  - Register a new user.
- **POST** `/api/auth/login`
  - Login and receive a JWT token.

---

### Property Listings

- **GET** `/api/property`
  - Get all properties.
- **GET** `/api/property/:id`
  - Get a single property by ID.
- **POST** `/api/property`
  - Create a new property (requires authentication and authorization).
- **PUT** `/api/property/:id`
  - Update a property by ID (requires authentication and authorization).
- **DELETE** `/api/property/:id`
  - Delete a property by ID (requires authentication and authorization).
- **GET** `/api/property/agent-properties`
  - Get properties for the authenticated agent (requires authentication and authorization).

---

### Notes

- Most property routes require a valid JWT in the `Authorization` header.
- Use `/api/` as the base path for all endpoints.

## More info

### 3. Configure AWS RDS PostgreSQL (Production Database)

For production deployments, use AWS RDS to host your PostgreSQL database:

1. **Create an RDS PostgreSQL Instance:**
   - Go to the AWS RDS Console.
   - Click "Create database".
   - Choose "PostgreSQL" as the engine.
   - Select a production-appropriate instance size and storage.
   - Set your database name, master username, and password.
   - Make sure to place the RDS instance in the same VPC as your ECS cluster for connectivity.

2. **Configure Security Groups:**
   - Edit the RDS instance's security group to allow inbound connections on port `5432` from your ECS tasks' security group.

3. **Update Environment Variables:**
   - Set the following in your ECS Task Definition or AWS Secrets Manager:

     ```env
     PG_DATABASE=<your_rds_db_name>
     PG_USERNAME=<your_rds_username>
     PG_PASSWORD=<your_rds_password>
     PG_HOST=<your_rds_endpoint>
     PG_PORT=5432
     ```

   - For production, set `NODE_ENV=production`.

4. **Enable SSL (Recommended for Production):**
   - Download the RDS root certificate from AWS documentation if you want to enforce SSL.
   - Note that the Sequelize/Postgres config allows the requiring of SSL when `NODE_ENV=production`.

5. **Migrate Data:**
   - If needed, use Sequelize migrations or `pg_dump`/`pg_restore` to move data from local to RDS.

---

**Note:**  

- Never expose your RDS instance to the public internet. Only allow access from your ECS tasks' security group.
- Store sensitive credentials in AWS Secrets Manager or SSM Parameter Store for better security.

---

### 4. Push the Image to Amazon ECR

1. **Create an ECR repository** in the AWS Console.
2. **Authenticate Docker to ECR:**

   ```sh
   aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
   ```

3. **Tag and push your image:**

   ```sh
   docker tag nestwise-backend:latest <account-id>.dkr.ecr.<region>.amazonaws.com/nestwise-backend:latest
   docker push <account-id>.dkr.ecr.<region>.amazonaws.com/nestwise-backend:latest
   ```

### 5. Create ECS Fargate Resources

1. **Create a new ECS Cluster** (Networking only, for Fargate).
2. **Create a Task Definition:**
   - Launch type: Fargate
   - Add container: Use your ECR image URI, set port 3000.
   - Set environment variables (from your `.env`).
3. **Create a Service** from your Task Definition.
4. **Attach an Application Load Balancer** to the service for public access.

### 6. Configure Networking

- **Security Groups:** Allow inbound HTTP/HTTPS (80/443) to the Load Balancer, and allow the Load Balancer to forward to ECS tasks on port 3000.
- **VPC/Subnets:** Ensure your ECS tasks and database are in the correct subnets for connectivity.

### 7. Access Your API

- Use the Load Balancer DNS name to access your deployed API.

---

## Production Recommendations

- Store secrets in AWS Secrets Manager or SSM Parameter Store.
- Use ECS Service Auto Scaling for high availability.
- Monitor logs and metrics with AWS CloudWatch.
- Use HTTPS with your Load Balancer.

---

## References

- [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp)
- [Deploy Docker containers on ECS Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/getting-started-fargate.html)
- [Amazon ECR User Guide](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html)

---
