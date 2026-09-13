import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#161412",
          color: "#F4F1EA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: -0.5,
          border: "1px solid #6E5840",
        }}
      >
        N
      </div>
    ),
    size,
  );
}
