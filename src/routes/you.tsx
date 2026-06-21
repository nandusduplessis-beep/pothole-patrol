import { createFileRoute } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import {
  Button,
  Card,
  LogoMark,
  PhoneShell,
  Tag,
  TopBar,
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

  return (
    <PhoneShell>
      <TopBar left={<LogoMark />} title="YOU" right={null} />
      <div className="sh-scroll">
        <div className="sh-greet">
          <Tag>Voter profile</Tag>
          <h1>You vs. the assholes.</h1>
          <p>One pothole at a time. Logged in as a demo voter in Ward 102.</p>
        </div>

        <Card style={{ marginTop: 18 }}>
          <div className="sh-row sh-row--between">
            <div>
              <div className="sh-person__name">Appearance</div>
              <div className="sh-person__role">
                {theme === "light" ? "Light — daytime road work" : "Dark — OLED, late shift"}
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              leadingIcon={theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              onClick={toggleTheme}
            >
              {theme === "light" ? "Dark" : "Light"}
            </Button>
          </div>
        </Card>

        <Card variant="dark" padding="lg" style={{ marginTop: 18 }}>
          <Tag
            tone="dark"
            style={{
              background: "var(--charcoal-700)",
              color: "var(--grey-150)",
              borderColor: "transparent",
            }}
          >
            About this build
          </Tag>
          <h3 className="sh-cta-h">
            Demo build.{" "}
            <span style={{ color: "var(--grey-400)" }}>
              Real ward polygons, IEC candidates and Treasury financials slot in
              behind the same UI.
            </span>
          </h3>
          <p
            style={{
              color: "var(--grey-400)",
              fontSize: 12,
              marginTop: 12,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.04em",
            }}
          >
            DATA SOURCES (TO COME):
            <br />
            MUNICIPAL DEMARCATION BOARD · IEC · NATIONAL TREASURY · STATS SA
          </p>
        </Card>
      </div>
    </PhoneShell>
  );
}