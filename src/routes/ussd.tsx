import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Phone } from "lucide-react";
import { Button, Card, PhoneShell, Tag, TopBar } from "@/components/stophole";

export const Route = createFileRoute("/ussd")({
  head: () => ({
    meta: [
      { title: "Stophole on USSD — works on any phone, no data" },
      {
        name: "description",
        content:
          "Dial *120*7867# from any phone to report a pothole, find your ward, or set a voter reminder. No app, no smartphone needed.",
      },
      { property: "og:title", content: "Stophole on USSD" },
      {
        property: "og:description",
        content: "Civic accountability for feature phones.",
      },
    ],
  }),
  component: UssdRoute,
});

const USSD_CODE = "*120*7867#";

type Screen =
  | { id: "menu"; title: string; lines: string[]; options: Array<{ key: string; label: string; next: string }> }
  | { id: "leaf"; title: string; lines: string[] };

const SCREENS: Record<string, Screen> = {
  welcome: {
    id: "menu",
    title: "Stophole",
    lines: ["Welcome to Stophole.", "Reply with a number:"],
    options: [
      { key: "1", label: "Report a pothole", next: "report" },
      { key: "2", label: "Find my ward", next: "ward" },
      { key: "3", label: "Voter reminder", next: "remind" },
      { key: "0", label: "Exit", next: "exit" },
    ],
  },
  report: {
    id: "leaf",
    title: "Report logged",
    lines: [
      "Pothole logged at your tower location.",
      "Ref: SH-" + Math.floor(Math.random() * 90000 + 10000),
      "We'll SMS updates. Reply 1 for menu.",
    ],
  },
  ward: {
    id: "leaf",
    title: "Ward 32 · Matjhabeng",
    lines: [
      "Cllr: René Steyn (DA), 5 yrs.",
      "Audit: Qualified.",
      "R209M grants returned unspent.",
      "Reply 1 for menu.",
    ],
  },
  remind: {
    id: "leaf",
    title: "Reminder set",
    lines: [
      "We'll SMS you on 4 Nov 2026.",
      "Free reminder, no airtime.",
      "Reply 1 for menu.",
    ],
  },
  exit: {
    id: "leaf",
    title: "Goodbye",
    lines: ["Thank you for using Stophole."],
  },
};

function UssdRoute() {
  const [screen, setScreen] = useState<string>("welcome");
  const cur = SCREENS[screen];

  return (
    <PhoneShell>
      <TopBar
        left={
          <Link to="/" className="sh-iconbtn" aria-label="Back">
            <ChevronLeft size={22} />
          </Link>
        }
        title="USSD"
      />
      <div className="sh-scroll">
        <div className="sh-block" style={{ marginTop: 8 }}>
          <Tag>No app · No data · No smartphone</Tag>
          <h1 className="sh-h1" style={{ marginTop: 8 }}>
            Dial <span className="sh-mark">{USSD_CODE}</span>.
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 10, lineHeight: 1.55 }}>
            Stophole works on every phone in South Africa — even prepaid
            feature phones. USSD sessions are free on most networks for
            government-essential services.
          </p>
        </div>

        <div className="sh-block" style={{ marginTop: 12 }}>
          <span className="sh-eyebrow">Try the menu</span>
          <Card style={{ marginTop: 10, background: "var(--charcoal-900)" }}>
            <div
              style={{
                color: "#9CFF9C",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                lineHeight: 1.55,
                padding: "16px 14px",
                background: "#0a0a0a",
                borderRadius: 10,
                minHeight: 200,
              }}
            >
              <div style={{ opacity: 0.6, marginBottom: 6 }}>{USSD_CODE}</div>
              <div style={{ color: "#fff", fontWeight: 700, marginBottom: 6 }}>
                {cur.title}
              </div>
              {cur.lines.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
              {cur.id === "menu" && (
                <div style={{ marginTop: 8 }}>
                  {cur.options.map((o) => (
                    <div key={o.key}>
                      {o.key}. {o.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              {cur.id === "menu"
                ? cur.options.map((o) => (
                    <button
                      key={o.key}
                      type="button"
                      onClick={() => setScreen(o.next)}
                      style={{
                        appearance: "none",
                        border: "1px solid var(--accent)",
                        background: "transparent",
                        color: "var(--accent)",
                        padding: "8px 12px",
                        borderRadius: 8,
                        cursor: "pointer",
                        fontFamily: "var(--font-mono)",
                        fontSize: 13,
                      }}
                    >
                      {o.key}
                    </button>
                  ))
                : (
                  <button
                    type="button"
                    onClick={() => setScreen("welcome")}
                    style={{
                      appearance: "none",
                      border: "1px solid var(--accent)",
                      background: "var(--accent)",
                      color: "var(--text-on-accent)",
                      padding: "8px 12px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                    }}
                  >
                    1 · Back to menu
                  </button>
                )}
            </div>
          </Card>
        </div>

        <div className="sh-block" style={{ marginTop: 18 }}>
          <span className="sh-eyebrow">Carriers &amp; cost</span>
          <Card variant="sunken" style={{ marginTop: 10 }}>
            <p style={{ margin: 0, fontSize: 14, color: "var(--text-body)", lineHeight: 1.55 }}>
              Available on <strong>MTN</strong>, <strong>Vodacom</strong>,{" "}
              <strong>Cell C</strong>, and <strong>Telkom</strong>. Most
              sessions are free; some carriers charge ~20c per 20-second
              session.
            </p>
            <p style={{ marginTop: 8, fontSize: 12, color: "var(--text-muted)" }}>
              Shortcode {USSD_CODE} is a placeholder. The live code will be
              confirmed with WASPA on launch.
            </p>
          </Card>
        </div>

        <div style={{ marginTop: 22 }}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            leadingIcon={<Phone size={16} />}
            onClick={() => {
              window.location.href = `tel:${USSD_CODE}`;
            }}
          >
            Dial {USSD_CODE}
          </Button>
        </div>
      </div>
    </PhoneShell>
  );
}