import { useEffect, useMemo, useState } from 'react'
import 'animate.css'
import {
  ArrowRight, Briefcase, Building2, CalendarCheck, CalendarClock, CalendarDays, CalendarRange, ChevronRight, Clock, Coins, FileText, HandCoins, History,
  Hourglass, Landmark, LockOpen, Receipt, Scale, Stamp, FileCheck2, ReceiptText, Search, Users, Wallet, X, type LucideIcon,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ThemeMenu } from '@/components/ThemeMenu'
import { cn } from '@/lib/utils'
import { inputCls, useTheme } from '@/lib/ui'
import { enlace, filtrar, guardarReciente, leerRecientes, SECCIONES, todas, type Icono, type Pantalla } from '@/lib/pantallas'

const ICONOS: Record<Icono, LucideIcon> = {
  clock: Clock, receipt: Receipt, coins: Coins, calendar: CalendarDays, calendarClock: CalendarClock, calendarReceipt: CalendarRange,
  calendarCoins: CalendarCheck, unlock: LockOpen, fileText: FileText, handCoins: HandCoins, wallet: Wallet, hourglass: Hourglass,
  landmark: Landmark, briefcase: Briefcase, users: Users, building: Building2, scale: Scale,
  stamp: Stamp, fileCheck: FileCheck2, receiptText: ReceiptText,
}
// El menú es esta misma página (sin ?origin= ni otros parámetros).
const MENU_URL = window.location.origin + window.location.pathname
const FLUJO = ['Capturar', 'Revisar', 'Liberar', 'Prebill', 'Facturar', 'CFDI', 'Cobrar']

function App() {
  const [theme, setTheme] = useTheme()
  const [org] = useState(() => new URLSearchParams(window.location.search).get('organization_id'))
  const [texto, setTexto] = useState('')
  const [recientes, setRecientes] = useState<string[]>([])
  useEffect(() => { setRecientes(leerRecientes()) }, [])
  const secciones = useMemo(() => filtrar(SECCIONES, texto), [texto])
  const lista = useMemo(() => todas(), [])
  const ultimas = recientes.map(id => lista.find(p => p.id === id)).filter(Boolean) as ReturnType<typeof todas>
  const abrir = (p: Pantalla) => guardarReciente(p.id)
  const total = secciones.reduce((n, s) => n + s.pantallas.length, 0)

  return (
    <div className="min-h-screen bg-slate-50/50 p-2 sm:p-4 lg:p-8 flex justify-center items-start font-sans w-full">
      <Card className="w-full max-w-6xl bg-gradient-to-b from-[#F5F8FD] to-white border border-slate-200 rounded-[20px] overflow-hidden p-4 sm:p-6 lg:p-8 relative animate__animated animate__fadeIn animate__faster">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-theme-from/5 rounded-full blur-[80px] pointer-events-none z-0"></div>

        <header className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-theme-from to-theme-to flex items-center justify-center shrink-0 shadow-sm border border-black/5 text-white">
              <Scale className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Aptus</h1>
                <ThemeMenu theme={theme} setTheme={setTheme} />
              </div>
              <p className="text-slate-500 text-sm mt-0.5">Todo lo del despacho en un solo lugar: elige qué quieres hacer.</p>
            </div>
          </div>
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input autoFocus className={cn(inputCls, 'pl-9 pr-9 h-11')} placeholder="Buscar: tiempo, Prebill, WIP, tarifas…" value={texto} onChange={e => setTexto(e.target.value)} aria-label="Buscar pantalla" />
            {texto && <button type="button" aria-label="Borrar búsqueda" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" onClick={() => setTexto('')}><X className="w-4 h-4" /></button>}
          </div>
        </header>

        {!org && (
          <p role="alert" className="relative z-10 mb-4 text-xs rounded-lg border border-amber-200 bg-amber-50 p-2 text-amber-800">
            Falta el parámetro <code>organization_id</code> en la dirección: las pantallas no sabrán de qué organización de Books es la información.
          </p>
        )}

        {!texto && (
          <div className="relative z-10 mb-6 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500" aria-label="Cómo fluye el trabajo">
            <span className="mr-1">El trabajo fluye así:</span>
            {FLUJO.map((f, i) => (
              <span key={f} className="flex items-center gap-1.5">
                <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 font-medium text-slate-600">{i + 1}. {f}</span>
                {i < FLUJO.length - 1 && <ChevronRight className="w-3 h-3 text-slate-300" />}
              </span>
            ))}
          </div>
        )}

        {!texto && !!ultimas.length && (
          <section className="relative z-10 mb-6">
            <h2 className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1.5"><History className="w-3.5 h-3.5" />Abiertas hace poco</h2>
            <div className="flex flex-wrap gap-2">
              {ultimas.map(p => {
                const Icon = ICONOS[p.icono]
                return (
                  <a key={p.id} href={enlace(p, org, MENU_URL)} onClick={() => abrir(p)}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:border-slate-300 hover:bg-slate-50">
                    <Icon className="w-4 h-4" style={{ color: p.seccion.color }} />{p.titulo}
                  </a>
                )
              })}
            </div>
          </section>
        )}

        <div className="relative z-10 space-y-7">
          {!total && <p className="text-sm text-slate-500">Ninguna pantalla coincide con “{texto}”.</p>}
          {secciones.map((s, i) => (
            <section key={s.id} aria-labelledby={`sec-${s.id}`}>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0 self-center" style={{ background: s.color }}>{SECCIONES.findIndex(x => x.id === s.id) + 1 || i + 1}</span>
                <h2 id={`sec-${s.id}`} className="text-base font-bold text-slate-900">{s.titulo}</h2>
                <p className="text-xs text-slate-500">{s.descripcion}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {s.pantallas.map(p => {
                  const Icon = ICONOS[p.icono]
                  return (
                    <a key={p.id} href={enlace(p, org, MENU_URL)} onClick={() => abrir(p)}
                      className="group relative flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300 focus-visible:outline-2 focus-visible:outline-offset-2">
                      <span className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${s.color}14`, color: s.color }}><Icon className="w-5 h-5" /></span>
                      <span className="font-semibold text-slate-900 leading-tight">{p.titulo}</span>
                      <span className="text-xs text-slate-500 leading-snug">{p.descripcion}</span>
                      <ArrowRight className="absolute top-4 right-4 w-4 h-4 text-slate-300 transition-all group-hover:text-slate-500 group-hover:translate-x-0.5" />
                    </a>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        <p className="relative z-10 mt-8 text-[11px] text-slate-500">
          En cada pantalla, el botón <span className="font-semibold">Menú</span> regresa aquí. El detalle de una Prebill se abre desde la lista de Prebills.
        </p>
      </Card>
    </div>
  )
}

export default App
