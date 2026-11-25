import Link from "next/link";

export default function SpaceNotFound() {
  return (
    <div className="sc-form" style={{ textAlign: "center", paddingTop: 96 }}>
      <p style={{ margin: 0, color: "var(--sc-soft)", fontSize: 15 }}>This space doesn&apos;t exist, or it has been taken down.</p>
      <Link href="/projects/3dscanner" style={{ fontSize: 14, textDecoration: "underline" }}>See all spaces</Link>
    </div>
  );
}
