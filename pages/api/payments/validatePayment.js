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
      res.status(200).json({ message: 'Valid payment' });
    } else {
      res.status(500).json({ message: 'Payment hash mismatch' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Payment hash mismatch' });
  }
}
