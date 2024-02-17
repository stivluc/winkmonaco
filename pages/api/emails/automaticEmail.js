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
// import { transporter } from '@/lib/mailer';

export default async function handler(req, res) {
  // Extract parameters from the query
  const { emailType, language, email } = req.query;

  // Get email content based on emailType and language
  const emailContent = getEmailContent(emailType, language);

  // Check if email content is found
  if (!emailContent) {
    res.status(400).json({ error: 'Invalid emailType or language' });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    from: {
      name: `Wink Monaco`,
      address: process.env.EMAIL_USER,
    },
  });

  // Define email options
  const mailOptions = {
    from: {
      name: `Wink Monaco`,
      address: process.env.EMAIL_USER,
    },
    to: email, // Recipient email address
    subject: emailContent.subject, // Email subject
    html: emailContent.emailContent, // Email content in HTML format
  };

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log('Server is ready to take our messages');
        resolve(success);
      }
    });
  });

  // Attempt to send the email
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        reject(err);
      } else {
        console.log('Email sent successfully:', info);
        resolve(info);
      }
    });
  });

  // If sending email is successful, respond with success message
  res.status(200).json({ message: 'Email sent successfully' });
}

//* Get Email Content

// Function to get email content based on emailType and language
const getEmailContent = (emailType, language) => {
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
