"use client";

import { useActionState, useState } from "react";
import type { Note, Space } from "@/lib/scanner";
import { addNote, deleteNote, deleteSpace, type FormState } from "../../actions";

const COLORS: Record<Note["color"], string> = {
  yellow: "#E9C46A",
  blue: "#6FA8DC",
  red: "#E5674F",
  green: "#7FB77E",
};

export default function SpaceView({ space, notes, owner }: { space: Space; notes: Note[]; owner: boolean }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard blocked: nothing to do */ }
  };

  return (
    <div className="sc-viewer">
      <aside className="sc-notes" aria-label="Notes">
        <div className="sc-notes-head">
          Notes <span className="sc-count">{notes.length}</span>
          <button type="button" className="sc-btn-ghost" style={{ marginLeft: "auto", height: 28 }} onClick={copy}>
            {copied ? "Link copied" : "Share"}
          </button>
        </div>

        {space.description && (
          <p style={{ margin: 0, padding: "12px 16px", fontSize: 13, lineHeight: 1.5, color: "var(--sc-soft)", borderBottom: "1px solid var(--sc-line)" }}>
            {space.description}
          </p>
        )}

        {owner && <AddNote spaceId={space.id} />}

        <div className="sc-notes-list">
          {notes.length === 0 ? (
            <p style={{ margin: 0, padding: "28px 16px", textAlign: "center", fontSize: 13, color: "var(--sc-muted)" }}>
              No notes on this space yet.
            </p>
          ) : (
            notes.map((n) => {
              const open = openId === n.id;
              return (
                <div key={n.id} style={{ position: "relative" }}>
                  <button
                    type="button"
                    className={`sc-note${open ? " is-open" : ""}`}
                    style={{ borderLeftColor: COLORS[n.color] }}
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : n.id)}
                  >
                    <p className="sc-note-title">{n.title}</p>
                    {n.description && (
                      <p className="sc-note-desc" style={open ? undefined : { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {n.description}
                      </p>
                    )}
                    <p className="sc-note-meta">
                      {new Date(n.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </button>
                  {owner && open && (
                    <form action={deleteNote.bind(null, n.id)} style={{ position: "absolute", right: 12, bottom: 10 }}>
                      <button type="submit" className="sc-btn-ghost sc-btn-danger" style={{ height: 26, fontSize: 11 }}>Delete</button>
                    </form>
                  )}
                </div>
              );
            })
          )}
        </div>

        {owner && (
          <form
            action={deleteSpace.bind(null, space.id)}
            onSubmit={(e) => { if (!window.confirm(`Delete "${space.title}" and all its notes?`)) e.preventDefault(); }}
            style={{ padding: 12, borderTop: "1px solid var(--sc-line)" }}
          >
            <button type="submit" className="sc-btn-ghost sc-btn-danger" style={{ width: "100%", justifyContent: "center" }}>
              Delete space
            </button>
          </form>
        )}
      </aside>

      <section className="sc-scene" aria-label="3D space">
        {space.luma_embed_url ? (
          <>
            {!loaded && <div className="sc-scene-empty">Loading the 3D space…</div>}
            <iframe
              src={space.luma_embed_url}
              title={`${space.title}, 3D capture`}
              allow="xr-spatial-tracking; fullscreen"
              onLoad={() => setLoaded(true)}
            />
          </>
        ) : (
          <div className="sc-scene-empty">This space has no 3D capture yet.</div>
        )}
      </section>
    </div>
  );
}

function AddNote({ spaceId }: { spaceId: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(addNote.bind(null, spaceId), {});
  const [color, setColor] = useState<Note["color"]>("yellow");

  // React clears the fields itself once the action finishes.
  return (
    <form action={action} className="sc-addnote">
      <input name="title" required maxLength={120} placeholder="New note, e.g. Power at the back wall" className="sc-input" style={{ height: 36 }} aria-label="Note title" />
      <textarea name="description" maxLength={1000} placeholder="Details (optional)" className="sc-textarea" style={{ minHeight: 56 }} aria-label="Note details" />
      <input type="hidden" name="color" value={color} />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div className="sc-swatches" role="radiogroup" aria-label="Colour">
          {(Object.keys(COLORS) as Note["color"][]).map((c) => (
            <button key={c} type="button" role="radio" aria-checked={color === c} aria-label={c} className="sc-swatch" style={{ background: COLORS[c] }} onClick={() => setColor(c)} />
          ))}
        </div>
        <button type="submit" className="sc-btn" disabled={pending} style={{ marginLeft: "auto", height: 30, fontSize: 12 }}>
          {pending ? "Saving…" : "Add note"}
        </button>
      </div>
      {state.error && <div className="sc-error">{state.error}</div>}
    </form>
  );
}
