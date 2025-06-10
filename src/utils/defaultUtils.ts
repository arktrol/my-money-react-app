export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const generateUniqueKey = () => {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};
