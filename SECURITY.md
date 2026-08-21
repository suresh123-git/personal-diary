# 🛡️ Security Policy — Harry Potter Personal Diary

## Core Security Features

1. **Authentication & Password Protection**
   - Cryptographic hashing via Bcrypt (12 rounds).
   - No plaintext passwords ever logged or returned in responses.

2. **Authorization & Ownership**
   - Strict JWT validation middleware (`JwtAuthGuard`).
   - Every read/write operation is checked against `request.user._id`. Users cannot access each other's data.

3. **Muffliato Private Entry Protection**
   - Private entries marked with `isPrivate: true` are filtered or locked behind user authorization.

4. **HTTP Security Standards**
   - **Helmet.js** standard header hardening.
   - **CORS** restricts cross-origin request handling to configured origin.
   - **NestJS Throttler** limits requests to 100 per minute per IP.
   - Centralized validation pipes filter unexpected input fields.
