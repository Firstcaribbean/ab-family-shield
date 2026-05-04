import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #2f86ff 0%, #0f54d9 100%)",
          color: "white",
          fontSize: 68,
          fontWeight: 800,
          borderRadius: 40,
          fontFamily: "Arial"
        }}
      >
        AB
      </div>
    ),
    size
  );
}
