import React from 'react';
import Image from 'next/image';
import PartnersDefault from './PartnersDefault';
import PartnersLoading from './PartnersLoading';
import { renderTextWithLineBreaks } from '@/lib/renderTextWithLineBreaks';
import { Typography, useMediaQuery } from '@mui/material';

const PartnersContent = ({ partners, loading, language }) => {
  const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen width is less than or equal to 600px

  return (
    <React.Fragment>
      {loading && <PartnersLoading />}
      {!loading && Object.keys(partners)?.length === 0 && <PartnersDefault language={language} />}
      {!loading && Object.keys(partners)?.length > 0 && (
        <React.Fragment>
          <Typography variant='body1' sx={{ marginTop: 4 }}>
            {renderTextWithLineBreaks(
              language === 'fr'
                ? partners?.firstText
                : language === 'it'
                ? partners?.itFirstText
                : partners?.enFirstText
            )}
          </Typography>
          <Image
            src={partners?.imageUrl}
            style={{
              objectFit: 'contain',
              width: 'fit-content',
              maxWidth: '100%',
              marginTop: '1rem',
              height: 'auto',
              // height: isMobile ? '10rem' : '18rem',
              borderRadius: '10px',
            }}
            alt='Image partenaires'
            width={0}
            height={0}
            sizes='100vw'
            priority
          />
          {partners?.imageUrl2 && (
            <Image
              src={partners?.imageUrl2}
              style={{
                objectFit: 'contain',
                width: 'fit-content',
                maxWidth: '100%',
                marginTop: '0.5rem',
                height: 'auto',
                // height: isMobile ? '10rem' : '18rem',
                borderRadius: '10px',
              }}
              alt='Image partenaires'
              width={0}
              height={0}
              sizes='100vw'
              priority
            />
          )}
          {partners?.imageUrl3 && (
            <Image
              src={partners?.imageUrl3}
              style={{
                objectFit: 'contain',
                width: 'fit-content',
                maxWidth: '100%',
                marginTop: '0.5rem',
                height: 'auto',
                // height: isMobile ? '10rem' : '18rem',
                borderRadius: '10px',
              }}
              alt='Image partenaires'
              width={0}
              height={0}
              sizes='100vw'
              priority
            />
          )}
          {partners?.imageUrl4 && (
            <Image
              src={partners?.imageUrl4}
              style={{
                objectFit: 'contain',
                width: 'fit-content',
                maxWidth: '100%',
                marginTop: '0.5rem',
                height: 'auto',
                // height: isMobile ? '10rem' : '18rem',
                borderRadius: '10px',
              }}
              alt='Image partenaires'
              width={0}
              height={0}
              sizes='100vw'
              priority
            />
          )}
          <Typography variant='body1' sx={{ marginTop: 5 }}>
            {renderTextWithLineBreaks(
              language === 'fr'
                ? partners?.secondText || ''
                : language === 'it'
                ? partners?.itSecondText || ''
                : partners?.enSecondText || ''
            )}
          </Typography>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default React.memo(PartnersContent);
