import { Box } from '@mui/material';
import './DiscoverPage.scss';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';
import LatestDishSlide from 'pages/discover-page/latest-dish-slide/LatestDishSlide';
import RandomDishSlide from 'pages/discover-page/random-dish-slide/RandomDishSlide';
import { simpleOpacityAnimation } from 'shared/constants/AnimationConfigs';
import AnimatePresence from 'components/animate-presence/AnimatePresence';

const DiscoverPage = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'text.primary' }}>
      <AnimatePresence
        className="discover-page-container"
        isVisible={true}
        animation={simpleOpacityAnimation}>
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
            type: 'bullets',
            enabled: true
          }}>
          <SwiperSlide className="slide">
            <LatestDishSlide />
          </SwiperSlide>

          <SwiperSlide className="slide">
            <RandomDishSlide />
          </SwiperSlide>
        </Swiper>
      </AnimatePresence>
    </Box>
  );
};

export default DiscoverPage;
