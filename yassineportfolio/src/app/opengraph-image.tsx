import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Yassine Chahid - Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        color: "white",
        position: "relative",
      }}>
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}>
          Yassine Chahid
        </div>
        <div
          style={{
            fontSize: 40,
            marginBottom: 30,
            opacity: 0.9,
          }}>
          Full-Stack Developer
        </div>
        <div
          style={{
            fontSize: 28,
            display: "flex",
            gap: 20,
            opacity: 0.8,
          }}>
          <span>React</span>
          <span>•</span>
          <span>Next.js</span>
          <span>•</span>
          <span>Laravel</span>
          <span>•</span>
          <span>TypeScript</span>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          fontSize: 24,
          opacity: 0.7,
        }}>
        yassinechahid.vercel.app
      </div>
    </div>,
    {
      ...size,
    },
  );
}
