import { Box } from '@mui/material';
import './DiscoverPage.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/swiper.css';
import RandomDishSlide from './random-dish-slide/RandomDishSlide';
import LatestDishSlide from './latest-dish-slide/LatestDishSlide';

const DiscoverPage = () => {
  return (
    <Box
      className="discover-page-container"
      sx={{
        bgcolor: 'primary.main',
        color: 'text.primary'
      }}>
      <Swiper
        className="slide"
        modules={[Pagination]}
        pagination={{
          clickable: true,
          type: 'bullets',
          enabled: true
        }}>
        <SwiperSlide>
          <LatestDishSlide />
        </SwiperSlide>

        <SwiperSlide>
          <RandomDishSlide />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default DiscoverPage;
