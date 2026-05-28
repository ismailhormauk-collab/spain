'use client'

// La Calavera — Premium Logo System
// Fine-line engraving aesthetic: all strokes, no heavy fills

type Theme = 'dark' | 'light' | 'gold'

const T = {
  dark:  { bg: '#0a0a0a', gold: '#c9a96e', glow: '#e8c97a', text: '#f0ebe3', sub: '#8a8278', eye: '#0a0a0a' },
  light: { bg: '#f5f0e8', gold: '#1a1208', glow: '#3d2e12', text: '#0a0a0a', sub: '#4a3f35', eye: '#f5f0e8' },
  gold:  { bg: 'transparent', gold: '#c9a96e', glow: '#e8c97a', text: '#c9a96e', sub: '#a8895a', eye: 'transparent' },
}

// ─────────────────────────────────────────────
// The Medallion — fine-line skull in a crest ring
// Centered at 0,0 in its own coordinate space
// ─────────────────────────────────────────────
function Medallion({ r = 44, gold, eye }: { r: number; gold: string; eye: string }) {
  const sc = r / 44
  const x = (v: number) => (v - 50) * sc
  const y = (v: number) => (v - 50) * sc

  // Cranium: smooth arch from bottom-left to bottom-right
  const cranium = [
    `M${x(22)},${y(51)}`,
    `C${x(22)},${y(22)} ${x(78)},${y(22)} ${x(78)},${y(51)}`,
    `L${x(78)},${y(57)}`,
    `Q${x(78)},${y(65)} ${x(68)},${y(66)}`,
    `L${x(32)},${y(66)}`,
    `Q${x(22)},${y(65)} ${x(22)},${y(57)}`,
    'Z',
  ].join(' ')

  // Nasal cavity — fine diamond
  const nasal = [
    `M${x(47.5)},${y(55)}`,
    `L${x(50)},${y(59.5)}`,
    `L${x(52.5)},${y(55)}`,
    `L${x(51)},${y(52.5)}`,
    `L${x(49)},${y(52.5)}`,
    'Z',
  ].join(' ')

  // Mandible outer + inner
  const jaw1 = `M${x(24)},${y(66)} Q${x(24)},${y(76)} ${x(50)},${y(77)} Q${x(76)},${y(76)} ${x(76)},${y(66)}`
  const jaw2 = `M${x(30)},${y(66)} Q${x(30)},${y(73)} ${x(50)},${y(74.5)} Q${x(70)},${y(73)} ${x(70)},${y(66)}`

  // Compass diamond helper
  const diamond = (cx: number, cy: number, s: number) =>
    `M${cx},${cy - s} L${cx + s * 0.62},${cy} L${cx},${cy + s} L${cx - s * 0.62},${cy} Z`

  const teeth = [34, 41, 50, 59, 66]

  return (
    <g>
      {/* ── Border rings ── */}
      <circle cx={0} cy={0} r={r}           fill="none" stroke={gold} strokeWidth={0.72 * sc} />
      <circle cx={0} cy={0} r={r * 0.875}   fill="none" stroke={gold} strokeWidth={0.22 * sc} opacity="0.38" />

      {/* ── Compass points ── */}
      <path d={diamond(0, -(r - 0.4 * sc), 2.6 * sc)} fill={gold} />
      <path d={diamond(0,  (r - 0.4 * sc), 2.6 * sc)} fill={gold} />
      <path d={diamond( (r - 0.4 * sc), 0, 2.6 * sc)} fill={gold} />
      <path d={diamond(-(r - 0.4 * sc), 0, 2.6 * sc)} fill={gold} />

      {/* ── 45° tick marks ── */}
      {[45, 135, 225, 315].map(deg => {
        const rad = (deg * Math.PI) / 180
        return (
          <line key={deg}
            x1={Math.cos(rad) * (r - 2.5 * sc)} y1={Math.sin(rad) * (r - 2.5 * sc)}
            x2={Math.cos(rad) * (r - 5.5 * sc)} y2={Math.sin(rad) * (r - 5.5 * sc)}
            stroke={gold} strokeWidth={0.4 * sc} opacity="0.42"
          />
        )
      })}

      {/* ── Cranium ── */}
      <path d={cranium} fill="none" stroke={gold} strokeWidth={0.92 * sc} strokeLinejoin="round" />

      {/* ── Eye sockets ── */}
      <ellipse cx={x(36.5)} cy={y(44.5)} rx={9 * sc}   ry={10 * sc}    fill={eye} stroke={gold} strokeWidth={0.88 * sc} />
      <ellipse cx={x(36.5)} cy={y(44.5)} rx={3.8 * sc} ry={4.3 * sc}   fill="none" stroke={gold} strokeWidth={0.27 * sc} opacity="0.32" />
      <ellipse cx={x(63.5)} cy={y(44.5)} rx={9 * sc}   ry={10 * sc}    fill={eye} stroke={gold} strokeWidth={0.88 * sc} />
      <ellipse cx={x(63.5)} cy={y(44.5)} rx={3.8 * sc} ry={4.3 * sc}   fill="none" stroke={gold} strokeWidth={0.27 * sc} opacity="0.32" />

      {/* ── Nasal ── */}
      <path d={nasal} fill="none" stroke={gold} strokeWidth={0.66 * sc} strokeLinejoin="round" />

      {/* ── Mandible ── */}
      <path d={jaw1} fill="none" stroke={gold} strokeWidth={0.82 * sc} />
      <path d={jaw2} fill="none" stroke={gold} strokeWidth={0.34 * sc} opacity="0.38" />

      {/* ── Teeth ── */}
      {teeth.map(tx => (
        <line key={tx}
          x1={x(tx)} y1={y(66)}
          x2={x(tx)} y2={tx === 34 || tx === 66 ? y(70) : y(71.2)}
          stroke={gold} strokeWidth={0.66 * sc} opacity="0.52"
        />
      ))}
    </g>
  )
}

// ─────────────────────────────────────────────
// Gradient defs (shared across logo variants)
// ─────────────────────────────────────────────
function GoldGrad({ id, gold, glow }: { id: string; gold: string; glow: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor={gold} stopOpacity="0" />
        <stop offset="22%"  stopColor={gold} stopOpacity="1" />
        <stop offset="50%"  stopColor={glow} stopOpacity="1" />
        <stop offset="78%"  stopColor={gold} stopOpacity="1" />
        <stop offset="100%" stopColor={gold} stopOpacity="0" />
      </linearGradient>
    </defs>
  )
}

// ─────────────────────────────────────────────
// STACKED LOGO  (220 × 270)
// ─────────────────────────────────────────────
export function LogoStacked({ theme = 'dark' as Theme, width = 220 }) {
  const { bg, gold, glow, text, sub, eye } = T[theme]
  const h = Math.round(width * 1.22)
  const vw = 220, vh = 268

  return (
    <svg width={width} height={h} viewBox={`0 0 ${vw} ${vh}`}
         xmlns="http://www.w3.org/2000/svg" role="img"
         aria-label="La Calavera – Restaurante en San José, Almería">
      {theme !== 'gold' && <rect width={vw} height={vh} fill={bg} />}
      <GoldGrad id="sg" gold={gold} glow={glow} />

      {/* Medallion */}
      <g transform="translate(110,62)">
        <Medallion r={52} gold={gold} eye={eye} />
      </g>

      {/* Fine horizontal rule */}
      <rect x="28" y="123" width="164" height="0.55" fill="url(#sg)" />

      {/* LA */}
      <text x="110" y="144" textAnchor="middle"
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="400" fontSize="10.5" letterSpacing="11" fill={gold}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        LA
      </text>

      {/* CALAVERA */}
      <text x="110" y="173" textAnchor="middle"
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="700" fontSize="26" letterSpacing="7" fill={text}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        CALAVERA
      </text>

      {/* Bottom rule */}
      <rect x="28" y="183" width="164" height="0.5" fill="url(#sg)" />

      {/* Subtitle */}
      <text x="110" y="200" textAnchor="middle"
            fontFamily="'Raleway', Arial, sans-serif"
            fontWeight="400" fontSize="6.2" letterSpacing="3.4" fill={sub}
            style={{ fontFamily: "'Raleway', Arial, sans-serif" }}>
        RESTAURANTE · SAN JOSÉ · ALMERÍA
      </text>

      {/* Tiny ornament */}
      <text x="110" y="220" textAnchor="middle" fontSize="9" fill={gold}
            fontFamily="Georgia, serif" opacity="0.28">✦</text>
    </svg>
  )
}

// ─────────────────────────────────────────────
// HORIZONTAL LOGO  (310 × 70)
// ─────────────────────────────────────────────
export function LogoHorizontal({ theme = 'dark' as Theme, height = 60 }) {
  const { bg, gold, glow, text, sub, eye } = T[theme]
  const w = Math.round(height * 5.1)
  const vw = 310, vh = 70

  return (
    <svg width={w} height={height} viewBox={`0 0 ${vw} ${vh}`}
         xmlns="http://www.w3.org/2000/svg" role="img" aria-label="La Calavera">
      {theme !== 'gold' && <rect width={vw} height={vh} fill={bg} />}
      <GoldGrad id="hg" gold={gold} glow={glow} />

      {/* Medallion */}
      <g transform="translate(35,35)">
        <Medallion r={30} gold={gold} eye={eye} />
      </g>

      {/* Vertical divider */}
      <line x1="72" y1="13" x2="72" y2="57" stroke={gold} strokeWidth="0.4" opacity="0.35" />

      {/* LA */}
      <text x="83" y="27"
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="400" fontSize="8.5" letterSpacing="9" fill={gold}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        LA
      </text>

      {/* CALAVERA */}
      <text x="83" y="48"
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="700" fontSize="17" letterSpacing="5" fill={text}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        CALAVERA
      </text>

      {/* Thin rule under name */}
      <rect x="83" y="53" width="148" height="0.4" fill="url(#hg)" />

      {/* Location */}
      <text x="252" y="38" textAnchor="end"
            fontFamily="'Raleway', Arial, sans-serif"
            fontWeight="400" fontSize="5.2" letterSpacing="2.2" fill={sub}
            style={{ fontFamily: "'Raleway', Arial, sans-serif" }}>
        SAN JOSÉ · ALMERÍA
      </text>
    </svg>
  )
}

// ─────────────────────────────────────────────
// ICON  (100 × 100)  — favicon / app icon
// ─────────────────────────────────────────────
export function LogoIcon({ theme = 'dark' as Theme, size = 80 }) {
  const { bg, gold, eye } = T[theme]
  return (
    <svg width={size} height={size} viewBox="0 0 100 100"
         xmlns="http://www.w3.org/2000/svg" role="img" aria-label="La Calavera">
      {theme !== 'gold' && <rect width="100" height="100" fill={bg} rx="12" />}
      <g transform="translate(50,50)">
        <Medallion r={44} gold={gold} eye={eye} />
      </g>
    </svg>
  )
}

// ─────────────────────────────────────────────
// WORDMARK ONLY  (no emblem)
// ─────────────────────────────────────────────
export function LogoWordmark({ theme = 'dark' as Theme, width = 260 }) {
  const { bg, gold, glow, text, sub } = T[theme]
  const h = Math.round(width * 0.34)

  return (
    <svg width={width} height={h} viewBox="0 0 260 88"
         xmlns="http://www.w3.org/2000/svg" role="img" aria-label="La Calavera">
      {theme !== 'gold' && <rect width="260" height="88" fill={bg} />}
      <GoldGrad id="wg" gold={gold} glow={glow} />

      <rect x="12" y="16" width="236" height="0.5" fill="url(#wg)" />

      <text x="130" y="36" textAnchor="middle"
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="400" fontSize="10" letterSpacing="11" fill={gold}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        LA
      </text>

      <text x="130" y="62" textAnchor="middle"
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="700" fontSize="28" letterSpacing="8" fill={text}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        CALAVERA
      </text>

      <rect x="12" y="70" width="236" height="0.5" fill="url(#wg)" />

      <text x="130" y="83" textAnchor="middle"
            fontFamily="'Raleway', Arial, sans-serif"
            fontWeight="400" fontSize="6" letterSpacing="3.5" fill={sub}
            style={{ fontFamily: "'Raleway', Arial, sans-serif" }}>
        RESTAURANTE · SAN JOSÉ · ALMERÍA
      </text>
    </svg>
  )
}

// ─────────────────────────────────────────────
// Default export
// ─────────────────────────────────────────────
export default function Logo({
  variant = 'horizontal',
  theme = 'dark',
  size,
}: {
  variant?: 'stacked' | 'horizontal' | 'icon' | 'wordmark'
  theme?: Theme
  size?: number
}) {
  if (variant === 'stacked')  return <LogoStacked  theme={theme} width={size ?? 220} />
  if (variant === 'icon')     return <LogoIcon     theme={theme} size={size ?? 80} />
  if (variant === 'wordmark') return <LogoWordmark theme={theme} width={size ?? 260} />
  return <LogoHorizontal theme={theme} height={size ?? 60} />
}
