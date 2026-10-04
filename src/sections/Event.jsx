import Reveal from "../components/Reveal";
import { weddingData as d } from "../data/weddingData";

export default function Event() {
  return (
    <Reveal id="event">
      <div className="wrap event-list">
        {d.events.map((e) => (
          <div className="event-item" key={e.label}>
            <div className="label">{e.label}</div>
            <h3 className="serif">{e.date}</h3>
            <p>{e.time}</p>
            <p>{e.venue}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
