import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "../utils/formatters.js";

export default function ProjectionChart({ data, showComparison, isDarkMode }) {
  const chartColors = isDarkMode
    ? {
        grid: "#334155",
        text: "#cbd5e1",
        axis: "#475569",
        tooltipBackground: "#111827",
        tooltipBorder: "#475569",
        tooltipText: "#f8fafc",
      }
    : {
        grid: "#e2e8f0",
        text: "#475569",
        axis: "#cbd5e1",
        tooltipBackground: "#ffffff",
        tooltipBorder: "#cbd5e1",
        tooltipText: "#172033",
      };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">
            Projected Balance Over Time
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Year-end balances from monthly deposits and monthly compounding.
          </p>
        </div>
      </div>

      <div className="h-[360px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 12, right: 20, bottom: 8, left: 12 }}
          >
            <CartesianGrid stroke={chartColors.grid} strokeDasharray="4 4" />
            <XAxis
              dataKey="year"
              tick={{ fill: chartColors.text, fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: chartColors.axis }}
              label={{
                value: "Year",
                position: "insideBottom",
                offset: -2,
                fill: chartColors.text,
              }}
            />
            <YAxis
              tickFormatter={formatCurrency}
              tick={{ fill: chartColors.text, fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: chartColors.axis }}
              width={84}
            />
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              labelFormatter={(label) => `Year ${label}`}
              contentStyle={{
                borderRadius: 8,
                backgroundColor: chartColors.tooltipBackground,
                border: `1px solid ${chartColors.tooltipBorder}`,
                color: chartColors.tooltipText,
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
              }}
            />
            <Legend verticalAlign="top" height={32} />
            <Line
              type="monotone"
              dataKey="primaryBalance"
              name="Primary scenario"
              stroke="#0f766e"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
            />
            {showComparison ? (
              <Line
                type="monotone"
                dataKey="comparisonBalance"
                name="Comparison scenario"
                stroke="#b45309"
                strokeWidth={3}
                strokeDasharray="8 5"
                dot={false}
                activeDot={{ r: 6 }}
              />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
