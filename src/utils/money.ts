export const moneyFormat = (price: number | string): string => {
  const truncNum = Math.trunc(typeof price === 'string' ? parseInt(price, 10) : price);
  return truncNum.toLocaleString();
};
