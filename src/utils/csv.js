import { formatPreciseCurrency, formatPercent } from "./formatters.js";

const CSV_HEADERS = [
  "Year",
  "Projected Ending Balance",
  "Dollar Growth From Prior Year",
  "Percent Growth From Prior Year",
  "Annual Contribution",
  "Cumulative Contributions",
  "Total Investment Gain",
];

function escapeCsvValue(value) {
  const text = String(value);

  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replaceAll('"', '""')}"`;
  }

  return text;
}

export function buildProjectionCsv(rows) {
  const body = rows.map((row) => [
    row.year,
    formatPreciseCurrency(row.endingBalance),
    formatPreciseCurrency(row.dollarGrowth),
    formatPercent(row.percentGrowth),
    formatPreciseCurrency(row.annualContribution),
    formatPreciseCurrency(row.cumulativeContributions),
    formatPreciseCurrency(row.totalInvestmentGain),
  ]);

  return [CSV_HEADERS, ...body]
    .map((line) => line.map(escapeCsvValue).join(","))
    .join("\n");
}

export function downloadCsv(filename, csvContent) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
