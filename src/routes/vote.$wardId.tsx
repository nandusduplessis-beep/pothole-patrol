import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, Share2, MapPin, Calendar, UserPlus, ExternalLink } from "lucide-react";
import {
  PhoneShell,
  TopBar,
  HeroCard,
  StatRow,
  ListCard,
  ListRow,
  ActionStack,
  ActionCard,
  Deck,
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

  const calendarHref = (() => {
    const date = (ward.electionDate ?? "2026-11-04").replace(/-/g, "");
    const title = encodeURIComponent(`Vote — Ward ${ward.number} ${ward.area}`);
    const details = encodeURIComponent(
      `Local government election day. Voting station: ${ward.votingStation.name}, ${ward.votingStation.address}.`,
    );
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${date}/${date}&details=${details}`;
  })();

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
      <Deck>
        <HeroCard
          eyebrow="Local election"
          chip={`Ward ${ward.number}`}
          title="04 Nov 2026"
          sub="Wednesday · polls 07:00–21:00"
          jersey={`${daysLeft}d`}
          badge="TO GO"
        />
        <StatRow
          items={[
            { k: "You are", v: "Registered" },
            { k: "Ward", v: ward.number },
            { k: "Distance", v: `${ward.votingStation.distanceKm} km` },
          ]}
        />
        <ListCard heading="Your voting station">
          <ListRow
            title={ward.votingStation.name}
            meta={`${ward.votingStation.address} · open ${ward.votingStation.hours}`}
            right={<MapPin size={18} />}
          />
        </ListCard>
        <ActionStack>
          <ActionCard
            variant="primary"
            icon={<Calendar size={18} />}
            title="Remind me on the day"
            sub="Adds to your calendar"
            href={calendarHref}
            external
          />
          <ActionCard
            variant="dark"
            icon={<UserPlus size={18} />}
            title="Register to vote"
            sub="IEC online registration"
            href="https://registertovote.elections.org.za/"
            external
          />
          <ActionCard
            icon={<ExternalLink size={18} />}
            title="Check on IEC site"
            sub="results.elections.org.za"
            href="https://results.elections.org.za/"
            external
          />
        </ActionStack>
      </Deck>
    </PhoneShell>
  );
}