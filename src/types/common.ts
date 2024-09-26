type NonNegativeInteger = number & { __nonNegativeInteger__: void };

const isNonNegativeInteger = (value: number): value is NonNegativeInteger => {
  return Number.isInteger(value) && value >= 0;
};

export type { NonNegativeInteger };
export { isNonNegativeInteger };
