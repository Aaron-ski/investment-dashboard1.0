export default function InputControl({
  label,
  helperText,
  value,
  min,
  max,
  step,
  type = "number",
  suffix,
  prefix,
  displayValue,
  onChange,
  onSliderChange = onChange,
}) {
  const sliderValue = Math.min(Math.max(Number(value) || 0, min), max);

  return (
    <label className="grid gap-2">
      <span className="flex items-center justify-between gap-3">
        <span>
          <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
            {label}
          </span>
          <span className="block text-xs leading-5 text-slate-500 dark:text-slate-400">
            {helperText}
          </span>
        </span>
        <span className="shrink-0 rounded bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {displayValue ?? `${prefix ?? ""}${value}${suffix ?? ""}`}
        </span>
      </span>
      <input
        className="dashboard-slider my-4 h-3 w-full cursor-pointer rounded-full bg-slate-200 dark:bg-slate-700"
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={(event) => onSliderChange(event.target.value)}
      />
      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 dark:text-slate-400">
            {prefix}
          </span>
        ) : null}
        <input
          className={`w-full rounded border border-slate-300 bg-white py-2 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-900 ${
            prefix ? "pl-8 pr-3" : "px-3"
          } ${suffix ? "pr-10" : ""}`}
          type={type}
          min={min}
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 dark:text-slate-400">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}
