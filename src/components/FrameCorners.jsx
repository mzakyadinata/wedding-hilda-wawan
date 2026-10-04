export default function FrameCorners() {
  return ['tl', 'tr', 'bl', 'br'].map((p) => <div key={p} className={`frame-corner ${p}`} aria-hidden="true" />)
}
