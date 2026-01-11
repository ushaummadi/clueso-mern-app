# Clueso MERN App

Full‑stack task management app with authentication, profile, and task CRUD.

## Run locally

### Backend
```bash
cd backend
npm install
npm run dev
Backend runs on http://localhost:5000.

Frontend
bash
cd frontend
npm install
npm run dev
Frontend runs on http://localhost:5173.

text

Use Markdown headings and code blocks as shown.[1]

## 2. Add Postman collection section

Append this:

```md
## API Testing (Postman)

A Postman collection is included at:

`backend/clueso_api.postman_collection.json`  <!-- or your file name -->

Import this file into Postman to test:

- Auth: register and login
- User profile: GET and PUT `/api/user/profile`
- Tasks: CRUD on `/api/tasks`
This documents where the collection lives and what it covers.
​
## Deployment / Scaling Notes

### Backend (API)

- Can be deployed to a Node hosting platform such as Render.  
- Start command: `node server.js` (or `npm start`).  
- Environment variables (set in the platform dashboard):
  - `PORT`
  - `MONGO_URI` (MongoDB Atlas connection string)
  - `JWT_SECRET`
- CORS should allow the frontend origin (e.g. `https://my-frontend.vercel.app`). [web:678][web:689]

### Frontend (React + Vite)

- Can be deployed to Vercel or Netlify as a static site.  
- Build command: `npm run build`  
- Output directory: `dist`  
- Environment variable:
  - `VITE_API_BASE_URL` pointing to the deployed backend URL (e.g. `https://clueso-api.onrender.com`). [web:687][web:696]
### API Documentation / Postman

Postman collection: `backend/clueso_api.postman_collection.json`

It includes:
- Auth: /api/auth/register, /api/auth/login
- User: /api/user/profile (GET/PUT)
- Tasks: /api/tasks (GET/POST), /api/tasks/:id (PUT/DELETE)


After editing:

bash
git add README.md
git commit -m "Add run instructions and Postman section to README"
git push
