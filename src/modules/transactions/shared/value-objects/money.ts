export class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: string,
  ) {}

  static create(amount: number, currency: string): Money {
    return new Money(amount, currency);
  }
}
