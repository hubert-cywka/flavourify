import { UseTransitionProps } from 'react-spring';

export const simpleOpacityAnimation: UseTransitionProps = {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
  config: { friction: 25, tension: 180, clamp: true }
};
