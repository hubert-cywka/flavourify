import { animated, useTransition, UseTransitionProps } from 'react-spring';
import { PropsWithChildren } from 'react';

interface AnimateProps {
  isVisible: boolean;
  animation: UseTransitionProps;
  className?: string;
}

const Animate = ({
  isVisible,
  children,
  className,
  animation
}: PropsWithChildren<AnimateProps>) => {
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

export default Animate;
