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

After editing:

bash
git add README.md
git commit -m "Add run instructions and Postman section to README"
git push
