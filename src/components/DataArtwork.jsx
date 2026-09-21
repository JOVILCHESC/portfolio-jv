import { useRef } from 'react'
import useArtworkTilt from '../hooks/useArtworkTilt.js'

export default function DataArtwork({ content }) {
  const artworkRef = useRef(null)
  useArtworkTilt(artworkRef)
  return (
    <div
      ref={artworkRef}
      className="data-artwork"
      data-reveal="artwork"
      aria-hidden="true"
    >
      <div className="artwork-top">
        <span className="tiny-cross">+</span>
        <span>{content.graphicEyebrow}</span>
        <span className="tiny-cross">+</span>
      </div>
      <svg className="data-network" viewBox="0 0 460 350" fill="none">
        <defs>
          <pattern
            id="dot-grid"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#b4abc9" opacity=".5" />
          </pattern>
        </defs>
        <rect width="460" height="350" fill="url(#dot-grid)" />
        <g stroke="#c5bcdb" strokeWidth="1">
          <path d="M68 78 231 55 387 106 401 258 245 306 76 262Z" />
          <path d="m68 78 177 228 142-200L76 262 231 55 401 258 68 78" />
          <circle cx="234" cy="175" r="116" strokeDasharray="3 7" />
          <path d="M234 32v286M85 175h298" strokeDasharray="3 7" />
        </g>
        <g className="artwork-nodes" fill="#f7f4fc" stroke="#b8aacd">
          <circle cx="68" cy="78" r="8" />
          <circle cx="231" cy="55" r="6" />
          <circle cx="387" cy="106" r="10" />
          <circle cx="401" cy="258" r="6" />
          <circle cx="245" cy="306" r="9" />
          <circle cx="76" cy="262" r="7" />
        </g>
        <path
          className="artwork-connections"
          d="m68 78 165 97 154-69M233 175l12 131M233 175 76 262"
          stroke="#7861ce"
          strokeWidth="2"
        />
        <circle
          cx="234"
          cy="175"
          r="65"
          fill="#e1d9f4"
          fillOpacity=".7"
          stroke="#b1a0d8"
        />
        <g className="artwork-icon">
          <rect
            x="195"
            y="136"
            width="78"
            height="78"
            rx="22"
            fill="#6950bd"
            transform="rotate(-12 234 175)"
          />
          <path
            d="M214 185v-14m20 14v-30m20 30v-21"
            stroke="#fff"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </g>
        <circle cx="68" cy="78" r="3" fill="#7861ce" />
        <circle cx="387" cy="106" r="4" fill="#7861ce" />
        <circle cx="245" cy="306" r="3" fill="#7861ce" />
      </svg>
      <div className="artwork-title">{content.graphicTitle}</div>
      <div className="artwork-stages">
        {content.graphicLabels.map((label, index) => (
          <span key={label}>
            {index > 0 && <i>↗</i>}
            {label}
          </span>
        ))}
      </div>
      <div className="artwork-bottom">
        <span>{content.graphicNote}</span>
        <span>↗</span>
      </div>
    </div>
  )
}
