export default function ProjectVisual({ type }) {
  return (
    <svg
      className={`project-visual ${type}`}
      viewBox="0 0 480 270"
      fill="none"
      aria-hidden="true"
    >
      {type === 'datamart' && (
        <>
          <g stroke="currentColor" strokeOpacity=".35">
            <path d="M74 77h108l52 57h86M74 193h108l52-59M239 52v49m0 65v52" />
            <path d="M35 235h410M35 35h410" strokeDasharray="3 7" />
          </g>
          <g fill="#f7f4ff" stroke="#a699c9">
            <rect x="54" y="57" width="102" height="43" rx="7" />
            <rect x="54" y="172" width="102" height="43" rx="7" />
            <rect x="316" y="94" width="108" height="79" rx="8" />
          </g>
          <g fill="#b8a7d9">
            <rect x="69" y="70" width="11" height="17" rx="2" />
            <rect x="86" y="70" width="54" height="4" rx="2" />
            <rect x="86" y="80" width="36" height="4" rx="2" />
            <rect x="69" y="186" width="69" height="4" rx="2" />
            <rect x="69" y="197" width="48" height="4" rx="2" />
          </g>
          <path
            d="M208 121v35c0 19 62 19 62 0v-35"
            fill="#7760b6"
            stroke="#7760b6"
          />
          <ellipse cx="239" cy="119" rx="31" ry="12" fill="#a48ed1" />
          <path d="M208 136c0 18 62 18 62 0" stroke="#cdbfea" />
          <path
            d="M334 153v-19m18 19v-39m18 39v-29m18 29v-45m18 45v-32"
            stroke="#9278c4"
            strokeWidth="9"
          />
          <circle cx="239" cy="51" r="5" fill="#9278c4" />
          <circle cx="239" cy="220" r="5" fill="#9278c4" />
        </>
      )}
      {type === 'analytics' && (
        <>
          <g stroke="#abc2b4" strokeOpacity=".55">
            <path d="M68 42v180h347M68 177h347M68 132h347M68 87h347M138 42v180M208 42v180M278 42v180M348 42v180" />
          </g>
          <path
            d="m85 202 65-23 62-48 61 2 63-52 65-25"
            stroke="#527861"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          {Array.from({ length: 28 }, (_, i) => (
            <circle
              key={i}
              cx={88 + i * 11.3}
              cy={200 - i * 4.8 + Math.sin(i * 2.7) * 33}
              r={i % 4 === 0 ? 6 : 4}
              fill={i % 3 === 0 ? '#567b64' : '#91ac9a'}
            />
          ))}
          <rect
            x="290"
            y="171"
            width="126"
            height="46"
            rx="7"
            fill="#f0f5ef"
            stroke="#a2b7a8"
          />
          <path
            d="m307 201 11-10 10 5 13-12"
            stroke="#567b64"
            strokeWidth="2"
          />
          <path d="M355 187h43m-43 12h28" stroke="#a2b7a8" strokeWidth="4" />
        </>
      )}
      {type === 'scheduling' && (
        <>
          <g stroke="#766790" strokeOpacity=".45">
            <path d="M63 62h355M63 112h355M63 162h355M63 212h355M96 38v198M166 38v198M236 38v198M306 38v198M376 38v198" />
          </g>
          <g fill="#b9a0e3">
            <rect x="80" y="49" width="113" height="25" rx="5" />
            <rect x="208" y="99" width="91" height="25" rx="5" />
            <rect x="323" y="149" width="74" height="25" rx="5" />
          </g>
          <g fill="#776093">
            <rect x="80" y="99" width="76" height="25" rx="5" />
            <rect x="172" y="149" width="126" height="25" rx="5" />
            <rect x="255" y="199" width="142" height="25" rx="5" />
          </g>
          <path
            d="m192 62 17 50m89 0 25 50m-25 0-44 50"
            stroke="#d6c4ec"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path d="M236 31v209" stroke="#d6c4ec" strokeDasharray="3 5" />
          <circle cx="236" cy="31" r="4" fill="#e0d0f4" />
        </>
      )}
    </svg>
  )
}
