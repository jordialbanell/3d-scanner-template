import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { isOwner } from "@/lib/owner";
import { getSpace, listNotes } from "@/lib/scanner";
import OwnerSignIn from "../../../_owner/OwnerSignIn";
import SpaceView from "./SpaceView";

export default function SpacePage({ params }: PageProps<"/projects/3dscanner/space/[id]">) {
  return (
    <Suspense
      fallback={
        <header className="sc-head">
          <div className="sc-head-title"><span>Loading…</span></div>
        </header>
      }
    >
      <Space params={params} />
    </Suspense>
  );
}

async function Space({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const space = await getSpace(id);
  if (!space) notFound();
  const [notes, owner] = await Promise.all([listNotes(space.id), isOwner()]);

  return (
    <>
      <header className="sc-head">
        <div className="sc-head-title">
          <Link href="/projects/3dscanner" aria-label="All spaces" style={{ color: "var(--sc-muted)" }}>&#8592;</Link>
          <span>{space.title}</span>
        </div>
        <div className="sc-head-right">
          <OwnerSignIn owner={owner} />
        </div>
      </header>
      <SpaceView space={space} notes={notes} owner={owner} />
    </>
  );
}
