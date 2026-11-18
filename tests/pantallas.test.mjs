import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import ts from 'typescript'

const toModule = source => 'data:text/javascript;base64,' + Buffer.from(ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2023, module: ts.ModuleKind.ESNext } }).outputText).toString('base64')
const read = file => fs.readFileSync(new URL(file, import.meta.url), 'utf8')
const lib = await import(toModule(read('../src/lib/pantallas.ts')))
const MENU = 'https://universal-aptus-home.onslate.com/'

test('catálogo: 17 pantallas, ids y Slates únicos, todas en onslate.com', () => {
  const todas = lib.todas()
  assert.equal(todas.length, 17)
  assert.equal(new Set(todas.map(p => p.id)).size, 17)
  assert.equal(new Set(todas.map(p => p.slate)).size, 17)
  for (const p of todas) assert.match(p.slate, /^https:\/\/universal-[a-z-]+\.onslate\.com\/$/, p.id)
})

test('enlace: organización siempre; regreso al menú salvo en capturas', () => {
  const [tiempo] = lib.SECCIONES[0].pantallas
  const wip = lib.todas().find(p => p.id === 'wip')
  assert.equal(lib.enlace(tiempo, '636939444', MENU), 'https://universal-aptus-timeentry.onslate.com/?organization_id=636939444')
  const u = new URL(lib.enlace(wip, '636939444', MENU))
  assert.equal(u.searchParams.get('organization_id'), '636939444')
  assert.equal(u.searchParams.get('origin'), MENU + '?organization_id=636939444')
  assert.equal(new URL(lib.enlace(wip, null, MENU)).searchParams.get('organization_id'), null)
})

test('búsqueda sin acentos, por título, descripción, palabras clave o sección', () => {
  const ids = t => lib.filtrar(lib.SECCIONES, t).flatMap(s => s.pantallas.map(p => p.id))
  assert.deepEqual(ids('iguala'), ['fijo', 'cal-fijos'])
  assert.deepEqual(ids('configuracion abogados'), ['abogados'])
  assert.deepEqual(ids('reporte 03'), ['ingresos'])
  assert.ok(ids('').length === 17)
  assert.deepEqual(ids('zzz'), [])
})
