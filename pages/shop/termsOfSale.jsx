import { LanguageContext } from '@/contexts/LanguageContext';
import { renderTextWithLineBreaks } from '@/lib/renderTextWithLineBreaks';
import { translate } from '@/lib/translations/translate';
import { ArrowBack } from '@mui/icons-material';
import { Button, Card, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

const TermsOfSale = () => {
  const { language } = useContext(LanguageContext);
  const router = useRouter();

  const { previous } = router.query;
  console.log(previous);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'shop.termsOfSale', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
      <Card
        sx={{
          padding: { xs: '1rem 1.5rem', lg: '2rem 4rem' },
          borderRadius: '16px',
          maxWidth: '1000px',
          margin: 'auto',
        }}
      >
        <Button startIcon={<ArrowBack />} onClick={() => router.push(previous ?? '/')}>
          {translate({ tKey: 'general.back', lang: language })}
        </Button>
        <Typography variant='h2' sx={{ marginTop: { xs: '0', lg: '-1rem' }, textAlign: 'center' }}>
          {translate({ tKey: 'shop.termsOfSaleTitle', lang: language })}
        </Typography>
        <Typography sx={{ textAlign: 'justify' }}>
          {renderTextWithLineBreaks(translate({ tKey: 'shop.termsOfSaleText', lang: language }))}
        </Typography>
        <Typography>
          <br />
          Email : <Link href={'mailto:winkmonaco@gmail.com'}>winkmonaco@gmail.com</Link>
        </Typography>
      </Card>
    </React.Fragment>
  );
};

export default TermsOfSale;
