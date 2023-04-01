import { Box } from '@mui/material';
import './AuthenticationPage.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import SwiperRef from 'swiper';
import SignInSlide from './sign-in-slide/SignInSlide';
import SignUpSlide from './sign-up-slide/SignUpSlide';

const AuthenticationPage = () => {
  const [swiperRef, setSwiperRef] = useState<SwiperRef | null>(null);

  const swapSlide = () => {
    swiperRef?.slideNext();
  };

  return (
    <Box
      sx={{ bgcolor: 'primary.main', color: 'text.primary' }}
      className="authentication-page-container">
      <Swiper
        direction="horizontal"
        loop
        slidesPerView={1}
        onSwiper={setSwiperRef}
        allowTouchMove={false}>
        <SwiperSlide>
          <SignInSlide slideToSignUp={swapSlide} />
        </SwiperSlide>
        <SwiperSlide>
          <SignUpSlide slideToSignIn={swapSlide} />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default AuthenticationPage;
