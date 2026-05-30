export function clampNumber(value, min, max) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return min;
  }

  return Math.min(Math.max(numericValue, min), max);
}

export function calculateProjection({
  startingBalance,
  annualContribution,
  annualReturnRate,
  years,
}) {
  const monthlyContribution = annualContribution / 12;
  const monthlyReturnRate = annualReturnRate / 100 / 12;
  const rows = [];
  let balance = startingBalance;
  let previousYearEndingBalance = startingBalance;

  for (let month = 1; month <= years * 12; month += 1) {
    // Contributions are modeled as 12 equal deposits and returns compound monthly.
    balance = balance * (1 + monthlyReturnRate) + monthlyContribution;

    if (month % 12 === 0) {
      const year = month / 12;
      const cumulativeContributions = annualContribution * year;
      const dollarGrowth = balance - previousYearEndingBalance;
      const percentGrowth =
        previousYearEndingBalance === 0
          ? 0
          : dollarGrowth / previousYearEndingBalance;
      const totalInvestmentGain =
        balance - startingBalance - cumulativeContributions;

      rows.push({
        year,
        endingBalance: balance,
        dollarGrowth,
        percentGrowth,
        annualContribution,
        cumulativeContributions,
        totalInvestmentGain,
      });

      previousYearEndingBalance = balance;
    }
  }

  const finalBalance = rows.at(-1)?.endingBalance ?? startingBalance;
  const totalContributed = annualContribution * years;

  return {
    rows,
    finalBalance,
    monthlyContribution,
    totalContributed,
    totalInvestmentGain: finalBalance - startingBalance - totalContributed,
  };
}
