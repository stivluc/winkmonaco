import { useRouter } from 'next/router';
import Article from '@/components/articles/Article';
import React, { useContext } from 'react';
import Head from 'next/head';
import { translate } from '@/lib/translations/translate';
import { LanguageContext } from '@/contexts/LanguageContext';

const ArticlePage = ({ article }) => {
  const { language } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.articles', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
      <Article article={article} />
    </React.Fragment>
  );
};

export default ArticlePage;

export async function getServerSideProps(ctx) {
  try {
    const hostname = ctx.req.headers.host;
    const id = ctx.params.id;

    const { data } = await (await fetch(`https://` + hostname + `/api/articles/` + id)).json();
    return {
      props: {
        article: data || [],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        article: [], // Fallback empty array
      },
    };
  }
}
