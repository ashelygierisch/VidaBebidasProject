import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

import fs from 'fs';
import path from 'path';
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { fullName, email, isChecked, bookingId } = body;

  if (!isChecked) {
    return NextResponse.json({ error: 'Waiver not accepted' }, { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        electronicSignature: fullName,
        confirmWaiver: isChecked,
      },
    });

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { user: true },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const templatePath = path.join(
      process.cwd(),
      'mailtemplate',
      'new-email.html'
    );
    let template = fs.readFileSync(templatePath, 'utf-8');

    template = template.replace('{{userName}}', user.name ?? 'Valued Customer');
    template = template.replace(
      '{{bookingDate}}',
      booking.date ?? 'Booking Date'
    );
    template = template.replace(
      '{{bookingTime}}',
      booking.time ?? 'Booking Time'
    );
    template = template.replace(
      '{{userAddress}}',
      user.address ?? 'No address provided'
    );
    template = template.replace(
      '{{userMessage}}',
      booking.message ?? 'No Questions Submitted'
    );
    template = template.replace(
      '{{userEmail}}',
      user.email ?? 'Customer Email'
    );
    template = template.replace(
      '{{userPhone}}',
      user.phone ?? 'Customer Phone'
    );
    template = template.replace(
      '{{bookingService}}',
      booking.service ?? 'Customer Chosen Service'
    );

    const transporter = nodemailer.createTransport({
      service: 'Outlook',
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      logger: true,
      debug: true,
    });

    const usersEmail = user.email;

    console.log(usersEmail);

    const mailOptions = {
      from: `"VidaBebidasProject" <${process.env.EMAIL_USERNAME}>`,
      to: [`${user.email}`, `${process.env.EMAIL_USERNAME}`],
      subject: 'Booking and Waiver Confirmation',
      html: template,
    };

    console.log('Sending email to:', mailOptions.to);

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
    return NextResponse.json(
      { message: 'Waiver accepted and email sent', user },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
