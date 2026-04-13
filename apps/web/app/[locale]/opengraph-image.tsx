import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Cornerstone AI - AI Strategy & Implementation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1C1917",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Top: CORNERSTONE AI */}
        <div
          style={{
            fontSize: 16,
            letterSpacing: "0.2em",
            color: "#D97706",
            marginBottom: 40,
            fontWeight: 600,
          }}
        >
          CORNERSTONE AI
        </div>

        {/* Main headline line 1 */}
        <div
          style={{
            fontSize: 48,
            color: "#F5F0E8",
            textAlign: "center",
            lineHeight: 1.15,
            marginBottom: 12,
          }}
        >
          You don't need a digital transformation.
        </div>

        {/* Main headline line 2 */}
        <div
          style={{
            fontSize: 42,
            color: "#78716C",
            textAlign: "center",
            lineHeight: 1.15,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span>You need a blueprint to go from&nbsp;</span>
          <span style={{ color: "#D97706", fontStyle: "italic" }}>0 to 1.</span>
        </div>

        {/* Bottom right: URL */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
            fontSize: 14,
            color: "#78716C",
          }}
        >
          cornerstoneai.co
        </div>
      </div>
    ),
    { ...size }
  );
}
