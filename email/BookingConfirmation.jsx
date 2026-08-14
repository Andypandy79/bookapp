import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from 'react-email';
import { formatDate, formatPrice, formatId } from '@/lib/utils';

require('dotenv').config();

// BookingRequestConfirmation.PreviewProps = {
//   booking: {
//     apartment_name: 'Apartament',
//     city: 'Los Cristianos',
//     $id: '6a5912220038555def06',
//     $createdAt: '12.06.26',
//     total_price: 600,
//     check_in: '10.06.26',
//     check_out: '12.06.26',
//     total_nights: '6',
//     user_name: 'Andy',
//     adults: 2,
//     childer: 1,
//     total_price: '600',
//     total_guests: '4',
//     confirmed: false,
//     comment:
//       'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
//   },
// };

export default function BookingConfirmation({ booking }) {
  const { apartment_id: apartment } = booking;
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_APARTMENTS_STORAGE_BUCKET;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
  const bccEmail = process.env.BCC_EMAIL;
  const imageUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${apartment.image}/view?project=${projectId}`;

  const imageSrc = apartment.image ? imageUrl : '/images/no-image.jpg';
  return (
    <Html>
      <Preview>View booking request</Preview>
      <Tailwind>
        <Head />
        <Body className='font-sans bg-white'>
          <Container className='max-w-lg'>
            <Heading className='text-center text-blue-700'>
              Booking Confirmation
            </Heading>
            <Text className='text-center'>
              This is your booking confirmation.
            </Text>
            <Img
              alt={booking.apartment_name}
              className='mx-auto'
              width={350}
              height={200}
              src={imageSrc}
            />
            <Section>
              <Row>
                <Column align='center' className='w-1/2'>
                  <Text className='mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap'>
                    Booking ID
                  </Text>
                  <Text className='mt-0 mr-4'>{formatId(booking.$id)}</Text>
                </Column>
                <Column align='center' className='w-1/2'>
                  <Text className='mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap'>
                    Booking Date
                  </Text>
                  <Text className='mt-0 mr-4'>
                    {formatDate(booking.$createdAt)}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column align='center' className='w-1/2'>
                  <Text className='text-gray-500 leading-1'>Status:</Text>
                </Column>
                <Column align='center' className='w-1/2'>
                  {booking.confirmed ? (
                    <Text className='inline-block rounded-md bg-[#f0fdf4] px-2 py-1 text-sm font-medium text-[#15803d] border border-solid border-[#166534]/20'>
                      Confirmed
                    </Text>
                  ) : (
                    <Text className='inline-block rounded-md bg-[#fef2f2] px-2 py-1 my-2 text-sm font-medium text-[#b91c1c] border border-solid border-[#991b1b]/10'>
                      Pending
                    </Text>
                  )}
                </Column>
              </Row>
            </Section>
            <Section className='border border-solid border-gray-500 rounded-lg pb-4'>
              <Row>
                <Column align='center' className='w-1/2'>
                  <Text className='text-gray-500 leading-1'>Name:</Text>
                </Column>
                <Column align='center' className='w-1/2'>
                  <Text className='leading-1'>{booking.apartment_name}</Text>
                </Column>
              </Row>
              <Row>
                <Column align='center' className='w-1/2'>
                  <Text className='text-gray-500 leading-1'>City:</Text>
                </Column>
                <Column align='center' className='w-1/2'>
                  <Text className='leading-1'>{apartment.city}</Text>
                </Column>
              </Row>
              <Row>
                <Column align='center' className='w-1/2'>
                  <Text className='text-gray-500 leading-1'>Guest Name:</Text>
                </Column>
                <Column align='center' className='w-1/2'>
                  <Text className='leading-1'>{booking.user_name}</Text>
                </Column>
              </Row>
              <Row>
                <Column align='center' className='w-1/2'>
                  <Text className='text-gray-500 leading-1'>Guests:</Text>
                </Column>
                <Column align='center' className='w-1/2'>
                  <Text className='leading-1'>{booking.total_guests}</Text>
                </Column>
              </Row>
              <Row>
                <Column align='center' className='w-1/2'>
                  <Text className='text-gray-500 leading-1'>Nights:</Text>
                </Column>
                <Column align='center' className='w-1/2'>
                  <Text className='leading-1'>{booking.total_nights}</Text>
                </Column>
              </Row>
              <Row>
                <Column align='center' className='w-1/2'>
                  <Text className='text-gray-500 h-1'>Check In:</Text>
                </Column>
                <Column align='center' className='w-1/2'>
                  <Text className='h-1'>{formatDate(booking.check_in)}</Text>
                </Column>
              </Row>
              <Row>
                <Column align='center' className='w-1/2'>
                  <Text className='text-gray-500 h-1'>Check Out:</Text>
                </Column>
                <Column align='center' className='w-1/2'>
                  <Text className='h-1'>{formatDate(booking.check_out)}</Text>
                </Column>
              </Row>
              <Row>
                <Column align='center' className='w-1/2'>
                  <Text className='text-gray-500 h-1'>Check Out:</Text>
                </Column>
                <Column align='center' className='w-1/2'>
                  <Text className='h-1'>{formatDate(booking.check_out)}</Text>
                </Column>
              </Row>
              <Row>
                <Column align='center' className='w-1/2'>
                  <Text className='text-gray-500 h-1'>Total Price:</Text>
                </Column>
                <Column align='center' className='w-1/2'>
                  <Text className='h-1'>
                    {formatPrice(booking.total_price)}
                  </Text>
                </Column>
              </Row>
            </Section>

            {booking.comment && (
              <Section className='bg-slate-50/50 py-8 px-8 mt-4 text-center'>
                <Text className='text-sm leading-6 text-slate-500'>
                  Comment:
                </Text>
                <Text className='text-sm leading-6 text-slate-500'>
                  {booking.comment}.
                </Text>
              </Section>
            )}
            <Section className='px-8 py-8 text-center'>
              <Text className='text-sm leading-6 text-slate-500'>
                If you have any questions, contact us.
              </Text>
              <Text className='mt-2 text-xs text-slate-400'>
                © 2026 BookApp. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
