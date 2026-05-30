export const DEFAULT_INPUTS = {
  startingBalance: 0,
  annualContribution: 23000,
  annualReturnRate: 10,
  years: 25,
};

export const DEFAULT_COMPARISON = {
  annualContribution: 30000,
  annualReturnRate: 8,
};

export const INPUT_RANGES = {
  startingBalance: {
    min: 0,
    max: 1000000,
    step: 1000,
  },
  annualContribution: {
    min: 0,
    max: 100000,
    step: 500,
  },
  annualReturnRate: {
    min: 0,
    max: 100,
    step: 1,
  },
  years: {
    min: 0,
    max: 100,
    step: 1,
  },
};

export const MANUAL_INPUT_LIMITS = {
  startingBalance: 1000000000000,
  annualContribution: 1000000000000,
  annualReturnRate: 1000,
  years: 1000,
};
