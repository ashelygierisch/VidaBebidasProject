# Server vs Client Side: Creating APIs and Using Them

## 🎯 The Big Picture

Think of it like a restaurant:
- **Server (Kitchen)**: Where the work happens - database access, secret keys, processing
- **Client (Dining Room)**: Where users interact - buttons, forms, displays
- **API Route (Waiter)**: The bridge between them - takes orders from client, brings back food from server

---

## 📍 Where Code Runs

### Server-Side Code
- Runs on **your server** (Node.js environment)
- Has access to:
  - Database (Prisma, Supabase)
  - Environment variables (secrets, API keys)
  - File system
  - Server-only libraries
- **Cannot** use browser APIs (window, document, localStorage)
- **Cannot** use React hooks like `useState`, `useEffect` (unless in Server Components)

### Client-Side Code
- Runs in the **user's browser**
- Has access to:
  - Browser APIs (window, document, localStorage)
  - React hooks (`useState`, `useEffect`, etc.)
  - User interactions (clicks, form inputs)
- **Cannot** directly access:
  - Database
  - Server secrets
  - File system

---

## 🔧 Step 1: Creating an API Route (Server-Side)

In Next.js, API routes are created in the `app/api/` folder. Each folder becomes an endpoint.

### Your Example: `/api/get-booked-dates/route.ts`

```typescript
// ✅ This runs on the SERVER
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'; // ✅ Can use Prisma here!
import dayjs from 'dayjs';

const prisma = new PrismaClient();

// This function handles GET requests to /api/get-booked-dates
export async function GET() {
  try {
    // ✅ Can access database directly
    const bookings = await prisma.booking.findMany({
      where: {
        date: { gt: dayjs().format('YYYY-MM-DD') },
      },
    });

    // ✅ Return JSON response
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**Key Points:**
- ✅ No `'use client'` directive (defaults to server)
- ✅ Can use Prisma, database, secrets
- ✅ Must export named functions: `GET`, `POST`, `PUT`, `DELETE`
- ✅ Returns `NextResponse.json()` with data

### Creating a POST API Route

```typescript
// app/api/bookings/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Get data from the request body
    const body = await request.json();
    const { name, email, date } = body;

    // ✅ Can use Prisma to save to database
    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        date: new Date(date),
      },
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
```

---

## 🎨 Step 2: Using the API in a Client Component

Client components need the `'use client'` directive and can use React hooks.

### Your Example: `bookedDates.tsx`

```typescript
'use client'; // ✅ This marks it as a CLIENT component
import React, { useEffect, useState } from 'react';

const BookedDates = () => {
  // ✅ Can use React hooks (useState, useEffect)
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ This function runs in the browser
    const fetchBookedDates = async () => {
      try {
        // ✅ Call your API route (like calling a URL)
        const response = await fetch('/api/get-booked-dates', {
          cache: 'no-store', // Don't cache the response
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        // ✅ Get the JSON data from the response
        const data = await response.json();
        
        // ✅ Update state (triggers re-render)
        setBookedDates(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedDates();
  }, []); // Run once when component mounts

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {bookedDates.map((booking) => (
        <div key={booking.id}>
          {booking.date}
        </div>
      ))}
    </div>
  );
};
```

**Key Points:**
- ✅ Must have `'use client'` at the top
- ✅ Can use `useState`, `useEffect`, and other hooks
- ✅ Uses `fetch()` to call your API route
- ✅ API route URL: `/api/get-booked-dates` (matches folder structure)
- ✅ Updates component state with the response

---

## 🔄 The Complete Flow

```
┌─────────────────────────────────────────────────────────────┐
│  USER'S BROWSER (Client-Side)                                │
│                                                               │
│  1. User visits page                                         │
│  2. Client component renders                                 │
│  3. useEffect runs → calls fetch('/api/get-booked-dates')   │
│                                                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP Request
                       │ (GET /api/get-booked-dates)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  YOUR SERVER (Server-Side)                                   │
│                                                               │
│  4. API route receives request                               │
│  5. route.ts runs on server                                  │
│  6. Prisma queries database                                  │
│  7. Returns JSON response                                    │
│                                                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP Response
                       │ (JSON data)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  USER'S BROWSER (Client-Side)                                │
│                                                               │
│  8. fetch() receives response                                │
│  9. response.json() parses data                              │
│  10. setBookedDates(data) updates state                      │
│  11. Component re-renders with new data                      │
│  12. User sees the booked dates!                             │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 Common Patterns

### Pattern 1: GET Request (Fetching Data)

**Server API:**
```typescript
// app/api/users/route.ts
export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
```

**Client Component:**
```typescript
'use client';
const [users, setUsers] = useState([]);

useEffect(() => {
  fetch('/api/users')
    .then(res => res.json())
    .then(data => setUsers(data));
}, []);
```

### Pattern 2: POST Request (Creating Data)

**Server API:**
```typescript
// app/api/users/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  const user = await prisma.user.create({ data: body });
  return NextResponse.json(user);
}
```

**Client Component:**
```typescript
'use client';
const handleSubmit = async () => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'John', email: 'john@example.com' }),
  });
  const data = await response.json();
  console.log('Created:', data);
};
```

### Pattern 3: Using the `use` Hook (React 19+)

```typescript
'use client';
import { use } from 'react';

export default function BookingsList() {
  // ✅ Fetch and unwrap in one step
  const bookings = use(
    fetch('/api/get-booked-dates').then(res => res.json())
  );

  return (
    <div>
      {bookings.map(booking => (
        <div key={booking.id}>{booking.date}</div>
      ))}
    </div>
  );
}
```

---

## ⚠️ Common Mistakes

### ❌ DON'T: Use Prisma in Client Components
```typescript
'use client';
import { PrismaClient } from '@prisma/client'; // ❌ ERROR!

const prisma = new PrismaClient(); // ❌ Won't work!
```

### ✅ DO: Use Prisma in API Routes
```typescript
// app/api/bookings/route.ts (no 'use client')
import { PrismaClient } from '@prisma/client'; // ✅ Works!
```

### ❌ DON'T: Call Database Directly from Client
```typescript
'use client';
const data = await prisma.user.findMany(); // ❌ ERROR!
```

### ✅ DO: Call API Route from Client
```typescript
'use client';
const response = await fetch('/api/users'); // ✅ Works!
const data = await response.json();
```

---

## 🎓 Practice Exercise

Try creating a simple example:

1. **Create an API route** that returns a list of items:
   ```typescript
   // app/api/items/route.ts
   export async function GET() {
     return NextResponse.json([
       { id: 1, name: 'Item 1' },
       { id: 2, name: 'Item 2' },
     ]);
   }
   ```

2. **Create a client component** that fetches and displays them:
   ```typescript
   // app/components/ItemsList.tsx
   'use client';
   import { useEffect, useState } from 'react';
   
   export default function ItemsList() {
     const [items, setItems] = useState([]);
     
     useEffect(() => {
       fetch('/api/items')
         .then(res => res.json())
         .then(data => setItems(data));
     }, []);
     
     return (
       <ul>
         {items.map(item => (
           <li key={item.id}>{item.name}</li>
         ))}
       </ul>
     );
   }
   ```

3. **Test it** by visiting a page that uses `<ItemsList />`

---

## 📚 Summary

| Aspect | Server (API Routes) | Client (Components) |
|--------|-------------------|-------------------|
| **Location** | `app/api/*/route.ts` | `app/**/*.tsx` with `'use client'` |
| **Can Use** | Prisma, Database, Secrets | React Hooks, Browser APIs |
| **Cannot Use** | React Hooks (mostly) | Database, Secrets |
| **Purpose** | Handle requests, access data | Display UI, handle interactions |
| **Communication** | Returns JSON responses | Sends HTTP requests via `fetch()` |

**Remember:** Server handles data, Client handles UI. APIs connect them! 🚀

