"use client";

import { useActionState } from "react";
import { createSpace, type FormState } from "../actions";

export default function NewSpaceForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(createSpace, {});
  return (
    <form action={action} className="sc-form" key={JSON.stringify(state.values ?? {})}>
      <div>
        <label className="sc-label" htmlFor="title">Title</label>
        <input id="title" name="title" required maxLength={120} defaultValue={state.values?.title} className="sc-input" placeholder="e.g. Marina Bay ballroom, Oct walk-through" />
      </div>
      <div>
        <label className="sc-label" htmlFor="description">Description (optional)</label>
        <textarea id="description" name="description" rows={3} maxLength={1000} defaultValue={state.values?.description} className="sc-textarea" placeholder="What is this space, and what's it for?" />
      </div>
      <div>
        <label className="sc-label" htmlFor="luma_url">Luma capture link</label>
        <input id="luma_url" name="luma_url" type="url" required defaultValue={state.values?.luma_url} className="sc-input" placeholder="https://lumalabs.ai/capture/..." />
        <p className="sc-hint">Film the venue on your phone, upload it to Luma, then paste the capture&apos;s link here.</p>
      </div>
      {state.error && <div className="sc-error">{state.error}</div>}
      <button type="submit" className="sc-btn" disabled={pending} style={{ height: 40 }}>
        {pending ? "Creating…" : "Create space"}
      </button>
    </form>
  );
}
