import React, { useContext, useEffect, useState } from 'react';
import { fetchData } from '@/lib/handlers/fetchData';
import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import ArticleLoading from './ArticleLoading';
import { LanguageContext } from '@/contexts/LanguageContext';
import Image from 'next/image';
import { renderTextWithLineBreaks } from '@/lib/renderTextWithLineBreaks';
import { ArrowBack } from '@mui/icons-material';
import { translate } from '@/lib/translations/translate';
import { useRouter } from 'next/router';

const Article = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState({});
  const { language } = useContext(LanguageContext);

  const router = useRouter();

  const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen width is less than or equal to 600px

  useEffect(() => {
    fetchData('articles', setIsLoading, setArticle, id);
  }, [id]);

  return (
    <Grid
      container
      sx={{
        maxWidth: { xs: '600px', md: '1200px' },
        width: '100%',
        margin: '1.2rem auto',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      {isLoading && <ArticleLoading />}
      {!isLoading && (
        <React.Fragment>
          <Grid
            item
            xs={12}
            sx={{
              marginTop: '-1rem',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 1,
            }}
          >
            <Button startIcon={<ArrowBack />} onClick={() => router.push('/articles')}>
              {translate({ tKey: 'general.back', lang: language })}
            </Button>
            <Typography variant='body2' sx={{ textAlign: 'right' }}>
              Publié le {new Date(article.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h2' mb={1} mt={-1} sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {language === 'en' ? article.enTitle : language === 'it' ? article.itTitle : article.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography mb={article?.videoUrl ? 0 : 2} sx={{ textAlign: 'left' }}>
              {renderTextWithLineBreaks(
                language === 'fr'
                  ? article?.content?.trim() || ''
                  : language === 'it'
                  ? article?.itContent?.trim() || ''
                  : article?.enContent?.trim() || ''
              )}
            </Typography>
          </Grid>
          {article?.videoUrl && (
            <Grid
              item
              xs={12}
              sx={{
                height: 'fit-content',
                marginTop: isMobile ? 4 : -6,
                marginBottom: isMobile ? 0 : -4,
                position: 'relative', // new style
                paddingBottom: '56.25%', // for 16:9 aspect ratio
                height: 0, // use padding to determine height
              }}
            >
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
                      ? article?.videoUrl
                      : language === 'en'
                      ? article?.enVideoUrl
                      : article?.itVideoUrl
                  }
                  allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  title='Embedded youtube'
                />
              </div>
            </Grid>
          )}
          <Grid item xs={12} md={6} sx={{ padding: '1rem' }}>
            <Image
              src={article?.imageUrl}
              style={{
                objectFit: 'contain',
                maxWidth: '600px',
                borderRadius: '10px',
              }}
              layout='responsive'
              alt='Image article'
              width={500}
              height={200}
              // sizes='100vw'
              priority
            />
          </Grid>
          {article?.imageUrl2 && (
            <Grid item xs={12} md={6} sx={{ padding: '1rem' }}>
              <Image
                src={article?.imageUrl2}
                style={{
                  objectFit: 'contain',
                  maxWidth: '600px',
                  borderRadius: '10px',
                }}
                layout='responsive'
                alt='Image article'
                width={500}
                height={200}
                // sizes='100vw'
                priority
              />
            </Grid>
          )}
          {article?.imageUrl3 && (
            <Grid item xs={12} md={6} sx={{ padding: '1rem' }}>
              <Image
                src={article?.imageUrl3}
                style={{
                  objectFit: 'contain',
                  maxWidth: '600px',
                  borderRadius: '10px',
                }}
                layout='responsive'
                alt='Image article'
                width={500}
                height={200}
                // sizes='100vw'
                priority
              />
            </Grid>
          )}
          {article?.imageUrl4 && (
            <Grid item xs={12} md={6} sx={{ padding: '1rem' }}>
              <Image
                src={article?.imageUrl4}
                style={{
                  objectFit: 'contain',
                  maxWidth: '600px',
                  borderRadius: '10px',
                }}
                layout='responsive'
                alt='Image article'
                width={500}
                height={200}
                // sizes='100vw'
                priority
              />
            </Grid>
          )}
        </React.Fragment>
      )}
    </Grid>
  );
};

export default Article;
