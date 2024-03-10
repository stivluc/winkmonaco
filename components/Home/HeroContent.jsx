import { LanguageContext } from '@/contexts/LanguageContext';
import { renderTextWithLineBreaks } from '@/lib/renderTextWithLineBreaks';
import { translate } from '@/lib/translations/translate';
import { Add, Info, Remove } from '@mui/icons-material';
import { Button, Collapse, Grid, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';

const HeroContent = () => {
  const [isShown, setIsShown] = useState(false);
  const { language } = useContext(LanguageContext);

  const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen width is less than or equal to 600px

  // Function to wrap each letter in a span, excluding spaces
  const waveText = (text) => (
    <>
      {text.split('').map((char, index) => {
        // Check if the character is a space
        if (char === ' ') {
          return (
            <span key={index} style={{ whiteSpace: 'pre' }}>
              {char}
            </span>
          );
        }

        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              animation: `wave 2s ease ${index / 10}s infinite`,
              animationDirection: index % 2 === 0 ? 'alternate-reverse' : 'alternate',
            }}
          >
            {char}
          </span>
        );
      })}
    </>
  );

  return (
    <Grid
      container
      sx={{ maxWidth: '1050px', width: '100%', margin: '1.2rem auto', justifyContent: 'center', textAlign: 'center' }}
    >
      <Grid item xs={12}>
        <Image
          priority
          width={216.5}
          height={72}
          src={'/icons/fullLogo.webp'}
          alt='Wink Logo'
          layout='responsive'
          style={{ maxWidth: '216.5px' }}
        />
      </Grid>
      <Grid item xs={12} sx={{ padding: 'auto 2rem', marginTop: '1.5rem' }}>
        <Typography>{renderTextWithLineBreaks(translate({ tKey: 'home.heroText', lang: language }))}</Typography>
      </Grid>
      <Collapse in={isShown}>
        <Grid item xs={12} sx={{ padding: 'auto 2rem' }}>
          <Typography mt={4}>
            {renderTextWithLineBreaks(translate({ tKey: 'home.heroText2', lang: language }))}
          </Typography>
          <Link href='/about'>
            <Button variant='contained' color='secondary' startIcon={<Info />} sx={{ mt: 2, mb: 2 }}>
              {translate({ tKey: 'nav.about', lang: language })}
            </Button>
          </Link>
        </Grid>
      </Collapse>
      <Button
        sx={{
          '@keyframes wave': {
            '0%, 100%': {
              transform: 'translateY(0%)',
            },
            '50%': {
              transform: 'translateY(-10%)',
            },
          },
          zIndex: 999,
        }}
        color='secondary'
        size='large'
        onClick={() => setIsShown(!isShown)}
        startIcon={isShown ? <Remove /> : <Add fontSize='large' />}
      >
        {isShown
          ? translate({ tKey: 'general.reduce', lang: language })
          : waveText(translate({ tKey: 'general.readMore', lang: language }))}
      </Button>
      <Grid
        item
        xs={12}
        sx={{
          marginTop: isMobile ? 4 : -6,
          marginBottom: isMobile ? 0 : -10,
          position: 'relative', // new style
          paddingBottom: '56.25%', // for 16:9 aspect ratio
          height: 0, // use padding to determine height
        }}      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',

            width: isMobile ? '100%' : '70%',
            height: isMobile ? '100%' : '70%',
          }}
        >
          <iframe
            style={{
              borderRadius: '1rem',
              border: 'none',
              boxShadow: '2px 2px 10px -2px rgba(0,0,0,0.75)',
              WebkitBoxShadow: '2px 2px 10px -2px rgba(0,0,0,0.75)',
              MozBoxShadow: '2px 2px 10px -2px rgba(0,0,0,0.75)',
              width: '100%', // ensure it covers the full width of the parent
              height: '100%', // ensure it covers the full height of the parent
            }}
            src={
              language === 'fr'
                ? `https://www.youtube.com/embed/CSMDTyNL9FY?si=eOYawGJzEyRcpq1`
                : language === 'en'
                ? `https://www.youtube.com/embed/7-8GrlmSuRo?si=oddS_xeun_B6tc_3`
                : `https://www.youtube.com/embed/4YL9DozzUS4?si=_shwvoxFCrVEOpmm`
            }
            allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            title='Embedded youtube'
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default HeroContent;
