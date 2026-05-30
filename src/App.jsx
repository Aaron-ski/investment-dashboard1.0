import { useMemo, useState } from "react";
import { Download, Moon, RotateCcw, Sun } from "lucide-react";
import AssumptionsPanel from "./components/AssumptionsPanel.jsx";
import InputControl from "./components/InputControl.jsx";
import ProjectionChart from "./components/ProjectionChart.jsx";
import ProjectionTable from "./components/ProjectionTable.jsx";
import SummaryCard from "./components/SummaryCard.jsx";
import {
  DEFAULT_COMPARISON,
  DEFAULT_INPUTS,
  INPUT_RANGES,
  MANUAL_INPUT_LIMITS,
} from "./config/defaults.js";
import { buildProjectionCsv, downloadCsv } from "./utils/csv.js";
import {
  formatCurrency,
  formatPreciseCurrency,
  formatRate,
} from "./utils/formatters.js";
import { calculateProjection, clampNumber } from "./utils/projections.js";

function normalizeValue(key, value) {
  return key === "years"
    ? Math.round(Number(value))
    : Number.parseFloat(value);
}

function sanitizeSliderValue(key, value) {
  const range = INPUT_RANGES[key];
  return clampNumber(normalizeValue(key, value), range.min, range.max);
}

function sanitizeManualValue(key, value) {
  return clampNumber(
    normalizeValue(key, value),
    INPUT_RANGES[key].min,
    MANUAL_INPUT_LIMITS[key],
  );
}

function App() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [comparisonEnabled, setComparisonEnabled] = useState(true);
  const [comparison, setComparison] = useState(DEFAULT_COMPARISON);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const primaryProjection = useMemo(
    () => calculateProjection(inputs),
    [inputs],
  );

  const comparisonProjection = useMemo(
    () =>
      calculateProjection({
        ...inputs,
        annualContribution: comparison.annualContribution,
        annualReturnRate: comparison.annualReturnRate,
      }),
    [comparison, inputs],
  );

  const chartData = useMemo(
    () =>
      primaryProjection.rows.map((row, index) => ({
        year: row.year,
        primaryBalance: row.endingBalance,
        comparisonBalance: comparisonProjection.rows[index]?.endingBalance,
      })),
    [comparisonProjection.rows, primaryProjection.rows],
  );

  const finalComparisonBalance = comparisonProjection.finalBalance;

  function updateInput(key, value) {
    setInputs((current) => ({
      ...current,
      [key]: sanitizeManualValue(key, value),
    }));
  }

  function updateInputFromSlider(key, value) {
    setInputs((current) => ({
      ...current,
      [key]: sanitizeSliderValue(key, value),
    }));
  }

  function updateComparison(key, value) {
    setComparison((current) => ({
      ...current,
      [key]: sanitizeManualValue(key, value),
    }));
  }

  function updateComparisonFromSlider(key, value) {
    setComparison((current) => ({
      ...current,
      [key]: sanitizeSliderValue(key, value),
    }));
  }

  function resetInputs() {
    setInputs(DEFAULT_INPUTS);
    setComparison(DEFAULT_COMPARISON);
    setComparisonEnabled(true);
  }

  function exportCsv() {
    downloadCsv(
      "investment-growth-projection.csv",
      buildProjectionCsv(primaryProjection.rows),
    );
  }

  return (
    <main className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-[#f6f8fb] transition-colors dark:bg-slate-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 dark:border-slate-800 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-400">
              Investment growth planner
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">
              Interactive Investment Growth Dashboard
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Estimate future portfolio value with monthly contributions,
              monthly compounding, scenario comparison, CSV export, and a
              spreadsheet-style annual detail table.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800"
              title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              type="button"
              onClick={() => setIsDarkMode((current) => !current)}
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" aria-hidden />
              ) : (
                <Moon className="h-4 w-4" aria-hidden />
              )}
              {isDarkMode ? "Light" : "Dark"}
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800"
              type="button"
              onClick={resetInputs}
            >
              <RotateCcw className="h-4 w-4" aria-hidden />
              Reset
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
              type="button"
              onClick={exportCsv}
            >
              <Download className="h-4 w-4" aria-hidden />
              Export CSV
            </button>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel dark:border-slate-700 dark:bg-slate-900">
            <div>
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                Projection Inputs
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Type exact values or use sliders. Updates apply immediately.
              </p>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <InputControl
                label="Starting balance"
                helperText="Current investment account balance."
                value={inputs.startingBalance}
                prefix="$"
                displayValue={formatPreciseCurrency(inputs.startingBalance)}
                {...INPUT_RANGES.startingBalance}
                onChange={(value) => updateInput("startingBalance", value)}
                onSliderChange={(value) =>
                  updateInputFromSlider("startingBalance", value)
                }
              />
              <InputControl
                label="Annual contribution"
                helperText="Total planned contribution across the year."
                value={inputs.annualContribution}
                prefix="$"
                displayValue={formatPreciseCurrency(inputs.annualContribution)}
                {...INPUT_RANGES.annualContribution}
                onChange={(value) => updateInput("annualContribution", value)}
                onSliderChange={(value) =>
                  updateInputFromSlider("annualContribution", value)
                }
              />
              <InputControl
                label="Expected annual return"
                helperText="Estimated nominal annual return rate."
                value={inputs.annualReturnRate}
                suffix="%"
                displayValue={formatRate(inputs.annualReturnRate)}
                {...INPUT_RANGES.annualReturnRate}
                onChange={(value) => updateInput("annualReturnRate", value)}
                onSliderChange={(value) =>
                  updateInputFromSlider("annualReturnRate", value)
                }
              />
              <InputControl
                label="Years projected"
                helperText="Projection horizon from 0 to 100 years."
                value={inputs.years}
                displayValue={`${inputs.years} years`}
                {...INPUT_RANGES.years}
                onChange={(value) => updateInput("years", value)}
                onSliderChange={(value) =>
                  updateInputFromSlider("years", value)
                }
              />
            </div>
          </div>

          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel dark:border-slate-700 dark:bg-slate-900">
            <label className="flex cursor-pointer items-center justify-between gap-4">
              <span>
                <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Compare scenario
                </span>
                <span className="block text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Test another contribution and return rate.
                </span>
              </span>
              <input
                className="h-5 w-5 accent-teal-700 dark:accent-teal-400"
                type="checkbox"
                checked={comparisonEnabled}
                onChange={(event) => setComparisonEnabled(event.target.checked)}
              />
            </label>

            {comparisonEnabled ? (
              <div className="mt-4 grid gap-4 border-t border-slate-200 pt-4 dark:border-slate-700">
                <InputControl
                  label="Comparison contribution"
                  helperText="Alternate annual contribution."
                  value={comparison.annualContribution}
                  prefix="$"
                  displayValue={formatPreciseCurrency(
                    comparison.annualContribution,
                  )}
                  {...INPUT_RANGES.annualContribution}
                  onChange={(value) =>
                    updateComparison("annualContribution", value)
                  }
                  onSliderChange={(value) =>
                    updateComparisonFromSlider("annualContribution", value)
                  }
                />
                <InputControl
                  label="Comparison return"
                  helperText="Alternate expected annual return."
                  value={comparison.annualReturnRate}
                  suffix="%"
                  displayValue={formatRate(comparison.annualReturnRate)}
                  {...INPUT_RANGES.annualReturnRate}
                  onChange={(value) =>
                    updateComparison("annualReturnRate", value)
                  }
                  onSliderChange={(value) =>
                    updateComparisonFromSlider("annualReturnRate", value)
                  }
                />
                <div className="text-sm text-slate-700 dark:text-slate-300">
                  Comparison final balance:
                  <span className="ml-1 font-bold text-slate-950 dark:text-white">
                    {formatCurrency(finalComparisonBalance)}
                  </span>
                </div>
              </div>
            ) : null}
          </aside>
        </section>

        <section>
          <div className="mb-3">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Projection Results
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Summary metrics for your primary investment scenario.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          <SummaryCard
            label="Final balance"
            value={formatCurrency(primaryProjection.finalBalance)}
            detail={`After ${inputs.years} years`}
            tone="green"
          />
          <SummaryCard
            label="Starting balance"
            value={formatCurrency(inputs.startingBalance)}
            detail="Initial account value"
          />
          <SummaryCard
            label="Total contributed"
            value={formatCurrency(primaryProjection.totalContributed)}
            detail="Planned deposits"
            tone="teal"
          />
          <SummaryCard
            label="Investment growth"
            value={formatCurrency(primaryProjection.totalInvestmentGain)}
            detail="Growth beyond deposits"
            tone="amber"
          />
          <SummaryCard
            label="Annual return"
            value={formatRate(inputs.annualReturnRate)}
            detail="Expected rate"
          />
          <SummaryCard
            label="Years projected"
            value={inputs.years}
            detail="Projection horizon"
          />
          <SummaryCard
            label="Monthly contribution"
            value={formatPreciseCurrency(primaryProjection.monthlyContribution)}
            detail="Annual contribution / 12"
          />
          </div>
        </section>

        <ProjectionChart
          data={chartData}
          showComparison={comparisonEnabled}
          isDarkMode={isDarkMode}
        />

        <AssumptionsPanel />
        <ProjectionTable rows={primaryProjection.rows} />
      </div>
      </div>
    </main>
  );
}

export default App;
