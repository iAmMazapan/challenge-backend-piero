import { calculateTotalWithIgv } from './calculate-total-with-igv.rule';

describe('calculateTotalWithIgv', () => {
  it('adds amount and igv', () => {
    expect(calculateTotalWithIgv(100, 18)).toBe(118);
  });

  it('rounds to 2 decimals', () => {
    expect(calculateTotalWithIgv(10.555, 1.899)).toBe(12.45);
  });
});
