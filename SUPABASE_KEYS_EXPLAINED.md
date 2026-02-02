# Supabase Keys: Anon vs Service Role - Why It Matters

## 🎯 The Core Concept

**The anon key is MEANT to be exposed** - it's public by design.
**The service role key MUST NEVER be exposed** - it's a secret.

---

## 🔑 The Two Keys

### Anon Key (Public - Safe to Expose)
```typescript
// ✅ This is SAFE to use in client-side code
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**Characteristics:**
- ✅ Safe to bundle in client-side code
- ✅ Respects Row Level Security (RLS)
- ✅ Users can only access what RLS allows
- ✅ If someone steals it, they still can't bypass RLS

**Where to use:**
- Client components (`'use client'`)
- Browser JavaScript
- Public API calls

### Service Role Key (Secret - Never Expose)
```typescript
// ❌ NEVER use this in client-side code!
SUPABASE_SERVICE_ROLE_KEY
```

**Characteristics:**
- ❌ **NEVER** bundle in client-side code
- ❌ Bypasses all RLS policies
- ❌ Full database access
- ❌ If exposed, attackers get full database access

**Where to use:**
- Server-side only (API routes, Server Components)
- Background jobs
- Admin operations

---

## 🚨 What Happens If You Use Service Role Key in Client?

### ❌ BAD - Service Role Key in Client Component

```typescript
'use client'; // ❌ This runs in the browser!

import { createClient } from '@supabase/supabase-js';

// ❌ DANGER! This key gets bundled and sent to browser
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ❌ EXPOSED!
);
```

**What happens:**
1. Next.js bundles this code
2. The service role key is included in the JavaScript bundle
3. User downloads the bundle (key is now in their browser)
4. Anyone can inspect the code and steal the key
5. Attacker can now access your entire database! 💥

**Result:** Your database is compromised.

---

## ✅ GOOD - Anon Key in Client Component

```typescript
'use client'; // ✅ This runs in the browser

import { createClient } from '@supabase/supabase-js';

// ✅ SAFE! Anon key is meant to be public
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // ✅ Safe to expose
);
```

**What happens:**
1. Next.js bundles this code
2. The anon key is included (this is OK!)
3. User downloads the bundle
4. Even if someone steals the key, RLS still protects your data
5. They can only access what RLS allows

**Result:** Your database is safe! ✅

---

## 📋 Proper Setup

### Client-Side Supabase Client

```typescript
// app/lib/supabase-client.ts
'use client';
import { createClient } from '@supabase/supabase-js';

// ✅ Use anon key - safe to expose
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

**Use in:**
- Client components
- Browser-side code
- User-facing operations

### Server-Side Supabase Client

```typescript
// app/lib/supabase-server.ts
// ✅ NO 'use client' - this is server-side
import { createClient } from '@supabase/supabase-js';

// ✅ Use service role key - stays on server
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ✅ Secret, never exposed
);
```

**Use in:**
- API routes (`app/api/*/route.ts`)
- Server Components
- Server Actions

---

## 🔍 How Next.js Environment Variables Work

### `NEXT_PUBLIC_*` Variables
```typescript
// .env.local
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc... // ✅ Gets bundled into client
```

- ✅ Included in client-side bundle
- ✅ Visible in browser DevTools
- ✅ Safe for public keys (anon key)

### Regular Variables (No `NEXT_PUBLIC_`)
```typescript
// .env.local
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... // ✅ Stays on server only
```

- ✅ Only available on server
- ✅ Never included in client bundle
- ✅ Must use for secrets

---

## 🎯 The Answer to Your Question

> "So to not expose any server side components to the client side, is that why I should use the client side key vs the private?"

**Yes, but with a clarification:**

1. **Use anon key in client** because:
   - It's safe to expose (public by design)
   - It respects RLS (security built-in)
   - It won't compromise your database if stolen

2. **Use service role key on server** because:
   - It's a secret (must stay hidden)
   - It bypasses RLS (needed for admin operations)
   - It would be dangerous if exposed

**The key point:** The anon key is MEANT to be in client code. The service role key MUST NEVER be in client code.

---

## 📊 Quick Reference

| Key Type | Where to Use | Exposed to Client? | RLS Enforced? |
|----------|-------------|-------------------|---------------|
| **Anon Key** | Client components | ✅ Yes (safe!) | ✅ Yes |
| **Service Role** | Server only | ❌ Never! | ❌ No (bypasses) |

---

## ✅ Your Current Setup

Looking at your code:
- `app/lib/supabase.ts` - Uses anon key ✅ (but should be client-side)
- `app/api/supabase.ts` - Uses anon key ⚠️ (should use service role for admin ops)

**Recommendation:**
- Keep anon key for client-side operations
- Use service role key in API routes when you need to bypass RLS

---

## 🎓 Summary

**The anon key is your friend in client code** - it's designed to be public and safe.

**The service role key is your secret weapon on the server** - never let it leave the server!

The difference isn't about "not exposing server components" - it's about using the right key in the right place for security! 🔒

