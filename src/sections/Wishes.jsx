import { useEffect, useRef, useState } from "react";
import Reveal from "../components/Reveal";
import { fetchWishes, submitWish } from "../services/wishes";
import { timeAgo } from "../lib/time";

const COOLDOWN_MS = 15000;

export default function Wishes() {
  const root = useRef(null);
  const lastSent = useRef(0);
  const [wishes, setWishes] = useState([]);
  const [load, setLoad] = useState("idle"); // idle | loading | ready | error
  const [form, setForm] = useState({ name: "", message: "", website: "" });
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [totalWishes, setTotalWishes] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // const loadWishes = () => {
  //   setLoad("loading");
  //   fetchWishes()
  //     .then((d) => {
  //       setWishes(d);
  //       setLoad("ready");
  //     })
  //     .catch((err) => {
  //       console.error("FETCH WISHES ERROR:", err);
  //       setLoad("error");
  //     });
  // };

  const loadWishes = async (page = 1) => {
    setLoad("loading");

    try {
      const result = await fetchWishes(page, ITEMS_PER_PAGE);

      setWishes(result.data);
      setTotalWishes(result.count);
      setLoad("ready");
    } catch (err) {
      console.error("FETCH WISHES ERROR:", err);
      setLoad("error");
    }
  };

  // Fetch sekali, hanya ketika section mendekati viewport.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          loadWishes(1);
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (sending) return;
    const name = form.name.trim(),
      message = form.message.trim();
    if (name.length < 2 || name.length > 80)
      return setMsg({ type: "error", text: "Nama harus 2–80 karakter." });
    if (message.length < 2 || message.length > 500)
      return setMsg({ type: "error", text: "Ucapan harus 2–500 karakter." });
    if (Date.now() - lastSent.current < COOLDOWN_MS)
      return setMsg({
        type: "error",
        text: "Mohon tunggu sebentar sebelum mengirim lagi.",
      });
    if (form.website) return setForm({ name: "", message: "", website: "" }); // honeypot
    setSending(true);
    setMsg({ type: "", text: "" });
    try {
      const row = await submitWish({ name, message });
      lastSent.current = Date.now();
      // setWishes((w) => [row, ...w]);
      // setLoad((s) => (s === "ready" ? s : "ready"));

      setCurrentPage(1);
      await loadWishes(1);
      setForm({ name: "", message: "", website: "" });
      setMsg({ type: "ok", text: "Terima kasih, ucapan Anda sudah terkirim." });
    } catch (err) {
      setMsg({
        type: "error",
        text:
          err?.message === "NOT_CONFIGURED"
            ? "Layanan ucapan belum aktif."
            : "Ucapan gagal terkirim. Silakan coba lagi.",
      });
    } finally {
      setSending(false);
    }
  };

  const totalPages = Math.ceil(totalWishes / ITEMS_PER_PAGE);

  const goToPage = async (page) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    setCurrentPage(page);
    await loadWishes(page);
  };

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "ellipsis",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      totalPages,
    ];
  };

  return (
    <Reveal id="wishes">
      <div className="wrap" ref={root}>
        <div
          className="label"
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          UCAPAN &amp; DOA
        </div>
        <form className="wish-form" onSubmit={onSubmit} noValidate>
          <div className="sr-only-field" aria-hidden="true">
            <input
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={set("website")}
            />
          </div>
          <input
            type="text"
            placeholder="Nama"
            aria-label="Nama"
            value={form.name}
            onChange={set("name")}
            maxLength={80}
            autoComplete="name"
          />
          <textarea
            rows={2}
            placeholder="Tulis ucapan..."
            aria-label="Ucapan dan doa"
            value={form.message}
            onChange={set("message")}
            maxLength={500}
          />
          <button type="submit" disabled={sending}>
            {sending ? "Mengirim…" : "Kirim"}
          </button>
          {msg.text && (
            <div
              className={msg.type === "error" ? "err" : "form-note"}
              style={{ textAlign: "right", marginTop: 0 }}
              role={msg.type === "error" ? "alert" : "status"}
            >
              {msg.text}
            </div>
          )}
        </form>

        <div className="wish-divider">
          <span className="wish-divider-line"></span>

          <div className="wish-divider-center">
            <span className="wish-divider-ornament">✦</span>
            <span className="wish-divider-label">UCAPAN DARI PARA TAMU</span>
          </div>

          <span className="wish-divider-line"></span>
        </div>
        <div className="wish-list" aria-live="polite">
          {load === "loading" && (
            <div className="wish-empty">Memuat ucapan…</div>
          )}
          {load === "error" && (
            <div className="wish-empty">
              Ucapan belum dapat dimuat.{" "}
              <button
                type="button"
                className="link-btn"
                style={{ marginTop: 0 }}
                onClick={loadWishes}
              >
                Coba lagi
              </button>
            </div>
          )}
          {load === "ready" && wishes.length === 0 && (
            <div className="wish-empty">
              Jadilah yang pertama memberikan ucapan.
            </div>
          )}
          {wishes.map((w) => (
            <div className="wish-card" key={w.id}>
              <div className="who">
                {w.name} <span>{timeAgo(w.created_at)}</span>
              </div>
              <p>{w.message}</p>
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              className="wish-pagination"
              aria-label="Navigasi halaman ucapan"
            >
              <button
                type="button"
                className="wish-page-arrow"
                disabled={currentPage === 1 || load === "loading"}
                onClick={() => goToPage(currentPage - 1)}
              >
                ‹
              </button>

              <div className="wish-page-numbers">
                {getPageNumbers().map((page, index) =>
                  page === "ellipsis" ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="wish-page-ellipsis"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={page}
                      type="button"
                      className={`wish-page-number ${
                        currentPage === page ? "active" : ""
                      }`}
                      disabled={load === "loading"}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                type="button"
                className="wish-page-arrow"
                disabled={currentPage === totalPages || load === "loading"}
                onClick={() => goToPage(currentPage + 1)}
              >
                ›
              </button>
            </nav>
          )}
        </div>
      </div>
    </Reveal>
  );
}
