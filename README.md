# FácilIMG

Web de herramientas de imagen hecha con Astro, enfocada a funcionar en frontend y a procesar archivos directamente en el navegador.

El proyecto parte de la plantilla Astro del repositorio, pero ya está adaptado como una web tipo FácilPDF centrada en imágenes.

## Qué incluye

- Home SEO orientada a herramientas de imagen.
- Editor de imagen en navegador con `canvas`.
- Subida mediante input y drag and drop.
- Conversión a PNG, JPG y WebP.
- Control de calidad de salida.
- Redimensionado con opción de mantener proporción.
- Rotación y volteo horizontal/vertical.
- Filtros de brillo, contraste, saturación, desenfoque, blanco y negro y sepia.
- Marca de agua de texto.
- Descarga local del resultado.
- Diseño responsive mobile first.
- Modo claro y oscuro con preferencia guardada en `localStorage`.
- i18n en español e inglés.
- SEO técnico, Open Graph, Twitter Cards, manifest y robots dinámicos.
- Tests smoke con `node:test`.
- CI y despliegue en GitHub Pages.

## Privacidad

La herramienta principal no sube imágenes a servidores externos. El archivo se carga en el navegador y se procesa con APIs del navegador y `canvas`.

## Requisitos

Usa Node 22. El repositorio incluye `.nvmrc`.

```sh
nvm use
npm ci
```

## Comandos

| Comando | Acción |
| --- | --- |
| `npm run dev` | Arranca el servidor local de Astro |
| `npm run build` | Genera la web estática en `dist/` |
| `npm run preview` | Previsualiza el build localmente |
| `npm test` | Ejecuta tests smoke básicos |
| `npm run format` | Formatea CSS, JS, JSON, Markdown, TS y YAML |
| `npm run format:check` | Comprueba formato |
| `npm run clean` | Borra `dist` y `.astro` |

## Estructura principal

```text
/
├── docs/
│   ├── design-system.md
│   ├── github-pages.md
│   ├── i18n-guide.md
│   ├── template-usage.md
│   └── testing-guide.md
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   └── og-image.svg
├── src/
│   ├── components/
│   │   ├── Container.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   └── ImageStudio.astro
│   ├── config/
│   │   └── site.ts
│   ├── i18n/
│   │   ├── translations/
│   │   │   ├── en.json
│   │   │   └── es.json
│   │   └── ui.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── [locale]/index.astro
│   │   ├── 404.astro
│   │   ├── index.astro
│   │   ├── manifest.webmanifest.ts
│   │   └── robots.txt.ts
│   └── styles/global.css
└── tests/smoke.test.mjs
```

La configuración principal del sitio está en `src/config/site.ts`.

## Documentación para agentes IA

Antes de modificar este proyecto, una IA debe leer:

- `agents.md`: reglas principales del repositorio.
- `docs/ai-checklist.md`: checklist rápida antes de cerrar tareas.
- `docs/template-usage.md`: cómo usar y modificar la plantilla.
- `docs/i18n-guide.md`: cómo añadir textos, traducciones e idiomas.
- `docs/github-pages.md`: cómo evitar romper GitHub Pages y `base`.
- `docs/testing-guide.md`: cómo mantener tests smoke.
- `docs/design-system.md`: reglas visuales, SEO, accesibilidad y responsive.

## Traducciones e idiomas

La web usa el i18n nativo de Astro y traducciones en JSON.

Idioma por defecto:

```txt
/
```

Idioma secundario:

```txt
/en/
```

Los textos visibles están en:

```txt
src/i18n/translations/
```

Al añadir una clave nueva, debe existir tanto en `es.json` como en `en.json`.

## GitHub Pages

El despliegue está en `.github/workflows/pages.yml`.

Por defecto, cuando corre en GitHub Actions, `astro.config.mjs` calcula automáticamente:

- `site`: `https://OWNER.github.io`
- `base`: `/NOMBRE_DEL_REPO`

Puedes sobrescribirlo con variables de entorno:

```env
ASTRO_SITE=https://example.com
ASTRO_BASE=/
```

## CI

`.github/workflows/ci.yml` ejecuta en pull requests:

```sh
npm ci
npm test
npm run build
```

## Próximas mejoras posibles

- Procesado por lotes de varias imágenes.
- Herramientas independientes con URLs SEO: `/comprimir-imagen`, `/convertir-webp`, `/redimensionar-imagen`.
- Recorte visual con selección manual.
- Eliminación de metadatos EXIF.
- Comparador antes/después.
- Exportación ZIP para lotes.
