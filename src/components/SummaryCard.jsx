export default function SummaryCard({ label, value, detail, tone = "default" }) {
  const tones = {
    default: "border-slate-200 bg-white",
    green: "border-emerald-200 bg-emerald-50",
    teal: "border-teal-200 bg-teal-50",
    amber: "border-amber-200 bg-amber-50",
  };

  return (
    <article className={`rounded-lg border p-4 shadow-sm ${tones[tone]}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 break-words text-2xl font-bold text-slate-950">
        {value}
      </p>
      {detail ? <p className="mt-1 text-sm text-slate-600">{detail}</p> : null}
    </article>
  );
}
