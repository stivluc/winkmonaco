import React, { useState, useEffect } from 'react';
import { Typography, Fade, Grid, Pagination, Button } from '@mui/material';
import ArticlesLoading from './ArticlesLoading';
import { useRouter } from 'next/router';
import { DateFilter } from './DateFilter';
import { ArticleCard } from './ArticleCard';
import { filterByDate } from '@/lib/handlers/filterByDate';
import NoResults from './NoResults';
import dayjs from 'dayjs';
import { ArrowBack } from '@mui/icons-material';
import { translate } from '@/lib/translations/translate';

export const ArticlesPage = ({ data, language }) => {
  // Pagination state
  const [page, setPage] = useState(1);
  const articlesPerPage = 8;

  const [selectedStartDate, setSelectedStartDate] = useState(dayjs().startOf('year'));
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const router = useRouter();

  // Calculate the index of the first and last articles on the current page
  const indexOfLastArticle = page * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  const handleClick = (id) => {
    router.push(`/articles/${id}`);
  };

  useEffect(() => {
    const sortedArticles = filterByDate(data, selectedStartDate, selectedEndDate);
    setFilteredData(sortedArticles);
    setPage(1);
  }, [data, selectedStartDate, selectedEndDate]);

  // Update the list of articles based on the current page
  const currentArticles = filteredData.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <Fade in={true} timeout={1000}>
      <Grid
        container
        sx={{
          maxWidth: { xs: '600px', md: '1200px' },
          width: '100%',
          margin: '-1rem auto auto',
          justifyContent: 'flex-start',
          textAlign: 'center',
        }}
      >
        <Button startIcon={<ArrowBack />} onClick={() => router.push('/')}>
          {translate({ tKey: 'general.back', lang: language })}
        </Button>
        <Grid item xs={12}>
          <Typography variant='h1' sx={{ display: 'none' }}>
            {translate({ tKey: 'articles.title', lang: language })}
          </Typography>
          <Typography variant='h2' mb={1}>
            {translate({ tKey: 'articles.title', lang: language })}
          </Typography>
        </Grid>
        {/*{loading ? (
          <ArticlesLoading />
        ) : !loading && data.length === 0 ? (
          <NoResults language={language} />
        ) : */}

        <React.Fragment>
          <Typography variant='h1' sx={{ display: 'none' }}>
            {translate({ tKey: 'articles.title', lang: language })}
          </Typography>
          <DateFilter
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            handleStartDateChange={setSelectedStartDate}
            handleEndDateChange={setSelectedEndDate}
            language={language}
          />
          {currentArticles.length === 0 && <NoResults filter language={language} year={selectedStartDate} />}
          {currentArticles.map((article) => (
            <ArticleCard
              key={article.title + Math.random()}
              article={article}
              handleClick={handleClick}
              language={language}
            />
          ))}
          {/* Pagination */}
          <Grid item xs={12} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={Math.ceil(filteredData.length / articlesPerPage)}
              page={page}
              onChange={(e, val) => setPage(val)}
              size='large'
              color='primary'
              showFirstButton
              showLastButton
              siblingCount={1}
              boundaryCount={1}
            />
          </Grid>
        </React.Fragment>
      </Grid>
    </Fade>
  );
};
