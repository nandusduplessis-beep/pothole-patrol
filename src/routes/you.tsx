import { createFileRoute } from "@tanstack/react-router";
import { Moon, Sun, BookOpen, MessageCircle, Phone } from "lucide-react";
import {
  LogoMark,
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
import { useStopholeStore } from "@/lib/stophole-store";

export const Route = createFileRoute("/you")({
  head: () => ({
    meta: [
      { title: "You — Stophole" },
      {
        name: "description",
        content: "Your Stophole profile, theme and notification settings.",
      },
    ],
  }),
  component: YouRoute,
});

function YouRoute() {
  const theme = useStopholeStore((s) => s.theme);
  const toggleTheme = useStopholeStore((s) => s.toggleTheme);
  const recent = useStopholeStore((s) => s.recent);
  const verdicts = useStopholeStore((s) => s.verdicts);
  const localCases = useStopholeStore((s) => s.localCases);

  const totalVerdicts = Object.values(verdicts).reduce(
    (a, v) => a + v.asshole + v.goodhole,
    0,
  );

  return (
    <PhoneShell>
      <TopBar left={<LogoMark />} title="YOU" right={null} />
      <Deck>
        <HeroCard
          eyebrow="Voter profile"
          chip="Demo · Ward 102"
          title="You vs. the assholes."
          sub="One pothole at a time."
          jersey="YOU"
          badge={theme === "light" ? "LIGHT" : "DARK"}
        />
        <StatRow
          items={[
            { k: "Verdicts cast", v: totalVerdicts },
            { k: "Cases tracked", v: recent.length },
            { k: "Snaps logged", v: localCases.length },
          ]}
        />
        <ListCard heading="Settings">
          <ListRow
            title="Appearance"
            meta={theme === "light" ? "Light — daytime road work" : "Dark — OLED, late shift"}
            right={theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            onClick={toggleTheme}
          />
          <ListRow
            title="How Stophole works"
            meta="The 4-tap explainer"
            href="/how-it-works"
          />
        </ListCard>
        <ActionStack>
          <ActionCard
            variant="primary"
            icon={<MessageCircle size={18} />}
            title="WhatsApp version"
            sub="Same flow, no app install"
            href="/whatsapp"
          />
          <ActionCard
            variant="dark"
            icon={<Phone size={18} />}
            title="USSD version"
            sub="Works on any phone"
            href="/ussd"
          />
          <ActionCard
            icon={<BookOpen size={18} />}
            title="About this build"
            sub="Data: AGSA · IEC · Treasury · Stats SA"
            href="/how-it-works"
          />
        </ActionStack>
      </Deck>
    </PhoneShell>
  );
}