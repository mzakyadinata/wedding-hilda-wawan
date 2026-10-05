import { useState } from "react";
import Reveal from "../components/Reveal";
import Fx from "../components/Fx";
import { Flora } from "../components/Ornaments";
import { submitRsvp } from "../services/rsvp";

const DONE_KEY = "rsvp-submitted";
const readDone = () => {
  try {
    return localStorage.getItem(DONE_KEY) === "1";
  } catch {
    return false;
  }
};
const writeDone = (v) => {
  try {
    v ? localStorage.setItem(DONE_KEY, "1") : localStorage.removeItem(DONE_KEY);
  } catch {
    /* ignore */
  }
};
const SAVED_KEY = "rsvp-saved";
const readSaved = () => {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY));
  } catch {
    return null;
  }
};
const writeSaved = (v) => {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(v));
  } catch {
    /* ignore */
  }
};

export default function Rsvp() {
  const [form, setForm] = useState({
    name: "",
    attendance: "hadir",
    guests: 1,
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(readDone() ? "success" : "idle"); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState("");
  const [editing, setEditing] = useState(false);
  const hadir = form.attendance === "hadir";
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    const name = form.name.trim();
    if (name.length < 2) e.name = "Nama minimal 2 karakter.";
    else if (name.length > 80) e.name = "Nama maksimal 80 karakter.";
    const g = Number(form.guests);
    if (hadir && (!Number.isInteger(g) || g < 1 || g > 10))
      e.guests = "Jumlah tamu 1–10 orang.";
    if (form.message.length > 500) e.message = "Pesan maksimal 500 karakter.";
    return e;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (status === "loading") return;
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    if (form.website) {
      setStatus("success");
      return;
    } // honeypot: bot
    setStatus("loading");
    setErrMsg("");
    try {
      await submitRsvp({
        name: form.name.trim(),
        attendance: hadir ? "hadir" : "tidak_hadir",
        guest_count: hadir ? Number(form.guests) : 0,
        message: form.message.trim(),
      });
      writeDone(true);
      writeSaved({
        name: form.name.trim(),
        attendance: form.attendance,
        guests: hadir ? Number(form.guests) : 1,
        message: form.message.trim(),
      });
      setStatus("success");
    } catch (err) {
      setErrMsg(
        err?.message === "NOT_CONFIGURED"
          ? "Layanan konfirmasi belum aktif. Silakan coba lagi nanti."
          : "Konfirmasi gagal terkirim. Periksa koneksi Anda lalu coba lagi."
      );
      setStatus("error");
    }
  };

  const startEdit = () => {
    const saved = readSaved();
    if (saved) setForm((f) => ({ ...f, ...saved, website: "" }));
    setEditing(true);
    setStatus("idle");
  };
  const loading = status === "loading";
  return (
    <Reveal id="rsvp" className="dark batik-dark">
      <Flora corner="tl" className="on-dark" />
      <Flora corner="br" className="on-dark" delay={0.2} />
      <div className="wrap">
        <Fx className="card" from="mask" duration={1.2}>
          <div className="label">RSVP</div>
          {status === "success" ? (
            <div className="rsvp-done" role="status">
              <h3 className="serif" style={{ marginBottom: 0 }}>
                Terima Kasih
              </h3>
              <p>
                Konfirmasi kehadiran Anda sudah kami terima. Sampai jumpa di
                hari bahagia kami.
              </p>
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  writeDone(false);
                  setStatus("idle");
                }}
              >
                Ubah konfirmasi
              </button>
            </div>
          ) : (
            <>
              <h3 className="serif">Konfirmasi Kehadiran</h3>
              <form onSubmit={onSubmit} noValidate>
                <div className="sr-only-field" aria-hidden="true">
                  <label>
                    Website
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={set("website")}
                    />
                  </label>
                </div>
                <div className="field">
                  <label htmlFor="rsvp-name">Nama</label>
                  <input
                    id="rsvp-name"
                    type="text"
                    placeholder="Nama lengkap"
                    value={form.name}
                    onChange={set("name")}
                    maxLength={80}
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "rsvp-name-err" : undefined}
                  />
                  {errors.name && (
                    <div id="rsvp-name-err" className="err">
                      {errors.name}
                    </div>
                  )}
                </div>
                <div className="segmented" role="group" aria-label="Kehadiran">
                  {[
                    ["hadir", "Hadir"],
                    ["tidak_hadir", "Tidak Hadir"],
                  ].map(([v, l]) => (
                    <button
                      key={v}
                      type="button"
                      className={form.attendance === v ? "active" : ""}
                      aria-pressed={form.attendance === v}
                      onClick={() => setForm((f) => ({ ...f, attendance: v }))}
                    >
                      {l}
                    </button>
                  ))}
                </div>
                <div className="field">
                  <label htmlFor="rsvp-guests">Jumlah Tamu</label>
                  <input
                    id="rsvp-guests"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    max="10"
                    value={hadir ? form.guests : ""}
                    onChange={set("guests")}
                    disabled={!hadir}
                    aria-invalid={!!errors.guests}
                  />
                  {errors.guests && <div className="err">{errors.guests}</div>}
                </div>
                <div className="field">
                  <label htmlFor="rsvp-msg">Pesan (opsional)</label>
                  <textarea
                    id="rsvp-msg"
                    rows={3}
                    placeholder="Tulis pesan untuk mempelai..."
                    value={form.message}
                    onChange={set("message")}
                    maxLength={500}
                  />
                  {errors.message && (
                    <div className="err">{errors.message}</div>
                  )}
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Mengirim…" : "Kirim Konfirmasi"}
                </button>
                {status === "error" && (
                  <div className="err form-note" role="alert">
                    {errMsg}
                  </div>
                )}
              </form>
            </>
          )}
        </Fx>
      </div>
    </Reveal>
  );
}
