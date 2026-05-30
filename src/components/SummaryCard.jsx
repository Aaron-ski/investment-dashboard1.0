export default function SummaryCard({ label, value, detail, tone = "default" }) {
  const tones = {
    default: "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900",
    green: "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40",
    teal: "border-teal-200 bg-teal-50 dark:border-teal-900 dark:bg-teal-950/40",
    amber: "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40",
  };

  return (
    <article className={`rounded-lg border p-4 shadow-sm ${tones[tone]}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-2 break-words text-2xl font-bold text-slate-950 dark:text-white">
        {value}
      </p>
      {detail ? <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{detail}</p> : null}
    </article>
  );
}
