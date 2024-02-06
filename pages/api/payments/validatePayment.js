import { transporter } from '@/lib/mailer';
import { HmacSHA256 } from 'crypto-js';
import Hex from 'crypto-js/enc-hex';

export default async function handler(req, res) {
  try {
    const answer = req.body.paymentData.clientAnswer;
    const hash = req.body.paymentData.hash;

    const answerHash = Hex.stringify(
      HmacSHA256(
        JSON.stringify(answer),
        process.env.NODE_ENV === 'development' ? process.env.PAYZEN_HMAC : process.env.PAYZEN_PRODHMAC
      )
    );

    if (hash === answerHash) {
      const { subject, emailContent } =
        req.body.language === 'fr'
          ? getFrenchEmailContent()
          : req.body.language === 'it'
          ? getItalienEmailContent()
          : getEnglishEmailContent();

      const mailOptions = {
        from: {
          name: 'Wink Monaco',
          address: 'noreply.winkmonaco@gmail.com',
        },
        to: req.body.email,
        subject: subject,
        html: emailContent,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email sending error:', error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.status(200).json({ message: 'Valid payment' });
    } else {
      res.status(500).json({ message: 'Payment hash mismatch' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Payment hash mismatch' });
  }
}
