import { BookingTemplate } from '../../emails/BookingTemplate';
import { Resend } from 'resend';

interface BookingData {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    venueType: string;
    eventDate: string;  // Note: from DB it's eventDate, not eventdate
    startTime: string;
    endTime: string;
    venueName: string;
    city: string;
    address: string;
    guestCount: number;
    serviceType: string;
    barOption: string;
    message: string;
    source: string;
    confirmWaiver?: boolean;
    electronicSignature?: string;
  }

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmation(bookingData: BookingData) {

    const {
        clientName,
        clientEmail,
        clientPhone,
        venueType,
        eventDate,
        startTime,
        endTime,
        venueName,
        city,
        address,
        guestCount,
        serviceType,
        barOption,
        message,
        source,
        confirmWaiver,
        electronicSignature,
      } = bookingData;

  try {
    const response = await resend.emails.send({
      from: 'VidaBebidasProject <onboarding@resend.dev>',
      to: ['vidabebidasproject@outlook.com'],
      subject: 'Booking Details',
      react: BookingTemplate({     clientName,
        clientEmail,
        clientPhone,
        venueType,
        eventdate: eventDate,  // Note: template uses lowercase 'eventdate'
        startTime,
        endTime,
        venueName,
        city,
        address,
        guestCount,
        serviceType,
        barOption,
        message,
        source,
        confirmWaiver,
        electronicSignature, }),
    });

    console.log('Email sent:', response);
    return Response.json(response);
  } catch (error) {
    console.error('Email error:', error);
    return Response.json({ error }, { status: 500 });
  }
}