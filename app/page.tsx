import { redirect } from "next/navigation";

// The app lives at /projects/3dscanner (same paths as on your-site.com, so nothing inside needed rewriting).
export default function Home() {
  redirect("/projects/3dscanner");
}
