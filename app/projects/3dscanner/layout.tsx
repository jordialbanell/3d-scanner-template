import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppFrame from "../../components/AppFrame";
import "./scanner.css";

export const metadata: Metadata = {
  title: "3DScanner",
  description: "Event spaces, documented in 3D: walk a venue and keep notes pinned to it.",
};

export default function ScannerLayout({ children }: { children: ReactNode }) {
  return (
    <AppFrame name="3DScanner" fill>
      <div className="sc">{children}</div>
    </AppFrame>
  );
}
