import React, { useContext, useEffect } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { Box, Typography } from '@mui/material';
import Translation from '@/components/general/Translation';
import Head from 'next/head';
import { translate } from '@/lib/translations/translate';
import ShippingForm from '@/components/products/ShippingForm';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/router';

const Checkout = () => {
  const { language } = useContext(LanguageContext);
  const { cart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cart?.items?.length < 1) {
      router.push('/shop');
      return;
    }
  }, [cart, router]);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'shop.checkoutTitle', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
      <Box
        sx={{
          maxWidth: { xs: '600px', lg: '1000px' },
          width: '100%',
          margin: '1.2rem auto',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant='h2' mb={4}>
          <Translation tKey='shop.checkoutTitle' lang={language} />
        </Typography>
        <ShippingForm language={language} />
      </Box>
    </React.Fragment>
  );
};

export default Checkout;
