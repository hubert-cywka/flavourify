export const setCustomViewportHeightVariable = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

export const setCustomViewportWidthVariable = () => {
  const vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
};

export const setCustomViewportSizeVariableUpdater = () => {
  window.addEventListener('resize', () => {
    setCustomViewportHeightVariable();
    setCustomViewportWidthVariable();
  });
};
