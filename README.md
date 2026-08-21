# 🪶 Harry Potter Personal Diary

A production-grade, privacy-first personal diary application built with a magical Hogwarts visual identity, rich text parchment editing, AI-powered Pensieve memory exploration, mood tracking, calendar views, memory vault, and security features.

---

## 🏛️ Architecture & Technologies

### Frontend
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS Variables for House Themes
- **State & Data Handling**: TanStack Query + Zustand
- **Editor**: TipTap Rich Text Editor (Parched Enchanted Page Theme)
- **Animations**: Framer Motion + CSS Particle Effects
- **Routing & Forms**: React Router v7 + React Hook Form + Zod
- **Icons**: Lucide React

### Backend
- **Framework**: NestJS (TypeScript)
- **Database**: MongoDB + Mongoose Schema ODM
- **Authentication**: JWT Access & Rotating Refresh Tokens, Passport, bcryptjs
- **Security**: Helmet, CORS, Rate Limiting (Throttler), Class Validator DTOs
- **API Documentation**: Swagger / OpenAPI
- **Logging**: Centralized Structured Logger

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 20
- npm >= 10
- Docker & Docker Compose (Optional for containerized run)
- MongoDB instance (or Docker container)

### 1. Setup Environment
```bash
cp .env.example .env
```

### 2. Run with Docker Compose
```bash
docker-compose up --build
```
The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:3000/api/v1`.

### 3. Run Locally (Development Mode)

#### Backend
```bash
cd backend
npm install
npm run start:dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🏰 Hogwarts House Themes

The user profile supports house selection which dynamically changes the visual styling across the entire diary experience:

- **🦁 Gryffindor**: Deep Maroon Red (`#740001`), Antique Gold (`#D3A625`), Charcoal Base (`#1A0000`)
- **🐍 Slytherin**: Emerald Green (`#1A472A`), Silver/Parchment (`#AAAAAA`), Obsidian Base (`#0B1D12`)
- **🦅 Ravenclaw**: Midnight Blue (`#0E1A40`), Bronze (`#946B2D`), Deep Night Base (`#080E24`)
- **🦡 Hufflepuff**: Canary Warm Gold (`#ECB939`), Dark Wood Brown (`#372E29`), Hearth Base (`#1F1810`)

---

## 🔮 Core Features
1. **Cinematic Lumos Welcome & Sorting Ceremony**: Interactive house onboarding.
2. **Enchanted Diary Editor**: Real-time autosave, mood tagging, weather, photos, and Muffliato private lock.
3. **Pensieve Memory Assistant**: Grounded natural-language memory retrieval with exact entry citations.
4. **Memory Vault & Interactive Calendar**: Visual timeline, photo archives, and calendar grid.
5. **Chamber of Secrets Privacy**: Extra passcode authorization for private entries and security logs.
6. **Data Export & Snapshot Backup**: Export diary entries to JSON, Markdown, or PDF format.
