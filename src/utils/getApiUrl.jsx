import i18n from 'i18next';

export const getApiUrl = (url) => {
  const lang = i18n.language;
  if (lang === 'sv') {
    // If URL already has ?, append with &
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}lang=swedish_sweden`;
  }
  return url; // English (default) has no lang param
};
