import { isGreaterThanMinimumAmount } from './is-greater-than-minimum-amount.rule';

describe('isGreaterThanMinimumAmount', () => {
  it('returns true when amount is greater than min', () => {
    expect(isGreaterThanMinimumAmount(10, 0)).toBe(true);
  });

  it('returns false when amount is equal or lower than min', () => {
    expect(isGreaterThanMinimumAmount(0, 0)).toBe(false);
    expect(isGreaterThanMinimumAmount(-1, 0)).toBe(false);
  });
});
