import React, { useContext } from 'react';
import { ArticlesPage } from '@/components/articles/ArticlesPage';
import { translate } from '@/lib/translations/translate';
import Head from 'next/head';
import { Typography } from '@mui/material';
import { LanguageContext } from '@/contexts/LanguageContext';

const Articles = () => {
  const { language } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.articles', lang: language }) + ' - Wink Monaco'}</title>
        <meta property='og:title' content={translate({ tKey: 'nav.articles', lang: language }) + ' - Wink Monaco'} />
        <meta name='description' content={translate({ tKey: 'seo.articles', lang: language })} />
        <meta property='og:description' content={translate({ tKey: 'seo.articles', lang: language })} />
        <meta name='keywords' content={translate({ tKey: 'seo.articlesKeywords', lang: language })} />
        <link rel='canonical' href='https://www.wink-monaco.mc/articles' />
        <meta property='og:url' content='https://www.wink-monaco.mc/articles' />
        <meta property='og:type' content='website' />
      </Head>
      <Typography variant='h1' sx={{ display: 'none' }}>
        {translate({ tKey: 'articles.title', lang: language })}
      </Typography>
      <ArticlesPage />
    </React.Fragment>
  );
};

export default Articles;
