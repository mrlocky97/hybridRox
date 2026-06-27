# Plan de desarrollo — HybridRox Web
**Stack:** Next.js 16 + TypeScript + Tailwind CSS v4 + shadcn/ui  
**Backend:** PocketBase (`/hcgi/platform`) + Hostinger Ecommerce API  
**Última actualización:** 2026-06-27

---

## Reglas del plan

- Cada fase debe terminar con la app desplegable y funcional — no fases que dejan el sitio roto.
- Una fase a la vez. No empezar la siguiente hasta que la anterior pasa su criterio de aceptación.
- El commerce ya está vivo en producción: nada en el frontend puede romper el flujo de pago.
- Referencia técnica de lo que existía antes: `docs/REFERENCE_HORIZONS.md`.

---

## Fase 0 — Entorno ✅ (completada)
**Riesgo: nulo**

- [x] Scaffold Next.js 16 + TS + Tailwind v4 en `apps/web/`
- [x] `globals.css` con tokens de marca HybridRox + variables shadcn
- [x] `layout.tsx` con fuentes Bebas Neue / Inter y metadata SEO base
- [x] `src/types/ecommerce.ts` — interfaces TypeScript del API de Hostinger
- [x] `src/lib/utils.ts` — función `cn()` para shadcn
- [x] `components.json` — shadcn configurado con `rsc: true`
- [x] `.env.example` con `POCKETBASE_URL` y `HOSTINGER_*` vars
- [x] `docs/REFERENCE_HORIZONS.md` — legado de Horizons como referencia

**Pendiente del usuario (una vez, en terminal local):**
```bash
cd HybridRoxStore
rm -rf node_modules        # eliminar node_modules de Horizons
npm install                # instalar monorepo limpio
npm run dev                # verificar que Next.js arranca
```

---

## Fase 1 — Design system y shell de la app
**Riesgo: bajo | Prioridad: desbloqueante**

Todo lo que aparece en cada página. Sin esto no se puede construir nada.

### 1.1 Instalar componentes shadcn base
```bash
cd apps/web
npx shadcn@latest add button input label separator toast sonner
```

### 1.2 Componentes de layout
| Componente | Ruta | Descripción |
|---|---|---|
| `Header` | `src/components/layout/Header.tsx` | Logo + navegación + icono de carrito |
| `Footer` | `src/components/layout/Footer.tsx` | Links, newsletter input, legal |
| `CartDrawer` | `src/components/cart/CartDrawer.tsx` | Drawer lateral del carrito |
| `CartProvider` | `src/hooks/useCart.tsx` | Context + localStorage (portar de Horizons) |

### 1.3 Actualizar layout raíz
- Añadir `<Header>` y `<Footer>` en `src/app/layout.tsx`
- Envolver en `<CartProvider>`
- Añadir `<Toaster>` (sonner) para notificaciones

### 1.4 Componentes de marca reutilizables
| Componente | Descripción |
|---|---|
| `HXLogo` | SVG del logo — modo claro y oscuro |
| `HXSymbol` | Símbolo HX solo (para favicons, loaders) |
| `SectionHeader` | Título de sección con línea y subtítulo |
| `BrutalButton` | Wrapper de shadcn Button con estilo `.btn-brutalist` |

**Criterio de aceptación:** `npm run dev` muestra el sitio con header, footer y carrito funcional (vacío). Sin errores de TypeScript.

---

## Fase 2 — HomePage (el funnel)
**Riesgo: bajo | Prioridad: máxima (conversión)**

La página más importante del negocio. Sigue el funnel de 5 pasos definido en `CLAUDE.md`.

### Secciones en orden estricto

| # | Sección | Objetivo | Componente |
|---|---|---|---|
| 1 | **Hero** | Detener el scroll. Tagline + CTA principal | `HeroSection` |
| 2 | **Social proof** | Confianza rápida: métricas, testimonios | `TestimonialsStrip` |
| 3 | **Por qué híbrido** | Educación: Hyrox / CrossFit / OCR / fuerza | `WhyHybridSection` |
| 4 | **Productos destacados** | 3–4 productos del API de Hostinger | `FeaturedProducts` |
| 5 | **Newsletter CTA** | Captura de email → PocketBase `newsletter_signups` | `NewsletterSection` |

### Datos
- `FeaturedProducts` → `getProducts()` del API de Hostinger (Server Component)
- `TestimonialsStrip` → PocketBase colección `testimonials`
- `NewsletterSection` → Server Action que escribe en PocketBase

**Criterio de aceptación:** La página carga con datos reales del API. El formulario de newsletter registra en PocketBase. Lighthouse performance > 85 en mobile.

---

## Fase 3 — Tienda y ficha de producto
**Riesgo: medio | Prioridad: alta (commerce live)**

El commerce de Hostinger ya está en producción. Estas páginas son la interfaz de ese backend.

### Páginas
| Ruta | Componente | Datos |
|---|---|---|
| `/tienda` | `src/app/tienda/page.tsx` | `getProducts()` + `getCategories()` |
| `/tienda/[categoria]` | `src/app/tienda/[categoria]/page.tsx` | Filtrado por `collection_id` |
| `/product/[id]` | `src/app/product/[id]/page.tsx` | `getProduct(id)` |
| `/bundles` | `src/app/bundles/page.tsx` | `getProducts({ type: 'bundle' })` |
| `/success` | `src/app/success/page.tsx` | Confirmación post-pago |

### Infraestructura de datos
```
src/server/ecommerce/
├── client.ts          # fetch wrapper con HOSTINGER_* env vars
├── products.ts        # getProducts, getProduct, getProductQuantities
├── categories.ts      # getCategories
├── checkout.ts        # initializeCheckout (Server Action)
└── formatters.ts      # formatCurrency
```

### Componentes clave
| Componente | Descripción |
|---|---|
| `ProductCard` | Imagen, título, precio, botón añadir |
| `ProductGrid` | Grid responsivo de ProductCards |
| `CategoryFilter` | Filtros por categoría (client component) |
| `VariantSelector` | Selector de talla/color |
| `AddToCartButton` | Botón con feedback de stock |

### Carrito
- `useCart` hook con localStorage (portar de `REFERENCE_HORIZONS.md` con el bug de `getCartTotal` corregido)
- `CartDrawer` con lista de items, cantidades y botón de checkout
- Checkout → `initializeCheckout()` Server Action → redirect a Hostinger

**Nota de seguridad:** `HOSTINGER_STORE_ID` y `HOSTINGER_ECOMMERCE_API_URL` solo viven en Server Components. Nunca en el cliente.

**Criterio de aceptación:** Usuario puede navegar tienda, añadir al carrito y completar pago en Hostinger. Vuelta a `/success`.

---

## Fase 4 — Blog
**Riesgo: bajo | Prioridad: media (SEO + autoridad)**

Contenido educativo 50/30/20 (educación/inspiración/producto). Datos en PocketBase.

### Páginas
| Ruta | Componente | Datos |
|---|---|---|
| `/blog` | `src/app/blog/page.tsx` | PocketBase `blog_posts` collection |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | PocketBase `blog_posts` por slug |

### Infraestructura PocketBase
```
src/server/pocketbase/
├── client.ts          # Pocketbase instance server-side
├── blog.ts            # getBlogPosts, getBlogPost(slug)
└── types.ts           # TypeScript types de las colecciones
```

### Componentes
| Componente | Descripción |
|---|---|
| `BlogCard` | Imagen, título, fecha, extracto |
| `BlogGrid` | Lista de artículos |
| `BlogDetail` | Artículo completo con HTML del CMS |
| `RelatedPosts` | Posts relacionados (relación PocketBase) |

### SEO
- `generateMetadata()` por post (título, descripción, OG image)
- `generateStaticParams()` para generar rutas en build
- Sitemap dinámico en `src/app/sitemap.ts`

**Criterio de aceptación:** Blog carga, los artículos se indexan correctamente. `<head>` tiene metadata específica por post.

---

## Fase 5 — Páginas de soporte
**Riesgo: nulo | Prioridad: baja (legal/CX)**

Páginas sin lógica dinámica. Se construyen rápido.

| Ruta | Contenido |
|---|---|
| `/about` | Historia de marca, equipo, misión |
| `/contact` | Formulario → PocketBase `contact_submissions` |
| `/community` | Página de comunidad / waitlist |
| `/privacy` | Política de privacidad (texto estático) |
| `/terms` | Términos y condiciones (texto estático) |
| `/cookies` | Política de cookies (texto estático) |
| `/returns` | Política de devoluciones (texto estático) |

**Redirect 301** en `next.config.ts`:
```typescript
// /producto/[id] → /product/[id] (alias del proyecto anterior)
```

**Criterio de aceptación:** Todas las rutas responden 200. Formulario de contacto escribe en PocketBase.

---

## Fase 6 — SEO y rendimiento
**Riesgo: bajo | Prioridad: media**

Con todas las páginas construidas, optimizar para búsqueda y velocidad.

### Checklist

**Metadata**
- [ ] `src/app/sitemap.ts` — sitemap dinámico (productos + posts)
- [ ] `src/app/robots.ts` — robots.txt
- [ ] `src/app/opengraph-image.tsx` — OG image por defecto
- [ ] OG image dinámica por producto y por post

**Rendimiento**
- [ ] `next/image` en todas las imágenes de producto y blog
- [ ] `loading="lazy"` en imágenes fuera del fold
- [ ] `generateStaticParams` en rutas de producto y blog (ISR)
- [ ] `revalidate` en Server Components que llaman al API de Hostinger

**Analítica**
- [ ] Añadir Plausible o GA4 (sin cookies de marketing)

**Criterio de aceptación:** Lighthouse ≥ 90 en performance y SEO. Google Search Console confirma indexación de productos y posts.

---

## Fase 7 — Testing y deploy
**Riesgo: bajo**

### Testing (skill `webapp-testing`)
```
src/__tests__/
├── home.spec.ts         # Funnel visible, CTA funciona
├── tienda.spec.ts       # Productos cargan, filtros funcionan
├── cart.spec.ts         # Añadir, actualizar, eliminar del carrito
├── checkout.spec.ts     # Flujo de pago hasta Hostinger
└── blog.spec.ts         # Lista y detalle de posts
```

### Deploy a Hostinger
- Configurar variables de entorno en el panel de Hostinger
- `npm run build` sin errores
- Verificar que `/hcgi/platform` (PocketBase) es accesible desde el servidor
- Confirmar que las rutas de Hostinger Ecommerce API no tienen CORS issues

**Criterio de aceptación:** Suite de tests pasa. Deploy a producción sin downtime del commerce.

---

## Orden de prioridad resumido

```
Fase 0  ✅ Entorno
Fase 1  🔲 Design system + shell        ← EMPEZAR AQUÍ
Fase 2  🔲 HomePage (funnel)
Fase 3  🔲 Tienda + producto + carrito
Fase 4  🔲 Blog
Fase 5  🔲 Páginas de soporte
Fase 6  🔲 SEO + rendimiento
Fase 7  🔲 Testing + deploy
```

---

## Convenciones de código para este proyecto

### Nomenclatura de archivos
```
src/app/[ruta]/page.tsx          ← Server Component (por defecto)
src/app/[ruta]/layout.tsx        ← Layout anidado (si aplica)
src/components/[dominio]/        ← Componentes por dominio
src/components/ui/               ← Componentes shadcn (no editar)
src/hooks/use[Nombre].tsx        ← Hooks client-side
src/server/[servicio]/           ← Lógica server-only
src/types/[dominio].ts           ← Interfaces TypeScript
```

### Directiva `'use client'`
- Solo cuando el componente usa: `useState`, `useEffect`, `useContext`, eventos del DOM, o hooks de browser.
- Server Components por defecto en todo lo demás.
- Nunca en archivos de `src/server/`.

### Fetching de datos
```typescript
// ✅ Correcto — Server Component
export default async function TiendaPage() {
  const { products } = await getProducts()
  return <ProductGrid products={products} />
}

// ❌ Incorrecto — no hacer fetch en el cliente salvo para acciones del usuario
```

### Variables de entorno
```
POCKETBASE_URL          → solo servidor
HOSTINGER_STORE_ID      → solo servidor
HOSTINGER_ECOMMERCE_API_URL → solo servidor
NEXT_PUBLIC_SITE_URL    → cliente y servidor
```

*Documento vivo — actualizar al completar cada fase.*
