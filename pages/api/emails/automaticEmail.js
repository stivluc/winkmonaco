import { enDonationEmail, frDonationEmail, itDonationEmail } from '@/lib/emails/donationEmail';
import { enDonationFailedEmail, frDonationFailedEmail, itDonationFailedEmail } from '@/lib/emails/donationFailedEmail';
import { enKitWinkEmail, frKitWinkEmail, itKitWinkEmail } from '@/lib/emails/kitWinkEmail';
import {
  enMonthlyDonationEmail,
  frMonthlyDonationEmail,
  itMonthlyDonationEmail,
} from '@/lib/emails/monthlyDonationEmail';
import { enOrderEmail, frOrderEmail, itOrderEmail } from '@/lib/emails/orderEmail';
import { enVolunteerEmail, frVolunteerEmail, itVolunteerEmail } from '@/lib/emails/volunteerEmail';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  try {
    // Extract parameters from the query
    const { emailType, language, email } = req.query;

    // Get email content based on emailType and language
    const emailContent = await getEmailContent(emailType, language);

    // Check if email content is found
    if (!emailContent) {
      res.status(400).json({ error: 'Invalid emailType or language' });
      return;
    }

    const mailOptions = {
      from: {
        name: 'Wink Monaco',
        address: 'noreply.winkmonaco@gmail.com',
      },
      to: email,
      subject: emailContent.subject,
      html: emailContent.emailContent,
    };

    // Retry with local transporter
    const mailTransport = nodemailer.createTransport({
      port: 465,
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      secure: true,
    });

    await new Promise((resolve, reject) => {
      mailTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error while sending email:', error);
          reject(error);
        } else {
          console.log('Email sent: ' + info.response);
          resolve(info);
        }
      });
    });

    res.status(201).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
}

//* Get Email Content

// Function to get email content based on emailType and language
const getEmailContent = async (emailType, language) => {
  switch (emailType) {
    case 'donationEmail':
      return getDonationEmailContent(language);
    case 'donationFailedEmail':
      return getDonationFailedEmailContent(language);
    case 'kitWinkEmail':
      return getKitWinkEmailContent(language);
    case 'monthlyDonationEmail':
      return getMonthlyDonationEmailContent(language);
    case 'orderEmail':
      return getOrderEmailContent(language);
    case 'volunteerEmail':
      return getVolunteerEmailContent(language);

    default:
      return null; // Return null for unrecognized emailType
  }
};

// Function to get donation email content based on language
const getDonationEmailContent = (language) => {
  switch (language) {
    case 'fr':
      return frDonationEmail;
    case 'en':
      return enDonationEmail;
    case 'it':
      return itDonationEmail;
    default:
      return frDonationEmail; // Default to French if language is not recognized
  }
};

// Function to get donation email content based on language
const getDonationFailedEmailContent = (language) => {
  switch (language) {
    case 'fr':
      return frDonationFailedEmail;
    case 'en':
      return enDonationFailedEmail;
    case 'it':
      return itDonationFailedEmail;
    default:
      return frDonationFailedEmail; // Default to French if language is not recognized
  }
};

// Function to get donation email content based on language
const getKitWinkEmailContent = (language) => {
  switch (language) {
    case 'fr':
      return frKitWinkEmail;
    case 'en':
      return enKitWinkEmail;
    case 'it':
      return itKitWinkEmail;
    default:
      return frKitWinkEmail; // Default to French if language is not recognized
  }
};

// Function to get donation email content based on language
const getMonthlyDonationEmailContent = (language) => {
  switch (language) {
    case 'fr':
      return frMonthlyDonationEmail;
    case 'en':
      return enMonthlyDonationEmail;
    case 'it':
      return itMonthlyDonationEmail;
    default:
      return frMonthlyDonationEmail; // Default to French if language is not recognized
  }
};

// Function to get order email content based on language
const getOrderEmailContent = (language) => {
  switch (language) {
    case 'fr':
      return frOrderEmail;
    case 'en':
      return enOrderEmail;
    case 'it':
      return itOrderEmail;
    default:
      return frOrderEmail; // Default to French if language is not recognized
  }
};

// Function to get volunteer email content based on language
const getVolunteerEmailContent = (language) => {
  switch (language) {
    case 'fr':
      return frVolunteerEmail;
    case 'en':
      return enVolunteerEmail;
    case 'it':
      return itVolunteerEmail;
    default:
      return frVolunteerEmail; // Default to French if language is not recognized
  }
};
