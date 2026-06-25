import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Camera, MapPin, Users, Vote as VoteIcon } from "lucide-react";
import {
  PhoneShell,
  TopBar,
  HeroCard,
  ListCard,
  ListRow,
  ActionStack,
  ActionCard,
  Deck,
} from "@/components/stophole";

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
      <Deck>
        <HeroCard
          eyebrow="Pothole-to-accountability"
          chip="4 taps"
          title="From a pothole to a hiring decision."
          sub="04 Nov 2026 · local government elections"
          jersey="4"
          badge="STEPS"
        />
        {STEPS.map(({ n, icon: Icon, title, body }) => (
          <ListCard heading={`Step ${n}`} key={n}>
            <ListRow
              title={title}
              meta={body}
              right={<Icon size={18} />}
            />
          </ListCard>
        ))}
        <ListCard heading="What the data means">
          <ListRow
            title="Audit outcome"
            meta="AGSA rates municipalities: Clean → Unqualified → Qualified → Adverse → Disclaimer."
          />
          <ListRow
            title="Capital grants vs maintenance"
            meta="Big grants + tiny maintenance = assets left to rot."
          />
          <ListRow
            title="Returned to Treasury"
            meta="Grants the municipality couldn't spend in time. Gone."
          />
          <ListRow
            title="Ward vs Municipality"
            meta="Ward councillor escalates. Municipality owns the budget."
          />
        </ListCard>
        <ListCard heading="Sources">
          <ListRow title="AGSA" meta="Annual audit outcomes" />
          <ListRow title="National Treasury" meta="Budgets, grants, in-year reports" />
          <ListRow title="IEC" meta="Voter registration, candidates, results" />
          <ListRow title="Community" meta="Reports submitted by Stophole users" />
        </ListCard>
        <ActionStack>
          <ActionCard
            variant="primary"
            icon={<Camera size={18} />}
            title="Snap a pothole"
            sub="Open the camera now"
            href="/"
          />
        </ActionStack>
      </Deck>
    </PhoneShell>
  );
}
