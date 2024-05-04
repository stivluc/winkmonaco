import Product from '@/components/products/Product';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translate } from '@/lib/translations/translate';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

const ShopProduct = () => {
  const router = useRouter();
  const { language } = useContext(LanguageContext);
  const { id } = router.query;

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.shop', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
      <Product id={id} />
    </React.Fragment>
  );
};

export default ShopProduct;

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
