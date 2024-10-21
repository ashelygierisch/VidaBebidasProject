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
interface BookingTemplateProps {
  date: string;
  time: string;
  address: string;
  message: string;
  email: string;
  phone: string;
  name: string;
  service: string;
}

export const BookingTemplate = ({
  date,
  time,
  address,
  name,
  message,
  email,
  phone,
  service,
}: BookingTemplateProps) => {
  const formattedDate = dayjs(date).format('MMMM D, YYYY');

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
                    'https://mikessite.s3.us-east-2.amazonaws.com/logo-white.png'
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
                    Hi {name},
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
                    been received, and I will reach out to you at my earliest
                    convenience to confirm the details below.
                  </Heading>
                </Column>
              </Row>

              <Row className="p-5 ">
                <Column>
                  <Text style={paragraph}>
                    <b>Your appointment is confirmed with us for: </b>
                    {formattedDate} at {time}.
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -7 }}>
                    <b>Choice of Service: </b>
                    {service}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -7 }}>
                    <b>Address Provided: </b>
                    {address}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Questions/Comments: </b>
                    {message}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Email: </b>
                    {email}
                  </Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Phone Number </b>
                    {phone}
                  </Text>
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
  date: 'October 24 2024',
  time: '4:00 PM',
  address: '504 South Storey st',
  message: 'Testing',
  email: 'oscarleal234@gmail.com',
  phone: '469-777-0341',
  name: 'Oscar',
  service: 'Reposado Package',
} as BookingTemplateProps;

export default BookingTemplate;

const main = {
  backgroundColor: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
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
