import Link from "next/link";
import { Suspense } from "react";
import { isOwner } from "@/lib/owner";
import { listSpaces } from "@/lib/scanner";
import OwnerSignIn from "../_owner/OwnerSignIn";
import Cube from "./Cube";

export default function ScannerHome() {
  return (
    <>
      <header className="sc-head">
        <div className="sc-head-title"><span>Spaces</span></div>
        <Suspense fallback={null}>
          <HeadRight />
        </Suspense>
      </header>
      <main className="sc-main">
        <p className="sc-intro">
          A venue walk-through, filmed on a phone and turned into a 3D space you can explore. Each space keeps the notes
          that matter for the next event there: where the power is, which doors open, what the room really fits.
        </p>
        <Suspense fallback={<div className="sc-empty">Loading spaces…</div>}>
          <SpaceGrid />
        </Suspense>
      </main>
    </>
  );
}

async function HeadRight() {
  const owner = await isOwner();
  return (
    <div className="sc-head-right">
      <OwnerSignIn owner={owner} />
      {owner && <Link href="/projects/3dscanner/new" className="sc-btn">New space</Link>}
    </div>
  );
}

async function SpaceGrid() {
  const [{ spaces, error }, owner] = await Promise.all([listSpaces(), isOwner()]);
  if (error) {
    return (
      <div className="sc-empty">
        Spaces can&apos;t be loaded right now.
        {owner && <div style={{ marginTop: 8, fontSize: 12 }}>{error}</div>}
      </div>
    );
  }
  if (spaces.length === 0) {
    return <div className="sc-empty">No spaces yet. They go up here after an event.</div>;
  }
  return (
    <div className="sc-grid">
      {spaces.map((s) => (
        <Link key={s.id} href={`/projects/3dscanner/space/${s.id}`} className="sc-card">
          <div className="sc-card-art"><Cube size={44} /></div>
          <div className="sc-card-body">
            <h2 className="sc-card-title">{s.title}</h2>
            <p className="sc-card-meta">
              {new Date(s.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
