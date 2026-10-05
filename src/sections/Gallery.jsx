import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Reveal from "../components/Reveal";
import Fx from "../components/Fx";
import Lightbox from "../components/LightBox";
import { weddingData as d } from "../data/weddingData";

// 2 kolom di HP, 3 kolom di layar lebar (sama dengan breakpoint 820px di CSS).
function useColumns() {
  const query = "(min-width:820px)";
  const [cols, setCols] = useState(() =>
    window.matchMedia(query).matches ? 3 : 2
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setCols(mq.matches ? 3 : 2);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return cols;
}

// Dua rasio potret bergantian (lebih tinggi / lebih pendek) agar tersusun seperti majalah.
const RATIOS = ["4/5", "2/3"];

export default function Gallery() {
  const cols = useColumns();
  const [active, setActive] = useState(null);
  const photos = useMemo(() => d.gallery.filter((g) => g.src), []);

  const columns = useMemo(() => {
    const out = Array.from({ length: cols }, () => []);
    d.gallery.forEach((g, i) => out[i % cols].push({ g, i }));
    return out;
  }, [cols]);

  return (
    <Reveal id="gallery">
      <div className="wrap">
        <Fx className="label center" from="down">
          GALERI
        </Fx>
        <Fx as="h2" className="script sec-title" delay={0.05}>
          Momen Berharga
        </Fx>
        <div className="gallery-grid" style={{ "--cols": cols }}>
          {columns.map((items, c) => (
            <div className="g-col" key={c}>
              {items.map(({ g, i }, row) => {
                const first = i === 0; // foto pertama: bingkai lengkung, selalu 4/5
                const ratio = first ? "4/5" : RATIOS[(c + row) % 2];
                const cls = `g-item${first ? " g-arch" : ""}`;
                const from = first ? "mask" : c % 2 ? "right" : "left";
                return g.src ? (
                  <Fx
                    as="button"
                    key={i}
                    type="button"
                    from={from}
                    delay={row * 0.08}
                    duration={1}
                    className={`${cls} g-btn`}
                    style={{ aspectRatio: ratio }}
                    onClick={() => setActive(photos.indexOf(g))}
                    aria-label={`Perbesar foto: ${g.alt}`}
                  >
                    <img
                      src={g.src}
                      alt={g.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </Fx>
                ) : (
                  <div
                    key={i}
                    className={`${cls} photoph`}
                    style={{ aspectRatio: ratio }}
                  >
                    <span className="tag" aria-hidden="true">
                      placeholder
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {active !== null && (
          <Lightbox
            photos={photos}
            index={active}
            onIndex={setActive}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </Reveal>
  );
}
