export const percentage = (num: number, per: number) => (num / 100) * per;

export const currentPrice = (price: number, discount: number) =>
  Math.round((price - percentage(price, discount)) * 100) / 100;
