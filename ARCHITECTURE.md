# 🏛️ Architecture Documentation — Harry Potter Personal Diary

## Overview
The **Harry Potter Personal Diary** is designed as a secure, full-stack web application adhering to senior software engineering practices and SOLID design principles.

---

## 🏗️ Backend System Architecture (NestJS)

```
HTTP Client / SPA (React 19)
             │
             ▼
      NestJS Router
             │
   ┌─────────┴─────────┐
   ▼                   ▼
Helmet Security     Global Throttler (Rate Limit)
   │                   │
   └─────────┬─────────┘
             ▼
  HttpException Filter
             │
             ▼
    Controllers Layer (Thin, ValidationPipe, DTOs)
             │
             ▼
     Services Layer (Business Logic, Hashing, Token Rotation)
             │
             ▼
Repository / ODM Layer (Mongoose Schemas & Indexing)
             │
             ▼
       MongoDB Server
```

---

## 🎨 Frontend System Architecture (React 19)

- **Feature-First Organization**: Code split into `auth`, `onboarding`, `dashboard`, `diary`, `calendar`, `pensieve`, `memories`, `profile`.
- **Global Auth & Theme Store**: Zustand handles JWT state and house dynamic theme switching (`theme-gryffindor`, `theme-slytherin`, `theme-ravenclaw`, `theme-hufflepuff`).
- **Data Query Engine**: TanStack Query handles API fetching, caching, loading states, and background refetching.
- **Rich Text Parchment Engine**: TipTap with ProseMirror extensions styled like enchanted manuscript.

---

## 🔒 Security Design
1. Password hashing with **Bcrypt** (salt rounds 12).
2. **Rotating JWT Architecture**: Short-lived access tokens (15 minutes) and rotating refresh tokens (7 days).
3. **Helmet HTTP Headers**: Protection against XSS, clickjacking, MIME sniffing.
4. **Data Ownership Enforcement**: Every database query scopes `userId` from the verified JWT payload.
