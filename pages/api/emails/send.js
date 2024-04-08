import { dbConnect, dbDisconnect } from '@/lib/dbConnect';
import { DonationModel } from '@/schemas/donationSchema';
import { SubscriptionModel } from '@/schemas/subscriptionSchema';
import { VolunteerModel } from '@/schemas/volunteerSchema';
import { EmailModel } from '@/schemas/emailSchema';
import nodemailer from 'nodemailer';
import nextConnect from 'next-connect';
import multer from 'multer';


const upload = multer({ storage: multer.memoryStorage() });

const handler = nextConnect();

handler.use(upload.array('attachments'));
handler.post(async (req, res) => {
  await dbConnect();
  const { group, subject, text, emails, isHtml } = req.body;


  let recipientEmails = await getEmailsBasedOnGroup(group, JSON.parse(req.body.emails || '[]'));

  // Deduplicate recipientEmails
  recipientEmails = [...new Set(recipientEmails)];

  const mailTransport = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    secure: true,
  });

  try {

    const sendEmailPromises = recipientEmails.map(email => {
      const mailOptions = {
        from: 'noreply.winkmonaco@gmail.com',
        to: email,
        subject: subject,
        html: isHtml ? text : textToHTML(text),
        attachments: req.files.map(file => ({
          filename: file.originalname,
          content: file.buffer,
          contentType: file.mimetype,
        })),
      };
      return mailTransport.sendMail(mailOptions);
    });

    await Promise.all(sendEmailPromises);
    // Log and save email record after all emails are sent
    console.log('All emails sent successfully');

    const newEmail = new EmailModel({
      subject: subject,
      sentOn: new Date(),
      count: recipientEmails.length,
      group: group,
      comment: '',
    });

    await newEmail.save();

    res.json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Error sending emails' });
  }
});

function textToHTML(text) {
  // Simple newline to <br> conversion for plain text emails
  return text.replace(/\n/g, '<br>');
}

async function getEmailsBasedOnGroup(group, emails) {
  let recipientEmails = [];

  switch (group) {
    case 'test':
      recipientEmails = ['winkmonaco@gmail.com'];
      break;
    case 'everyone':
      const donationEmails = await DonationModel.distinct('email').exec();
      const subscriptionEmails = await SubscriptionModel.distinct('email').exec();
      const volunteersEmails = await VolunteerModel.distinct('email').exec();
      recipientEmails = [...donationEmails, ...subscriptionEmails, ...volunteersEmails];
      break;
    case 'donators':
      const donationEmails2 = await DonationModel.distinct('email').exec();
      const subscriptionEmails2 = await SubscriptionModel.distinct('email').exec();
      recipientEmails = [...donationEmails2, ...subscriptionEmails2];
      break;
    case 'oneTimeDonators':
      recipientEmails = await DonationModel.distinct('email').exec();
      break;
    case 'donatorsSup200':
      recipientEmails = await DonationModel.find({ amount: { $gt: 200 } }, 'email')
        .distinct('email')
        .exec();
      break;
    case 'inactiveRecurring':
      recipientEmails = await SubscriptionModel.find({ status: 'cancelled' }, 'email').distinct('email').exec();
      break;
    case 'activeRecurring':
      recipientEmails = await SubscriptionModel.find({ status: { $ne: 'cancelled' } }, 'email')
        .distinct('email')
        .exec();
      break;
    case 'activeRecurringSup50':
      recipientEmails = await SubscriptionModel.find({ amount: { $gt: 50 } }, 'email')
        .distinct('email')
        .exec();
      break;
    case 'volunteersWithKit':
      recipientEmails = await VolunteerModel.find({ zipCode: { $ne: '00000' } }, 'email')
        .distinct('email')
        .exec();
      break;
    case 'volunteers':
      recipientEmails = await VolunteerModel.distinct('email').exec();
      break;
    case 'import':
      recipientEmails = emails; // Assuming 'emails' is an array of email addresses passed in the request body
      break;
    default:
      // You might want to handle the default case, possibly throw an error or return an empty array
      break;
  }

  return recipientEmails;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;

