import { LanguageContext } from '@/contexts/LanguageContext';
import React, { useContext, useState, useEffect } from 'react';
// import { fetchData } from '@/lib/handlers/fetchData';
import ProductsPage from '@/components/products/ProductsPage';
import Head from 'next/head';
import { translate } from '@/lib/translations/translate';
import { Typography } from '@mui/material';

const Products = ({ products }) => {
  const { language } = useContext(LanguageContext);
  // const [isLoading, setIsLoading] = useState(true);
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   fetchData('products', setIsLoading, setProducts);
  // }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.shop', lang: language }) + ' - Wink Monaco'}</title>
        <meta property='og:title' content={translate({ tKey: 'nav.shop', lang: language }) + ' - Wink Monaco'} />
        <meta name='description' content={translate({ tKey: 'seo.shop', lang: language })} />
        <meta property='og:description' content={translate({ tKey: 'seo.shop', lang: language })} />
        <meta name='keywords' content={translate({ tKey: 'seo.shopKeywords', lang: language })} />
        <link rel='canonical' href='https://www.wink-monaco.mc/shop' />
        <meta property='og:url' content='https://www.wink-monaco.mc/shop' />
        <meta property='og:type' content='website' />
      </Head>
      <Typography variant='h1' sx={{ display: 'none' }}>
        {translate({ tKey: 'shop.title', lang: language })}
      </Typography>
      <ProductsPage data={products} language={language} />
    </React.Fragment>
  );
};

export default Products;

export async function getServerSideProps(ctx) {
  try {
    //const hostname = ctx.req.headers.host;

    const { data } = await (await fetch(process.env.API_URL + `/api/products`)).json();
    return {
      props: {
        products: data || [],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        products: [], // Fallback empty array
      },
    };
  }
}
