// 3DScanner data: spaces (a Luma capture of a venue) and notes pinned to them.
import "server-only";
import { sharedDb } from "./shared-db";

export type Space = {
  id: string;
  created_at: string;
  title: string;
  description: string | null;
  luma_url: string;
  luma_embed_url: string | null;
};

export const NOTE_COLORS = ["yellow", "blue", "red", "green"] as const;
export type NoteColor = (typeof NOTE_COLORS)[number];

export type Note = {
  id: string;
  created_at: string;
  space_id: string;
  title: string;
  description: string | null;
  color: NoteColor;
};

// lumalabs.ai/capture/<id> or /captures/<id> -> the embeddable viewer
export function lumaEmbedUrl(lumaUrl: string): string | null {
  const m = lumaUrl.match(/lumalabs\.ai\/(?:captures?|embed)\/([A-Za-z0-9_-]+)/);
  if (!m) return null;
  return `https://lumalabs.ai/embed/${m[1]}?mode=sparkles&background=%23000000&color=%23ffffff&showTitle=false&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right`;
}

export async function listSpaces(): Promise<{ spaces: Space[]; error?: string }> {
  const { data, error } = await sharedDb().from("scanner_spaces").select("*").order("created_at", { ascending: false });
  return error ? { spaces: [], error: error.message } : { spaces: (data ?? []) as Space[] };
}

export async function getSpace(id: string): Promise<Space | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const { data } = await sharedDb().from("scanner_spaces").select("*").eq("id", id).maybeSingle();
  return (data as Space) ?? null;
}

export async function listNotes(spaceId: string): Promise<Note[]> {
  const { data } = await sharedDb().from("scanner_notes").select("*").eq("space_id", spaceId).order("created_at", { ascending: true });
  return (data ?? []) as Note[];
}
