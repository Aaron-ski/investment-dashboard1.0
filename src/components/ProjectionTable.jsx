import {
  formatCurrency,
  formatPercent,
  formatPreciseCurrency,
} from "../utils/formatters.js";

export default function ProjectionTable({ rows }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-panel dark:border-slate-700 dark:bg-slate-900">
      <div className="border-b border-slate-200 p-5 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-950 dark:text-white">
          Year-by-Year Projection
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Values are rounded for display. Monthly calculations keep full
          precision.
        </p>
      </div>

      <div className="dashboard-scrollbar overflow-x-auto">
        <table className="min-w-[980px] w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3 font-semibold">Year</th>
              <th className="px-4 py-3 font-semibold">Ending Balance</th>
              <th className="px-4 py-3 font-semibold">Dollar Growth</th>
              <th className="px-4 py-3 font-semibold">Percent Growth</th>
              <th className="px-4 py-3 font-semibold">Annual Contribution</th>
              <th className="px-4 py-3 font-semibold">Cumulative Contributions</th>
              <th className="px-4 py-3 font-semibold">Investment Gain</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map((row) => (
              <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/70">
                <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                  {row.year}
                </td>
                <td className="px-4 py-3 font-semibold text-slate-950 dark:text-white">
                  {formatCurrency(row.endingBalance)}
                </td>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                  {formatPreciseCurrency(row.dollarGrowth)}
                </td>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                  {formatPercent(row.percentGrowth)}
                </td>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                  {formatPreciseCurrency(row.annualContribution)}
                </td>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                  {formatPreciseCurrency(row.cumulativeContributions)}
                </td>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                  {formatPreciseCurrency(row.totalInvestmentGain)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
