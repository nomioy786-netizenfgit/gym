-- ==========================================================
-- Database Schema for GYM - Modern Fitness Center
-- Database: gym_db
-- ==========================================================

CREATE DATABASE IF NOT EXISTS gym_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gym_db;

-- 1. Admin Users Table (Password hashing with BCRYPT)
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Membership Plans Table
CREATE TABLE IF NOT EXISTS membership_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    period VARCHAR(20) DEFAULT 'Month',
    is_popular TINYINT(1) DEFAULT 0,
    features TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Membership Enquiries Table
CREATE TABLE IF NOT EXISTS membership_enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    enquiry_number VARCHAR(30) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    plan_name VARCHAR(100) NOT NULL,
    plan_price INT NOT NULL,
    age INT,
    joining_date VARCHAR(50),
    notes TEXT,
    status ENUM('New', 'Contacted', 'Enrolled', 'Cancelled') DEFAULT 'New',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Workout Programs Table
CREATE TABLE IF NOT EXISTS workout_programs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    tagline VARCHAR(255),
    description TEXT,
    duration VARCHAR(50),
    level VARCHAR(50),
    features TEXT,
    trainer_name VARCHAR(100),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Trainers Table
CREATE TABLE IF NOT EXISTS trainers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    speciality VARCHAR(150) NOT NULL,
    experience VARCHAR(50),
    image_url VARCHAR(255),
    bio TEXT,
    instagram VARCHAR(255),
    facebook VARCHAR(255),
    whatsapp VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Gallery Images Table
CREATE TABLE IF NOT EXISTS gallery_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category ENUM('interior', 'equipment', 'training', 'cardio') DEFAULT 'equipment',
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Contact Enquiries Table
CREATE TABLE IF NOT EXISTS contact_enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('Unread', 'Replied') DEFAULT 'Unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Gym Settings Table
CREATE TABLE IF NOT EXISTS gym_settings (
    setting_key VARCHAR(50) PRIMARY KEY,
    setting_value TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================================
-- Sample Data Seeding
-- ==========================================================

-- Admin user (admin / gym2026)
-- Hash generated via password_hash('gym2026', PASSWORD_BCRYPT)
INSERT INTO admin_users (username, password_hash, full_name, email) VALUES
('admin', '$2y$10$3/b0r5B7e2v9kH6I0sUjZe4U0rR1m0f5V5H.mB5jT6e1U6p9fB5yO', 'GYM Administrator', 'admin@gym.pk')
ON DUPLICATE KEY UPDATE username=username;

-- Initial Plans in PKR
INSERT INTO membership_plans (name, price, period, is_popular, features, description) VALUES
('BASIC PLAN', 999, 'Month', 0, 'Gym Access\nBasic Equipment\nLocker Room Access\nFree Fitness Consultation', 'Ideal for beginners and fitness enthusiasts seeking essential gym access.'),
('STANDARD PLAN', 1499, 'Month', 1, 'Gym Access\nAll Equipment\nPersonal Trainer (2 Sessions)\nDiet Plan\nLocker Room Access', 'Our most popular plan designed to accelerate results with trainer support.'),
('PREMIUM PLAN', 2499, 'Month', 0, 'Gym Access\nAll Equipment\nPersonal Trainer (4 Sessions)\nDiet Plan\nGroup Classes\nDedicated Locker & Sauna', 'Comprehensive VIP fitness package with group classes and dedicated coaching.');

-- Initial Programs
INSERT INTO workout_programs (name, tagline, description, duration, level, features, trainer_name, image_url) VALUES
('Muscle Building', 'Build strength and gain muscle.', 'Modern strength training equipment with progressive hypertrophy protocols.', '12 Weeks Protocol', 'Beginner to Advanced', 'Modern strength training equipment\nCompound lifts & isolation techniques\nTargeted muscle recovery guidance', 'Bilal Ahmed', 'images/hero.jpg'),
('Weight Loss', 'Lose weight and improve fitness.', 'Cardio and personalized workout plans to shed fat safely.', '8 Weeks Transformation', 'All Fitness Levels', 'Cardio & personalized workout plans\nHigh-Intensity Interval Training (HIIT)\nFat-loss nutrition plan included', 'Hamza Ali', 'images/program.jpg'),
('Strength Training', 'Increase strength and endurance.', 'Progressive strength workouts designed for maximal power and core stability.', '10 Weeks Program', 'Intermediate to Advanced', 'Progressive strength workouts\nForm & posture correction\nPower racks and Olympic platforms', 'Tariq Khan', 'images/about.jpg'),
('Yoga & Flexibility', 'Improve flexibility and mobility.', 'Reduce stress and improve wellness through mobility and stretching.', 'Ongoing Classes', 'All Levels Welcomed', 'Full body mobility flows\nPost-workout recovery stretching\nMind-body stress reduction', 'Zainab Malik', 'images/about.jpg');

-- Initial Trainers
INSERT INTO trainers (name, speciality, experience, image_url, bio, instagram, facebook, whatsapp) VALUES
('Tariq Khan', 'Strength & Powerlifting Coach', '8+ Years Experience', 'images/trainer1.jpg', 'Certified CSCS strength coach specialized in power lifting mechanics and athletic conditioning.', 'https://instagram.com', 'https://facebook.com', '03417885841'),
('Hamza Ali', 'Weight Loss & HIIT Specialist', '6+ Years Experience', 'images/hero.jpg', 'Passionate about rapid fat loss transformations, conditioning circuits, and sustainable healthy habits.', 'https://instagram.com', 'https://facebook.com', '03417885841'),
('Zainab Malik', 'Yoga & Mobility Instructor', '5+ Years Experience', 'images/about.jpg', 'Certified 500-hour RYT yoga instructor focusing on posture alignment, core activation, and flexibility.', 'https://instagram.com', 'https://facebook.com', '03417885841'),
('Bilal Ahmed', 'Hypertrophy & Physique Coach', '7+ Years Experience', 'images/program.jpg', 'National physique competitor helping athletes build symmetrical, aesthetic, and functional muscle.', 'https://instagram.com', 'https://facebook.com', '03417885841');

-- Initial Settings
INSERT INTO gym_settings (setting_key, setting_value) VALUES
('gym_name', 'GYM'),
('whatsapp_number', '03417885841'),
('phone_number', '+92 341 7885841'),
('email', 'info@gymfitness.pk'),
('address', 'Plot 42-B, Commercial Avenue, Main Boulevard'),
('city', 'Lahore, Pakistan'),
('currency', 'Rs.'),
('opening_hours_weekday', 'Mon - Sat: 6:00 AM - 11:00 PM'),
('opening_hours_sunday', 'Sunday: 8:00 AM - 8:00 PM');
