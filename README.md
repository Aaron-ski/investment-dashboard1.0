# Interactive Investment Growth Dashboard

A single-page React dashboard that replaces a recurring investment projection spreadsheet. The app lets users model account growth over 1 to 35 years using starting balance, annual contributions, expected annual return, and a monthly contribution schedule.

## Features

- Interactive sliders and exact number inputs for all projection assumptions
- Monthly contribution and monthly compounding calculation engine
- Summary cards for final balance, contributions, investment growth, return rate, years, and monthly contribution
- Recharts line chart for projected year-end account value
- Optional comparison scenario for testing a second return rate and annual contribution
- Year-by-year table with balance, dollar growth, percent growth, cumulative contributions, and total investment gain
- CSV export for the annual projection table
- Reset button to restore default assumptions

## Default Values

| Input | Default |
| --- | ---: |
| Starting balance | $0 |
| Annual contribution | $23,000 |
| Expected annual return | 10.00% |
| Years projected | 25 |

## Formula Assumptions

The dashboard assumes contributions happen evenly throughout the year:

```txt
monthlyContribution = annualContribution / 12
monthlyReturnRate = annualReturnRate / 12
balance = balance * (1 + monthlyReturnRate) + monthlyContribution
```

Balances are calculated each month and recorded at the end of every 12th month. Display values are rounded for readability, but intermediate monthly calculations are not rounded.

## Install and Run Locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal, usually `http://localhost:5173`.

## Build

```bash
npm run build
```

## Future Improvements

- Add contribution frequency options: monthly, beginning of year, and end of year
- Add inflation-adjusted future value
- Add tax-adjusted assumptions
- Save multiple scenarios in local storage
- Add milestone tracking for balances such as $500k, $1M, and $2M

## Disclaimer

This app is for planning and education. Projection outputs are estimates and are not guaranteed investment returns.
