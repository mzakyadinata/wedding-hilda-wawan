// Placeholder bergaya mockup; jika `src` diisi, foto asli ditampilkan (lazy, tanpa layout shift).
export default function Photo({ src, alt, className = '', eager = false, children }) {
  return (
    <div className={`photoph ${className}`.trim()}>
      {src ? (
        <img className="cover-img" src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      ) : (
        <span className="tag" aria-hidden="true">{children ?? 'foto placeholder'}</span>
      )}
    </div>
  )
}
