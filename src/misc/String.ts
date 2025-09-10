/*eslint no-extend-native: ["error", { "exceptions": ["String"] }]*/

export {};

declare global {
  interface String {
    toNumber(): number;
    toFixedNumber(decimalPlaces: number): number;
    toFixedString(decimalPlaces: number): string;
  }
}

String.prototype.toNumber = function (): number {
  return +this;
};

String.prototype.toFixedNumber = function (decimalPlaces: number): number {
  return this.toNumber().toFixedNumber(decimalPlaces);
};

String.prototype.toFixedString = function (decimalPlaces: number): string {
  return this.toNumber().toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    useGrouping: false,
  });
};
