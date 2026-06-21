import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, Share2, MapPin, Calendar } from "lucide-react";
import {
  Button,
  PhoneShell,
  StatTile,
  Tag,
  TopBar,
} from "@/components/stophole";
import { daysUntilElection, getWard, type Ward } from "@/data/seed";

export const Route = createFileRoute("/vote/$wardId")({
  loader: ({ params }): { ward: Ward; daysLeft: number } => {
    const ward = getWard(params.wardId);
    if (!ward) throw notFound();
    return { ward, daysLeft: daysUntilElection() };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `Vote — Ward ${loaderData.ward.number}, ${loaderData.ward.area} | Stophole`
          : "Voting station | Stophole",
      },
      {
        name: "description",
        content:
          "Your voting station, address, and the date — one tap from every case.",
      },
    ],
  }),
  component: VoteRoute,
});

function VoteRoute() {
  const { ward, daysLeft } = Route.useLoaderData() as { ward: Ward; daysLeft: number };

  return (
    <PhoneShell>
      <TopBar
        left={
          <Link to="/" className="sh-iconbtn" aria-label="Back">
            <ChevronLeft size={22} />
          </Link>
        }
        title="WHERE & WHEN"
        right={
          <button className="sh-iconbtn" aria-label="Share" type="button">
            <Share2 size={18} />
          </button>
        }
      />
      <div className="sh-scroll">
        <div className="sh-vote__hero">
          <Tag
            tone="dark"
            style={{
              background: "var(--charcoal-700)",
              color: "var(--accent)",
              borderColor: "transparent",
            }}
          >
            Local Election
          </Tag>
          <div
            style={{
              marginTop: 14,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div className="sh-vote__date">04 NOV</div>
              <div
                className="sh-data"
                style={{ color: "var(--grey-400)", fontSize: 13, marginTop: 4 }}
              >
                2026 · WEDNESDAY
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                className="sh-data"
                style={{ color: "var(--accent)", fontSize: 30 }}
              >
                {daysLeft}
              </div>
              <div
                className="sh-data"
                style={{ color: "var(--grey-400)", fontSize: 11 }}
              >
                DAYS TO GO
              </div>
            </div>
          </div>
        </div>

        <div className="sh-block" style={{ marginTop: 18 }}>
          <span className="sh-eyebrow">Your voting station</span>
          <div className="sh-station">
            <div className="sh-station__icon">
              <MapPin size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="sh-person__name">{ward.votingStation.name}</div>
              <div className="sh-person__role">
                {ward.votingStation.address} · Ward {ward.number}
              </div>
              <div
                className="sh-data"
                style={{
                  fontSize: 11,
                  color: "var(--text-muted)",
                  marginTop: 6,
                }}
              >
                OPEN {ward.votingStation.hours} ·{" "}
                {ward.votingStation.distanceKm}KM AWAY
              </div>
            </div>
          </div>
        </div>

        <div
          className="sh-case__stats"
          style={{ gridTemplateColumns: "1fr 1fr", marginTop: 14 }}
        >
          <StatTile label="You are" value="Registered" tone="soft" size="sm" />
          <StatTile label="Ward" value={ward.number} size="sm" />
        </div>

        <div style={{ marginTop: 18 }}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            leadingIcon={<Calendar size={18} />}
          >
            Remind me on the day
          </Button>
        </div>

        <div style={{ marginTop: 12 }}>
          <a
            href="https://results.elections.org.za/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Button variant="secondary" size="lg" fullWidth>
              Check on IEC site
            </Button>
          </a>
        </div>

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
          Date confirmed by IEC. Voting station data: demo. Final list confirmed
          by IEC on results.elections.org.za.
        </p>
      </div>
    </PhoneShell>
  );
}