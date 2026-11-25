import Link from "next/link";
import { Suspense } from "react";
import { isOwner } from "@/lib/owner";
import OwnerSignIn from "../../_owner/OwnerSignIn";
import NewSpaceForm from "./NewSpaceForm";

export default function NewSpacePage() {
  return (
    <>
      <header className="sc-head">
        <div className="sc-head-title">
          <Link href="/projects/3dscanner" aria-label="All spaces" style={{ color: "var(--sc-muted)" }}>&#8592;</Link>
          <span>New space</span>
        </div>
      </header>
      <Suspense fallback={null}>
        <Gate />
      </Suspense>
    </>
  );
}

async function Gate() {
  if (await isOwner()) return <NewSpaceForm />;
  return (
    <div className="sc-form">
      <p style={{ margin: 0, color: "var(--sc-soft)", fontSize: 15, lineHeight: 1.55 }}>
        Adding spaces is just for the owner. Everything already up is open to look around.
      </p>
      <OwnerSignIn owner={false} />
    </div>
  );
}
