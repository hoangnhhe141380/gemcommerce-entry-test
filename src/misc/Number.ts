/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/

export {};

declare global {
  interface Number {
    toNumber(): number;
    toFixedNumber(decimalPlaces: number): number;
    toFixedString(decimalPlaces: number): string;
  }
}

Number.prototype.toNumber = function (): number {
  return +this;
};

Number.prototype.toFixedNumber = function (decimalPlaces: number): number {
  return parseFloat((Math.round((this as number) * 10 ** decimalPlaces) / 10 ** decimalPlaces).toString());
};

Number.prototype.toFixedString = function (decimalPlaces: number): string {
  return this.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    useGrouping: false,
  });
};
