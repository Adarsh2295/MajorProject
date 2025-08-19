-- MySQL database setup script for Job Portal Application

-- Create database
CREATE DATABASE IF NOT EXISTS job_portal;
USE job_portal;

-- Note: With spring.jpa.hibernate.ddl-auto=update in application.properties,
-- Hibernate will automatically create the tables based on your entities.
-- This script is just for reference and initial database creation.

-- If you want to manually create tables (optional), uncomment the following:

/*
-- Users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    account_type VARCHAR(50),
    profile_id BIGINT
);

-- Profiles table
CREATE TABLE profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    job_title VARCHAR(255),
    company VARCHAR(255),
    location VARCHAR(255),
    about TEXT,
    picture LONGBLOB,
    total_exp BIGINT
);

-- Profile skills table
CREATE TABLE profile_skills (
    profile_id BIGINT,
    skill VARCHAR(255),
    FOREIGN KEY (profile_id) REFERENCES profiles(id)
);

-- Profile experience table
CREATE TABLE profile_experience (
    profile_id BIGINT,
    exp_job_title VARCHAR(255),
    exp_company VARCHAR(255),
    location VARCHAR(255),
    start_date DATETIME,
    end_date DATETIME,
    working BOOLEAN,
    exp_description TEXT,
    FOREIGN KEY (profile_id) REFERENCES profiles(id)
);

-- Profile certifications table
CREATE TABLE profile_certifications (
    profile_id BIGINT,
    cert_name VARCHAR(255),
    cert_organization VARCHAR(255),
    issue_date DATETIME,
    expiry_date DATETIME,
    credential_url VARCHAR(500),
    FOREIGN KEY (profile_id) REFERENCES profiles(id)
);

-- Profile saved jobs table
CREATE TABLE profile_saved_jobs (
    profile_id BIGINT,
    job_id BIGINT,
    FOREIGN KEY (profile_id) REFERENCES profiles(id)
);

-- Jobs table
CREATE TABLE jobs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    about TEXT,
    experience VARCHAR(255),
    job_type VARCHAR(100),
    location VARCHAR(255),
    package_offered BIGINT,
    post_time DATETIME,
    description TEXT,
    job_status VARCHAR(50),
    posted_by BIGINT
);

-- Job skills table
CREATE TABLE job_skills (
    job_id BIGINT,
    skill VARCHAR(255),
    FOREIGN KEY (job_id) REFERENCES jobs(id)
);

-- Applicants table
CREATE TABLE applicants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    applicant_id BIGINT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    website VARCHAR(255),
    resume LONGBLOB,
    cover_letter TEXT,
    time_stamp DATETIME,
    application_status VARCHAR(50),
    interview_time DATETIME,
    job_id BIGINT,
    FOREIGN KEY (job_id) REFERENCES jobs(id)
);

-- Notifications table
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    message TEXT NOT NULL,
    action VARCHAR(255),
    route VARCHAR(255),
    notification_status VARCHAR(50),
    time_stamp DATETIME
);

-- OTP table
CREATE TABLE otp (
    email VARCHAR(255) PRIMARY KEY,
    otp VARCHAR(10) NOT NULL,
    creation_time DATETIME
);
*/
