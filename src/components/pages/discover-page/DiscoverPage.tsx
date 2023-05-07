import { Box } from '@mui/material';
import './DiscoverPage.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/swiper.css';
import RandomDishSlide from './random-dish-slide/RandomDishSlide';
import LatestDishSlide from './latest-dish-slide/LatestDishSlide';
import { simpleOpacityAnimation } from '../../../constants/AnimationConfigs';
import Animate from '../../animate/Animate';

const DiscoverPage = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'text.primary' }}>
      <Animate
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
      </Animate>
    </Box>
  );
};

export default DiscoverPage;
