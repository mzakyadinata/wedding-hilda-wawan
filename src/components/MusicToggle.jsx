export default function MusicToggle({ playing, onToggle }) {
  return (
    <button type="button" className={`music-player${playing ? '' : ' paused'}`} onClick={onToggle}
      aria-label={playing ? 'Jeda musik' : 'Putar musik'} aria-pressed={playing}>
      <div className="vinyl" />
      {playing ? (
        <svg className="icon icon-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg className="icon icon-play" style={{ display: 'block' }} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  )
}
