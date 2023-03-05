import { Box } from '@mui/material';
import './DiscoverPage.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/swiper.css';
import RandomDishSlide from './random-dish-slide/RandomDishSlide';
import LatestDishSlide from './latest-dish-slide/LatestDishSlide';
import { AnimatePresence, motion } from 'framer-motion';
import { DISCOVER_PAGE_MOTION } from '../../../constants/MotionKeyConstants';

const DiscoverPage = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'text.primary' }}>
      <AnimatePresence>
        <motion.div
          className="discover-page-container"
          key={DISCOVER_PAGE_MOTION}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
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
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default DiscoverPage;
