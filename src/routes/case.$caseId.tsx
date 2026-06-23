import { useEffect } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  Share2,
  Phone,
  TriangleAlert,
  Banknote,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import {
  Button,
  Card,
  PhoneShell,
  StatTile,
  Tag,
  TopBar,
  VerdictBadge,
} from "@/components/stophole";
import { getCase, resolveAccountability, type CaseFile, type Ward, type CommunityNote } from "@/data/seed";
import { useStopholeStore } from "@/lib/stophole-store";
import { formatZAR, formatNumber } from "@/lib/format";

export const Route = createFileRoute("/case/$caseId")({
  loader: ({ params }): { ward: Ward; case: CaseFile } | { localId: string } => {
    if (params.caseId.startsWith("local-")) {
      return { localId: params.caseId };
    }
    const result = getCase(params.caseId);
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => {
    const title =
      loaderData && "case" in loaderData
        ? `${loaderData.case.title} ${loaderData.case.cross} — Ward ${loaderData.ward.number}`
        : "Your pothole snap";
    return {
      meta: [
        { title: `${title} | Stophole` },
        {
          name: "description",
          content: loaderData && "case" in loaderData
            ? `Open since ${loaderData.case.daysOpen} days. ${loaderData.ward.municipalityName}.`
            : "Pothole case file.",
        },
        { property: "og:title", content: title },
      ],
    };
  },
  component: CaseRoute,
});

function CaseRoute() {
  const loaderData = Route.useLoaderData() as
    | { ward: Ward; case: CaseFile }
    | { localId: string };
  const localCases = useStopholeStore((s) => s.localCases);
  let ward: Ward;
  let caseFile: CaseFile;
  if ("case" in loaderData) {
    ward = loaderData.ward;
    caseFile = loaderData.case;
  } else {
    const local = localCases.find((c) => c.id === loaderData.localId);
    if (!local) {
      return (
        <PhoneShell>
          <TopBar
            left={
              <Link to="/" className="sh-iconbtn" aria-label="Back">
                <ChevronLeft size={22} />
              </Link>
            }
            title="CASE NOT FOUND"
          />
          <div className="sh-scroll" style={{ padding: 24 }}>
            <p style={{ color: "var(--text-muted)" }}>
              This snap was logged on another device. Open Stophole on the
              device you snapped from, or log a new pothole.
            </p>
          </div>
        </PhoneShell>
      );
    }
    caseFile = local;
    ward = resolveAccountability(local.lat, local.lng);
  }
  const navigate = useNavigate();
  const trackCase = useStopholeStore((s) => s.trackCase);
  const setActiveWard = useStopholeStore((s) => s.setActiveWard);
  const incumbent = ward.candidates.find((c) => c.isIncumbent);

  useEffect(() => {
    trackCase(caseFile.id);
    setActiveWard(ward.id);
  }, [caseFile.id, ward.id, trackCase, setActiveWard]);

  return (
    <PhoneShell>
      <TopBar
        left={
          <Link to="/" className="sh-iconbtn" aria-label="Back">
            <ChevronLeft size={22} />
          </Link>
        }
        title={`CASE · #${caseFile.id.slice(0, 8).toUpperCase()}`}
        right={
          <button className="sh-iconbtn" aria-label="Share" type="button">
            <Share2 size={18} />
          </button>
        }
      />

      <div className="sh-scroll">
        <div className="sh-case__hero">
          <div className="sh-case__photo">
            <div className="sh-case__photo-inner">
              <Tag
                tone="dark"
                style={{
                  background: "rgba(14,14,13,0.7)",
                  color: "var(--grey-50)",
                  borderColor: "transparent",
                }}
              >
                {caseFile.daysOpen} days
              </Tag>
            </div>
          </div>
          <div className="sh-case__map">
            <MiniMap />
          </div>
        </div>

        <div className="sh-case__head">
          <Tag>
            Ward {ward.number} · {ward.area}
          </Tag>
          <h1 className="sh-h1">
            {caseFile.title} <span className="sh-muted">{caseFile.cross}</span>
          </h1>
          <span
            className="sh-data"
            style={{ fontSize: 12, color: "var(--text-muted)" }}
          >
            {caseFile.authority.toUpperCase()}
          </span>
        </div>

        <div className="sh-case__stats">
          <StatTile label="Open" value={caseFile.daysOpen} unit="d" />
          <StatTile label="Reports" value={caseFile.reports} />
          <StatTile label="Refills" value={caseFile.refills} tone="soft" />
        </div>

        <div className="sh-block">
          <span className="sh-eyebrow">Who owns this failure now</span>
          <Card style={{ marginTop: 10 }}>
            <div className="sh-person">
              <div className="sh-avatar">
                {incumbent
                  ? incumbent.name
                      .split(" ")
                      .map((w: string) => w[0])
                      .slice(0, 2)
                      .join("")
                  : "?"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="sh-person__name">
                  Cllr. {incumbent?.name ?? "Vacant"}
                </div>
                <div className="sh-person__role">
                  Ward Councillor · {ward.number}
                </div>
              </div>
              <VerdictBadge verdict="red" size="sm" label="Replace" />
            </div>
            <div className="sh-signals">
              {caseFile.ownerSignals.map((s: CaseFile["ownerSignals"][number], i: number) => {
                const Icon =
                  s.icon === "phone"
                    ? Phone
                    : s.icon === "money"
                      ? Banknote
                      : TriangleAlert;
                return (
                  <div key={i} className={`sh-signal sh-signal--${s.tone}`}>
                    <Icon size={16} />
                    <span className="sh-signal__txt">{s.text}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="sh-block">
          <span className="sh-eyebrow">
            Community intel · {caseFile.reports} voices
          </span>
          <Card variant="sunken" style={{ marginTop: 10 }}>
            {caseFile.notes.map((note: CommunityNote, i: number) => (
              <div key={i} className="sh-note">
                <div className="sh-note__head">
                  <span>{note.author}</span>
                  <span className="sh-dot-sep" />
                  <span>{note.ago}</span>
                  {note.raw && <span className="raw">raw · unedited</span>}
                </div>
                <div className="sh-note__txt">{note.text}</div>
              </div>
            ))}
          </Card>
        </div>

        {ward.suburbs && ward.suburbs.length > 0 && (
          <div className="sh-block">
            <span className="sh-eyebrow">Local economic &amp; community context</span>
            <Card style={{ marginTop: 10 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {ward.suburbs.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
              <div className="sh-case__stats" style={{ marginTop: 14 }}>
                {ward.households != null && (
                  <StatTile
                    label="Households"
                    value={formatNumber(ward.households)}
                    unit={ward.avgHouseholdDensity ? `· ${ward.avgHouseholdDensity}/home` : undefined}
                  />
                )}
                <StatTile
                  label="Avg income / month"
                  value={formatZAR(ward.avgHouseholdIncomeMonthlyZar)}
                  tone="soft"
                />
                {ward.repairCostPerM2 && (
                  <StatTile
                    label="Repair cost / m²"
                    value={`R${ward.repairCostPerM2.min}–${ward.repairCostPerM2.max}`}
                  />
                )}
              </div>
              {ward.neglectMultiplier && (
                <p
                  style={{
                    marginTop: 12,
                    fontSize: 13,
                    color: "var(--text-muted)",
                    lineHeight: 1.5,
                  }}
                >
                  Left unmaintained, structural degradation costs up to{" "}
                  <strong>{ward.neglectMultiplier}×</strong> more in future
                  reconstruction.
                </p>
              )}
            </Card>
          </div>
        )}

        {ward.infra && (
          <div className="sh-block">
            <span className="sh-eyebrow">Municipal money monitor</span>
            <Card style={{ marginTop: 10 }}>
              {incumbent && (
                <div
                  className="sh-row sh-row--gap"
                  style={{ color: "var(--text-muted)", fontSize: 12, flexWrap: "wrap" }}
                >
                  <span className="sh-data">CURRENT · {incumbent.name.toUpperCase()}</span>
                  <span className="sh-dot-sep" />
                  <span className="sh-data">{incumbent.party}</span>
                  {incumbent.tenureYears != null && (
                    <>
                      <span className="sh-dot-sep" />
                      <span className="sh-data">{incumbent.tenureYears} YRS</span>
                    </>
                  )}
                  {ward.incumbentElectedCycle && (
                    <>
                      <span className="sh-dot-sep" />
                      <span className="sh-data">
                        ELECTED {ward.incumbentElectedCycle.toUpperCase()}
                      </span>
                    </>
                  )}
                </div>
              )}
              <div className="sh-case__stats" style={{ marginTop: 14 }}>
                <StatTile
                  label="Capital grants"
                  value={formatZAR(ward.infra.capitalGrantsZar)}
                />
                <StatTile
                  label="Maintenance spend"
                  value={formatZAR(ward.infra.maintenanceSpendZar)}
                  tone="soft"
                />
                <StatTile
                  label="Returned to Treasury"
                  value={formatZAR(ward.infra.returnedToTreasuryZar)}
                />
              </div>
              <div style={{ marginTop: 14 }}>
                <div className="sh-row sh-row--gap">
                  <VerdictBadge
                    verdict={ward.auditorGeneralStatus.toLowerCase().includes("clean") ? "green" : "red"}
                    size="sm"
                    label={ward.auditorGeneralStatus}
                  />
                </div>
                {ward.auditNote && (
                  <p style={{ marginTop: 8, fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>
                    {ward.auditNote}
                  </p>
                )}
              </div>
              {ward.payroll && (
                <div
                  style={{
                    marginTop: 14,
                    padding: 12,
                    borderRadius: 12,
                    background: "var(--surface-sunken)",
                  }}
                >
                  <div className="sh-eyebrow" style={{ marginBottom: 6 }}>
                    Salaries
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.55 }}>
                    <strong>{formatZAR(ward.payroll.totalPerYearZar)}</strong> / year
                    on payroll · avg <strong>{formatZAR(ward.payroll.avgAnnualZar)}</strong>
                    /yr across {formatNumber(ward.payroll.headcount)} workers.
                  </div>
                  {ward.payroll.note && (
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 12,
                        color: "var(--status-flagged)",
                        lineHeight: 1.5,
                      }}
                    >
                      {ward.payroll.note}
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        )}

        <Card variant="yellow" padding="lg" style={{ marginTop: 18 }}>
          <Tag
            tone="dark"
            style={{
              background: "var(--charcoal-900)",
              color: "var(--accent)",
              borderColor: "var(--charcoal-900)",
            }}
          >
            The job
          </Tag>
          <h3
            className="sh-cta-h"
            style={{ color: "var(--charcoal-900)", marginTop: 10 }}
          >
            Represent ward {ward.number}.{" "}
            <span style={{ color: "var(--yellow-800)" }}>
              Escalate failures. Report back.
            </span>
          </h3>
          <div
            className="sh-row sh-row--gap"
            style={{ marginTop: 12, color: "var(--yellow-800)" }}
          >
            <span className="sh-data" style={{ fontSize: 12 }}>
              SALARY R270k–R650k/yr
            </span>
            <span
              className="sh-dot-sep"
              style={{ background: "var(--yellow-800)" }}
            />
            <span className="sh-data" style={{ fontSize: 12 }}>
              TAXPAYER FUNDED
            </span>
            {ward.electionDate && (
              <>
                <span className="sh-dot-sep" style={{ background: "var(--yellow-800)" }} />
                <span className="sh-data" style={{ fontSize: 12 }}>
                  DECISION {new Date(ward.electionDate)
                    .toLocaleDateString("en-ZA", { day: "2-digit", month: "short", year: "numeric" })
                    .toUpperCase()}
                </span>
              </>
            )}
          </div>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            <Button
              variant="dark"
              size="lg"
              fullWidth
              trailingIcon={<ArrowRight size={16} />}
              onClick={() =>
                navigate({
                  to: "/candidates/$wardId",
                  params: { wardId: ward.id },
                })
              }
            >
              Compare who wants the job
            </Button>
            <Link
              to="/whatsapp"
              className="sh-row sh-row--gap"
              style={{
                justifyContent: "center",
                gap: 8,
                color: "var(--charcoal-900)",
                fontWeight: 700,
                fontSize: 13,
                textDecoration: "underline",
              }}
            >
              <MessageCircle size={16} /> Get WhatsApp voter reminders
            </Link>
          </div>
        </Card>

        {ward.potholesPreloaded != null && (
          <div className="sh-block">
            <span className="sh-eyebrow">Pothole reporting engine</span>
            <Card variant="sunken" style={{ marginTop: 10 }}>
              <div style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.5 }}>
                <strong>{ward.potholesPreloaded}</strong> potholes preloaded nearby in
                Ward {ward.number}.
              </div>
              <div style={{ marginTop: 12 }}>
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  trailingIcon={<ArrowRight size={16} />}
                  onClick={() => navigate({ to: "/" })}
                >
                  Log a new pothole at your location
                </Button>
              </div>
            </Card>
          </div>
        )}

        <p
          style={{
            marginTop: 18,
            fontSize: 11,
            color: "var(--text-subtle)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Salary &amp; maintenance figures are municipality-wide aggregates from
          AGSA &amp; National Treasury, not ward line items.
        </p>
      </div>
    </PhoneShell>
  );
}

function MiniMap() {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "38%",
          left: 0,
          right: 0,
          height: 10,
          background: "var(--grey-250)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "58%",
          width: 10,
          background: "var(--grey-250)",
        }}
      />
      <svg
        style={{
          position: "absolute",
          width: 26,
          height: 26,
          top: "40%",
          left: "58%",
          transform: "translate(-50%, -100%)",
          color: "var(--status-flagged)",
        }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" />
        <circle cx="12" cy="9" r="2.6" fill="#fff" />
      </svg>
    </div>
  );
}