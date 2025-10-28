# 🎟️ Ticketing Platform Monorepo

A complete full-stack dynamic ticketing system with real-time pricing adjustments, concurrency-safe booking, and a modern web interface.

---

## 🛠️ Prerequisites

| Tool | Version | Description |
|------|----------|-------------|
| **Node.js** | >= 20.x | Required for backend and frontend |
| **pnpm** | >= 9.x | For monorepo management |
| **Docker** | >= 24.x | To run PostgreSQL locally |
| **PostgreSQL** | optional | Only needed if not using Docker |

---

## ⚙️ Environment Setup

Create a `.env` file at the **root** of your project (`ticketing-platform-monorepo/.env`):

```env
DATABASE_URL=postgres://postgres:password@localhost:5432/ticketing
```

---

## ⚡ Quick Start (Under 5 Commands)

```bash
pnpm install
docker run --name ticketing-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=ticketing -p 5432:5432 -d postgres
pnpm --filter api run dev
pnpm --filter web run dev
```

Visit:  
- Frontend → http://localhost:3000  
- Backend → http://localhost:3001/api/events

---

## 🔬 Running Tests

Backend:  
```bash
pnpm --filter api run test
```

Frontend:  
```bash
pnpm --filter web run test
```

---

## 🔧 Troubleshooting

| Issue | Fix |
|--------|-----|
| Authentication failed | Ensure `.env` and Docker credentials match |
| Port 5432 in use | `docker stop ticketing-db && docker rm ticketing-db` |
| Tables not created | Rerun `pnpm --filter api run dev` |

---


