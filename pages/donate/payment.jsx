import ErrorModal from '@/components/UI/ErrorModal';
import ContactCard from '@/components/contact/ContactCard';
import PaymentLoading from '@/components/loading/PaymentLoading';
import SuccessModal from '@/components/UI/SuccessModal';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translate } from '@/lib/translations/translate';
import KRGlue from '@lyracom/embedded-form-glue';
import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Card, Paper, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';

const Payment = () => {
  const [status, setStatus] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const [loading, setLoading] = useState(true);

  const { language } = useContext(LanguageContext);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [values, setValues] = useState({
    title: router.query.title,
    firstName: router.query.firstName,
    lastName: router.query.lastName,
    amount: router.query.amount,
    email: router.query.email,
    address: router.query.address,
    addressDetails: router.query.addressDetails,
    zipCode: router.query.zipCode,
    city: router.query.city,
    country: router.query.country,
    type: 'cb',
    createdAt: new Date(),
  });

  useEffect(() => {
    const setupPaymentForm = async () => {
      try {
        if (values.amount < 1 || values?.amount === undefined) {
          router.push('/');
          return;
        }

        const res = await fetch(
          `/api/payments/createPayment?address=${values.address}&addressDetails=${values.addressDetails}&zipCode=${values.zipCode}&city=${values.city}&country=${values.country}&title=${values.title}&firstName=${values.firstName}&lastName=${values.lastName}&amount=${values.amount}&email=${values.email}`
        );

        if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`);
        }
        const data = await res.json();
        const formToken = data.answer.formToken;

        let publicKey;

        if (process.env.NODE_ENV === 'development') {
          publicKey = '28487566:testpublickey_lzWHlBVHry7z37yufxTWJFCclTrLJhOrCCtPNsn9pYcH6';
        } else {
          publicKey = '28487566:publickey_k3tBxd0O7BN6XfBoouK6YzX8jl5CopxNQJqt2l1NtcJsg';
        }

        const { KR } = await KRGlue.loadLibrary('https://static.payzen.eu', publicKey); /* Load the remote library */

        await KR.setFormConfig({
          /* set the minimal configuration */
          formToken: formToken,
          'kr-language':
            language === 'fr'
              ? 'fr-FR'
              : language === 'it'
              ? 'it-IT'
              : 'en-EN' /* to update initialization parameter */,
        });

        await KR.onSubmit(async (paymentData) => {
          const requestBody = {
            paymentData: paymentData,
            email: values.email,
            language: language,
          };

          const response = await fetch(`/api/payments/validatePayment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
          });

          const paymentResponse = JSON.parse(paymentData.rawClientAnswer);

          if (response.status === 200 && paymentResponse.orderStatus === 'PAID') {
            try {
              const res = await fetch('/api/donations/' + router.query._id, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...values, isPaid: true }),
              });
              if (res.ok) {
                // Send donationEmail
                const emailType = 'donationEmail';
                const email = router.query.email; // Replace with the actual recipient email

                // Send the request to the automaticEmail API endpoint
                const emailResponse = await fetch(
                  `/api/emails/automaticEmail?emailType=${emailType}&language=${language}&email=${email}`,
                  {
                    method: 'POST',
                  }
                );

                if (emailResponse.ok) {
                  console.log('Donation confirmation email successfully sent');
                } else {
                  console.error('Error sending donation confirmation email');
                }
                setStatus('success');
                setIsOpened(true);
                setTimeout(() => {
                  router.push('/');
                }, 10000);
              } else {
                enqueueSnackbar(translate({ tKey: 'general.errorOccurred', lang: language }), { variant: 'error' });
              }
            } catch (err) {
              enqueueSnackbar(translate({ tKey: 'general.errorOccurred', lang: language }), { variant: 'error' });
              console.error(err);
            }
          } else {
            setStatus('error');
            setIsOpened(true);

            // Send orderEmail
            const emailType = 'donationFailedEmail';
            const email = router.query.email; // Replace with the actual recipient email

            // Send the request to the automaticEmail API endpoint
            const emailResponse = await fetch(
              `/api/emails/automaticEmail?emailType=${emailType}&language=${language}&email=${email}`,
              {
                method: 'POST',
              }
            );

            if (emailResponse.ok) {
              console.log('Donation failed email successfully sent');
            } else {
              console.error('Error sending donation failed email');
            }

            setTimeout(() => {
              router.reload();
            }, 6000);
            console.log(response);
          }
        });

        setLoading(false);

        const { result } = await KR.attachForm('#myPaymentForm'); /* Attach a payment form  to myPaymentForm div*/

        await KR.showForm(result.formId); /* show the payment form */
      } catch (err) {
        setStatus('error');
        console.log(err);
      }
    };

    setupPaymentForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.donate', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
      {status === 'success' && (
        <SuccessModal
          opened={isOpened}
          title={translate({ lang: language, tKey: 'donate.thankYou' })}
          text={translate({ lang: language, tKey: 'donate.modalText' })}
        />
      )}
      {status === 'error' && (
        <ErrorModal
          opened={isOpened}
          title={translate({ lang: language, tKey: 'donate.paymentDeclined' })}
          text={translate({ lang: language, tKey: 'donate.paymentDeclinedText' })}
        />
      )}
      <Box
        sx={{
          maxWidth: { xs: '600px', md: '1050px' },
          width: '100%',
          margin: '1.2rem auto',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant='h2' mb={2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {translate({ tKey: 'donate.title', lang: language })}
        </Typography>
        <Box sx={{ marginTop: '-1rem', textAlign: 'left' }}>
          <Button startIcon={<ArrowBack />} onClick={() => router.push('/donate/oneTime')}>
            {translate({ tKey: 'general.back', lang: language })}
          </Button>
        </Box>
        <Card
          sx={{
            maxWidth: '600px',
            margin: 'auto',
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: '#fafafa',
            padding: '1rem 0 0.5rem',
          }}
        >
          {loading && <PaymentLoading />}
          <div id='myPaymentForm' style={{ margin: 'auto', justifyContent: 'center', textAlign: 'center' }}>
            <div className='kr-smart-form' style={{ margin: 'auto' }}></div>
          </div>
        </Card>
        <Typography variant='h4' mt={4} mb={2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {translate({ tKey: 'donate.help', lang: language })}
        </Typography>
        <Typography> {translate({ tKey: 'donate.donationService', lang: language })}</Typography>
        <Paper
          sx={{
            backgroundColor: '#fafafa',
            width: 'fit-content',
            textAlign: 'left',
            margin: '2rem auto',
            borderRadius: '1rem',
            padding: '1rem',
          }}
        >
          <ContactCard language={language} />
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default Payment;

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
