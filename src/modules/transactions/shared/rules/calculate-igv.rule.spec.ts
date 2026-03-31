import { calculateIgv } from './calculate-igv.rule';

describe('calculateIgv', () => {
  it('calculates 18% and rounds to 2 decimals', () => {
    expect(calculateIgv(100)).toBe(18);
  });

  it('rounds using fixed 2 decimals', () => {
    expect(calculateIgv(123.45)).toBe(22.22);
  });
});
