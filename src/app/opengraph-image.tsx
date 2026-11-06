import { ImageResponse } from "next/og";

export const alt = "Om Shinde // AI Systems Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          backgroundColor: "#F4F1EA",
          border: "16px solid #0D0D0D",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "4px solid #0D0D0D",
            paddingBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#0D0D0D",
                color: "#CCFF00",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "24px",
                border: "2px solid #FF3B00",
                marginRight: "16px",
              }}
            >
              OM
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "20px",
                fontWeight: 800,
                color: "#0D0D0D",
                letterSpacing: "0.1em",
              }}
            >
              OM SHINDE // AI SYSTEMS ARCHITECT
            </div>
          </div>

          <div
            style={{
              display: "flex",
              padding: "6px 14px",
              backgroundColor: "#FF3B00",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "14px",
              letterSpacing: "0.1em",
            }}
          >
            SYS.SPEC//2026
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              fontWeight: 900,
              color: "#0D0D0D",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
            }}
          >
            ENGINEERING
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              fontWeight: 900,
              color: "#FF3B00",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            INTELLIGENT SYSTEMS.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              color: "#595650",
              maxWidth: "900px",
              fontWeight: 600,
            }}
          >
            Where probabilistic models meet deterministic reliability.
          </div>
        </div>

        {/* Bottom Coordinates */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "3px solid #0D0D0D",
            paddingTop: "20px",
            fontSize: "14px",
            color: "#595650",
            fontWeight: 700,
          }}
        >
          <div style={{ display: "flex" }}>
            LAT: 18.5204° N // LON: 73.8567° E [INDIA]
          </div>
          <div style={{ color: "#0D0D0D", display: "flex" }}>
            <span>5 ARCHITECTURAL DEMONSTRATIONS</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
