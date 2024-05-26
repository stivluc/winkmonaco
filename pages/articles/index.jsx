import { LanguageContext } from '@/contexts/LanguageContext';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchData } from '@/lib/handlers/fetchData';
import { ArticlesPage } from '@/components/articles/ArticlesPage';
import { translate } from '@/lib/translations/translate';
import Head from 'next/head';
import { Typography } from '@mui/material';

const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await (await fetch(`/api/articles`)).json();
        setArticles(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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
      <ArticlesPage data={articles} language={language} isLoading={isLoading} />
    </React.Fragment>
  );
};

export default Articles;
