import { Box, Fade, Grid, Typography } from '@mui/material';
import React from 'react';
import Translation from '../general/Translation';
import ProductsLoading from './ProductsLoading';
import FloatingCart from './FloatingCart';
import ShopUnavailable from './ShopUnavailable';
import { ProductCard } from './ProductCard';

const ProductsPage = ({ data, loading, language }) => {
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
          {loading ? (
            <ProductsLoading />
          ) : !loading && (data?.length === 0 || !data || data.every((item) => !item.isActive)) ? (
            <ShopUnavailable />
          ) : (
            <React.Fragment>
              {data
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
