import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, Phone, MapPin, ArrowRight } from "lucide-react";
import {
  Button,
  Card,
  DotScore,
  PhoneShell,
  StatTile,
  Tag,
  TopBar,
  VerdictBadge,
} from "@/components/stophole";
import {
  avgSignalScore,
  getCandidate,
  verdictFor,
  verdictLabel,
  type Candidate,
  type Signal,
  type Ward,
} from "@/data/seed";

export const Route = createFileRoute("/candidate/$candidateId")({
  loader: ({ params }): { ward: Ward; candidate: Candidate } => {
    const result = getCandidate(params.candidateId);
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.candidate.name} (${loaderData.candidate.party}) — Ward ${loaderData.ward.number} | Stophole`
          : "Candidate | Stophole",
      },
      {
        name: "description",
        content: loaderData
          ? `${loaderData.candidate.name} scored on the Pothole Test: delivery, response, budget conversion, presence, accountability.`
          : "Candidate scorecard.",
      },
    ],
  }),
  component: CandidateRoute,
});

function CandidateRoute() {
  const { ward, candidate } = Route.useLoaderData();
  const v = verdictFor(candidate);
  const avg = avgSignalScore(candidate);

  return (
    <PhoneShell>
      <TopBar
        left={
          <Link
            to="/candidates/$wardId"
            params={{ wardId: ward.id }}
            className="sh-iconbtn"
            aria-label="Back"
          >
            <ChevronLeft size={22} />
          </Link>
        }
        title={`WARD ${ward.number} · APPLICANT`}
        right={
          <button className="sh-iconbtn" aria-label="Contact" type="button">
            <Phone size={18} />
          </button>
        }
      />
      <div className="sh-scroll">
        <div style={{ padding: "8px 4px 4px" }}>
          <Tag tone={candidate.isIncumbent ? "danger" : "neutral"}>
            {candidate.isIncumbent
              ? "Incumbent · owns this failure now"
              : "Applying for the job"}
          </Tag>
          <h1 className="sh-h1" style={{ marginTop: 10 }}>
            {candidate.name}{" "}
            <span className="sh-muted">— {candidate.party}</span>
          </h1>
          <div className="sh-row sh-row--gap" style={{ marginTop: 8 }}>
            <VerdictBadge verdict={v} size="md" label={verdictLabel(v)} />
            <span
              className="sh-data"
              style={{ color: "var(--text-muted)", fontSize: 12 }}
            >
              {avg.toFixed(1)} / 5 AVG
            </span>
          </div>
        </div>

        <div className="sh-case__stats" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <StatTile
            label="Contactable"
            value={
              candidate.contactability === "reachable"
                ? "Yes"
                : candidate.contactability === "partial"
                  ? "Partial"
                  : "Ghost"
            }
            tone={candidate.contactability === "ghost" ? "soft" : "default"}
            size="sm"
          />
          <StatTile
            label="Tenure"
            value={candidate.tenureYears != null ? candidate.tenureYears : "—"}
            unit={candidate.tenureYears != null ? "y" : undefined}
            size="sm"
          />
        </div>

        <div className="sh-block">
          <span className="sh-eyebrow">The Pothole Test — five signals</span>
          <Card style={{ marginTop: 10 }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              {candidate.signals.map((s: Signal, i: number) => (
                <div key={i}>
                  <div className="sh-row sh-row--between" style={{ marginBottom: 6 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: 14,
                        color: "var(--text-strong)",
                      }}
                    >
                      {s.label}
                    </span>
                    <DotScore
                      score={s.score}
                      total={5}
                      verdict={v}
                      size={11}
                      gap={5}
                    />
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--text-muted)",
                      margin: 0,
                      lineHeight: 1.45,
                    }}
                  >
                    {s.evidence}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card variant="dark" padding="lg" style={{ marginTop: 22 }}>
          <Tag
            tone="dark"
            style={{
              background: "var(--charcoal-700)",
              color: "var(--grey-150)",
              borderColor: "transparent",
            }}
          >
            Decide
          </Tag>
          <h3 className="sh-cta-h">
            See where &amp; when{" "}
            <span style={{ color: "var(--grey-400)" }}>to vote.</span>
          </h3>
          <div style={{ marginTop: 14 }}>
            <Link
              to="/vote/$wardId"
              params={{ wardId: ward.id }}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="primary"
                size="lg"
                fullWidth
                trailingIcon={<ArrowRight size={16} />}
                leadingIcon={<MapPin size={18} />}
              >
                Your voting station
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </PhoneShell>
  );
}