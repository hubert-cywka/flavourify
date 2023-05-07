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

export const fluentGrowAnimation: UseTransitionProps = {
  from: { opacity: 0, width: '0%' },
  enter: { opacity: 1, width: '80%' },
  leave: { opacity: 0, width: '0%' },
  config: { clamp: true }
};

export const expandCollapseAnimation: UseTransitionProps = {
  from: { opacity: 0, maxHeight: '0px' },
  enter: { opacity: 1, maxHeight: '200px' },
  leave: { opacity: 0, maxHeight: '0px' },
  config: { friction: 15, tension: 120, clamp: true }
};

export const slideFromBottom: UseTransitionProps = {
  from: { transform: 'translateY(120%)' },
  enter: { transform: 'translateY(0%)' },
  leave: { transform: 'translateY(120%)' },
  config: { clamp: true }
};

export const slideFromLeft: UseTransitionProps = {
  from: { transform: 'translateX(-120%)' },
  enter: { transform: 'translateX(0%)' },
  leave: { transform: 'translateX(-120%)' },
  config: { clamp: true }
};

export const slideFromRight: UseTransitionProps = {
  from: { transform: 'translateX(120%)' },
  enter: { transform: 'translateX(0%)' },
  leave: { transform: 'translateX(120%)' },
  initial: { from: false },
  config: { clamp: true }
};
