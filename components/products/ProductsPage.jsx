import { Box, Fade, Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Translation from '../general/Translation';
import ProductsLoading from './ProductsLoading';
import FloatingCart from './FloatingCart';
import ShopUnavailable from './ShopUnavailable';
import { ProductCard } from './ProductCard';
import { LanguageContext } from '@/contexts/LanguageContext';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await (await fetch(`/api/products`)).json();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 500);
  }, []);

  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          maxWidth: { xs: '600px', md: '1200px' },
          width: '100%',
          margin: 'auto',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <FloatingCart language={language} />
        <Typography variant='h2' mb={3}>
          <Translation tKey='shop.title' lang={language} />
        </Typography>
        <Grid container>
          {isLoading ? (
            <ProductsLoading />
          ) : !isLoading && (products?.length === 0 || !products || products.every((item) => !item.isActive)) ? (
            <React.Fragment>
              <ShopUnavailable />
            </React.Fragment>
          ) : (
            <React.Fragment>
              {products
                ?.sort((a, b) => (a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1))
                .map((product) => (
                  <ProductCard product={product} language={language} key={product._id} />
                ))}
            </React.Fragment>
          )}
        </Grid>
      </Box>
    </Fade>
  );
};

export default ProductsPage;
