// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// import { Resend } from 'resend';
// import BookingTemplate from '@/emails/BookingTemplate';
// const prisma = new PrismaClient();

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { fullName, email, isChecked, bookingId } = body;

//   if (!isChecked) {
//     return NextResponse.json({ error: 'Waiver not accepted' }, { status: 400 });
//   }

//   try {
//     const user = await prisma.user.update({
//       where: {
//         email: email,
//       },
//       data: {
//         electronicSignature: fullName,
//         confirmWaiver: isChecked,
//       },
//     });

//     const booking = await prisma.booking.findUnique({
//       where: { id: bookingId },
//       include: { user: true },
//     });

//     if (!booking) {
//       return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
//     }

//     const adminEmail =
//       process.env.EMAIL_USERNAME || 'vidabebidasproject@outlook.com';

//     await resend.emails.send({
//       from: 'VidaBevidasProject@vidabevidasproject.com', //updated to new domain
//       to: [user.email, adminEmail],
//       subject: 'Booking Details',
//       react: (
//         <BookingTemplate
//           date={booking.date}
//           time={booking.time}
//           address={user.address ?? 'No address provided'}
//           name={user.name ?? 'Valued Customer'}
//           message={booking.message ?? 'No Questions Submitted'}
//           email={user.email ?? 'Customer Email'}
//           phone={user.phone ?? 'Customer Phone'}
//           service={booking.service ?? 'Customer Chosen Service'}
//         />
//       ),
//     });

//     return NextResponse.json(
//       { message: 'Waiver accepted and email sent', user },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: 'Internal server error, email not sent' },
//       { status: 500 }
//     );
//   }
// }
