import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import ContactLoading from '../loading/ContactLoading';
import { Person } from '@mui/icons-material';
import { fetchData } from '@/lib/handlers/fetchData';

const ContactCard = ({ language, french, english, italian }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  if (english) {
    language = 'en';
  }

  if (italian) {
    language = 'it';
  }

  if (french) {
    language = 'fr';
  }

  const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen width is less than or equal to 600px

  useEffect(() => {
    fetchData('contacts', setIsLoading, setData, 'singleDocument');
  }, []);

  return (
    <Box sx={{ display: 'flex', gap: isMobile ? '0.7rem' : '1rem', flexDirection: 'row' }}>
      {isLoading && <ContactLoading/>}
      {!isLoading && (
        <React.Fragment>
          {((data?.profilePicFr && language === 'fr') || (data?.profilePicEn && language === 'en') || (data?.profilePicIt && language === 'it')) && (
            <Image
              priority
              alt={(language === 'fr') ? 'Photo de profil FR' : (language === 'en') ? 'Photo de profil EN' : (language === 'it') ? 'Photo de profil FR' : 'Photo de profil'}
              width={isMobile ? 80 : 120}
              height={isMobile ? 80 : 120}
              style={{ borderRadius: '50%', margin: isMobile ? 'auto' : '' }}
              src={(language === 'fr') ? data.profilePicFr : (language === 'en') ? data.profilePicEn : data.profilePicIt}
            />
          )}
          {((!data?.profilePicFr && language === 'fr') || (!data?.profilePicEn && language === 'en') || (!data?.profilePicIt && language === 'it')) && (
            <Avatar
              sx={{
                width: isMobile ? 80 : 120,
                height: isMobile ? 80 : 120,
                backgroundColor: 'primary.main',
                margin: isMobile ? 'auto' : '',
              }}
            >
              <Person sx={{ width: isMobile ? 53 : 80, height: isMobile ? 53 : 80, backgroundColor: 'primary.main' }}/>
            </Avatar>
          )}

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'left',
              padding: '5px 0',
            }}
          >
            <Typography
              variant='body1'>{
              language === 'fr' ?
                data?.fullNameFr || 'Nom FR' :
                language === 'en' ?
                  data?.fullNameEn || 'Nom FR' :
                  language === 'it' ?
                    data?.fullNameIt || 'Nom IT' :
                    'Nom complet'
            }
            </Typography>
            <Link
              style={{ textDecoration: 'none' }}
              href={`tel:${language === 'fr'
                ? data?.frTel?.replace(/\s/g, '')
                : language === 'en'
                  ? data?.enTel?.replace(/\s/g, '')
                  : language === 'it'
                    ? data?.itTel?.replace(/\s/g, '')
                    : ''
              }`}
            >
              <Typography variant={isMobile ? 'body2' : 'body1'}>
                {language === 'fr'
                  ? data?.frTel || 'Numéro tél (FR)'
                  : language === 'en'
                    ? data?.enTel || 'Numéro tél (EN)'
                    : language === 'it'
                      ? data?.itTel || 'Numéro tél (IT)'
                      : 'Numéro tél'
                }
              </Typography>
            </Link>
            <Link style={{ textDecoration: 'none' }} href={`mailto:${data?.email?.trim()}`}>
              <Typography variant={isMobile ? 'body2' : 'body1'}>{data?.email || 'email@a-renseigner.com'}</Typography>
            </Link>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default React.memo(ContactCard);
