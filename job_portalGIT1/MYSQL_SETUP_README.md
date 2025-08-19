# Job Portal Application - MySQL Setup

This application has been converted from MongoDB to MySQL. Follow these steps to set up and run the application.

## Prerequisites

1. **Java 17** or higher
2. **Maven** 3.6 or higher
3. **MySQL** 8.0 or higher

## MySQL Setup

### 1. Install MySQL
Download and install MySQL from [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)

### 2. Create Database
Open MySQL Command Line Client or MySQL Workbench and run:

```sql
CREATE DATABASE IF NOT EXISTS job_portal;
```

### 3. Configure Database Connection
Update the `src/main/resources/application.properties` file with your MySQL credentials:

```properties
# MySQL Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/job_portal
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true
```

**Important:** Replace `YOUR_MYSQL_PASSWORD` with your actual MySQL root password.

## Running the Application

### 1. Navigate to Project Directory
```bash
cd "C:\Users\Administrator\Desktop\Major Project\GIT 1st\Job_Portal_Application\Backend\job_portalGIT1"
```

### 2. Install Dependencies
```bash
mvn clean install
```

### 3. Run the Application
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8081`

## Database Tables

When you first run the application, Hibernate will automatically create the following tables:

- `users` - User authentication data
- `profiles` - User profile information  
- `profile_skills` - User skills
- `profile_experience` - User work experience
- `profile_certifications` - User certifications
- `profile_saved_jobs` - User saved jobs
- `jobs` - Job postings
- `job_skills` - Required skills for jobs
- `applicants` - Job applications
- `notifications` - User notifications
- `otp` - One-time passwords for verification

## Key Changes from MongoDB

1. **Dependencies**: Replaced `spring-boot-starter-data-mongodb` with `spring-boot-starter-data-jpa` and `mysql-connector-java`
2. **Entities**: Updated all entity classes to use JPA annotations instead of MongoDB annotations
3. **Repositories**: Changed from `MongoRepository` to `JpaRepository`
4. **ID Generation**: Replaced MongoDB sequence generation with MySQL `AUTO_INCREMENT`
5. **Relationships**: Properly configured JPA relationships between entities
6. **Embedded Objects**: Converted MongoDB embedded documents to JPA `@ElementCollection` and separate entities

## Troubleshooting

### Connection Issues
- Ensure MySQL service is running
- Verify database credentials in `application.properties`
- Check if port 3306 is available

### Table Creation Issues
- Make sure the MySQL user has CREATE and ALTER privileges
- Check MySQL logs for any constraint violations

### Application Startup Issues
- Verify Java version compatibility
- Check for any missing Maven dependencies
- Review application logs for specific error messages

## Email Configuration

The application uses Gmail SMTP for sending emails. Update the email configuration in `application.properties`:

```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

**Note:** Use App Passwords for Gmail, not your regular password.

## Testing the Application

1. Start the application
2. Check database connectivity by registering a new user
3. Verify tables are created in MySQL
4. Test basic CRUD operations through the API endpoints

For any issues, check the application logs and MySQL error logs for detailed error messages.
