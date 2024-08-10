import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { date, time, name, address, email, phone, service, message } =
      await request.json();

    const existingBooking = await prisma.booking.findFirst({
      where: {
        date,
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        {
          error:
            'The selected date is already booked. We apologize for any inconvenience. Please choose another slot or contact us for assistance.',
        },
        { status: 409 }
      );
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          phone,
          address,
        },
      });
    }

    const newBooking = await prisma.booking.create({
      data: {
        date,
        time,
        service,
        message,
        userId: user.id,
      },
    });
    console.log('New booking created:', newBooking);
    console.log('Booking ID:', newBooking.id);

    return NextResponse.json({
      bookingId: newBooking.id,
      userId: user.id,
      message: 'Booking created successfully',
    });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
