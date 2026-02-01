const smallScreenQuery = typeof window !== 'undefined' ? window.matchMedia('(max-width: 450px)') : null;
const isSmallScreen = () => smallScreenQuery?.matches ?? false;
const subscribeSmallScreen = (callback) => {
  if (!smallScreenQuery) {
    return () => {};
  }
  const listener = (event) => callback(event.matches);
  smallScreenQuery.addEventListener('change', listener);
  return () => smallScreenQuery.removeEventListener('change', listener);
};
export { isSmallScreen, subscribeSmallScreen };
