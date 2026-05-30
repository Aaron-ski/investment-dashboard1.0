import { AlertTriangle, Calculator } from "lucide-react";

export default function AssumptionsPanel() {
  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <Calculator className="mt-0.5 h-5 w-5 text-teal-700" aria-hidden />
          <div>
            <h2 className="text-base font-bold text-slate-950">
              Formula Assumptions
            </h2>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
              <li>Annual contribution is divided into 12 equal monthly deposits.</li>
              <li>Annual return is divided into 12 monthly return periods.</li>
              <li>The dashboard records projected balances at each year end.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-700" aria-hidden />
          <div>
            <h2 className="text-base font-bold text-slate-950">
              Projection Disclaimer
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              These projections are estimates for planning and portfolio
              exploration. Actual investment returns vary and are not guaranteed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
