// Catálogo de pantallas de Aptus (una Slate cada una), agrupadas en el orden en que se trabaja:
// capturar → revisar → facturar → cobrar → reportes, más la configuración.
// Cada enlace lleva ?organization_id= y, salvo en las capturas, ?origin= al menú, para que su
// "Regresar" vuelva aquí. Las capturas regresan a su calendario después de guardar.
export type Icono = 'clock' | 'receipt' | 'coins' | 'calendar' | 'calendarClock' | 'calendarReceipt' | 'calendarCoins' | 'unlock' | 'fileText'
  | 'handCoins' | 'wallet' | 'hourglass' | 'landmark' | 'briefcase' | 'users' | 'building' | 'scale'

export interface Pantalla {
  id: string; titulo: string; descripcion: string; icono: Icono; slate: string
  // false = no se manda ?origin= (la pantalla tiene su propio regreso, p. ej. captura → calendario).
  regresaAlMenu: boolean; palabras?: string
}
export interface Seccion { id: string; titulo: string; descripcion: string; color: string; pantallas: Pantalla[] }

const slate = (name: string) => `https://${name}.onslate.com/`

export const SECCIONES: Seccion[] = [
  {
    id: 'captura', titulo: 'Capturar', descripcion: 'Registrar el trabajo y los gastos del día.', color: '#2563eb',
    pantallas: [
      { id: 'tiempo', titulo: 'Registrar tiempo', descripcion: 'Horas trabajadas por abogado, proyecto y tarea.', icono: 'clock', slate: slate('universal-aptus-timeentry'), regresaAlMenu: false, palabras: 'horas captura time entry' },
      { id: 'gasto', titulo: 'Registrar gasto', descripcion: 'Gastos y reembolsos de un proyecto, y quién los pagó.', icono: 'receipt', slate: slate('universal-aptus-expenseentry'), regresaAlMenu: false, palabras: 'captura gastos reembolso' },
      { id: 'fijo', titulo: 'Registrar honorario fijo', descripcion: 'Cuotas fijas, hitos y las igualas del mes.', icono: 'coins', slate: slate('universal-aptus-fixedfeeentry'), regresaAlMenu: false, palabras: 'iguala cuota fija hito' },
    ],
  },
  {
    id: 'revisar', titulo: 'Revisar', descripcion: 'Ver, corregir o borrar lo capturado.', color: '#7c3aed',
    pantallas: [
      { id: 'cal-general', titulo: 'Calendario general', descripcion: 'Tiempos, gastos y honorarios juntos, con filtros.', icono: 'calendar', slate: slate('universal-aptus-calendar'), regresaAlMenu: true, palabras: 'consolidado todo' },
      { id: 'cal-tiempos', titulo: 'Calendario de tiempos', descripcion: 'Los tiempos capturados, por día, semana o mes.', icono: 'calendarClock', slate: slate('universal-timeentry-calendar'), regresaAlMenu: true, palabras: 'horas' },
      { id: 'cal-gastos', titulo: 'Calendario de gastos', descripcion: 'Los gastos capturados, por día, semana o mes.', icono: 'calendarReceipt', slate: slate('universal-expenseentry-calendar'), regresaAlMenu: true },
      { id: 'cal-fijos', titulo: 'Calendario de honorarios fijos', descripcion: 'Cuotas fijas e igualas registradas.', icono: 'calendarCoins', slate: slate('universal-fixedfeeentry-calendar'), regresaAlMenu: true, palabras: 'igualas' },
    ],
  },
  {
    id: 'facturar', titulo: 'Facturar', descripcion: 'Liberar lo revisado, armar la Prebill y facturar en Books.', color: '#dc2626',
    pantallas: [
      { id: 'liberaciones', titulo: 'Liberaciones', descripcion: 'Libera tiempos, gastos y honorarios para que entren a una Prebill.', icono: 'unlock', slate: slate('universal-aptus-liberaciones'), regresaAlMenu: true, palabras: 'liberar' },
      { id: 'prebills', titulo: 'Prebills', descripcion: 'Crear, revisar, autorizar, imprimir y facturar en Books.', icono: 'fileText', slate: slate('universal-aptus-prebills'), regresaAlMenu: true, palabras: 'factura prefactura imprimir' },
    ],
  },
  {
    id: 'cobrar', titulo: 'Cobrar y pagar', descripcion: 'Lo que falta cobrar a clientes y pagar a abogados.', color: '#0f766e',
    pantallas: [
      { id: 'cobranza', titulo: 'Cobranza', descripcion: 'Estado de cuenta por cliente, facturas con su CFDI y LEDES.', icono: 'wallet', slate: slate('universal-aptus-cobranza'), regresaAlMenu: true, palabras: 'estado de cuenta saldo cfdi ledes' },
      { id: 'reembolsos', titulo: 'Reembolsos a abogados', descripcion: 'Gastos que pagó un abogado y lo que ya se le devolvió.', icono: 'handCoins', slate: slate('universal-aptus-reimbursements'), regresaAlMenu: true },
    ],
  },
  {
    id: 'reportes', titulo: 'Reportes', descripcion: 'Cómo va el trabajo y lo cobrado.', color: '#1e3a8a',
    pantallas: [
      { id: 'wip', titulo: 'Trabajo en proceso (WIP)', descripcion: 'Lo pendiente de facturar por responsable, cliente y proyecto.', icono: 'hourglass', slate: slate('universal-aptus-wip'), regresaAlMenu: true, palabras: 'wip pendiente' },
      { id: 'ingresos', titulo: 'Ingresos (Reporte 03)', descripcion: 'Lo cobrado en el periodo y su conciliación con el CFDI.', icono: 'landmark', slate: slate('universal-aptus-ingresos'), regresaAlMenu: true, palabras: 'reporte 03 cobrado pagos' },
    ],
  },
  {
    id: 'configuracion', titulo: 'Configuración', descripcion: 'Cómo trabaja el despacho, sus abogados, proyectos y tarifas.', color: '#047857',
    pantallas: [
      { id: 'proyecto', titulo: 'Configuración del proyecto', descripcion: 'Datos, tarifas y responsables de cada proyecto.', icono: 'briefcase', slate: slate('universal-aptus-projectconfig'), regresaAlMenu: true, palabras: 'proyectos responsables' },
      { id: 'abogados', titulo: 'Abogados', descripcion: 'Nivel, tarifa propia, usuario de Books y si puede ser responsable.', icono: 'users', slate: slate('universal-aptus-lawyersettings'), regresaAlMenu: true },
      { id: 'tarifas', titulo: 'Tarifas y clientes', descripcion: 'Tarifa general, tarifas por cliente, IVA e idioma de la factura.', icono: 'scale', slate: slate('universal-aptus-ratesettings'), regresaAlMenu: true, palabras: 'iva idioma clientes' },
      { id: 'despacho', titulo: 'Despacho', descripcion: 'Formato de factura, conceptos, niveles, tareas, membrete y CFDI.', icono: 'building', slate: slate('universal-aptus-firmsettings'), regresaAlMenu: true, palabras: 'membrete niveles tareas categorias conceptos' },
    ],
  },
]

// Enlace a una pantalla con la organización y, si aplica, el regreso al menú.
export function enlace(p: Pantalla, org: string | null, menuUrl: string): string {
  const u = new URL(p.slate)
  if (org) u.searchParams.set('organization_id', org)
  if (p.regresaAlMenu) {
    const back = new URL(menuUrl)
    if (org) back.searchParams.set('organization_id', org)
    u.searchParams.set('origin', back.toString())
  }
  return u.toString()
}

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
export function filtrar(secciones: Seccion[], texto: string): Seccion[] {
  const words = norm(texto.trim()).split(/\s+/).filter(Boolean)
  if (!words.length) return secciones
  return secciones
    .map(s => ({ ...s, pantallas: s.pantallas.filter(p => { const hay = norm(`${p.titulo} ${p.descripcion} ${p.palabras ?? ''} ${s.titulo}`); return words.every(w => hay.includes(w)) }) }))
    .filter(s => s.pantallas.length)
}

// Últimas pantallas abiertas desde este navegador (solo comodidad; puede no haber almacenamiento).
const KEY = 'aptus_menu_recientes'
export function leerRecientes(): string[] {
  try { const v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v.filter(x => typeof x === 'string').slice(0, 4) : [] } catch { return [] }
}
export function guardarReciente(id: string) {
  try { localStorage.setItem(KEY, JSON.stringify([id, ...leerRecientes().filter(x => x !== id)].slice(0, 4))) } catch { /* sin almacenamiento */ }
}
export const todas = () => SECCIONES.flatMap(s => s.pantallas.map(p => ({ ...p, seccion: s })))
