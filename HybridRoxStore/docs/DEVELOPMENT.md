# Guía de desarrollo — HybridRox

Guía técnica del proyecto: setup, convenciones, flujo de trabajo y el **roadmap por
fases** con los siguientes pasos más seguros. Está alineada con las reglas de marca
(`../CLAUDE.md`) y, sobre todo, con su principio rector: **validar antes de escalar**.

---

## 1. Requisitos

- Node.js 20 LTS o superior
- pnpm 9+ (`npm i -g pnpm`)
- Git

---

## 2. Setup (una vez exista la app)

```bash
git clone <repo-url> hybridrox
cd hybridrox
pnpm install
cp .env.example .env.local   # rellena variables locales (nunca commitear .env.local)
pnpm dev
```

App en `http://localhost:3000`.

---

## 3. Stack y por qué

| Decisión | Motivo | Reversible |
|----------|--------|-----------|
| Next.js + TypeScript | SEO server-side + base única para contenido y futuro comercio | Sí (en fase temprana) |
| Tailwind CSS | Sistema de diseño de alto contraste con tokens | Sí |
| MDX para blog | Contenido versionado sin CMS externo durante validación | Sí |
| Comercio diferido | No pagar el coste de Stripe/Shopify antes de validar demanda | — |

Las decisiones se documentan aquí a medida que se toman, con fecha y motivo, para
no repetir debates ya cerrados.

### Registro de decisiones

- **2026-06-26 — Stack confirmado.** Next.js (App Router) + TypeScript + Tailwind
  CSS, con MDX para el blog y comercio diferido. Motivo: SEO server-side, base
  única para contenido y futuro comercio, y coste cero de infraestructura externa
  durante la validación. Confirmado al cerrar la Fase 0.

---

## 4. Estructura de carpetas (objetivo Fase 1)

```
src/
├── app/                 # rutas (App Router)
│   ├── layout.tsx       # layout raíz: fuentes, tokens, metadata
│   ├── page.tsx         # landing / funnel
│   └── (legal)/         # privacidad, términos
├── components/          # componentes reutilizables (Hero, CTA, Section...)
├── content/             # MDX del blog (Fase 2)
├── lib/                 # utilidades, clientes de servicios
└── styles/
    └── tokens.css       # variables de marca (color, tipografía)
public/                  # imágenes, fuentes, favicon
```

---

## 5. Tokens de marca en código

Define los tokens una sola vez y consúmelos siempre desde ahí. Nunca repartas
hex sueltos por los componentes.

```css
/* src/styles/tokens.css */
:root {
  --color-base:   #0D0D0D;
  --color-carbon: #1A1A1A;
  --color-hueso:  #F5F5F5;
  --color-acento: #E8FF00;
}
```

En `tailwind.config`, mapea estos tokens a `theme.colors` y carga **Bebas Neue**
(titulares) e **Inter** (texto). Detalle de marca en [`BRAND.md`](BRAND.md).

---

## 6. Convenciones

- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`...).
- **Ramas:** `main` siempre desplegable; trabajo en `feat/...` o `fix/...`.
- **PRs pequeños:** un cambio aislado por PR. Más fácil de revisar y revertir.
- **TypeScript estricto:** sin `any` injustificado.
- **Accesibilidad:** contraste AA, foco visible, `alt` en imágenes.
- **Secretos:** solo en `.env.local` / variables del host. Nunca en el repo.

---

## 7. Definición de "hecho"

Una tarea está terminada cuando:

- [ ] El copy respeta la voz de marca (cercano, directo, sin humo).
- [ ] El diseño usa los tokens (color/tipografía) sin desviarse.
- [ ] `pnpm lint` y `pnpm build` pasan.
- [ ] No se añadieron secretos ni dependencias pesadas sin justificar.
- [ ] El cambio es reversible o se documentó por qué no lo es.

---

## 8. Roadmap — los siguientes pasos más seguros

Ordenado de **menor a mayor riesgo**. Cada fase se cierra validando antes de pasar
a la siguiente. No saltarse fases.

### Fase 0 — Fundación ✅ (cerrada)
Documentación y convenciones. **Riesgo: nulo.** Sin código ejecutable.
- [x] README.md, CLAUDE.md, docs/DEVELOPMENT.md
- [x] Mover el documento de marca a `docs/BRAND.md`
- [x] Definir y confirmar el stack

### Fase 1 — Esqueleto del proyecto ⏭️ (siguiente)
Inicializar Next.js + TS + Tailwind y cargar tokens de marca. **Riesgo: bajo**
(aislado, reversible, sin servicios externos).
- [ ] `pnpm create next-app` con TypeScript
- [ ] Tailwind + `tokens.css` + fuentes (Bebas Neue / Inter)
- [ ] Layout raíz con metadata SEO base
- [ ] `.env.example`, `.gitignore`, ESLint + Prettier

### Fase 2 — Landing / funnel (validación)
Una landing que implemente el funnel de 5 pasos, **sin pagos ni inventario**.
Esto valida demanda con riesgo mínimo. **Riesgo: bajo.**
- [ ] Secciones: Impacto → Confianza → Educación → Producto → Conversión
- [ ] Captura de email (proveedor externo, solo formulario)
- [ ] Analítica para medir el funnel
- [ ] Despliegue en hosting estático/serverless (preview primero)

### Fase 3 — Contenido y SEO (autoridad)
Blog en MDX siguiendo la mezcla 50/30/20. **Riesgo: bajo.**
- [ ] Plantilla de artículo + índice
- [ ] 3–5 artículos semilla de educación
- [ ] Sitemap, metadata, Open Graph

### Fase 4 — Comercio (solo tras validar)
Añadir checkout únicamente si las Fases 2–3 muestran demanda real. **Riesgo: alto**
→ requiere decisión humana explícita.
- [ ] Elegir Stripe (digital) o Shopify headless (físico + digital)
- [ ] Catálogo de productos
- [ ] Checkout y cumplimiento
- [ ] Política de devoluciones, legal, fiscalidad

### Fase 5 — Comunidad y escala
Email, automatizaciones, comunidad. Solo con base validada.

---

## 9. Principios de seguridad para cambios

Antes de cualquier paso, preguntarse:

1. ¿Es **reversible**? Si no, requiere aprobación humana.
2. ¿Está **aislado**? Un cambio, un PR.
3. ¿Introduce un **servicio externo o coste**? Entonces no es Fase 0–1: detente y propón.
4. ¿Toca **pagos, datos personales o secretos**? Máxima cautela; nunca commitear credenciales.

> Regla heredada de la marca: *no escalar sin validar*. El roadmap la hace operativa.
