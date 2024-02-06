import { useCart } from '@/contexts/CartContext';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translate } from '@/lib/translations/translate';
import { Cancel, Delete, LocalShipping } from '@mui/icons-material';
import { Box, Button, Card, Grid, IconButton, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

const Cart = () => {
  const { cart, dispatch } = useCart();
  const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen width is less than or equal to 600px
  const { language } = useContext(LanguageContext);
  const router = useRouter();

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: item.id, size: item.size, quantity: item.quantity - 1 },
      });
    } else {
      // Optional: Remove the item if its quantity becomes 0
      dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id, size: item.size } });
    }
  };

  return (
    <React.Fragment>
      <Card sx={{ padding: '1rem', borderRadius: '16px' }}>
        <Grid container>
          <Grid item xs={12} md={6} sx={{ maxHeight: '30rem', overflowY: 'scroll' }}>
            {cart.items.map((item) => (
              <React.Fragment key={item.id + Math.random()}>
                <Card
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingBottom: 0,
                    marginBottom: 2,
                    marginRight: '1rem',
                    borderRadius: '10px',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'row', padding: '0.5rem 0.5rem 0', alignItems: 'center' }}>
                    <Box>
                      <Image
                        // layout='responsive'
                        src={item.product.imageUrl}
                        style={{
                          objectFit: 'cover',
                          maxWidth: '159px',
                          borderRadius: '8px',
                        }}
                        alt='Image article'
                        width={106}
                        height={90}
                        priority
                      />
                    </Box>
                    <Box
                      ml={2}
                      sx={{
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '0 0 0.5rem 0',
                      }}
                    >
                      <Typography variant='h6'>{item.product.name}</Typography>
                      <Typography>
                        {item.size !== 'Unique'
                          ? translate({ tKey: 'shop.size', lang: language }) + ' ' + item.size
                          : ''}
                      </Typography>
                      <Typography>
                        {' '}
                        {translate({ tKey: 'shop.quantity', lang: language })}: {item.quantity}
                      </Typography>
                      <Typography variant='h6'>{item.product.price.toLocaleString()}€</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', padding: '1rem', alignItems: 'center' }}>
                    <IconButton size='large' color='secondary' onClick={() => handleDecreaseQuantity(item)}>
                      <Cancel fontSize='large' color='secondary' />
                    </IconButton>
                  </Box>
                </Card>
              </React.Fragment>
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ margin: { xs: '2rem auto', md: 'auto' }, flexDirection: 'column', display: 'flex' }}
          >
            <Typography variant='h5'>
              {translate({ tKey: 'shop.subtotal', lang: language })}:{' '}
              <b>
                {cart.items
                  .reduce((acc, obj) => {
                    return acc + obj.product.price * obj.quantity;
                  }, 0)
                  .toLocaleString()}
                €
              </b>
            </Typography>
            <Typography variant='body2'>{translate({ tKey: 'shop.shippingPrice', lang: language })}:</Typography>
            <Typography mb={3} variant='body2'>
              France: 5€, {translate({ tKey: 'shop.outsideFrance', lang: language })}: 10€
            </Typography>
            <Button variant='text' sx={{ width: '250px', margin: 'auto' }} onClick={() => router.push('/shop')}>
              {translate({ tKey: 'shop.emptyCartButton', lang: language })}
            </Button>
            <Button
              variant='contained'
              sx={{ width: '250px', margin: 'auto' }}
              onClick={() => router.push('/shop/cart/checkout')}
            >
              {translate({ tKey: 'shop.checkout', lang: language })}
            </Button>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
};

export default Cart;
