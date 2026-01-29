import React from 'react';
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Tailwind,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import dayjs from 'dayjs';
interface BookingInfo {
  // Client information
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  
  // Event details
  venueType: string;
  eventdate: Date | string;  // Could be Date object or ISO string
  startTime: string;     // Format like '00:00:00'
  endTime: string;       // Format like '00:00:00'
  venueName: string;
  city: string;
  address: string;
  guestCount: string | number;  // Could be string from input or number
  
   
// Service details
serviceType: string;         // ← Changed from 'barType'
barOption: string;           // ← Added
message: string;
source: string;
isDateAlreadyBooked?: boolean;  // ← Added (optional)

// Waiver information
confirmWaiver?: boolean;
electronicSignature?: string;
}

export const BookingTemplate = ({
  clientName,
  clientEmail,
  clientPhone,
  venueType,
  eventdate,  
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
isDateAlreadyBooked,  
confirmWaiver,
electronicSignature,
}: BookingInfo) => {
  const formattedDate = dayjs(eventdate).format('MMMM D, YYYY');

  const formatedStartTime=dayjs(startTime).format('hh:mm A')
  const formatedEndTime=dayjs(endTime).format('hh:mm A')
  return (
    <Html>
      <Head />
      <Preview>VidaBebidasProject</Preview>
      <Tailwind>
        <Body style={main}>
          <Container>
            <Section style={content}>
              <Row>
                <Img
                  style={image}
                  width={620}
                  src={
                    'https://mikessite.s3.us-east-2.amazonaws.com/VB-Logo-2026.png'
                  }
                />
              </Row>
              <Row>
                <Column>
                  {' '}
                  <Heading
                    style={{
                      fontSize: 32,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    Hi {clientName},
                  </Heading>
                  <Heading
                    as="h2"
                    style={{
                      fontSize: 22,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      padding: '10px',
                    }}
                  >
                    Thank you for choosing VidaBebidasProject! Your booking has
                    been received, and I will reach out to you at my earliest convenience to confirm the details below and to
                    collect the $100 deposit to finalize your booking.
                  </Heading>
                </Column>
              </Row>

              <Row style={{ padding: '20px' }}>
                <Column>
                  {/* Event Details Section */}
                  <Text style={sectionHeader}>Event Details</Text>
                  <Text style={paragraph}>
                    <b>Event Date: </b>
                    {formattedDate}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Event Time: </b>
                    {formatedStartTime} - {formatedEndTime}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Event Type: </b>
                    {venueType}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Guest Count: </b>
                    {guestCount}
                  </Text>

                  {/* Venue Details Section */}
                  <Text style={sectionHeader}>Venue Information</Text>
                  <Text style={paragraph}>
                    <b>Event Name: </b>
                    {venueName}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Address: </b>
                    {address}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>City: </b>
                    {city}
                  </Text>

                  {/* Service Details Section */}
                  <Text style={sectionHeader}>Service Details</Text>
                  <Text style={paragraph}>
                    <b>Service Type: </b>
                    {serviceType}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Bar Space: </b>
                    {barOption}
                  </Text>

                  {/* Contact Information Section */}
                  <Text style={sectionHeader}>Your Contact Information</Text>
                  <Text style={paragraph}>
                    <b>Email: </b>
                    {clientEmail}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Phone: </b>
                    {clientPhone}
                  </Text>

                  {/* Additional Notes */}
                  {message && (
                    <>
                      <Text style={sectionHeader}>Additional Notes</Text>
                      <Text style={paragraph}>{message}</Text>
                    </>
                  )}

                  {/* Waiver Confirmation */}
                  {confirmWaiver && electronicSignature && (
                    <>
                      <Text style={sectionHeader}>Waiver Confirmation</Text>
                      <Text style={paragraph}>
                        <b>Electronic Signature: </b>
                        {electronicSignature}
                      </Text>
                    </>
                  )}

                  <Row>
                    <Img
                      style={image}
                      width={620}
                      src={
                        'https://mikessite.s3.us-east-2.amazonaws.com/signature.png'
                      }
                    />
                  </Row>
                </Column>
              </Row>
            </Section>

            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                color: 'rgb(0,0,0, 0.7)',
              }}
            >
              © 2022 | VidasBebidasProject | Partnership with Os World
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

BookingTemplate.PreviewProps = {
  clientName: 'Oscar',
  clientEmail: 'oscar@test.com',
  clientPhone: '214-XXX-XXXX',
  venueType: 'GradParty',
  eventdate: 'February 8, 2026',
  startTime: '2026-02-08T14:00:00',
  endTime: '2026-02-08T14:00:00',
  venueName: 'The Grand Ballroom',
  city: 'Dallas',
  address: '123 Main Street, Dallas, TX 75201',
  guestCount: 150,
  serviceType: 'Anejo Package',
  barOption: 'Yes-there will be a dedicated bar space',
  message: 'Looking forward to celebrating with you!',
  source: 'Website',
  isDateAlreadyBooked: false,
  confirmWaiver: true,
  electronicSignature: 'Oscar Martinez',
} as BookingInfo;

export default BookingTemplate;

const main = {
  backgroundColor: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const sectionHeader = {
  fontSize: 18,
  fontWeight: 'bold' as const,
  color: '#333',
  marginTop: 20,
  marginBottom: 10,
  borderBottom: '1px solid #eee',
  paddingBottom: 5,
};

const logo = {
  padding: '30px 20px',
};

const containerButton = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
};

const button = {
  backgroundColor: '#e00707',
  borderRadius: 3,
  color: '#FFF',
  fontWeight: 'bold',
  border: '1px solid rgb(0,0,0, 0.1)',
  cursor: 'pointer',
  padding: '12px 30px',
};

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
};

const image = {
  maxWidth: '100%',
};

const boxInfos = {
  padding: '20px',
};

const containerImageFooter = {
  padding: '45px 0 0 0',
};
