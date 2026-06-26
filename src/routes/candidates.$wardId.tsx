import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PhoneShell, TopBar, WalletStack } from "@/components/stophole";
import { getWard, sortedCandidates, type Candidate, type Ward } from "@/data/seed";

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
  // ranked is precomputed by the loader; we keep it in scope so the loader signature stays stable
  void ranked;

  return (
    <PhoneShell>
      <TopBar
        left={
          <Link to="/" className="sh-iconbtn" aria-label="Back">
            <ChevronLeft size={22} />
          </Link>
        }
        title={`W${ward.number} · ${ward.area.toUpperCase()}`}
      />
      <div className="sh-scroll" style={{ paddingTop: 12 }}>
        <WalletStack ward={ward} />
      </div>
    </PhoneShell>
  );
}