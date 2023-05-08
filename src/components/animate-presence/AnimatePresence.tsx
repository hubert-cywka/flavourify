import { animated, useTransition, UseTransitionProps } from 'react-spring';
import { PropsWithChildren } from 'react';

interface AnimatePresenceProps {
  isVisible: boolean;
  animation: UseTransitionProps;
  className?: string;
}

const AnimatePresence = ({
  isVisible,
  children,
  className,
  animation
}: PropsWithChildren<AnimatePresenceProps>) => {
  const transition = useTransition(isVisible, { ...animation });

  return transition(
    (style, visible) =>
      visible && (
        <animated.div className={className} style={style}>
          {children}
        </animated.div>
      )
  );
};

export default AnimatePresence;
