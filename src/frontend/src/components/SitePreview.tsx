import type { SiteContent } from "@/lib/siteGenerator";

type ColorScheme = "warm" | "cool" | "neutral" | "vibrant";
type LayoutStyle = "minimal" | "bold" | "elegant";

interface SitePreviewProps {
  content: SiteContent;
  colorScheme: ColorScheme;
  layoutStyle: LayoutStyle;
}

const colorTokens: Record<
  ColorScheme,
  {
    bg: string;
    primary: string;
    accent: string;
    text: string;
    muted: string;
    card: string;
    border: string;
  }
> = {
  warm: {
    bg: "#faf6f0",
    primary: "#e07a2f",
    accent: "#d4512a",
    text: "#2c1a0e",
    muted: "#8a6a50",
    card: "#fff8f0",
    border: "#e8d5c0",
  },
  cool: {
    bg: "#f0f6fb",
    primary: "#1a7fbf",
    accent: "#0e6aad",
    text: "#0e1c2e",
    muted: "#4a7090",
    card: "#f5faff",
    border: "#c5ddf0",
  },
  neutral: {
    bg: "#f7f7f8",
    primary: "#3d3d4a",
    accent: "#22222e",
    text: "#111118",
    muted: "#70707a",
    card: "#ffffff",
    border: "#e2e2e8",
  },
  vibrant: {
    bg: "#faf0ff",
    primary: "#8a2be2",
    accent: "#c026d3",
    text: "#1a0828",
    muted: "#7a4090",
    card: "#fdf5ff",
    border: "#ddb8f0",
  },
};

const fontStyles: Record<
  LayoutStyle,
  { heading: string; body: string; headingWeight: string; spacing: string }
> = {
  minimal: {
    heading: "system-ui, -apple-system, sans-serif",
    body: "system-ui, -apple-system, sans-serif",
    headingWeight: "500",
    spacing: "1.8",
  },
  bold: {
    heading: "Georgia, 'Times New Roman', serif",
    body: "system-ui, -apple-system, sans-serif",
    headingWeight: "800",
    spacing: "1.5",
  },
  elegant: {
    heading: "Georgia, 'Times New Roman', serif",
    body: "Georgia, 'Times New Roman', serif",
    headingWeight: "600",
    spacing: "2",
  },
};

function PlaceholderImage({
  label,
  colors,
}: { label: string; colors: typeof colorTokens.warm }) {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${colors.primary}22, ${colors.accent}33)`,
        border: `1px solid ${colors.border}`,
        borderRadius: 8,
        aspectRatio: "4/3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: colors.muted,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.05em",
        textTransform: "uppercase" as const,
      }}
    >
      {label}
    </div>
  );
}

export default function SitePreview({
  content,
  colorScheme,
  layoutStyle,
}: SitePreviewProps) {
  const c = colorTokens[colorScheme];
  const f = fontStyles[layoutStyle];
  const { sections } = content;

  const baseStyle: React.CSSProperties = {
    fontFamily: f.body,
    color: c.text,
    background: c.bg,
    minHeight: "100%",
    fontSize: 14,
    lineHeight: f.spacing,
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: f.heading,
    fontWeight: f.headingWeight,
    color: c.text,
    lineHeight: 1.2,
  };

  return (
    <div style={baseStyle}>
      {/* Nav */}
      <nav
        style={{
          background: c.card,
          borderBottom: `1px solid ${c.border}`,
          padding: "12px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <span style={{ ...headingStyle, fontSize: 16, fontWeight: "700" }}>
          {content.title}
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          {content.navLinks.map((link) => (
            <span
              key={link}
              style={{
                fontSize: 13,
                color: c.muted,
                cursor: "pointer",
              }}
            >
              {link}
            </span>
          ))}
        </div>
      </nav>

      {/* Hero */}
      {sections.includes("hero") && (
        <section
          style={{
            background: `linear-gradient(160deg, ${c.primary}18 0%, ${c.bg} 60%)`,
            padding: layoutStyle === "bold" ? "80px 40px" : "64px 40px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              ...headingStyle,
              fontSize: layoutStyle === "bold" ? 44 : 36,
              marginBottom: 16,
            }}
          >
            {content.tagline}
          </h1>
          <p
            style={{
              color: c.muted,
              maxWidth: 560,
              margin: "0 auto 28px",
              fontSize: 15,
              lineHeight: 1.7,
            }}
          >
            {content.heroText}
          </p>
          <button
            type="button"
            style={{
              background: c.primary,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 28px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: f.heading,
            }}
          >
            {content.ctaLabel}
          </button>
        </section>
      )}

      {/* Features */}
      {sections.includes("features") && (
        <section style={{ padding: "56px 40px", background: c.bg }}>
          <h2
            style={{
              ...headingStyle,
              fontSize: layoutStyle === "bold" ? 30 : 24,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            {layoutStyle === "elegant" ? "What We Offer" : "Features"}
          </h2>
          <p
            style={{
              textAlign: "center",
              color: c.muted,
              marginBottom: 36,
              fontSize: 13,
            }}
          >
            Everything you need, nothing you don't.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              maxWidth: 800,
              margin: "0 auto",
            }}
          >
            {content.features.map((f_item) => (
              <div
                key={f_item.title}
                style={{
                  background: c.card,
                  border: `1px solid ${c.border}`,
                  borderRadius: 12,
                  padding: 20,
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 10 }}>
                  {f_item.icon}
                </div>
                <h3 style={{ ...headingStyle, fontSize: 14, marginBottom: 6 }}>
                  {f_item.title}
                </h3>
                <p style={{ color: c.muted, fontSize: 12, lineHeight: 1.6 }}>
                  {f_item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {sections.includes("gallery") && (
        <section style={{ padding: "56px 40px", background: c.card }}>
          <h2
            style={{
              ...headingStyle,
              fontSize: layoutStyle === "bold" ? 30 : 24,
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            Gallery
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              maxWidth: 800,
              margin: "0 auto",
            }}
          >
            {content.galleryLabels.map((label) => (
              <PlaceholderImage key={label} label={label} colors={c} />
            ))}
          </div>
        </section>
      )}

      {/* About */}
      {sections.includes("about") && (
        <section
          style={{
            padding: "56px 40px",
            background: c.bg,
            display: "flex",
            gap: 48,
            alignItems: "center",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              flexShrink: 0,
              borderRadius: 16,
              background: `linear-gradient(135deg, ${c.primary}30, ${c.accent}20)`,
              border: `1px solid ${c.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
            }}
          >
            🏠
          </div>
          <div>
            <h2
              style={{
                ...headingStyle,
                fontSize: layoutStyle === "bold" ? 30 : 24,
                marginBottom: 16,
              }}
            >
              Our Story
            </h2>
            <p style={{ color: c.muted, lineHeight: 1.8, fontSize: 13 }}>
              {content.aboutText}
            </p>
          </div>
        </section>
      )}

      {/* Contact */}
      {sections.includes("contact") && (
        <section
          style={{
            padding: "56px 40px",
            background: `linear-gradient(160deg, ${c.primary}10 0%, ${c.card} 100%)`,
            borderTop: `1px solid ${c.border}`,
          }}
        >
          <h2
            style={{
              ...headingStyle,
              fontSize: layoutStyle === "bold" ? 30 : 24,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Get In Touch
          </h2>
          <p
            style={{
              textAlign: "center",
              color: c.muted,
              marginBottom: 36,
              fontSize: 13,
            }}
          >
            We'd love to hear from you.
          </p>
          <div
            style={{
              maxWidth: 480,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column" as const,
              gap: 12,
            }}
          >
            {["Your name", "Email address", "Message"].map((ph, i) => (
              <div
                key={ph}
                style={{
                  background: c.card,
                  border: `1px solid ${c.border}`,
                  borderRadius: 8,
                  padding: i === 2 ? "12px 14px" : "10px 14px",
                  color: c.muted,
                  fontSize: 13,
                  minHeight: i === 2 ? 80 : undefined,
                }}
              >
                {ph}
              </div>
            ))}
            <button
              type="button"
              style={{
                background: c.primary,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "12px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: f.heading,
                marginTop: 4,
              }}
            >
              Send Message
            </button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer
        style={{
          background: c.card,
          borderTop: `1px solid ${c.border}`,
          padding: "20px 40px",
          textAlign: "center",
          fontSize: 12,
          color: c.muted,
        }}
      >
        <span style={{ ...headingStyle, fontSize: 14, marginRight: 16 }}>
          {content.title}
        </span>
        {content.footerText}
      </footer>
    </div>
  );
}
