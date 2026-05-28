import { LogoStacked, LogoHorizontal, LogoIcon, LogoWordmark } from '@/components/Logo'

export const metadata = {
  title: 'Sistema de Logo | La Calavera',
  robots: { index: false },
}

const Section = ({ title, bg, children }: { title: string; bg: string; children: React.ReactNode }) => (
  <div className={`${bg} py-16 px-8`}>
    <p className="text-xs tracking-[0.3em] uppercase mb-10 text-center opacity-40 font-mono">{title}</p>
    <div className="flex flex-wrap items-center justify-center gap-16">
      {children}
    </div>
  </div>
)

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col items-center gap-4">
    {children}
  </div>
)

const Tag = ({ text, dark }: { text: string; dark?: boolean }) => (
  <span className={`text-[9px] tracking-[0.25em] uppercase font-mono ${dark ? 'text-[#555]' : 'text-[#666]'}`}>
    {text}
  </span>
)

export default function LogoPage() {
  return (
    <main>

      {/* ── DARK VERSIONS ── */}
      <Section title="Versión Principal — Fondo Oscuro" bg="bg-[#0a0a0a]">
        <Label>
          <LogoStacked theme="dark" width={180} />
          <Tag text="Principal · Apilado" />
        </Label>
        <Label>
          <LogoStacked theme="dark" width={140} />
          <Tag text="Principal · Reducido" />
        </Label>
        <Label>
          <LogoStacked theme="dark" width={100} />
          <Tag text="Principal · Mínimo" />
        </Label>
      </Section>

      <Section title="Versión Horizontal — Fondo Oscuro" bg="bg-[#0a0a0a]">
        <Label>
          <LogoHorizontal theme="dark" height={70} />
          <Tag text="Horizontal · Grande" />
        </Label>
        <Label>
          <LogoHorizontal theme="dark" height={50} />
          <Tag text="Horizontal · Medio (Navbar)" />
        </Label>
        <Label>
          <LogoHorizontal theme="dark" height={36} />
          <Tag text="Horizontal · Pequeño" />
        </Label>
      </Section>

      <Section title="Icono / Favicon — Fondo Oscuro" bg="bg-[#0a0a0a]">
        <Label>
          <LogoIcon theme="dark" size={120} />
          <Tag text="Icono · Grande" />
        </Label>
        <Label>
          <LogoIcon theme="dark" size={80} />
          <Tag text="Icono · Medio" />
        </Label>
        <Label>
          <LogoIcon theme="dark" size={48} />
          <Tag text="Icono · Favicon" />
        </Label>
        <Label>
          <LogoIcon theme="dark" size={32} />
          <Tag text="Icono · Micro" />
        </Label>
      </Section>

      <Section title="Sólo Tipografía — Fondo Oscuro" bg="bg-[#0a0a0a]">
        <Label>
          <LogoWordmark theme="dark" width={280} />
          <Tag text="Wordmark · Grande" />
        </Label>
        <Label>
          <LogoWordmark theme="dark" width={200} />
          <Tag text="Wordmark · Medio" />
        </Label>
      </Section>

      {/* ── LIGHT VERSIONS ── */}
      <Section title="Versión Principal — Fondo Claro" bg="bg-[#f5f0e8]">
        <Label>
          <LogoStacked theme="light" width={180} />
          <Tag text="Principal · Claro" dark />
        </Label>
        <Label>
          <LogoStacked theme="light" width={130} />
          <Tag text="Principal · Reducido" dark />
        </Label>
      </Section>

      <Section title="Versión Horizontal — Fondo Claro" bg="bg-[#f5f0e8]">
        <Label>
          <LogoHorizontal theme="light" height={70} />
          <Tag text="Horizontal · Claro · Grande" dark />
        </Label>
        <Label>
          <LogoHorizontal theme="light" height={50} />
          <Tag text="Horizontal · Claro · Medio" dark />
        </Label>
      </Section>

      <Section title="Icono — Fondo Claro" bg="bg-[#f5f0e8]">
        <Label>
          <LogoIcon theme="light" size={120} />
          <Tag text="Icono · Claro · Grande" dark />
        </Label>
        <Label>
          <LogoIcon theme="light" size={80} />
          <Tag text="Icono · Claro · Medio" dark />
        </Label>
        <Label>
          <LogoIcon theme="light" size={48} />
          <Tag text="Icono · Claro · Pequeño" dark />
        </Label>
      </Section>

      {/* ── GOLD / TRANSPARENT ── */}
      <Section title="Versión Dorada — Sobre Gris Neutro" bg="bg-[#1a1814]">
        <Label>
          <LogoStacked theme="gold" width={180} />
          <Tag text="Principal · Oro Puro" />
        </Label>
        <Label>
          <LogoHorizontal theme="gold" height={60} />
          <Tag text="Horizontal · Oro Puro" />
        </Label>
        <Label>
          <LogoIcon theme="gold" size={100} />
          <Tag text="Icono · Oro Puro" />
        </Label>
      </Section>

      {/* ── COLOR BACKGROUNDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-[#0a0a0a] py-14 flex flex-col items-center gap-4">
          <LogoStacked theme="dark" width={160} />
          <span className="text-[9px] tracking-[0.25em] text-[#444] font-mono uppercase">Negro · #0a0a0a</span>
        </div>
        <div className="bg-[#1a1208] py-14 flex flex-col items-center gap-4">
          <LogoStacked theme="dark" width={160} />
          <span className="text-[9px] tracking-[0.25em] text-[#444] font-mono uppercase">Caoba · #1a1208</span>
        </div>
        <div className="bg-[#f5f0e8] py-14 flex flex-col items-center gap-4">
          <LogoStacked theme="light" width={160} />
          <span className="text-[9px] tracking-[0.25em] text-[#999] font-mono uppercase">Hueso · #f5f0e8</span>
        </div>
        <div className="bg-white py-14 flex flex-col items-center gap-4">
          <LogoStacked theme="light" width={160} />
          <span className="text-[9px] tracking-[0.25em] text-[#bbb] font-mono uppercase">Blanco · #ffffff</span>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="bg-[#050505] py-8 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#333] font-mono">
          La Calavera · Sistema de Identidad Visual · San José, Almería
        </p>
      </div>
    </main>
  )
}
