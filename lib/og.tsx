import { ImageResponse } from "next/og";
import { site } from "./site";

export const ogSize = { width: 1200, height: 630 };

// Same shapes as public/images/brand.svg
function Brand() {
  return (
    <svg width="63" height="96" viewBox="0 0 21 32" fill="none">
      <path
        d="M0 2.91L5.098 0v29.09L0 26.183V2.909zM10.196 8.727v5.819l5.097 2.909v5.818l-5.097 2.909V32l10.195-5.818V14.546L10.196 8.727z"
        fill="#DB4D53"
      />
    </svg>
  );
}

export function ogImage({ caption, title }: { caption: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#ffffff",
          color: "#064453",
        }}
      >
        <Brand />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 300, letterSpacing: 10, color: "#cddadd", marginBottom: -40 }}>
            {caption}
          </div>
          <div style={{ fontSize: title.length > 40 ? 60 : 72, lineHeight: 1.15 }}>{title}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#386975" }}>
          <span>{site.name}</span>
          <span style={{ color: "#db4d53" }}>{new URL(site.url).host}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
