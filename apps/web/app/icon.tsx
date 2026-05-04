import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512
};

export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 168,
          fontWeight: 800,
          borderRadius: 96,
          fontFamily: "Arial"
        }}
      >
        AB
      </div>
    ),
    size
  );
}
