import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { date, time, name, address, email, phone, service, message } =
      await request.json();

    const user = await prisma.user.create({
      data: {
        selectedDate: date,
        selectedTime: time,
        name,
        email,
        address,
        phone,
        service,
        message,
      },
    });

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    console.log('error', error);
  }
}
