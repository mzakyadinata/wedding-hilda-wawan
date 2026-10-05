import Reveal from "../components/Reveal";
import Fx from "../components/Fx";
import { Flora } from "../components/Ornaments";
import { weddingData as d } from "../data/weddingData";

const stamp = (date) => date.toISOString().replace(/[-:]|\.\d{3}/g, "");

// Link "Simpan ke Google Calendar". Jam selesai: weddingEnd (opsional), default +3 jam.
const calendarUrl = (e) => {
  const start = new Date(d.weddingDate);
  const end = d.weddingEnd
    ? new Date(d.weddingEnd)
    : new Date(start.getTime() + 3 * 3600 * 1000);
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: `Pernikahan ${d.groom.short} & ${d.bride.short}`,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: `${e.label} — ${e.time}`,
    location: e.venue || d.location.address,
  });
  return `https://calendar.google.com/calendar/render?${q}`;
};

const Clock = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const Pin = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export default function Event() {
  return (
    <Reveal id="event" className="batik-soft">
      <Flora corner="tr" />
      <div className="wrap">
        <Fx className="label center" from="down">
          RANGKAIAN ACARA
        </Fx>
        <Fx as="h2" className="script sec-title" delay={0.05}>
          Hari Bahagia
        </Fx>
        <div className="event-list">
          {d.events.map((e, i) => (
            <Fx
              className="event-item"
              key={e.label}
              from="mask"
              duration={1.2}
              delay={i * 0.1}
            >
              <div className="event-in">
                <div className="label">{e.label}</div>
                <h3 className="script">{e.date}</h3>
                <p className="ev-row">
                  <Clock />
                  {e.time}
                </p>
                <p className="ev-row">
                  <Pin />
                  {e.venue}
                </p>
                <a
                  className="btn-ghost"
                  href={calendarUrl(e)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Simpan ke Kalender
                </a>
              </div>
            </Fx>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
