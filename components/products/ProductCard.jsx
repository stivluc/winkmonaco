import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { translate } from '@/lib/translations/translate';
import { useRouter } from 'next/router';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import Image from 'next/image';

export const ProductCard = ({ product, language }) => {
  const router = useRouter();
  const { dispatch, cart } = useCart();
  const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen width is less than or equal to 600px

  const defaultSize = product.sizes?.split(';')[0];
  const [selectedSize, setSelectedSize] = useState(defaultSize);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();

    // Find the existing item in the cart
    const existingCartItem = cart.items.find((item) => item.id === product._id && item.size === selectedSize);

    // If the item exists, dispatch an 'UPDATE_QUANTITY' action instead of 'ADD_ITEM'
    if (existingCartItem) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: {
          id: product._id,
          size: selectedSize,
          quantity: existingCartItem.quantity + 1, // Increment the quantity
        },
      });
    } else {
      // If the item doesn't exist, dispatch 'ADD_ITEM' as normal
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: product._id,
          product: {
            name: product.name,
            enName: product.enName,
            itName: product.itName,
            imageUrl: product.imageUrl,
            price: product.price,
          },
          size: selectedSize,
          quantity: 1,
        },
      });
    }

    // console.log(cart);
  };

  const hasMultipleSizes = product.sizes && product.sizes.split(';')?.length > 1;

  return (
    <Grid
      item
      xs={12}
      md={router.pathname === '/' ? 12 : 6}
      sx={{ padding: { xs: '0.5rem', md: '1rem' }, position: 'relative' }}
    >
      {!product.isActive && (
        <Typography
          sx={{
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-35deg)',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            zIndex: 2,
            padding: '0.5rem',
            display: product.isActive ? 'none' : 'block', // Only show when not active
          }}
          variant='h3'
          color='secondary'
        >
          {translate({ tKey: 'shop.outOfStock', lang: language })}{' '}
        </Typography>
      )}
      <Card
        sx={{
          height: '30.5rem',
          borderRadius: '1rem',
          backgroundColor: '#fff',
          position: 'relative', // For positioning the "Out of stock" overlay
          filter: product.isActive ? 'none' : 'grayscale(100%)',
          pointerEvents: product.isActive ? 'auto' : 'none', // Disable interactions if not active
        }}
        elevation={3}
      >
        <CardActionArea onClick={() => router.push('/shop/' + product._id)}>
          <Box sx={{ height: '19rem', position: 'relative' }}>
            <Image
              src={product.imageUrl}
              style={{
                objectFit: isMobile ? 'cover' : 'contain',
                width: '100%',
                height: '100%',
              }}
              alt='Image article'
              sizes='100vw'
              width='0'
              height='0'
              priority
            />
          </Box>
          <CardContent sx={{ height: '11.5rem' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography
                gutterBottom
                variant='h5'
                component='div'
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontWeight: 600,
                  textAlign: 'left',
                }}
              >
                {language === 'fr' ? product.name : language === 'en' ? product.enName : product.itName}
              </Typography>
              <Typography mt={-0.5} ml={0.5} variant='body1' sx={{ whiteSpace: 'nowrap' }}>
                {product?.price?.toLocaleString() + ' €'}
              </Typography>
            </Box>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{
                height: '3rem',
                maxHeight: '3rem',
                overflow: 'hidden',
                textAlign: 'left',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2, // Set the number of lines to display before applying ellipsis
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.6,
              }}
            >
              {language === 'fr'
                ? product?.description
                : language === 'en'
                ? product?.enDescription
                : product?.itDescription}
            </Typography>
          </CardContent>
          {hasMultipleSizes && (
            <FormControl variant='standard' sx={{ position: 'absolute', left: '1rem', bottom: '1rem', width: '90px' }}>
              <InputLabel>{translate({ tKey: 'shop.size', lang: language })}</InputLabel>
              <Select
                onClick={(e) => e.stopPropagation()}
                value={selectedSize}
                onChange={handleSizeChange}
                size='small'
                sx={{ textAlign: 'left' }}
              >
                {product.sizes.split(';').map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button
            sx={{ position: 'absolute', right: '1rem', bottom: '1rem' }}
            component='div'
            variant='contained'
            color='primary'
            endIcon={<AddShoppingCart />}
            onClick={handleAddToCart}
          >
            {translate({ tKey: 'shop.addToBasket', lang: language })}
          </Button>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
