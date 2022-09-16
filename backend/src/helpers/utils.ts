export const escapeRegExp = (str: string) => {
  if (str)
    return diacriticSensitiveRegex(str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  else return str;
};
export const diacriticSensitiveRegex = (text: string) => {
  return text
    .replace(/a/g, '[a,á,à,ä]')
    .replace(/e/g, '[e,é,ë]')
    .replace(/i/g, '[i,í,ï]')
    .replace(/o/g, '[o,ó,ö,ò]')
    .replace(/u/g, '[u,ü,ú,ù]');
};
