# Jaza Trading W.L.L — Industrial Tools & Safety Equipment E-Commerce

A full-stack B2B e-commerce platform for industrial tools, welding equipment, safety gear, and building materials for **Jaza Trading W.L.L** (Division of Sana Group, Qatar). Built with **React + Vite** and **Express 5 + MongoDB**. Operates on an enquiry-only model — customers browse products, view brand catalogs, and request quotes directly via WhatsApp or quick inquiry forms.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)

---

## ✨ Features

- **Brand Image Management Module** — Complete backend & admin management for brand logos, banner images, and gallery photos with format/file-size validation (`PNG`, `JPG`, `JPEG`, `WEBP`, max 5MB).
- **Enquiry-Only Catalog** — Direct "Contact for Price" & instant WhatsApp inquiry routing for all products.
- **Rich Product Engine** — Product SKU, variants, specifications, key features, tags, category hierarchy, and multi-image media gallery.
- **Full Admin Control Panel** — Comprehensive admin management for:
  - Products (CRUD + Excel Import/Export)
  - Categories (CRUD + Category Images)
  - Partner Brands (CRUD + Logo & Banner Image Management)
  - Promotional Banners & Top Announcements
  - Customer Enquiries & Lead Management
  - Analytics & Visitor View Tracking
  - Admin User Management (Role-Based Access Control)
- **Role-Based Access Control (RBAC)** — Three-tier permissions: `superadmin` > `admin` > `editor`.
- **Seamless Brand Synchronization** — Automatic sync between registered DB brands, client homepage logo grid, product filters, and admin product auto-suggestions.
- **Multi-Image Storage & CDN** — Production-ready file storage supporting Cloudinary CDN and local disk fallback.
- **SEO & Responsive UI** — Fast rendering, meta tag optimization via `react-helmet-async`, mobile-first responsive drawers, and Framer Motion micro-interactions.

---

## 📁 Project Structure

```
hexaweld/
├── client/                    # React Frontend (Vite)
│   └── src/
│       ├── components/        # Header, Footer, ProductCard, JtLogo, WhatsAppFloat, Layout
│       ├── context/           # AuthContext (JWT + LocalStorage session)
│       ├── pages/             # Public pages (Home, Products, ProductDetails, About, Contact)
│       │   └── admin/         # Admin Panel (Dashboard, ProductList, ProductEdit, CategoryList, BrandList, BrandEdit, Analytics, AdminBanners, AdminAnnouncement, AdminManagement, Login)
│       ├── utils/             # Image URL & helper functions
│       ├── App.jsx            # Application Router
│       └── main.jsx           # React Entry Point
│
└── server/                    # Express Backend
    ├── config/                # db.js, cloudinary.js, supabase.js
    ├── controllers/           # brandController, productController, categoryController, userController, etc.
    ├── middleware/            # JWT auth, admin authorization, upload handling
    ├── models/                # brandModel, productModel, categoryModel, userModel, enquiryModel, etc.
    ├── routes/                # brandRoutes, productRoutes, categoryRoutes, uploadRoutes, etc.
    ├── data/                  # Seed data (brands.js, products.js, categories.js, users.js)
    ├── server.js              # Server Entry Point
    ├── seeder.js              # Database seed & reset CLI script
    └── manageUsers.js         # Admin user creation & role management CLI
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **MongoDB** (Atlas cluster or local MongoDB instance)
- **Cloudinary Account** (optional for image CDN storage)

### 1. Clone Repository

```bash
git clone https://github.com/nachu46/hexaweld-ecommerce.git
cd hexaweld-ecommerce
```

### 2. Setup Backend Server

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend development server:

```bash
npm run dev
```

### 3. Setup Client Frontend

```bash
cd client
npm install
```

Create a `.env` file inside `client/` (optional for local dev):

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

- Public Site: `http://localhost:5173`
- API Base: `http://localhost:5000`

---

## 🗄️ Database Seeding

Populate the database with sample categories, partner brands (TORK®, EUREX®, NEXT®, MARK SAFETY PRO®, CLEXO®, EDON®, TENZO®), products, and default admin user:

```bash
cd server
node seeder.js        # Seed all data & brands
node seeder.js -d     # Clear all database collections
```

> **Default Admin Credentials:** `admin@hexaweld.com` / `password123`

---

## 👤 User Management CLI

Manage administrative access directly from the terminal:

```bash
# Create a new admin
node manageUsers.js --email=admin@example.com --password=SecurePass123 --name="Jaza Admin" --role=admin

# Promote user to superadmin
node manageUsers.js --email=admin@example.com --role=superadmin

# Reset user password
node manageUsers.js --email=admin@example.com --password=NewPassword123
```

---

## 🔌 API Route Reference

| Module | Route | Methods | Access | Description |
|---|---|---|---|---|
| **Brands** | `/api/brands` | GET, POST | Public / Admin | List all brands / Create brand with logo upload |
| **Brands** | `/api/brands/:id` | GET, PUT, DELETE | Public / Admin | Get details / Update images & info / Delete brand |
| **Products** | `/api/products` | GET, POST | Public / Admin | List & search products / Create product |
| **Products** | `/api/products/:id` | GET, PUT, DELETE | Public / Admin | Get product / Edit product / Delete product |
| **Products** | `/api/products/brands` | GET | Public | Get list of all available product brand names |
| **Products** | `/api/products/import` | POST | Admin | Bulk import products from Excel (`.xlsx`) |
| **Products** | `/api/products/export` | GET | Admin | Export product catalog to Excel |
| **Categories**| `/api/categories` | GET, POST, PUT, DELETE | Public / Admin | Manage category hierarchy & category icons |
| **Uploads** | `/api/upload` | POST | Admin | Single & multi-file image upload endpoint |
| **Enquiries** | `/api/enquiries` | GET, POST | Public / Admin | Submit quote request / Admin lead tracking |
| **Auth** | `/api/users/login` | POST | Public | User authentication & JWT issuance |
| **Admin** | `/api/admin/list-admins` | GET | SuperAdmin | Manage system administrators |
| **Analytics** | `/api/admin/analytics` | GET | Admin | Product views, enquiry counts & traffic metrics |

---

## 🏗️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite 5, TailwindCSS 3.4, Lucide Icons, Framer Motion, Axios |
| **Backend** | Node.js, Express 5, Mongoose 9, JWT, Express Async Handler, Multer |
| **Database** | MongoDB Atlas |
| **Media Storage** | Cloudinary CDN / Local Static File Server |

---

## 📄 License

Proprietary software for **Jaza Trading W.L.L** (Division of Sana Group, Qatar). All rights reserved.
