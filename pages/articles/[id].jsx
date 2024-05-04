import Article from '@/components/articles/Article';
import React, { useContext } from 'react';
import Head from 'next/head';
import { translate } from '@/lib/translations/translate';
import { LanguageContext } from '@/contexts/LanguageContext';

const ArticlePage = () => {
  const { language } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.articles', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
      <Article />
    </React.Fragment>
  );
};

export default ArticlePage;

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
