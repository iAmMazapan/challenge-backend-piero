export const calculateTotalWithIgv = (amount: number, igv: number): number => {
  return Number((amount + igv).toFixed(2));
};
