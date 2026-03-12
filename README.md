# 🔥 HexaWeld — Industrial Welding Equipment E-Commerce

A full-stack B2B e-commerce platform for welding equipment, built with **React + Vite** and **Express 5 + MongoDB**. Operates on an enquiry-only model — customers browse products and reach out via WhatsApp or enquiry forms.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)

---

## ✨ Features

- **Enquiry-Only Catalog** — No cart/checkout; products show "Contact for Price" with WhatsApp integration
- **Rich Product Data** — SKU, variants, specs, features, tags, SEO fields, multi-image gallery
- **Admin Dashboard** — Full CRUD for products, categories, banners, announcements, and enquiries
- **Role-Based Access** — Three-tier RBAC: `superadmin` > `admin` > `editor`
- **Analytics** — Track product views & enquiry counts with Recharts-powered dashboard
- **Excel Import/Export** — Shopify-compatible XLSX bulk product management
- **Cloudinary CDN** — All product images hosted via Cloudinary
- **Responsive UI** — TailwindCSS + Framer Motion animations + Swiper carousels
- **SEO Optimized** — Auto-generated slugs, meta tags via react-helmet-async

---

## 📁 Project Structure

```
hexaweld/
├── client/                    # React Frontend (Vite)
│   └── src/
│       ├── components/        # Header, Footer, ProductCard, Layout, etc.
│       ├── context/           # AuthContext (JWT + localStorage)
│       ├── pages/             # Public pages (Home, Products, About, Contact)
│       │   └── admin/         # Admin panel (10 pages)
│       ├── utils/             # Helper functions
│       ├── App.jsx            # Routes
│       └── main.jsx           # Entry point
│
└── server/                    # Express Backend
    ├── config/                # db.js, cloudinary.js
    ├── controllers/           # 8 controllers
    ├── middleware/             # JWT auth + role middleware
    ├── models/                # 7 Mongoose models
    ├── routes/                # 9 route files
    ├── data/                  # Seed data (products, categories, users)
    ├── utils/                 # Token generation
    ├── server.js              # Entry point
    ├── seeder.js              # DB seed/destroy script
    └── manageUsers.js         # User management CLI
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **MongoDB** (Atlas or local)
- **Cloudinary** account (for image uploads)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/hexaweld.git
cd hexaweld
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the server:

```bash
npm run dev
```

### 3. Setup the Frontend

```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory (optional for local dev):

```env
VITE_API_URL=http://localhost:5000
```

Start the dev server:

```bash
npm run dev
```

The app runs at `http://localhost:5173` and the API at `http://localhost:5000`.

---

## 🗄️ Database Seeding

Seed the database with sample products, categories, and an admin user:

```bash
cd server
node seeder.js        # Import sample data
node seeder.js -d     # Destroy all data
```

> Default admin: `admin@hexaweld.com` / `password123`

---

## 👤 User Management CLI

Manage admin credentials from the command line:

```bash
# Create a new user
node manageUsers.js --email=user@example.com --password=pass123 --name="John Doe" --role=admin

# Reset password for existing user
node manageUsers.js --email=user@example.com --password=newpass

# Update role
node manageUsers.js --email=user@example.com --role=superadmin
```

**Roles:** `superadmin`, `admin`, `editor`

---

## 🔌 API Endpoints

| Route | Methods | Access |
|-------|---------|--------|
| `/api/products` | GET, POST, PUT, DELETE | Public / Admin |
| `/api/products/export` | GET | Admin |
| `/api/products/import` | POST | Admin |
| `/api/categories` | GET, POST, PUT, DELETE | Public / Admin |
| `/api/users/login` | POST | Public |
| `/api/users` | POST (register) | Public |
| `/api/admin/create-admin` | POST | SuperAdmin |
| `/api/admin/list-admins` | GET | SuperAdmin |
| `/api/admin/:id` | DELETE | SuperAdmin |
| `/api/enquiries` | GET, POST | Public / Admin |
| `/api/banners` | GET, POST, PUT, DELETE | Public / Admin |
| `/api/announcement` | GET, POST, PUT, DELETE | Public / Admin |
| `/api/analytics` | GET, POST | Admin / Public |
| `/api/upload` | POST | Admin |

---

## 🏗️ Tech Stack

| | Technology |
|---|-----------|
| **Frontend** | React 18, Vite 5, TailwindCSS 3.4, Framer Motion, Recharts, Swiper |
| **Backend** | Express 5, Mongoose 9, JWT, bcryptjs, Multer |
| **Database** | MongoDB Atlas |
| **Storage** | Cloudinary |
| **Deployment** | Vercel (frontend) + Render (backend) |

---

## 📄 License

This project is proprietary software for HexaWeld.
