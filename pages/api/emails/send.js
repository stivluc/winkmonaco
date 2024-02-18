import { dbConnect, dbDisconnect } from '@/lib/dbConnect';
import { DonationModel } from '@/schemas/donationSchema';
import { EmailModel } from '@/schemas/emailSchema';
import { SubscriptionModel } from '@/schemas/subscriptionSchema';
import { VolunteerModel } from '@/schemas/volunteerSchema';
import sgMail from '@sendgrid/mail';

// Set the SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Define your email sending route
export default async function handler(req, res) {
  try {
    const { group, subject, text, emails, isHtml } = req.body;
    await dbConnect();

    let recipientEmails = [];

    // Apply filters based on the 'group' parameter
    switch (group) {
      case 'test':
        recipientEmails = ['winkmonaco@gmail.com'];
        break;
      case 'everyone':
        // Retrieve emails from 'donations' and 'subscriptions' collections
        const donationEmails = await DonationModel.distinct('email').exec();
        const subscriptionEmails = await SubscriptionModel.distinct('email').exec();
        const volunteersEmails = await VolunteerModel.distinct('email').exec();

        recipientEmails = [...donationEmails, ...subscriptionEmails, ...volunteersEmails];
        break;
      case 'donators':
        // Retrieve emails from 'donations' and 'subscriptions' collections
        const donationEmails2 = await DonationModel.distinct('email').exec();
        const subscriptionEmails2 = await SubscriptionModel.distinct('email').exec();
        recipientEmails = [...donationEmails2, ...subscriptionEmails2];
        break;
      case 'oneTimeDonators':
        // Retrieve emails from the 'donations' collection
        recipientEmails = await DonationModel.distinct('email').exec();
        break;
      case 'donatorsSup200':
        // Retrieve emails from 'donations' with amount > 200
        recipientEmails = await DonationModel.distinct('email', {
          amount: { $gt: 200 },
        }).exec();
        break;
      case 'inactiveRecurring':
        // Retrieve emails from 'subscriptions' with status 'cancelled'
        recipientEmails = await SubscriptionModel.distinct('email', {
          status: 'cancelled',
        }).exec();
        break;
      case 'activeRecurring':
        // Retrieve emails from 'subscriptions' with status not 'cancelled'
        recipientEmails = await SubscriptionModel.distinct('email', {
          status: { $ne: 'cancelled' },
        }).exec();
        break;
      case 'activeRecurringSup50':
        // Retrieve emails from 'subscriptions' with amount > 50
        recipientEmails = await SubscriptionModel.distinct('email', {
          amount: { $gt: 50 },
        }).exec();
        break;
      case 'volunteersWithKit':
        // Retrieve emails from 'volunteers' with zipCode !== '00000'
        recipientEmails = await VolunteerModel.distinct('email', {
          zipCode: { $ne: '00000' },
        }).exec();
        break;
      case 'volunteers':
        // Retrieve all emails from 'volunteers' collection
        recipientEmails = await VolunteerModel.distinct('email').exec();
        break;
      case 'import':
        // Use the provided 'emails' array
        recipientEmails = emails;
        break;
    }

    // Deduplicate recipientEmails
    recipientEmails = [...new Set(recipientEmails)];

    recipientEmails.map((email) => {
      const msg = {
        from: { email: process.env.EMAIL_USER, name: 'Wink Monaco' }, // Sender email address
        to: email,
        subject: subject,
        html: isHtml ? text : textToHTML(text),
      };
      return sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent successfully');
        })
        .catch((error) => {
          console.error('Error sending email');
        });
    });

    // If all emails were sent successfully, save the record
    const newEmail = new EmailModel({
      subject: subject,
      sentOn: new Date(),
      count: recipientEmails.length,
      group: group,
      comment: '',
    });

    await newEmail.save();

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Email sending error', error: error.message });
  } finally {
    await dbDisconnect();
  }
}

// Define a function to convert text to HTML as needed
function textToHTML(text) {
  // Implement your logic to convert text to HTML
  return text.replace(/\n/g, '<br>');
}
