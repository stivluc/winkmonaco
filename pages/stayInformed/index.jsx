import React, { useContext, useEffect, useState } from 'react';
import StayInformedForm from "@/components/stayInformed/StayInformedForm";
import { LanguageContext } from '@/contexts/LanguageContext';
import { fetchData } from '@/lib/handlers/fetchData';
import { Box, Typography } from '@mui/material';
import Translation from '@/components/general/Translation';
import Head from 'next/head';
import { translate } from '@/lib/translations/translate';

const StayInformedFormPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [helpContents, setHelpContents] = useState({});
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    fetchData('helpContents', setIsLoading, setHelpContents, 'singleDocument');
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.stayInformed', lang: language }) + ' - Wink Monaco'}</title>
        <meta property='og:title' content={translate({ tKey: 'nav.stayInformed', lang: language }) + ' - Wink Monaco'}/>
        <meta name='description' content={translate({ tKey: 'seo.stayInformed', lang: language })}/>
        <meta property='og:description' content={translate({ tKey: 'seo.stayInformed', lang: language })}/>
        <meta name='keywords' content={translate({ tKey: 'seo.stayInformedKeywords', lang: language })}/>
        <link rel='canonical' href='https://www.wink-monaco.mc/stayInformed'/>
        <meta property='og:url' content='https://www.wink-monaco.mc/stayInformed'/>
        <meta property='og:type' content='website'/>
      </Head>
      <Box
        sx={{
          maxWidth: { xs: '600px', lg: '1000px' },
          width: '100%',
          margin: '1.2rem auto',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant='h2' mb={4}>
          <Translation tKey='stayInformed.title' lang={language} />
        </Typography>
        <StayInformedForm data={helpContents} loading={isLoading} language={language} />
      </Box>
    </React.Fragment>
  );
};

export default StayInformedFormPage;
