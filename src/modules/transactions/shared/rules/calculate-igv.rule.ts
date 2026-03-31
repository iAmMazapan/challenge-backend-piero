export const calculateIgv = (amount: number): number => {
  return Number((amount * 0.18).toFixed(2));
};
