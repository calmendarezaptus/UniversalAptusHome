# Aptus · Menú principal

Slate de inicio (`HomeForAptusFinancials`). Enlaces a todas las pantallas de Aptus agrupadas en el orden
en que se trabaja: Capturar → Revisar → Facturar → Cobrar y pagar → Reportes, más Configuración.
No tiene función ni llama a ninguna API.

- Abre con `?organization_id=<org de Books>`; cada enlace lo lleva.
- Las pantallas que se abren desde aquí reciben `?origin=` con este menú, así su "Regresar" vuelve aquí.
  Las capturas (tiempo, gasto, honorario fijo) no: después de guardar regresan a su calendario.
- Todas las pantallas tienen el botón **Menú** (`src/components/MenuButton.tsx`, igual en cada repo),
  que apunta a `https://universal-aptus-home.onslate.com/` (o `VITE_MENU_URL`).
- Buscador sin acentos y "Abiertas hace poco" (solo en este navegador).
- El catálogo está en `src/lib/pantallas.ts`: al publicar una pantalla nueva se agrega ahí.

```bash
npm install
npm test
npm run build   # salida en dist/
```
