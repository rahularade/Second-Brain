# 🧠 Second Brain – Organize, search, and share your links in one place.

**Second Brain** is a full-stack application that lets users save links, videos, and tweets in one place.
It offers secure authentication, powerful filtering and search, content editing, and public sharing via a single shareable link, all within a clean, responsive UI with dark and light modes.

🔗 Live Demo: https://secondbrain.rahularade.site/

---

## ✨ Features

- 🔐 User authentication (Signup / Signin)
- 🍪 Secure cookie-based session handling
- 🔒 Password hashing using bcrypt
- 🔗 Save links (tweets, videos, or any URLs)
- ✏️ Edit and 🗑 Delete saved content
- 🏷 Filter links by type (Tweet / Video / Link / All)
- 🔍 Search content by title
- 🔗 Public brain sharing via a shareable link (no sign-in required)
- 🌗 Dark mode & light mode support
- 📱 Fully responsive UI
- ⚙️ Account management (change password, sign out, delete account)

---

## 🧠 Tech Stack

### Frontend
- **React**
- **TypeScript**
- **Tailwind CSS**
- **React Query** (API state management)
- **React Hook Form (RHF)**
- **Zod** (form validation)

### Backend
- **Node.js**
- **Express**
- **TypeScript**
- **PostgreSQL**
- **Prisma v7**
- **JWT Authentication**
- **Zod** (validation)
- **Bcrypt** (password hashing)

### DevOps & Deployment
- **GitHub Actions** (CI/CD pipelines)
- **AWS S3** (frontend static hosting)
- **AWS CloudFront** (CDN & cache invalidation)
- **Docker** (containerized backend)
- **Docker Hub** (backend image registry)
- **AWS EC2** (backend hosting)
- **Docker Compose** (local orchestration for backend and PostgreSQL)

---

## 🔄 Project Flow

1. User signs up or signs in
2. Backend sets secure authentication cookies
3. User is redirected to the dashboard
4. User can add, edit, or delete saved content
5. User can manage account settings (change password, sign out, delete account)

---

## 🔁 CI/CD Pipeline

### Frontend Pipeline
- Build frontend on every push
- Sync production build to AWS S3
- Invalidate CloudFront cache to serve the latest assets

### Backend Pipeline
- Build backend Docker image
- Push image to Docker Hub
- SSH into production VM
- Pull the latest Docker image
- Restart backend container

---

## 🐳 Docker Setup

- Backend is fully containerized using Docker
- Docker Compose is used to manage:
  - Backend API service
  - PostgreSQL database
- Supports both local development and production deployment

---

## 📂 Project Structure
```
second-brain
├── .github               # CI/CD workflows (GitHub Actions)
├── frontend              # React + TypeScript + Tailwind frontend
├── backend               # Node.js + Express backend
│   ├── prisma            # Prisma schema & migrations
│   └── src               # Backend source code
├── docker-compose.yml    # Docker Compose for backend & PostgreSQL
├── Dockerfile.dev        # Backend development Dockerfile
├── Dockerfile.prod       # Backend production Dockerfile
├── .dockerignore
└── README.md
```
---

## 🚀 Running the Project Locally

You can run the project using Docker Compose or by running frontend and backend separately.

---

## ✅ Prerequisites

Make sure you have installed:
- Node.js (v18 or above)
- npm
- PostgreSQL
- Docker & Docker Compose

---

## 🐳 Run Backend Locally Using Docker Compose

From the project root:
```
docker compose up --build
```
Run in detached mode:
```
docker compose up -d --build
```
Stop containers:
```
docker compose down
```
Backend runs at:
```
http://localhost:3000
```

---

## 🗄 Database Setup (Without Docker)

### PostgreSQL

1. Create a PostgreSQL database: `secondbrain`

2. Update `.env` in backend:
```
DATABASE_URL=postgresql://username:password@localhost:5432/secondbrain
```

3. Run `Prisma` migrations:
```
npx prisma migrate dev
```
---

## 🛠 Backend Setup

1. Go to `backend` folder:
```
cd backend
```

2. Install dependencies:
```
npm install
```

3. Create `.env` file:
```
PORT=3000  
DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/second_brain?schema=public  
JWT_SECRET=yourjwtsecretkey  
CORS_ORIGIN=http://localhost:5173
```

4. Run Backend:
```
npm run dev
```

Backend runs on: http://localhost:3000

---

## 🎨 Frontend Setup

1. Go to `frontend` folder:
```
cd frontend
```
2. Install dependencies:
```
npm install
```

3. Create `.env` file:
```
BACKEND_URL=http://localhost:3000/api/v1
```

4. Start frontend:
```
npm run dev
```

Frontend runs on:
http://localhost:5173

---

### 👨‍💻 Author

Rahul Arade