import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, Camera, MapPin, Users, Vote as VoteIcon } from "lucide-react";
import { Button, Card, PhoneShell, Tag, TopBar } from "@/components/stophole";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Stophole works — pothole to accountability in 4 taps" },
      {
        name: "description",
        content:
          "Snap a pothole, see your ward, meet the councillor accountable now, and compare the candidates standing in November 2026.",
      },
      { property: "og:title", content: "How Stophole works" },
      {
        property: "og:description",
        content: "Civic accountability for South African voters — explained.",
      },
    ],
  }),
  component: HowItWorksRoute,
});

const STEPS = [
  {
    n: 1,
    icon: Camera,
    title: "Snap the pothole",
    body: "Open the camera, take one photo. We capture your location at the same time — no typing.",
  },
  {
    n: 2,
    icon: MapPin,
    title: "See your ward",
    body: "We resolve the GPS to a ward and municipality, then load the public record — audit outcome, payroll, infrastructure spend.",
  },
  {
    n: 3,
    icon: Users,
    title: "Meet the incumbent",
    body: "You see who is paid right now to fix this exact road, how reachable they are, and what they have actually delivered.",
  },
  {
    n: 4,
    icon: VoteIcon,
    title: "Compare 2026 candidates",
    body: "Side-by-side scorecards for every candidate contesting your ward, on a 5-signal Pothole Test.",
  },
];

function HowItWorksRoute() {
  return (
    <PhoneShell>
      <TopBar
        left={
          <Link to="/" className="sh-iconbtn" aria-label="Back">
            <ChevronLeft size={22} />
          </Link>
        }
        title="HOW IT WORKS"
      />
      <div className="sh-scroll">
        <div className="sh-block" style={{ marginTop: 8 }}>
          <Tag>Pothole-to-accountability</Tag>
          <h1 className="sh-h1" style={{ marginTop: 8 }}>
            From a pothole on your street to a hiring decision on 4 Nov 2026.
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 10, lineHeight: 1.55 }}>
            Stophole turns one tap into a paper trail. Here is exactly what
            happens when you press <strong>Snap the pothole</strong>.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
          {STEPS.map(({ n, icon: Icon, title, body }) => (
            <Card key={n}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "var(--accent)",
                    color: "var(--text-on-accent)",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div className="sh-eyebrow">Step {n}</div>
                  <h3 style={{ margin: "4px 0 6px", fontSize: 17, color: "var(--text-strong)" }}>
                    {title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--text-muted)", lineHeight: 1.5 }}>
                    {body}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="sh-block" style={{ marginTop: 18 }}>
          <span className="sh-eyebrow">What the data means</span>
          <Card variant="sunken" style={{ marginTop: 10 }}>
            <Glossary
              term="Audit outcome"
              body="Auditor-General South Africa rates each municipality: Clean → Unqualified → Qualified → Adverse → Disclaimer. Qualified or worse means material findings."
            />
            <Glossary
              term="Capital grants vs maintenance"
              body="Capital grants build new infrastructure. Maintenance spend keeps it alive. A municipality with big grants and tiny maintenance is letting the asset rot."
            />
            <Glossary
              term="Returned to Treasury"
              body="If a municipality can't spend its grants in time, the money goes back to National Treasury — gone."
            />
            <Glossary
              term="Ward vs Municipality"
              body="Your ward councillor escalates failures. The municipality owns the budget. Both are accountable, in different ways."
            />
          </Card>
        </div>

        <div className="sh-block" style={{ marginTop: 18 }}>
          <span className="sh-eyebrow">Where the numbers come from</span>
          <Card style={{ marginTop: 10 }}>
            <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-body)", fontSize: 14, lineHeight: 1.7 }}>
              <li>Auditor-General South Africa (AGSA) — annual audit outcomes</li>
              <li>National Treasury — municipal budgets, grants, in-year reports</li>
              <li>Independent Electoral Commission (IEC) — voter registration, candidates, results</li>
              <li>Community reports — submitted by Stophole users in your ward</li>
            </ul>
            <p style={{ marginTop: 10, fontSize: 12, color: "var(--text-muted)" }}>
              Salary &amp; maintenance figures are municipality-wide aggregates,
              not ward-level line items.
            </p>
          </Card>
        </div>

        <div style={{ marginTop: 22 }}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            trailingIcon={<ArrowRight size={16} />}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Snap a pothole
          </Button>
        </div>
      </div>
    </PhoneShell>
  );
}

function Glossary({ term, body }: { term: string; body: string }) {
  return (
    <div style={{ padding: "10px 0", borderBottom: "1px solid var(--border-subtle)" }}>
      <div style={{ fontWeight: 700, color: "var(--text-strong)", fontSize: 14 }}>{term}</div>
      <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4, lineHeight: 1.5 }}>{body}</div>
    </div>
  );
}