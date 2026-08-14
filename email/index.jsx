import { Resend } from 'resend';
import { APP_NAME } from '@/lib/constants';
import { formatId } from '@/lib/utils';
import dotenv from 'dotenv';
dotenv.config();

import BookingRequestConfirmation from './BookingRequest';
import BookingConfirmation from './BookingConfirmation';

const senderEmail = process.env.SENDER_EMAIL;
const resend = new Resend(process.env.RESEND_API_KEY);
const bccEmail = process.env.BCC_EMAILS;

export const sendBookingRequestConfirmation = async ({ booking }) => {
  await resend.emails.send({
    from: `${APP_NAME} <${senderEmail}>`,
    to: booking.user_email,
    bcc: bccEmail,
    replyTo: bccEmail,
    subject: `Booking Request Confirmation ${formatId(booking.$id)}`,
    react: <BookingRequestConfirmation booking={booking} />,
  });
};

export const sendBookingConfirmation = async ({ booking }) => {
  await resend.emails.send({
    from: `${APP_NAME} <${senderEmail}>`,
    to: booking.user_email,
    bcc: bccEmail,
    replyTo: bccEmail,
    subject: `Booking Confirmation ${formatId(booking.$id)}`,
    react: <BookingConfirmation booking={booking} />,
  });
};
