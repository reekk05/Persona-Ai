Subject: README.md

# PersonaAI — Full-Stack AI Chat Application

PersonaAI is a **full-stack AI chat application** built to practice and demonstrate **core software engineering fundamentals**: frontend–backend communication, state management, authentication flow, and clean project structure.

This project reflects how I approach learning new systems by building **end-to-end, real-world features** rather than isolated demos.

---

## What This Project Demonstrates

* Understanding of full-stack application flow
* Ability to structure scalable frontend code
* Experience integrating APIs and handling async data
* Clean separation of UI, logic, and state
* Comfort working with modern JavaScript tooling

---

## Key Features

* Login-based user flow
* Chat interface with live message updates
* Persona-based AI responses
* Centralized state using React Context
* Modular backend APIs
* Clean, responsive UI

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router
* Context API
* PrismJS

### Backend

* Node.js
* Express.js
* REST APIs

---

## Architecture Overview

```
User
 ↓
React Frontend
 ├── Components
 ├── Global State (Context)
 └── API Calls
 ↓
Express Backend
 ├── Routes
 ├── Controllers
 └── AI Logic
```

The project is designed to be **easy to understand, modify, and extend**, making it ideal for learning and iteration.

---

## Folder Structure

```
project2/
│
├── backend/        # Server & APIs
├── personaAI/      # React frontend
│   ├── components/
│   ├── context/
│   ├── pages/
│   └── assets/
│
└── README.md
```

---

## Running Locally

### Clone

```bash
git clone https://github.com/your-username/personaAI.git
cd personaAI
```

### Install dependencies

Frontend:

```bash
cd personaAI
npm install
```

Backend:

```bash
cd backend
npm install
```

---

### Environment Setup

Create a `.env` file inside `/backend`:

```env
PORT=3000
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

`GEMINI_API_KEY` is required for the backend text-generation feature. The image generation path uses Pollinations and does not require a separate API key.

---

### Start the app

Backend:

```bash
npm start
```

Frontend:

```bash
npm run dev
```

---

## What I Learned

* How frontend and backend systems communicate
* Managing shared application state cleanly
* Designing reusable components
* Handling authentication and protected routes
* Structuring projects for long-term maintainability

---

## What I’d Improve With More Time

* Database integration for chat persistence
* OAuth authentication
* Better error handling & loading states
* Unit tests
* Mobile-first responsiveness

---

## About Me

**Aniruddha Mandal**

Aspiring software engineer actively building projects to strengthen fundamentals in **full-stack development and AI-driven applications**.

---

## License

MIT License
