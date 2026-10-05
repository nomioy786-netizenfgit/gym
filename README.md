# GYM - Modern Fitness Center & Memberships Website

A complete, modern, responsive gym and fitness website named **GYM** featuring a professional black and yellow high-energy fitness aesthetic, seamless Pakistani Rupees (PKR) membership tier selection, and instant 1-click WhatsApp joining integration.

---

## ⚡ Key Features

* **Design**: Modern dark aesthetic with yellow accents, bold typography, and high-performance imagery.
* **Hero Section**: "BE STRONGER THAN YOUR EXCUSES" with quick calls to action.
* **Gym Statistics**: 500+ Happy Members, 20+ Expert Trainers, 50+ Workout Programs, 100% Fitness Focus.
* **Workout Programs**: Muscle Building, Weight Loss, Strength Training, and Yoga & Flexibility with interactive modals.
* **About Us**: Modern equipment, experienced trainers, personalized plans, friendly environment, and interactive virtual video tour.
* **Trainer Profiles**: Meet our expert certified coaches with direct WhatsApp consultation buttons.
* **Membership Pricing (in PKR)**:
  * **BASIC PLAN**: Rs. 999 / Month
  * **STANDARD PLAN**: Rs. 1499 / Month (Popular Tier highlighted with yellow styling)
  * **PREMIUM PLAN**: Rs. 2499 / Month
* **Membership Registration**:
  * Enter Name, Mobile Number, Plan, Age, and Preferred Joining Date.
  * Generates unique enquiry ID (e.g. `GYM-PK-4921`).
  * Instant **"Join via WhatsApp"** button which opens WhatsApp with pre-filled details to `03417885841` (`wa.me/923417885841`).
* **Interactive BMI Calculator**: Calculates BMI score, weight category, and suggests personalized workout focus with direct WhatsApp share.
* **Photo Gallery**: Interior, equipment, weight training, and cardio machines with lightbox preview.
* **Admin Dashboard**:
  * Secure login (Credentials: `admin` / `gym2026`).
  * Live stats and metrics.
  * Real-time management of plans, prices, programs, trainers, gallery images, and WhatsApp number.
  * Complete enquiries table with 1-click WhatsApp messaging and calling.
* **Dual Architecture**:
  * **Next.js 15+ App Router** frontend for instant high-speed deployment on Vercel.
  * **Standalone PHP + MySQL Backend** in `/backend/` ready for cPanel/Apache/Nginx.

---

## 📂 Project Structure

```
├── app/
│   ├── api/
│   │   ├── contact/route.ts        # Next.js contact API
│   │   └── enquiries/route.ts      # Next.js membership enquiry API
│   ├── globals.css                 # Black & yellow styles & scrollbar
│   ├── layout.tsx                  # Root metadata & fonts
│   └── page.tsx                    # Complete homepage assembly
├── backend/
│   ├── admin/
│   │   ├── dashboard.php           # PHP session-authenticated admin dashboard
│   │   └── login.php               # Admin login screen
│   ├── api/
│   │   ├── contact.php             # PHP contact enquiry API
│   │   ├── enquiries.php           # PHP membership enquiry API
│   │   └── plans.php               # PHP membership plans API
│   ├── config/
│   │   └── db.php                  # PDO MySQL connection & CORS headers
│   └── database/
│       └── database.sql            # MySQL schema with tables & sample seed data
├── components/
│   ├── AboutUs.tsx                 # About section & video modal trigger
│   ├── AdminModal.tsx              # Complete in-app admin panel
│   ├── BmiCalculator.tsx           # Interactive BMI & fitness assessment
│   ├── Contact.tsx                 # Contact form, location & map
│   ├── FloatingWhatsApp.tsx        # Persistent floating WhatsApp CTA
│   ├── Footer.tsx                  # Complete dark footer
│   ├── Gallery.tsx                 # Filterable photo gallery & lightbox
│   ├── Hero.tsx                    # Bold black & yellow hero banner
│   ├── MembershipModal.tsx         # Plan selection & WhatsApp generator
│   ├── Navbar.tsx                  # Sticky responsive navigation bar
│   ├── Pricing.tsx                 # 3 membership pricing tiers in PKR
│   ├── ProgramModal.tsx            # Program syllabus & details popup
│   ├── Programs.tsx                # 4 workout program cards
│   ├── StatsBar.tsx                # 4 gym performance stats
│   ├── Trainers.tsx                # 4 trainer cards & consultation
│   └── VideoModal.tsx              # Facility video tour modal
├── lib/
│   ├── GymContext.tsx              # Live state management & localStorage persistence
│   ├── initialData.ts              # Seed data for plans, trainers, programs
│   └── types.ts                    # TypeScript interface definitions
└── public/
    └── images/                     # Gym athletes, interior, training photos
```

---

## 🚀 Deployment Instructions

### 1. Frontend Deployment (Vercel)

1. Push this repository to **GitHub**.
2. Connect your repository to **Vercel** (`https://vercel.com`).
3. Framework Preset: **Next.js**.
4. Click **Deploy**. Your frontend will be live with full interactivity, local state management, and WhatsApp messaging.

### 2. Backend Deployment (PHP & MySQL Hosting / cPanel)

1. Open **cPanel** or your hosting control panel (e.g. Hostinger, Bluehost, Namecheap).
2. Go to **phpMyAdmin** and create a database named `gym_db`.
3. Import the file `backend/database/database.sql`.
4. Upload the files inside `backend/` to your server (e.g. `public_html/api/` or a subdomain `api.gym.pk`).
5. Update `backend/config/db.php` with your MySQL database credentials:
   ```php
   $host = 'localhost';
   $db   = 'your_cpanel_db_name';
   $user = 'your_cpanel_db_user';
   $pass = 'your_db_password';
   ```
6. Access the PHP Admin Dashboard at: `https://your-domain.com/admin/login.php`
   * Default Username: `admin`
   * Default Password: `gym2026`

---

## 💬 WhatsApp Integration Details

* Default Gym WhatsApp: **`03417885841`**
* International Link Format: **`https://wa.me/923417885841`**
* You can update this phone number anytime through the **Gym Settings** tab inside the Admin Dashboard.
