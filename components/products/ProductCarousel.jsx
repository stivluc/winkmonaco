import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { Box, Skeleton, useMediaQuery } from '@mui/material';

const ImageCarousel = ({ pictures }) => {
  const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen width is less than or equal to 600px

  const settings = {
    autoplay: isMobile ? false : true,
    autoplaySpeed: 4000,
    cssEase: 'linear',
    dots: true,
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    pauseOnHover: true,
  };

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <Slider {...settings} style={{ marginBottom: '2rem', height: isMobile ? '18rem' : '20rem' }}>
        {pictures.map((picture, index) => (
          <Box key={index} sx={{ padding: '0 5px' }}>
            <Image
              width={270}
              height={318}
              sizes='100vw'
              priority
              style={{
                objectFit: 'cover',
                maxWidth: isMobile ? '80vw' : '500px',
                borderRadius: '10px',
                border: '1px solid lightgray',
                margin: 'auto 0.4rem',
              }}
              src={picture.imgPath}
              alt={`Slide ${index}`}
            />
          </Box>
        ))}
      </Slider>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '15px',
          left: 0,
          pointerEvents: 'none',
          background: 'linear-gradient(to right, rgba(255,255,255,0.5), transparent)',
          zIndex: 2,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '15px',
          right: 0,
          pointerEvents: 'none',
          background: 'linear-gradient(to left, rgba(255,255,255,0.5), transparent)',
          zIndex: 2,
        }}
      />
    </Box>
  );
};

export default ImageCarousel;
