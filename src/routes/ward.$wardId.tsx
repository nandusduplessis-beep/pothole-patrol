import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PlayerCardStack } from "@/components/stophole";
import {
  getWard,
  sortedCandidates,
  daysUntilElection,
  formatZar,
  formatZarCompact,
  type Ward,
  type Candidate,
} from "@/data/seed";

export const Route = createFileRoute("/ward/$wardId")({
  loader: ({ params }): { ward: Ward; ranked: Candidate[]; daysLeft: number } => {
    const ward = getWard(params.wardId);
    if (!ward) throw notFound();
    return { ward, ranked: sortedCandidates(ward), daysLeft: daysUntilElection() };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `Ward ${loaderData.ward.number} — ${loaderData.ward.area} | Stophole`
          : "Ward card | Stophole",
      },
    ],
  }),
  component: WardCardRoute,
});

function Cat({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="sh-ward__cat">
      <h3 className="sh-ward__cat-h">{title}</h3>
      {children}
    </section>
  );
}
function Stat({
  k, v, n, wide, tone,
}: { k: string; v: React.ReactNode; n?: string; wide?: boolean; tone?: "accent" | "bad" }) {
  return (
    <div className={`sh-ward__stat${wide ? " sh-ward__stat--wide" : ""}`}>
      <div className="sh-ward__stat-k">{k}</div>
      <div className={`sh-ward__stat-v${tone === "accent" ? " sh-ward__stat-v--accent" : ""}${tone === "bad" ? " sh-ward__stat-v--bad" : ""}`}>{v}</div>
      {n && <div className="sh-ward__stat-n">{n}</div>}
    </div>
  );
}

function WardCardRoute() {
  const { ward, ranked, daysLeft } = Route.useLoaderData() as {
    ward: Ward; ranked: Candidate[]; daysLeft: number;
  };
  const incumbent = ward.candidates.find((c) => c.isIncumbent);

  return (
    <div className="sh-ward">
      <div className="sh-ward__topbar">
        <Link to="/" className="sh-ward__back">← Back</Link>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", color: "#888" }}>
          WARD CARD · {ward.municipalityCode}
        </span>
        <span style={{ width: 56 }} />
      </div>

      {/* Yellow rectangular sign */}
      <header className="sh-ward__sign">
        <p className="sh-ward__sign-eyebrow">Ward Councillor Card</p>
        <h1 className="sh-ward__sign-title">
          WARD {ward.number} · {ward.area}
        </h1>
        <p className="sh-ward__sign-sub">
          {ward.municipalityName}
        </p>
      </header>

      {/* Football-style player card: swipe left = asshole, right = goodhole */}
      <PlayerCardStack ward={ward} />

      {/* INCUMBENT */}
      <Cat title="Incumbent on duty">
        <div className="sh-ward__stats">
          <Stat
            wide
            k="Currently accountable"
            v={incumbent ? `${incumbent.name} (${incumbent.party})` : "Vacant — by-election pending"}
            n={incumbent?.tenureYears != null ? `${incumbent.tenureYears} years in office${ward.incumbentElectedCycle ? ` · elected ${ward.incumbentElectedCycle}` : ""}` : undefined}
            tone="accent"
          />
          <Stat
            k="Contactability"
            v={incumbent ? incumbent.contactability.toUpperCase() : "—"}
            tone={incumbent?.contactability === "ghost" ? "bad" : undefined}
          />
          <Stat
            k="Election day"
            v={daysLeft + "d"}
            n="4 Nov 2026"
          />
        </div>
      </Cat>

      {/* DEMOGRAPHICS */}
      <Cat title="Who lives here">
        <div className="sh-ward__stats">
          <Stat k="Households" v={ward.households?.toLocaleString("en-ZA") ?? "—"} />
          <Stat k="Avg household size" v={ward.avgHouseholdDensity ?? "—"} />
          <Stat
            k="Avg household income"
            v={formatZar(ward.avgHouseholdIncomeMonthlyZar)}
            n="per month"
          />
          <Stat k="Potholes mapped" v={ward.potholesPreloaded ?? ward.cases.length} />
        </div>
        {ward.suburbs && ward.suburbs.length > 0 && (
          <div className="sh-ward__chips" style={{ marginTop: 10 }}>
            {ward.suburbs.map((s) => (
              <span key={s} className="sh-ward__chip">{s}</span>
            ))}
          </div>
        )}
      </Cat>

      {/* MONEY */}
      <Cat title="Municipal Money Monitor">
        <div className="sh-ward__stats">
          <Stat
            k="Capital grants received"
            v={formatZarCompact(ward.infra?.capitalGrantsZar ?? 0)}
            n={ward.infra ? formatZar(ward.infra.capitalGrantsZar) : undefined}
            tone="accent"
          />
          <Stat
            k="Actual maintenance spend"
            v={formatZarCompact(ward.infra?.maintenanceSpendZar ?? ward.actualMaintenanceSpendZar)}
            n={formatZar(ward.infra?.maintenanceSpendZar ?? ward.actualMaintenanceSpendZar)}
          />
          <Stat
            wide
            k="Returned to Treasury · unspent"
            v={ward.infra ? formatZarCompact(ward.infra.returnedToTreasuryZar) : "—"}
            n={ward.infra ? `${formatZar(ward.infra.returnedToTreasuryZar)} · grant money never converted into roads` : undefined}
            tone="bad"
          />
        </div>
      </Cat>

      {/* REPAIR ECONOMICS */}
      <Cat title="The cost of a pothole">
        <div className="sh-ward__stats">
          <Stat
            k="Patch · per m²"
            v={ward.repairCostPerM2 ? `${formatZar(ward.repairCostPerM2.min)}–${formatZar(ward.repairCostPerM2.max)}` : "R700–R1,500"}
          />
          <Stat
            k="Cost of ignoring"
            v={`${ward.neglectMultiplier ?? 18}× more`}
            n="full road reconstruction vs early patch"
            tone="bad"
          />
        </div>
      </Cat>

      {/* PAYROLL */}
      <Cat title="Payroll & headcount">
        <div className="sh-ward__stats">
          <Stat
            k="Annual payroll"
            v={formatZarCompact(ward.payroll?.totalPerYearZar ?? ward.totalSalaryBudgetZar)}
            n={formatZar(ward.payroll?.totalPerYearZar ?? ward.totalSalaryBudgetZar)}
          />
          <Stat
            k="Headcount"
            v={(ward.payroll?.headcount ?? ward.totalStaffCount).toLocaleString("en-ZA")}
          />
          <Stat
            k="Avg salary"
            v={formatZar(ward.payroll?.avgAnnualZar ?? ward.totalSalaryBudgetZar / Math.max(1, ward.totalStaffCount))}
            n="per worker / year"
          />
          {ward.payroll?.note && (
            <Stat wide k="Note" v={<span style={{ fontSize: 14 }}>{ward.payroll.note}</span>} tone="bad" />
          )}
        </div>
      </Cat>

      {/* AUDIT */}
      <Cat title="Audit outcome">
        <div className="sh-ward__stats">
          <Stat wide k="Auditor-General" v={ward.auditorGeneralStatus} tone={ward.auditorGeneralStatus.toLowerCase().includes("clean") ? "accent" : "bad"} />
          <Stat wide k="Findings" v={<span style={{ fontSize: 14 }}>{ward.auditNote ?? ward.governanceNotes}</span>} />
        </div>
      </Cat>

      {/* VOTING */}
      <Cat title="Where & when to vote">
        <div className="sh-ward__stats">
          <Stat wide k="Voting station" v={ward.votingStation.name} n={ward.votingStation.address} />
          <Stat k="Distance" v={`${ward.votingStation.distanceKm} km`} />
          <Stat k="Hours" v={ward.votingStation.hours} />
        </div>
      </Cat>

      {/* CANDIDATES */}
      <Cat title="Contesting in 2026">
        <div>
          {ranked.map((c, i) => (
            <Link
              key={c.id}
              to="/candidate/$candidateId"
              params={{ candidateId: c.id }}
              className="sh-ward__cand"
            >
              <span className="sh-ward__cand-num">{i + 1}</span>
              <span>
                <div className="sh-ward__cand-name">
                  {c.name} {c.isIncumbent ? "· incumbent" : ""}
                </div>
                <div className="sh-ward__cand-party">{c.party}</div>
              </span>
              <span style={{ color: "var(--accent, #ffd400)", fontWeight: 800 }}>›</span>
            </Link>
          ))}
        </div>
      </Cat>
    </div>
  );
}
