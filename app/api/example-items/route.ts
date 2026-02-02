// ✅ This is a SERVER-SIDE API route
// No 'use client' directive - it runs on the server
import { NextResponse } from 'next/server';

// This creates an endpoint at: /api/example-items
export async function GET() {
  // Simulate some data (in real app, you'd fetch from database)
  const items = [
    { id: 1, name: 'Tequila Tasting', description: 'Learn about different tequilas' },
    { id: 2, name: 'Mixology Class', description: 'Create amazing cocktails' },
    { id: 3, name: 'Private Event', description: 'Customized experience for your group' },
  ];

  // Return JSON response
  return NextResponse.json(items, { status: 200 });
}

// Example POST endpoint
export async function POST(request: Request) {
  try {
    // Get data from the request body
    const body = await request.json();
    const { name, description } = body;

    // In a real app, you'd save to database here:
    // const item = await prisma.item.create({ data: { name, description } });

    // For this example, just return what was sent
    return NextResponse.json(
      { 
        success: true, 
        message: 'Item created!',
        item: { id: Date.now(), name, description }
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    );
  }
}

