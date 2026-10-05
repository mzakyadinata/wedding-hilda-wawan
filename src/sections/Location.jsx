import Reveal from "../components/Reveal";
import Fx from "../components/Fx";
import { Flora } from "../components/Ornaments";
import { weddingData as d } from "../data/weddingData";

export default function Location() {
  const { venue, address, googleMapsUrl, mapEmbedUrl } = d.location;
  return (
    <Reveal id="location" className="tint">
      <Flora corner="bl" />
      <div className="wrap loc-wrap">
        <Fx className="label center" from="down">LOKASI ACARA</Fx>
        <Fx as="h2" className="script sec-title" delay={0.05}>
          {venue}
        </Fx>
        <Fx as="p" className="loc-address" delay={0.1}>{address}</Fx>
        {mapEmbedUrl ? (
          <Fx className="map-embed" from="zoom" duration={1.1}>
            <iframe
              title={`Peta lokasi ${venue}`}
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Fx>
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
