export const getUserLanguage = () => {
  const userLanguage = navigator.language || navigator.userLanguage;
  return userLanguage.startsWith('zh') ? 'zh' : 'en';
};
