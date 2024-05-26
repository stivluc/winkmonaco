import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { AddShoppingCart, ArrowBack } from '@mui/icons-material';
import { translate } from '@/lib/translations/translate';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ProductCarousel from './ProductCarousel';
import FloatingCart from './FloatingCart';
import { useCart } from '@/contexts/CartContext';
import ProductLoading from './ProductLoading';
import { renderTextWithLineBreaks } from '@/lib/renderTextWithLineBreaks';

const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
  const { language } = useContext(LanguageContext);
  const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen width is less than or equal to 600px
  const { dispatch, cart } = useCart();

  const [selectedSize, setSelectedSize] = useState('');

  const hasMultipleSizes = product.sizes && product.sizes.split(';').length > 1;

  const router = useRouter();
  const { id } = router.query;

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await (await fetch(`/api/products/${id}`)).json();
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    if (id) {
      fetchData();
    } else {
      router.reload();
    }
  }, [id, router]);

  useEffect(() => {
    if (product?.isActive === false) {
      router.push('/shop');
    }
    setSelectedSize(product.sizes?.split(';')[0] || '');
  }, [product, router]);

  const pictures = [{ imgPath: product.imageUrl, label: 'Image 1' }];

  if (product.imageUrl2) {
    pictures.push({ imgPath: product.imageUrl2, label: 'Image 2' });
  }

  if (product.imageUrl3) {
    pictures.push({ imgPath: product.imageUrl3, label: 'Image 3' });
  }

  return (
    <Box
      sx={{
        maxWidth: { xs: '600px', md: '1200px' },
        width: '100%',
        margin: '1.2rem auto',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <FloatingCart language={language} />
      <Box sx={{ marginTop: '-1rem', textAlign: 'left' }}>
        <Button startIcon={<ArrowBack />} onClick={() => router.push('/shop')}>
          {translate({ tKey: 'general.back', lang: language })}
        </Button>
      </Box>
      <Typography variant='h1' mb={1} mt={-1} sx={{ display: 'none' }}>
        {translate({ tKey: 'nav.shop', lang: language })}
      </Typography>
      <Typography variant='h2' mb={2} mt={-2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {translate({ tKey: 'nav.shop', lang: language })}
      </Typography>
      {isLoading && <ProductLoading />}
      {!isLoading && (
        <React.Fragment>
          {/* <Card sx={{ color: '##fafafa', padding: '1rem 1rem' }}> */}
          <Grid container>
            <Grid item xs={12} md={6}>
              <ProductCarousel pictures={pictures} />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                padding: { xs: '0.5rem 0.5rem 1rem', md: '0.5rem 1.5rem 2rem' },
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant='h4'>{product.name}</Typography>

              <Typography sx={{ overflow: 'hidden' }}>{renderTextWithLineBreaks(product.description)}</Typography>

              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: 2,
                    marginTop: 4,
                  }}
                >
                  {hasMultipleSizes && (
                    <FormControl variant='standard' sx={{ width: '100px' }}>
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
                  <Typography variant='h6'>{product?.price}€</Typography>
                </Box>
                <Button
                  variant='contained'
                  color='primary'
                  sx={{ width: '100%' }}
                  endIcon={<AddShoppingCart />}
                  onClick={handleAddToCart}
                >
                  {translate({ tKey: 'shop.addToBasket', lang: language })}
                </Button>
              </Box>
            </Grid>
          </Grid>
          {/* </Card> */}
        </React.Fragment>
      )}
    </Box>
  );
};

export default Product;
