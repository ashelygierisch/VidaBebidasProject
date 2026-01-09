# Migration Plan: MongoDB → Supabase with Analytics & Email

This is your step-by-step guide to migrate from MongoDB/Prisma to Supabase, add PostHog analytics, and implement SendGrid email processing.

## 📋 Overview

You're moving from:
- **Current**: MongoDB + Prisma + Salesforce (removed)
- **Target**: Supabase (PostgreSQL) + PostHog Analytics + SendGrid Emails

---

## Phase 1: Set Up Supabase (Backend Database)

### Step 1.1: Create Supabase Project
**What to do:**
1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Wait for the project to initialize (takes ~2 minutes)

**What you'll get:**
- Project URL (like `https://xxxxx.supabase.co`)
- Anon key (public key for client-side)
- Service role key (secret key for server-side - keep this safe!)

**Learning goal:** Understand the difference between anon key (public) and service role key (private)

---

### Step 1.2: Design Your Database Schema
**What to do:**
1. Look at your current Prisma schema (`prisma/schema.prisma`)
2. Identify what tables you need:
   - `users` table (name, email, phone, address, etc.)
   - `bookings` table (date, time, service, event_name, guest_count, etc.)
3. Think about relationships:
   - One user can have many bookings (one-to-many)
   - How will you link them? (foreign key: `user_id` in bookings)

**Learning goal:** Understand database relationships and foreign keys

**Resources:**
- [Supabase SQL Editor docs](https://supabase.com/docs/guides/database/tables)
- [PostgreSQL foreign keys](https://www.postgresql.org/docs/current/tutorial-fk.html)

---

### Step 1.3: Write SQL Migration
**What to do:**
1. In Supabase dashboard, go to SQL Editor
2. Write SQL to create your tables:

```sql
-- Example structure (you write the full version!)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  -- Add other fields from your Prisma schema
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  -- Add other fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. Add indexes for performance (on fields you'll query often)
4. Run the SQL in Supabase SQL Editor

**Learning goal:** Learn SQL basics - CREATE TABLE, PRIMARY KEY, FOREIGN KEY, INDEXES

**Questions to research:**
- What's the difference between UUID and auto-incrementing integers?
- Why use `ON DELETE CASCADE`?
- What are indexes and when do you need them?

---

### Step 1.4: Update Prisma Schema
**What to do:**
1. Open `prisma/schema.prisma`
2. Change `provider = "mongodb"` to `provider = "postgresql"`
3. Update your models to match PostgreSQL syntax:
   - Change `@default(auto())` to `@default(uuid())` for IDs
   - Remove `@db.ObjectId` (that's MongoDB-specific)
   - Update field types to match PostgreSQL
4. Run `npx prisma generate` to regenerate Prisma client

**Learning goal:** Understand how Prisma works with different databases

**Resources:**
- [Prisma PostgreSQL guide](https://www.prisma.io/docs/concepts/database-connectors/postgresql)

---

### Step 1.5: Get Database Connection String
**What to do:**
1. In Supabase dashboard: Settings → Database
2. Find "Connection string" section
3. Copy the URI format connection string
4. Replace `[YOUR-PASSWORD]` with your database password
5. Add this to your `.env.local` as `DATABASE_URL`

**Learning goal:** Understand connection strings and environment variables

---

## Phase 2: Install and Configure Supabase Client

### Step 2.1: Install Supabase Package
**What to do:**
```bash
npm install @supabase/supabase-js
```

**Learning goal:** Understand npm package installation

---

### Step 2.2: Create Supabase Client Utility
**What to do:**
1. Create `lib/supabase.ts` (or similar location)
2. Import `createClient` from `@supabase/supabase-js`
3. Create two clients:
   - **Admin client**: Uses service role key (for API routes - full access)
   - **Public client**: Uses anon key (for client-side - respects RLS)

**Code structure to research:**
```typescript
// You'll need to figure out:
// - How to get environment variables in Next.js
// - How to create a Supabase client
// - What options to pass to createClient
```

**Learning goal:** 
- Understand the difference between server-side and client-side code
- Learn about environment variables in Next.js
- Understand Row Level Security (RLS) in Supabase

**Resources:**
- [Supabase JS client docs](https://supabase.com/docs/reference/javascript/introduction)
- [Next.js environment variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

---

### Step 2.3: Set Up Row Level Security (RLS)
**What to do:**
1. In Supabase dashboard, go to Authentication → Policies
2. Enable RLS on your tables
3. Create policies:
   - Service role can do everything (for your API routes)
   - Users can read their own data (if you add auth later)

**Learning goal:** Understand database security and access control

**Resources:**
- [Supabase RLS guide](https://supabase.com/docs/guides/auth/row-level-security)

---

## Phase 3: Migrate API Routes to Supabase

### Step 3.1: Create New `/api/events` Route
**What to do:**
1. Create `app/api/events/route.ts`
2. Implement GET handler:
   - Use Supabase client to fetch bookings
   - Join with users table to get user details
   - Return JSON response

3. Implement POST handler:
   - Parse request body
   - Check for duplicate bookings (same date/time)
   - Get or create user
   - Create booking record
   - Return success response

**Learning goal:**
- Learn Supabase query syntax
- Understand async/await
- Learn how to handle errors in API routes

**Key concepts to research:**
- `.from('table_name').select()` - querying
- `.insert()` - creating records
- `.update()` - updating records
- `.eq()` - filtering (equals)
- Joins with `.select('*, users(*)')`

**Resources:**
- [Supabase JavaScript query docs](https://supabase.com/docs/reference/javascript/select)
- [Next.js API routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

### Step 3.2: Update Other API Routes
**What to do:**
1. Update `app/api/get-booked-dates/route.ts`:
   - Replace Prisma queries with Supabase queries
   - Keep the same response format

2. Update `app/api/waiver/route.tsx`:
   - Replace Prisma with Supabase
   - Update user with waiver info
   - Fetch booking with user details

**Learning goal:** Practice migrating database queries

---

## Phase 4: Add PostHog Analytics

### Step 4.1: Install PostHog
**What to do:**
```bash
npm install posthog-js posthog-node
```

**Learning goal:** Understand client-side vs server-side packages

---

### Step 4.2: Create PostHog Server Utility
**What to do:**
1. Create `lib/posthog.ts`
2. Initialize PostHog client (server-side)
3. Create helper function to track events

**Learning goal:** 
- Understand singleton pattern (only create one PostHog instance)
- Learn about server-side analytics

**Resources:**
- [PostHog Node.js docs](https://posthog.com/docs/libraries/node)

---

### Step 4.3: Create PostHog Client Provider
**What to do:**
1. Create `components/PostHogProvider.tsx` (client component)
2. Initialize PostHog on mount
3. Track pageviews when route changes
4. Wrap your app with this provider

**Learning goal:**
- Understand React client components ('use client')
- Learn about useEffect and lifecycle
- Understand Next.js navigation hooks

**Resources:**
- [PostHog React docs](https://posthog.com/docs/libraries/react)
- [Next.js usePathname hook](https://nextjs.org/docs/app/api-reference/functions/use-pathname)

---

### Step 4.4: Add Analytics Events
**What to do:**
1. In your booking form, track when user submits
2. In API routes, track when bookings are created
3. Track email sends (success/failure)

**Learning goal:** Understand event tracking and analytics

---

## Phase 5: Implement Email Queue with SendGrid

### Step 5.1: Set Up SendGrid
**What to do:**
1. Create SendGrid account
2. Verify your sender email
3. Create API key
4. Add to environment variables

**Learning goal:** Understand email service providers

---

### Step 5.2: Create Email Queue Module
**What to do:**
1. Create `lib/email-queue.ts`
2. Initialize SendGrid client
3. Create function to send booking emails:
   - Customer confirmation email
   - Bartender notification email
4. Handle errors gracefully

**Learning goal:**
- Learn SendGrid API
- Understand async email sending
- Learn about error handling

**Resources:**
- [SendGrid Node.js docs](https://docs.sendgrid.com/for-developers/sending-email/v3-nodejs-code-example)

---

### Step 5.3: Integrate Email Queue
**What to do:**
1. In your `/api/events` POST route, after creating booking:
   - Call email queue function
   - Don't wait for it to complete (fire and forget)
   - Use `.catch()` to log errors without failing the request

**Learning goal:** Understand async operations and error handling

---

## Phase 6: Update Frontend

### Step 6.1: Update Booking Form
**What to do:**
1. Check that your form calls `/api/events`
2. Update response handling if needed
3. Test the full flow

**Learning goal:** Practice API integration

---

## Phase 7: Testing & Debugging

### Step 7.1: Test Each Component
**What to do:**
1. Test database operations in Supabase dashboard
2. Test API routes with Postman or curl
3. Test frontend form submission
4. Check email delivery
5. Verify analytics events in PostHog

**Learning goal:** Learn systematic testing approach

---

## Phase 8: Environment Variables

### Step 8.1: Document All Environment Variables
**What to do:**
1. Update `env-template.txt` with all required variables:
   - Supabase URLs and keys
   - PostHog keys
   - SendGrid API key
   - Database connection string

**Learning goal:** Understand configuration management

---

## 🎯 Key Learning Goals Summary

By the end, you should understand:

1. **Database Migration:**
   - SQL basics (CREATE TABLE, FOREIGN KEY, INDEXES)
   - PostgreSQL vs MongoDB differences
   - How Prisma works with different databases

2. **Supabase:**
   - How to query data (select, insert, update)
   - Row Level Security (RLS)
   - Client vs server-side usage

3. **Next.js API Routes:**
   - How to handle GET/POST requests
   - Error handling
   - Response formatting

4. **Analytics:**
   - Client-side vs server-side tracking
   - Event tracking patterns

5. **Email Services:**
   - Async email processing
   - Error handling for external services

6. **Environment Variables:**
   - Security best practices
   - Configuration management

---

## 🚨 Common Pitfalls to Watch For

1. **Don't expose service role key** in client-side code
2. **Don't forget RLS policies** - your queries might fail
3. **Handle errors** - external services can fail
4. **Test async operations** - emails might take time
5. **Check data types** - PostgreSQL is stricter than MongoDB

---

## 📚 Resources to Bookmark

- [Supabase Docs](https://supabase.com/docs)
- [PostHog Docs](https://posthog.com/docs)
- [SendGrid Docs](https://docs.sendgrid.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)

---

## 💡 Tips for Learning

1. **Read error messages carefully** - they usually tell you what's wrong
2. **Use console.log** - see what data you're working with
3. **Check Supabase dashboard** - see your data visually
4. **Start small** - get one thing working before moving to the next
5. **Ask questions** - research each concept you don't understand

Good luck! You've got this! 🚀

