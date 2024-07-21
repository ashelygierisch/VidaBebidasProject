import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

export async function GET() {
  try {
    const today = dayjs().format('YYYY-MM-DD');
    const bookings = await prisma.booking.findMany({
      where: {
        date: {
          gt: today,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Return the fetched bookings as JSON
    return NextResponse.json(bookings, {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching booked dates:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
