import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { FormData } from '../../types/form-types';
import { availableLocales } from '../../locales/translate';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { email, name, phoneMobile, message, language }: FormData =
        req.body;

      const { replySubject, replyText } = availableLocales[language].contact;

      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NEXT_PUBLIC_MY_EMAIL,
          pass: process.env.NEXT_PUBLIC_MY_PASSWORD,
        },
      });

      const mailOptions: Mail.Options = {
        from: email,
        to: process.env.NEXT_PUBLIC_MY_EMAIL,
        subject: 'Inquiry',
        text: `
        First and last name: ${name}
        Phone/Mobile: ${phoneMobile}
        Email: ${email}
        Message: ${message}`,
      };

      // Send confirmation email to the user
      const userConfirmationOptions: Mail.Options = {
        from: process.env.NEXT_PUBLIC_MY_EMAIL,
        to: email,
        subject: replySubject,
        text: replyText,
      };

      await transport.sendMail(mailOptions);
      await transport.sendMail(userConfirmationOptions);

      res.status(200).json({
        status: 'success',
        message: 'Email sent successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  } else {
    res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
  }
}
