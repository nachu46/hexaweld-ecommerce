# Jaza Trading W.L.L — Industrial Tools & Safety Equipment Platform

A high-performance corporate B2B trading and catalog platform for **Jaza Trading W.L.L** (Division of Sana Group, Qatar). Built with **React 18 + Vite** and **Express 5 + Supabase PostgreSQL REST Engine**. Features a unified editorial corporate design system, pure database-driven catalog, official trademark accreditations, and direct RFQ quotation routing via WhatsApp and database logging.

* **Live Website:** [https://jazatrading.vercel.app/](https://jazatrading.vercel.app/)
* **Admin Portal:** [https://jazatrading.vercel.app/login](https://jazatrading.vercel.app/login) (or `/admin/dashboard`)

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)

---

## ✨ Key Platform Features

- **Unified JAZA Corporate Design System**:
  - Consistent visual identity: Warm cream (`#F6F4EE`), Dark Charcoal (`#1C1B17`), JAZA Orange (`#B15E2B`), and subtle beige borders (`#E5E0D8`).
  - Typography: Refined editorial serif (**DM Serif Display**) for primary headings and **Plus Jakarta Sans** for body, forms, navigation, and badges.
- **Pure Database-Driven Catalog (No Demo Mockups)**:
  - 100% database-driven architecture using **Supabase REST Engine**.
  - All categories, brands, products, and customer enquiries are stored and managed directly in Supabase PostgreSQL tables.
- **Brand Management & Registered Trademarks**:
  - Complete management for partner and proprietary brands (TORK®, EUREX®, NEXT®, MARK SAFETY PRO®, CLEXO®, EDON®, TENZO®).
  - Dedicated **Certificates & Trademark Page** showcasing official Qatar Ministry of Commerce & Industry registered trademarks with high-res zoom and download support.
- **Quotation & Commercial Inquiries (RFQ)**:
  - Direct WhatsApp commercial routing (`+974 7060 5494` / `+974 7408 0005`).
  - Official RFQ form submission with database storage, company attribution, and customer lead tracking.
- **Full Admin Control Panel**:
  - **Products**: Complete CRUD, image galleries, variants, specs, and Excel (.xlsx) bulk import/export.
  - **Categories**: Create, edit, and delete building material categories.
  - **Partner Brands**: Manage authorized brands, logos, descriptions, and ownership tags.
  - **Banners & Promos**: Update homepage carousel banners, promotional badges, and site announcements.
  - **Enquiries**: Real-time inbox for wholesale price quotes, order submissions, and job applications.
  - **Commercial Analytics**: Real-time platform metrics, total inventory count, and customer product interest.
  - **Admin Users**: Role-based access control (`superadmin` > `admin` > `editor`).
- **Dynamic SEO & Search Compliance**:
  - Dynamic real-time XML sitemap (`/sitemap.xml`) indexing all products, brands, and categories.
  - Configured `robots.txt` protecting administrative routes while directing search engines to the sitemap.
  - Rich social preview meta tags via `react-helmet-async`.
- **Anti-Pause Keep-Alive Engine**:
  - Built-in ping scheduler (`/api/ping`) running every 6 hours to keep the Supabase database awake and active.

---

## 📁 Project Structure

```
hexaweld/
├── client/                    # React Frontend (Vite)
│   ├── src/
│   │   ├── components/        # Header, Footer, AdminNav, ProductCard, JtLogo, WhatsAppFloat
│   │   ├── context/           # AuthContext (JWT session), CartContext
│   │   ├── pages/             # Home, About, Products, ProductDetails, Categories, Brands, Certificates, Services, Career, Contact, Checkout
│   │   │   └── admin/         # Dashboard, ProductList, ProductEdit, CategoryList, BrandList, BrandEdit, Analytics, AdminBanners, AdminAnnouncement, AdminManagement, Login
│   │   ├── utils/             # Image URL & helper functions
│   │   ├── App.jsx            # Application Router
│   │   └── main.jsx           # React Entry Point
│   └── dist/                  # Production Compiled Assets
│
└── server/                    # Express Backend (Supabase Engine)
    ├── config/                # supabase.js, db.js, cloudinary.js
    ├── controllers/           # productController, categoryController, brandController, enquiryController, analyticsController, bannerController, etc.
    ├── middleware/            # JWT auth, admin authorization, upload handling
    ├── routes/                # productRoutes, categoryRoutes, brandRoutes, enquiryRoutes, analyticsRoutes, seoRoutes, uploadRoutes, etc.
    ├── services/              # supabaseService.js (pure database-driven data layer)
    ├── utils/                 # autoMigrateSupabase.js, supabasePing.js
    ├── server.js              # Server Entry Point
    └── clearProducts.js       # Database cleanup utility
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Supabase Project** (PostgreSQL Database & API Keys)

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
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173

# Supabase PostgreSQL & API Configuration
SUPABASE_URL=https://<your-project-id>.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL=postgresql://postgres.<project>:<password>@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.<project>:<password>@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres
```

Start the backend server:

```bash
npm run dev
```

*The backend will automatically connect to Supabase, auto-migrate database tables, and seed the default administrator.*

### 3. Setup Client Frontend

```bash
cd ../client
npm install
npm run dev
```

- Public Storefront: `http://localhost:5173`
- Backend API Base: `http://localhost:5000`

---

## 🔐 Default Admin Credentials

* **Admin Login Route:** `/login` or `/admin/dashboard`
* **Email:** `admin@jazatrading.com`
* **Password:** `password123`

---

## 🔌 API Route Reference

| Module | Route | Methods | Access | Description |
|---|---|---|---|---|
| **Products** | `/api/products` | GET, POST | Public / Admin | List & search products / Create product in Supabase |
| **Products** | `/api/products/:id` | GET, PUT, DELETE | Public / Admin | Get product details / Update product / Delete product |
| **Products** | `/api/products/import` | POST | Admin | Bulk import products from Excel (`.xlsx`) |
| **Products** | `/api/products/export` | GET | Admin | Export product catalog to Excel |
| **Categories** | `/api/categories` | GET, POST, PUT, DELETE | Public / Admin | Full CRUD for building material categories |
| **Brands** | `/api/brands` | GET, POST, PUT, DELETE | Public / Admin | Full CRUD for partner & registered brands |
| **Enquiries** | `/api/enquiries` | GET, POST | Public / Admin | Submit quote request / Admin lead inbox |
| **Analytics** | `/api/admin/analytics` | GET | Admin | Real inventory count, enquiries count, traffic metrics |
| **Banners** | `/api/banners` | GET, POST, PUT, DELETE | Public / Admin | Homepage carousel & promotional banners |
| **Announcements**| `/api/announcement` | GET, POST, PUT, DELETE | Public / Admin | Top header announcement ticker |
| **Uploads** | `/api/upload` | POST | Admin | Single & multi-file upload for images and PDFs |
| **Auth** | `/api/users/login` | POST | Public | User authentication & JWT issuance |
| **Admin** | `/api/admin/list-admins` | GET | SuperAdmin | Manage system administrators |
| **SEO** | `/sitemap.xml` | GET | Public | Dynamic XML sitemap generation |
| **SEO** | `/robots.txt` | GET | Public | Search crawler rules & sitemap pointer |
| **Keep-Alive**| `/api/ping` | GET | Public | Database wake-up & uptime monitor endpoint |

---

## 🏗️ Production Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite 5, TailwindCSS 3.4, Lucide Icons, Framer Motion, Recharts, Axios |
| **Backend** | Node.js, Express 5, JWT, Express Async Handler, Multer |
| **Database** | Supabase Cloud Database (PostgreSQL REST Engine) |
| **Typography** | DM Serif Display (Editorial Headings), Plus Jakarta Sans (Body & UI) |
| **Deployment** | Vercel (Frontend & Serverless API Proxies) |

---

## 📄 License

Proprietary commercial software for **Jaza Trading W.L.L** (Division of Sana Group, State of Qatar). All rights reserved.
