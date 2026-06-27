# HybridRox

> Entrena para dos mundos. Domínalos ambos.

Marca y plataforma web para **atletas híbridos** (Hyrox, CrossFit, OCR, fuerza).
Vende accesorios físicos y productos digitales, y construye comunidad a través de
contenido educativo.

Este repositorio contiene el sitio web y, más adelante, la capa de comercio. La
identidad de marca completa vive en [`docs/BRAND.md`](docs/BRAND.md) y las reglas
para asistentes de IA en [`CLAUDE.md`](CLAUDE.md).

---

## Estado

🟢 **Fase 0 — Fundación: cerrada.** Documentación, marca y stack confirmados.
Siguiente: **Fase 1 — Esqueleto del proyecto** (inicializar Next.js + Tailwind con
los tokens de marca). Ver [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) → *Roadmap*.

---

## Stack confirmado

> ✅ **Confirmado al cerrar la Fase 0** (2026-06-26). Elegido por SEO, contenido y
> posibilidad de añadir comercio sin reescribir. Registro de la decisión en
> [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) → *Registro de decisiones*.

| Capa | Elección propuesta | Por qué |
|------|--------------------|---------|
| Framework | Next.js (App Router) + TypeScript | SEO server-side, contenido y comercio en una sola base |
| Estilos | Tailwind CSS | Encaja con el sistema visual de alto contraste / minimalismo |
| Contenido (blog) | MDX | SEO sin CMS externo en fase de validación |
| Email / captura | Proveedor externo (p. ej. Resend / Mailerlite) | Medir el funnel sin infra propia |
| Comercio | **Diferido** (Stripe o Shopify headless) | No se añade hasta validar demanda |
| Analítica | Plausible / GA4 | Medir el funnel desde el día 1 |

---

## Estructura del proyecto

```
hybridrox/
├── README.md            ← este archivo (entrada rápida)
├── CLAUDE.md            ← contexto y reglas para Claude / IA
├── docs/
│   ├── BRAND.md         ← sistema de marca completo (fuente de verdad)
│   └── DEVELOPMENT.md   ← guía técnica, convenciones y roadmap
├── src/                 ← (pendiente) código de la app
├── public/              ← (pendiente) assets estáticos
└── package.json         ← (pendiente) dependencias y scripts
```

Lo marcado como *(pendiente)* aún no existe; se crea en la Fase 1.

---

## Empezar (cuando exista la app)

```bash
# requisitos: Node.js 20+ y pnpm
pnpm install
pnpm dev          # entorno local en http://localhost:3000
```

Scripts previstos: `dev`, `build`, `start`, `lint`, `format`, `test`.

---

## Identidad de marca (referencia rápida)

| Token | Valor |
|-------|-------|
| Negro base | `#0D0D0D` |
| Carbón | `#1A1A1A` |
| Blanco roto | `#F5F5F5` |
| Acento lima | `#E8FF00` |
| Titulares | Bebas Neue |
| Texto | Inter |

Principios: alto contraste · minimalismo funcional · imágenes reales.
Voz: cercano pero experto, directo, sin humo. Detalle completo en `docs/BRAND.md`.

---

## Documentación

- [`CLAUDE.md`](CLAUDE.md) — qué debe respetar cualquier IA que trabaje aquí.
- [`docs/BRAND.md`](docs/BRAND.md) — sistema de marca (fuente de verdad).
- [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) — setup, convenciones y roadmap por fases.

---

## Reglas de evolución (heredadas de la marca)

1. Mejorar sin romper coherencia.
2. Validar antes de escalar.
3. Mantener la identidad clara.

Todo aquí puede optimizarse, pero **no contradecirse**.
