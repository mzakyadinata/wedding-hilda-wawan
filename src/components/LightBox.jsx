import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { m, useReducedMotion } from "framer-motion";

const Icon = ({ d }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

// Dirender lewat portal ke <body>: section memakai transform (reveal), yang akan merusak position:fixed jika overlay ada di dalamnya.
export default function Lightbox({ photos, index, onIndex, onClose }) {
  const reduce = useReducedMotion();
  const root = useRef(null);
  const closeBtn = useRef(null);
  const touchX = useRef(null);
  const [dir, setDir] = useState(0);
  const count = photos.length;
  const photo = photos[index];

  const go = useCallback(
    (step) => {
      setDir(step);
      onIndex((index + step + count) % count);
    },
    [index, count, onIndex]
  );

  // Kunci scroll halaman, pindahkan fokus ke tombol tutup, kembalikan fokus saat ditutup.
  useEffect(() => {
    const html = document.documentElement,
      body = document.body;
    const prevHtml = html.style.overflow,
      prevBody = body.style.overflow;
    const opener = document.activeElement;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      opener?.focus?.();
    };
  }, []);

  // Keyboard: Esc tutup, panah kiri/kanan ganti foto, Tab berputar di dalam dialog.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && count > 1) go(1);
      else if (e.key === "ArrowLeft" && count > 1) go(-1);
      else if (e.key === "Tab") {
        const items = root.current?.querySelectorAll("button");
        if (!items?.length) return;
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose, count]);

  // Muat foto tetangga lebih dulu agar perpindahan terasa instan.
  useEffect(() => {
    if (count < 2) return;
    [1, -1].forEach((s) => {
      new Image().src = photos[(index + s + count) % count].src;
    });
  }, [index, count, photos]);

  const stop = (fn) => (e) => {
    e.stopPropagation();
    fn();
  };
  const dur = reduce ? 0 : 0.3;

  return createPortal(
    <m.div
      ref={root}
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label="Pratinjau foto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: dur }}
      onClick={onClose}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current == null || count < 2) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <button
        ref={closeBtn}
        type="button"
        className="lb-btn lb-close"
        onClick={stop(onClose)}
        aria-label="Tutup foto"
      >
        <Icon d="M6 6l12 12M18 6L6 18" />
      </button>

      <m.img
        key={index}
        className="lb-img"
        src={photo.src}
        alt={photo.alt}
        draggable={false}
        onClick={(e) => e.stopPropagation()}
        initial={reduce ? false : { opacity: 0, x: dir * 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      />

      {count > 1 && (
        <>
          <button
            type="button"
            className="lb-btn lb-nav lb-prev"
            onClick={stop(() => go(-1))}
            aria-label="Foto sebelumnya"
          >
            <Icon d="M15 5l-7 7 7 7" />
          </button>
          <button
            type="button"
            className="lb-btn lb-nav lb-next"
            onClick={stop(() => go(1))}
            aria-label="Foto berikutnya"
          >
            <Icon d="M9 5l7 7-7 7" />
          </button>
        </>
      )}
      <div className="lb-count" aria-live="polite">
        {index + 1} / {count}
      </div>
    </m.div>,
    document.body
  );
}
