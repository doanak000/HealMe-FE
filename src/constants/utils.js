export const debounce = (callback, wait) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, wait);
  };
};

export const isLoginLayout = (href) => {
  return href.includes('login') || href.includes('register');
}
