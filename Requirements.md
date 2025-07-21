# 📽️ Movie Recommendation App – Requirements

This document outlines the high-level technical and functional requirements for the Movie Recommendation Application. The application will be a full-stack system enabling users to log in, add and view a shared list of movies, and will be containerized for deployment on Kubernetes (later EKS).

---

## 📌 1. Technology Stack

### Frontend
- **Framework**: React
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: Typescript
- **Package Manager**: npm or pnpm

### Backend
- **Framework**: Django
- **Language**: Python 3.x
- **API**: Django REST Framework (DRF)
- **Database**: PostgreSQL

### DevOps & Infrastructure
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Cloud Target**: Amazon EKS (Elastic Kubernetes Service)

---

## ⚙️ 2. Functional Requirements

### User Authentication
- Users must be able to:
    - Register an account
    - Log in and log out
    - Have session-based or token-based authentication (preferably JWT)

### Movie Management
- Users can:
    - Add a movie to the shared list (title, genre, rating, review, etc.)
    - View the entire shared list
    - Edit any movie entry
    - Delete any movie entry
- Movies added by any user will be visible to all authenticated users

---

## 🗃️ 3. Backend (Django) Requirements

- Expose RESTful API endpoints for:
    - **Auth**: Register, Login, Logout
    - **Movies**: CRUD operations (`GET`, `POST`, `PUT`, `DELETE`)
- Use Django ORM to interact with the PostgreSQL database
- Implement CORS settings to allow frontend communication
- Provide API documentation via Swagger or ReDoc (optional but recommended)

---

## 🖥️ 4. Frontend (React + Vite) Requirements

- Login & registration forms
- Responsive UI for:
    - Movie list (with title, genre, user review, etc.)
    - Add/edit/delete forms
- State management using React Context or a global store (e.g., Redux)
- API service layer to communicate with Django backend

---

## 🐳 5. Containerization (Docker)

- Dockerfiles for both frontend and backend
- Use a multi-stage build for the React app to optimize image size
- Compose the services using `docker-compose` for local development

---

## ☸️ 6. Kubernetes Deployment

- YAML manifests for:
    - Deployments
    - Services
    - ConfigMaps/Secrets
    - Ingress (optional with TLS support)
- Separate namespaces for `dev`, `staging`, and `prod` (eventual EKS setup)
- CI/CD pipeline planning (GitHub Actions, ArgoCD, or similar)

---

## 🧪 7. Optional Features (Future Enhancements)

- Movie recommendations based on user activity or genres
- User-specific movie lists
- Rating system and average ratings
- Comments or tags on movies
- Admin dashboard for managing users and content

---

## 📂 8. Project Structure Overview (Example)

```plaintext
movie-app/
├── backend/
│   ├── manage.py
│   └── movies/               # Django app for movie CRUD
├── frontend/
│   └── vite-react-app/       # React app scaffolded with Vite
├── docker/
│   ├── Dockerfile.backend    # Dockerfile for Django backend
│   └── Dockerfile.frontend   # Dockerfile for React frontend
├── k8s/
│   ├── deployment.yaml       # Kubernetes Deployment manifests
│   ├── service.yaml          # Kubernetes Service definitions
│   └── ingress.yaml          # (Optional) Ingress config for routing
├── docker-compose.yml        # Compose file for local dev
└── README.md                 # Project overview and setup instructions

```

---

## ✅ 9. Acceptance Criteria

- [ ] Users can register and log in
- [ ] Authenticated users can CRUD shared movie entries
- [ ] All services run in Docker containers locally
- [ ] App can be deployed and accessed via Kubernetes cluster
- [ ] PostgreSQL persists movie and user data
- [ ] React frontend communicates correctly with Django backend
- [ ] App prepared for EKS deployment
