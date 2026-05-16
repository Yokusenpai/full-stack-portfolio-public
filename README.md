# My Portfolio Webpage

This is the repository for my professional portfolio website, built to showcase my projects, skills, and creativity for prospective employers.

## Live demo

- Deployed frontend: **update this link after deployment**

## Tech stack

### Frontend

- **React** with **Vite** and **TypeScript**
- **Tailwind CSS** for responsive styling
- **Framer Motion** for smooth UI animation
- **Zustand** for lightweight app state
- **Lucide React** for iconography

### Backend

- **Node.js** and **Express**
- **MongoDB** for database storage
- **Cloudinary** for image hosting
- **JWT auth** and secure admin routing
- **Axios** for API requests

## What this project demonstrates

- A polished portfolio with multiple content sections
- A working admin dashboard for artwork and project management
- Protected admin routes with login authentication
- File uploads and media handling via Cloudinary
- Full stack app structure with separate frontend/backend

## Repo structure

- `frontend/` — Vite React app
- `backend/` — Express API server
- `.gitignore` — ignores local env files, logs, and dependencies

## Local setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
# fill in the values in .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Environment variables

### Backend

Create a `.env` file in `backend/` with:

```env
MONGODB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
JWT_SECRET=
```

### Frontend

Create a `.env` file in `frontend/` with:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

When deployed, set `VITE_API_BASE_URL` to your deployed backend API URL.

## Deployment notes

- Deploy the frontend app from `frontend/` to **Netlify** or a similar static host.
- Deploy the backend app from `backend/` to a Node host such as **Railway**, **Render**, **Fly.io**, or similar.
- Update the frontend environment variable `VITE_API_BASE_URL` to point to your live backend URL.
- Ensure CORS and credentials are configured for the deployed frontend origin.
- Verify that the admin login page and protected `/admin` route work after deployment.

## Contact

For any questions or inquiries, contact [rahzorlaw@gmail.com](mailto:YOURGMAIL@gmail.com)
