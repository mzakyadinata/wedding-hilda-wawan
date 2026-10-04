// items: [[top, left, delay], ...]
export default function Sparkles({ items }) {
  return items.map(([top, left, delay], i) => (
    <div key={i} className="sparkle" aria-hidden="true" style={{ top, left, animationDelay: delay }} />
  ))
}
