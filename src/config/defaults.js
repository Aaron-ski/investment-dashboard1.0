export const DEFAULT_INPUTS = {
  startingBalance: 200000,
  annualContribution: 23000,
  annualReturnRate: 10,
  years: 35,
};

export const DEFAULT_COMPARISON = {
  annualContribution: 30000,
  annualReturnRate: 8,
};

export const INPUT_RANGES = {
  startingBalance: {
    min: 0,
    max: 5000000,
    step: 1000,
  },
  annualContribution: {
    min: 0,
    max: 100000,
    step: 500,
  },
  annualReturnRate: {
    min: 0,
    max: 15,
    step: 0.25,
  },
  years: {
    min: 1,
    max: 35,
    step: 1,
  },
};
