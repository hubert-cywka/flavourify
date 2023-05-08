import { UseTransitionProps } from 'react-spring';

export const wobblyAppearAnimation: UseTransitionProps = {
  from: { opacity: 0, transform: 'scale(0)' },
  enter: { opacity: 1, transform: 'scale(1)' },
  config: { friction: 10, tension: 180 }
};

export const simpleOpacityAnimation: UseTransitionProps = {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
  config: { friction: 25, tension: 180, clamp: true }
};
