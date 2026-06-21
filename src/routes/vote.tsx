import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/vote")({
  beforeLoad: () => {
    // Default vote tab → Joburg ward 102 voting station.
    throw redirect({ to: "/vote/$wardId", params: { wardId: "JHB_WARD102" } });
  },
});