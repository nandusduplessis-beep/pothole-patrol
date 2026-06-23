import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, MessageCircle, ArrowRight } from "lucide-react";
import { Button, Card, PhoneShell, Tag, TopBar } from "@/components/stophole";

export const Route = createFileRoute("/whatsapp")({
  head: () => ({
    meta: [
      { title: "Stophole on WhatsApp — no app, no data plan" },
      {
        name: "description",
        content:
          "Send a location pin on WhatsApp and get back your ward, your councillor, and the 2026 candidates. Works on any phone with WhatsApp.",
      },
      { property: "og:title", content: "Stophole on WhatsApp" },
      {
        property: "og:description",
        content: "Pothole-to-accountability for the 30M South Africans on WhatsApp.",
      },
    ],
  }),
  component: WhatsappRoute,
});

const WA_NUMBER = "+27000000000";
const WA_HREF = `https://wa.me/${WA_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent("Start")}`;

const COMMANDS: Array<[string, string]> = [
  ["📍 Location pin", "Identifies your ward and returns the councillor card."],
  ["WARD <postcode>", "Look up a ward by postcode."],
  ["CANDIDATES", "List candidates contesting your ward in 2026."],
  ["REMIND ME", "Get a WhatsApp reminder on election day."],
  ["REPORT", "Log a new pothole with a photo reply."],
  ["HELP", "Show every command."],
  ["STOP", "Opt out. POPIA-compliant."],
];

function WhatsappRoute() {
  return (
    <PhoneShell>
      <TopBar
        left={
          <Link to="/" className="sh-iconbtn" aria-label="Back">
            <ChevronLeft size={22} />
          </Link>
        }
        title="WHATSAPP"
      />
      <div className="sh-scroll">
        <div className="sh-block" style={{ marginTop: 8 }}>
          <Tag>No app · No data plan</Tag>
          <h1 className="sh-h1" style={{ marginTop: 8 }}>
            Stophole on <span className="sh-mark">WhatsApp</span>.
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 10, lineHeight: 1.55 }}>
            Send a location pin to the Stophole number. Get your ward
            councillor card back in under 10 seconds. Reply with one word to
            see candidates, set a reminder, or report a new pothole.
          </p>
        </div>

        <div className="sh-block" style={{ marginTop: 12 }}>
          <span className="sh-eyebrow">Sample conversation</span>
          <Card variant="sunken" style={{ marginTop: 10, background: "#ECE5DD" }}>
            <Bubble from="me">📍 Location: Stateway, Welkom</Bubble>
            <Bubble from="bot">
              <strong>Ward 32 · Matjhabeng</strong>
              <br />
              Councillor: René Steyn (DA) · 5 yrs.
              <br />
              Audit: Qualified Opinion.
              <br />
              R209M in grants returned to Treasury unspent.
            </Bubble>
            <Bubble from="bot">
              Reply <strong>CANDIDATES</strong> · <strong>REMIND ME</strong> ·{" "}
              <strong>REPORT</strong>
            </Bubble>
            <Bubble from="me">CANDIDATES</Bubble>
            <Bubble from="bot">
              5 contesting Ward 32:
              <br />1. Nomsa Khoza (Ind) ★★★★
              <br />2. Johan Pretorius (FF+) ★★★
              <br />3. Lerato Mokoena (EFF) ★★★
              <br />4. Thabo Molefe (ANC) ★★
              <br />5. René Steyn (DA, incumbent) ★★
            </Bubble>
          </Card>
        </div>

        <div className="sh-block" style={{ marginTop: 18 }}>
          <span className="sh-eyebrow">Commands</span>
          <Card style={{ marginTop: 10 }}>
            {COMMANDS.map(([cmd, desc]) => (
              <div
                key={cmd}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid var(--border-subtle)",
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr)",
                  gap: 4,
                }}
              >
                <span className="sh-data" style={{ fontSize: 13, color: "var(--text-strong)" }}>
                  {cmd}
                </span>
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{desc}</span>
              </div>
            ))}
          </Card>
        </div>

        <Card variant="yellow" padding="lg" style={{ marginTop: 18 }}>
          <Tag tone="dark" style={{ background: "var(--charcoal-900)", color: "var(--accent)", borderColor: "var(--charcoal-900)" }}>
            Try it
          </Tag>
          <h3 className="sh-cta-h" style={{ color: "var(--charcoal-900)", marginTop: 10 }}>
            Open Stophole in WhatsApp.
          </h3>
          <p style={{ marginTop: 8, fontSize: 13, color: "var(--charcoal-900)" }}>
            We'll reply with your ward card. You can opt out any time by
            sending <strong>STOP</strong>. POPIA-compliant.
          </p>
          <div style={{ marginTop: 16 }}>
            <Button
              variant="dark"
              size="lg"
              fullWidth
              leadingIcon={<MessageCircle size={16} />}
              trailingIcon={<ArrowRight size={16} />}
              onClick={() => {
                window.open(WA_HREF, "_blank", "noopener");
              }}
            >
              Chat to Stophole on WhatsApp
            </Button>
          </div>
          <p style={{ marginTop: 10, fontSize: 11, color: "var(--charcoal-900)", opacity: 0.7 }}>
            Number: {WA_NUMBER} (placeholder — connects to a real number on launch).
          </p>
        </Card>
      </div>
    </PhoneShell>
  );
}

function Bubble({ from, children }: { from: "me" | "bot"; children: React.ReactNode }) {
  const me = from === "me";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: me ? "flex-end" : "flex-start",
        margin: "6px 0",
      }}
    >
      <div
        style={{
          maxWidth: "82%",
          padding: "8px 12px",
          borderRadius: 12,
          background: me ? "#DCF8C6" : "#FFFFFF",
          color: "#0e0e0d",
          fontSize: 13,
          lineHeight: 1.45,
          boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
        }}
      >
        {children}
      </div>
    </div>
  );
}