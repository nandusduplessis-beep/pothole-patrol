import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Layers, ArrowRight, Vote as VoteIcon } from "lucide-react";
import {
  Button,
  Card,
  DotScore,
  PhoneShell,
  Tag,
  TopBar,
  VerdictBadge,
} from "@/components/stophole";
import {
  getWard,
  sortedCandidates,
  verdictFor,
  verdictLabel,
  type Candidate,
  type Ward,
} from "@/data/seed";

export const Route = createFileRoute("/candidates/$wardId")({
  loader: ({ params }): { ward: Ward; ranked: Candidate[] } => {
    const ward = getWard(params.wardId);
    if (!ward) throw notFound();
    return { ward, ranked: sortedCandidates(ward) };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `Ward ${loaderData.ward.number} candidates — 2026 | Stophole`
          : "Candidates | Stophole",
      },
      {
        name: "description",
        content: loaderData
          ? `Compare the ${loaderData.ranked.length} certified candidates standing in Ward ${loaderData.ward.number}, ${loaderData.ward.area}. Scored on delivery, not promises.`
          : "Candidates scored on the Pothole Test.",
      },
    ],
  }),
  component: CandidatesRoute,
});

function CandidatesRoute() {
  const { ward, ranked } = Route.useLoaderData() as { ward: Ward; ranked: Candidate[] };
  const navigate = useNavigate();

  return (
    <PhoneShell>
      <TopBar
        left={
          <Link to="/" className="sh-iconbtn" aria-label="Back">
            <ChevronLeft size={22} />
          </Link>
        }
        title={`WARD ${ward.number} · 2026`}
        right={
          <button className="sh-iconbtn" aria-label="Filter" type="button">
            <Layers size={18} />
          </button>
        }
      />

      <div className="sh-scroll">
        <div style={{ padding: "8px 4px 4px" }}>
          <Tag>The Pothole Test</Tag>
          <h1 className="sh-h1" style={{ marginTop: 10 }}>
            Who actually <span className="sh-muted">fixes things?</span>
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 14,
              margin: "6px 0 0",
            }}
          >
            Scored on delivery, not promises. Sorted best-first. Incumbent
            pinned at the top so you can compare against the job they currently
            hold.
          </p>
        </div>

        <div className="sh-stack" style={{ marginTop: 16 }}>
          {ranked.map((c: Candidate, i: number) => (
            <CandidateRow
              key={c.id}
              rank={i + 1}
              candidate={c}
              onClick={() =>
                navigate({
                  to: "/candidate/$candidateId",
                  params: { candidateId: c.id },
                })
              }
            />
          ))}
        </div>

        <Card variant="dark" padding="lg" style={{ marginTop: 20 }}>
          <h3 className="sh-cta-h">
            Know where to vote.{" "}
            <span style={{ color: "var(--grey-400)" }}>One tap.</span>
          </h3>
          <div style={{ marginTop: 14 }}>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              leadingIcon={<VoteIcon size={18} />}
              trailingIcon={<ArrowRight size={16} />}
              onClick={() =>
                navigate({
                  to: "/vote/$wardId",
                  params: { wardId: ward.id },
                })
              }
            >
              Your voting station
            </Button>
          </div>
        </Card>
      </div>
    </PhoneShell>
  );
}

function CandidateRow({
  rank,
  candidate,
  onClick,
}: {
  rank: number;
  candidate: Candidate;
  onClick: () => void;
}) {
  const v = verdictFor(candidate);
  const avatarBg =
    v === "green"
      ? "var(--status-verified)"
      : v === "amber"
        ? "var(--accent)"
        : "var(--charcoal-800)";
  const avatarFg = v === "amber" ? "var(--charcoal-900)" : "var(--grey-50)";

  return (
    <button type="button" className="sh-cand" onClick={onClick}>
      <div className="sh-cand__top">
        <span className="sh-cand__rank">{rank}</span>
        <div className="sh-avatar" style={{ background: avatarBg, color: avatarFg }}>
          {candidate.name
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="sh-cand__name">{candidate.name}</div>
          <div className="sh-cand__party">
            {candidate.party}
            {candidate.isIncumbent
              ? ` · incumbent, ${candidate.tenureYears ?? "?"}y`
              : ""}
          </div>
        </div>
        <VerdictBadge verdict={v} size="sm" label={verdictLabel(v)} />
      </div>
      {candidate.isIncumbent && (
        <div>
          <Tag tone="danger">OWNS THIS FAILURE NOW</Tag>
        </div>
      )}
      <div className="sh-cand__signals">
        {candidate.signals.map((s, i) => (
          <div className="sh-cand__sig" key={i}>
            <span className="sh-cand__sig-label">{s.label}</span>
            <DotScore
              score={s.score}
              total={5}
              verdict={v}
              size={10}
              gap={4}
            />
          </div>
        ))}
      </div>
    </button>
  );
}