import { getClient } from "../lib/supabase";

const ID_KEY = "rsvp-guest-id";
let memoryId;

const uuid = () =>
  globalThis.crypto?.randomUUID?.() ??
  "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

function getGuestId() {
  try {
    let id = localStorage.getItem(ID_KEY);
    if (!id) {
      id = uuid();
      localStorage.setItem(ID_KEY, id);
    }
    return id;
  } catch {
    return (memoryId ??= uuid());
  }
}

export async function submitRsvp({ name, attendance, guest_count, message }) {
  const client = await getClient();
  if (!client) throw new Error("NOT_CONFIGURED");
  const { error } = await client.rpc("submit_rsvp", {
    p_guest_id: getGuestId(),
    p_name: name,
    p_attendance: attendance,
    p_guest_count: guest_count,
    p_message: message || null,
  });
  if (error) throw error;
}
