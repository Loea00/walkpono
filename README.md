# WalkPono LLC — Website

The new website for WalkPono LLC: The Greatness Institute. Next.js (App Router) + Prisma/Postgres +
Auth.js + Stripe Checkout.

## What's here

- Public site: home, about, articles (blog), store, workshop/course catalog with registration, contact.
- Accounts: sign up / log in, `/account` shows order history and workshop bookings.
- Admin dashboard at `/admin` (role-gated): publish articles, manage store products, manage workshops
  and see who's registered, view orders and contact messages.
- `salvage/` holds everything pulled from the old walkpono.org WordPress site (page/post text, photos)
  for reference — not served by the app.

## Local development setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill it in. For local development, the quickest path is Prisma's
   built-in local Postgres server — no separate database install needed:

   ```bash
   npx prisma dev -d --name walkpono
   ```

   This prints a `DATABASE_URL` — paste it into `.env`. Also set `AUTH_SECRET` (any random string —
   `openssl rand -base64 32` works) and `ADMIN_EMAIL` (the email you'll sign up with to get admin
   access). Leave the `STRIPE_*` vars blank for now — checkout will show a friendly "not connected yet"
   message instead of erroring until you add real keys.

3. Push the schema and seed starter content (the admin account, a welcome article, and the salvaged
   About bio/photos):

   ```bash
   npx prisma db push
   npm run db:seed
   ```

   The seed script prints a temporary admin password — log in and change it (there's no
   change-password UI yet, so for now that means updating the `User.passwordHash` directly or
   re-running the seed with `ADMIN_SEED_PASSWORD` set).

4. Run the dev server:

   ```bash
   npm run dev
   ```

## Going live — what's still needed

This app is fully built and passes a clean production build, but three things need **your** accounts
before it can go live (none of these can be created on your behalf):

1. **A production Postgres database.** [Neon](https://neon.tech) has a free tier and works well with
   Vercel. Set `DATABASE_URL` to its connection string, then run `npx prisma migrate deploy`.
2. **A Stripe account**, for the store and paid workshop checkout. Add the API keys and webhook secret
   from your Stripe dashboard to `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, and
   `STRIPE_WEBHOOK_SECRET`. Point a Stripe webhook at `/api/webhooks/stripe` for the
   `checkout.session.completed` event.
3. **Hosting + DNS.** [Vercel](https://vercel.com) is the natural fit for a Next.js app. Once deployed,
   point walkpono.org's DNS at it.

## Admin workflow

Log in with the `ADMIN_EMAIL` account, then visit `/admin`:

- **Articles** — the salvaged personal essays were seeded as unpublished drafts on purpose (per your
  note that none should go live without a real edit pass). Rewrite and check "Publish" when ready.
- **Products** / **Workshops** — same pattern: create as a draft (unchecked "Active"/"Published"),
  preview at its public URL, then flip it live.
- **Orders** / **Registrations** / **Messages** — read-only views of what's come in.
