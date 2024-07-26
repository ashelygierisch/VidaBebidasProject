import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

import fs from 'fs';
import path from 'path';
const prisma = new PrismaClient();

export async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { fullName, email, isChecked, bookingId } = req.body;

    if (!isChecked) {
      res.status(400).json({ error: 'Waiver not accepted' });
      return;
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
        res.status(404).json({ error: 'Booking not found' });
        return;
      }

      const templatePath = path.join(process.cwd(), 'emailTemplate.html');
      let template = fs.readFileSync(templatePath, 'utf-8');

      template = template.replace(
        '{{userName}}',
        user.name ?? 'Valued Customer'
      );
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
        '{{userEmail}}',
        user.email ?? 'Customer Email'
      );
      template = template.replace(
        '{{userAddress}}',
        user.phone ?? 'Customer Phone'
      );
      template = template.replace(
        '{{bookingService}}',
        booking.service ?? 'Customer Chosen Service'
      );

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: `${user.email}, ${process.env.EMAIL_USERNAME}`, // Send to both user and client
        subject: 'Booking and Waiver Confirmation',
        html: template,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Waiver accepted and email sent', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
