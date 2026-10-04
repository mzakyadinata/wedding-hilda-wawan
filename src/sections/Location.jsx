import Reveal from "../components/Reveal";
import { weddingData as d } from "../data/weddingData";

export default function Location() {
  const { venue, address, googleMapsUrl, mapEmbedUrl } = d.location;
  return (
    <Reveal id="location">
      <div className="wrap">
        <div className="label">LOKASI ACARA</div>
        <h3 className="serif" style={{ marginTop: 8 }}>
          {venue}
        </h3>
        <p>{address}</p>
        {mapEmbedUrl ? (
          <div className="map-embed">
            <iframe
              title={`Peta lokasi ${venue}`}
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        ) : (
          <div
            className="map-ph photoph"
            role="img"
            aria-label={`Peta lokasi ${venue}`}
          >
            <div className="pin" />
          </div>
        )}
        <a
          className="btn-maps"
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Buka Google Maps →
        </a>
      </div>
    </Reveal>
  );
}
