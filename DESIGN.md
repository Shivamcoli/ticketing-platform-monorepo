# 🎨 Design Document — Ticketing Platform

This document explains the design and reasoning behind the dynamic ticketing system, pricing logic, and architectural choices.

---

## 💰 Pricing Algorithm & Design

**Key rules:**
1. If fewer than 20% of seats remain → increase price by 20%, up to the ceiling price.
2. If more than 80% of seats remain → decrease price by 10%, down to the floor price.
3. Otherwise, price remains constant.

Ensures early buyers get discounts and late buyers pay surge prices.

---

## ⚖️ Concurrency Handling

Each booking uses a transaction lock with:
```ts
const [event] = await tx.select().from(events).where(eq(events.id, eventId)).for('update');
```
This prevents overselling by locking the event row until updates finish.

---

## 🏗️ Monorepo Architecture

```
apps/
 ├── api/ (NestJS + Drizzle)
 └── web/ (Next.js)
packages/
 └── shared/
```
Using **pnpm workspaces** allows shared types and utilities between services.

---

## 🔄 Trade-offs & Design Decisions

| Area | Decision | Trade-off |
|-------|-----------|-----------|
| ORM | Drizzle ORM | Lightweight but smaller ecosystem |
| Database | PostgreSQL + Docker | Setup overhead but consistent env |
| Pricing | Ratio-based | Simple but non-AI dynamic |
| Concurrency | SQL locking | Slight delay but ensures integrity |

---

## 🚀 Future Improvements

1. Add Redis locks for distributed concurrency.
2. Add WebSockets for live price updates.
3. Integrate payments (Stripe/Razorpay).
4. Add user authentication.
5. CI/CD deployment automation.

