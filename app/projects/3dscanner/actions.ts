"use server";

import { redirect } from "next/navigation";
import { refresh } from "next/cache";
import { isOwner } from "@/lib/owner";
import { sharedDb } from "@/lib/shared-db";
import { lumaEmbedUrl, NOTE_COLORS, type NoteColor } from "@/lib/scanner";

export type FormState = { error?: string; values?: Record<string, string> };

const text = (f: FormData, k: string, max: number) => String(f.get(k) ?? "").trim().slice(0, max);

export async function createSpace(_prev: FormState, form: FormData): Promise<FormState> {
  if (!(await isOwner())) return { error: "Only the owner can add spaces." };
  const title = text(form, "title", 120);
  const description = text(form, "description", 1000) || null;
  const luma_url = text(form, "luma_url", 500);
  const values = { title, description: description ?? "", luma_url };
  if (!title || !luma_url) return { error: "A title and a Luma link are both needed.", values };
  const embed = lumaEmbedUrl(luma_url);
  if (!embed) return { error: "That doesn't look like a Luma capture link (lumalabs.ai/capture/...).", values };

  const { data, error } = await sharedDb()
    .from("scanner_spaces")
    .insert({ title, description, luma_url, luma_embed_url: embed })
    .select("id")
    .single();
  if (error) return { error: error.message, values };
  redirect(`/projects/3dscanner/space/${data.id}`);
}

export async function deleteSpace(id: string) {
  if (!(await isOwner())) return;
  await sharedDb().from("scanner_spaces").delete().eq("id", id); // notes cascade
  redirect("/projects/3dscanner");
}

export async function addNote(spaceId: string, _prev: FormState, form: FormData): Promise<FormState> {
  if (!(await isOwner())) return { error: "Only the owner can add notes." };
  const title = text(form, "title", 120);
  const description = text(form, "description", 1000) || null;
  const c = String(form.get("color") ?? "yellow");
  const color: NoteColor = (NOTE_COLORS as readonly string[]).includes(c) ? (c as NoteColor) : "yellow";
  if (!title) return { error: "Give the note a title." };
  const { error } = await sharedDb().from("scanner_notes").insert({ space_id: spaceId, title, description, color });
  if (error) return { error: error.message };
  refresh();
  return {};
}

export async function deleteNote(id: string) {
  if (!(await isOwner())) return;
  await sharedDb().from("scanner_notes").delete().eq("id", id);
  refresh();
}
