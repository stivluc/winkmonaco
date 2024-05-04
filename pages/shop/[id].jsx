import Product from '@/components/products/Product';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translate } from '@/lib/translations/translate';
import Head from 'next/head';
import React, { useContext } from 'react';

const ShopProduct = ({ product }) => {
  const { language } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.shop', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
      <Product product={product} />
    </React.Fragment>
  );
};

export default ShopProduct;

export async function getServerSideProps(ctx) {
  try {
    const hostname = ctx.req.headers.host;

    const { data } = await (await fetch(`https://` + hostname + `/api/products/` + ctx.params.id)).json();
    return {
      props: {
        product: data || [],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        product: [], // Fallback empty array
      },
    };
  }
}
