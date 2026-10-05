import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";

const Icon = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    width="19"
    height="19"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const ITEMS = [
  {
    id: "hero",
    label: "Beranda",
    icon: (
      <Icon>
        <path d="M3 11l9-8 9 8" />
        <path d="M5 10v10h5v-6h4v6h5V10" />
      </Icon>
    ),
  },
  {
    id: "couple",
    label: "Mempelai",
    icon: (
      <Icon>
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
      </Icon>
    ),
  },
  {
    id: "event",
    label: "Acara",
    icon: (
      <Icon>
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
      </Icon>
    ),
  },

  {
    id: "gallery",
    label: "Galeri",
    icon: (
      <Icon>
        <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
        <circle cx="9" cy="10" r="1.6" />
        <path d="M20.5 16l-5-5L6 19.5" />
      </Icon>
    ),
  },
  {
    id: "gift",
    label: "Kado",
    icon: (
      <Icon>
        <rect x="3" y="9" width="18" height="11" rx="2" />
        <path d="M12 9v11M3 13h18" />
        <path d="M12 9H7.5a2.5 2.5 0 1 1 0-5C10 4 12 9 12 9Z" />
        <path d="M12 9h4.5a2.5 2.5 0 1 0 0-5C14 4 12 9 12 9Z" />
      </Icon>
    ),
  },
  {
    id: "rsvp",
    label: "RSVP",
    icon: (
      <Icon>
        <path d="M4 6h16v12H4z" />
        <path d="M4 7l8 6 8-6" />
      </Icon>
    ),
  },
  {
    id: "wishes",
    label: "Ucapan",
    icon: (
      <Icon>
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
      </Icon>
    ),
  },
];

export default function NavDock() {
  const [active, setActive] = useState("hero");
  const reduce = useReducedMotion();

  useEffect(() => {
    const els = ITEMS.map((i) => document.getElementById(i.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });

  return (
    <m.nav
      className="dock"
      aria-label="Navigasi undangan"
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        delay: reduce ? 0 : 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {ITEMS.map((it) => (
        <button
          key={it.id}
          type="button"
          className={`dock-btn${active === it.id ? " on" : ""}`}
          onClick={() => go(it.id)}
          aria-label={it.label}
          aria-current={active === it.id ? "true" : undefined}
        >
          {it.icon}
          <span>{it.label}</span>
        </button>
      ))}
    </m.nav>
  );
}
