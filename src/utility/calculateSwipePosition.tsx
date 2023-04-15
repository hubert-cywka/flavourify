export const calculateSwipePosition = (offset: number, bound: number) => {
  if (offset <= 0 && bound > 0) return 0;
  if (offset >= 0 && bound < 0) return 0;
  if (Math.abs(offset) >= Math.abs(bound)) return bound;
  return offset;
};
