# Referencia Horizons — Legado del frontend React/Vite
**Fecha de extracción:** 2026-06-27  
**Origen:** `apps/web/` — generado por Hostinger Horizons (eliminado)  
**Propósito:** documento de referencia estático para el nuevo proyecto Next.js + TypeScript

Este archivo captura todo lo reutilizable del frontend anterior. El código aquí
**no se copia literalmente** — se usa como referencia de lógica, rutas y tokens.
El backend PocketBase (`apps/pocketbase/`) está intacto y no es afectado por este documento.

---

## 1. Inventario de rutas

Rutas definidas en `App.jsx`. El nuevo proyecto Next.js debe implementar todas estas
páginas bajo `src/app/`.

```
/                          → HomePage
/about                     → AboutPage
/contact                   → ContactPage
/tienda                    → TiendaPage (listado de productos)
/tienda/:categoria         → TiendaPage (filtrado por categoría)
/product/:id               → ProductDetailPage
/producto/:id              → ProductDetailPage  (alias en español — mismo componente)
/bundles                   → BundlesPage
/blog                      → BlogListPage
/blog/:slug                → BlogDetailPage
/community                 → CommunityPage
/success                   → SuccessPage (post-pago)
/privacy                   → PrivacyPage
/returns                   → ReturnsPage
/terms                     → TermsPage
/cookies                   → CookiesPage
*                          → 404 inline
```

**Nota sobre aliases:** `/product/:id` y `/producto/:id` apuntan al mismo componente.
En Next.js esto se resuelve con un único segmento dinámico `[id]` en `src/app/product/`
y un redirect 301 de `/producto/[id]` → `/product/[id]` en `next.config.ts`.

---

## 2. Integración Hostinger Ecommerce API

**Origen:** `apps/web/src/api/EcommerceApi.js`

Credenciales de producción:
```
ECOMMERCE_API_URL  = https://api-ecommerce.hostinger.com
ECOMMERCE_STORE_ID = store_01KRNBKXJQEG3EP2B7SMNXE3C0
```

En el nuevo proyecto estas constantes van en `.env.local` como:
```
HOSTINGER_ECOMMERCE_API_URL=https://api-ecommerce.hostinger.com
HOSTINGER_STORE_ID=store_01KRNBKXJQEG3EP2B7SMNXE3C0
```

Y se consumen únicamente desde Server Components o Route Handlers (`src/app/api/`),
nunca expuestas al cliente (sin prefijo `NEXT_PUBLIC_`).

### Tipos de datos (portar a TypeScript interfaces)

```typescript
// Portar desde los @typedef en EcommerceApi.js

interface ProductVariant {
  id: string
  title: string
  image_url: string | null
  sku: string | null
  price_in_cents: number
  sale_price_in_cents: number | null
  currency: string
  currency_info: CurrencyInfo
  price_formatted: string
  sale_price_formatted: string | null
  manage_inventory: boolean
  weight: number | null
  options: VariantOption[]
  inventory_quantity: number | null
}

interface ProductOption {
  id: string
  title: string
  values: ProductOptionValue[]
}

interface ProductOptionValue {
  id: string
  option_id: string
  variant_id: string
  value: string
}

interface ProductImage {
  url: string
  order: number
  type: string
}

interface ProductAdditionalInfo {
  id: string
  order: number
  title: string
  description: string  // HTML
}

interface ProductListItem {
  id: string
  title: string
  subtitle: string | null
  ribbon_text: string | null
  description: string  // HTML
  image: string        // thumbnail URL
  price_in_cents: number
  currency: string
  purchasable: boolean
  order: number
  site_product_selection: 'lowest_price_first' | null
  images: ProductImage[]
  options: ProductOption[]
  variants: ProductVariant[]
  collections: ProductCollection[]
  additional_info: ProductAdditionalInfo[]
  type: { value: string }
  custom_fields: ProductCustomField[]
  related_products: ProductRelatedProduct[]
  updated_at: string
}

interface Category {
  id: string
  title: string
  image_url: string | null
  store_id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  metadata: Record<string, string> | null
}

interface CheckoutItem {
  variant_id: string
  quantity: number
  custom_field_values?: { custom_field_id: string; value: string }[]
}

interface InitializeCheckoutParams {
  items: CheckoutItem[]
  successUrl: string
  cancelUrl: string
  locale?: string
  customer?: { external_id: string; email?: string }
}
```

### Funciones a reimplementar

```
getProducts(params)          → GET /store/{id}/products
getProduct(id, params)       → GET /store/{id}/products/{id}
getProductQuantities(params) → GET /store/{id}/variants?fields=inventory_quantity
getCategories()              → GET /store/{id}/collections
initializeCheckout(params)   → POST /store/{id}/checkout
formatCurrency(cents, info)  → utilidad pura, sin dependencias
```

**Importante — cambio de arquitectura:** en el frontend React, todas estas funciones
eran `fetch` client-side directos. En Next.js, `getProducts`, `getProduct`,
`getCategories` pasan a ser Server Components o funciones en `src/lib/ecommerce.ts`.
Solo `initializeCheckout` puede quedarse como Server Action (formulario de pago).

---

## 3. Lógica del carrito (useCart)

**Origen:** `apps/web/src/hooks/useCart.jsx`

El carrito usa `localStorage` con la clave `'e-commerce-cart'`. La lógica es correcta
y portable; en Next.js se implementa como un Context Provider marcado con `'use client'`.

### Contratos de la API del carrito

```typescript
interface CartItem {
  product: ProductListItem
  variant: ProductVariant
  quantity: number
}

interface CartContextValue {
  cartItems: CartItem[]
  addToCart: (
    product: ProductListItem,
    variant: ProductVariant,
    quantity: number,
    availableQuantity: number
  ) => Promise<void>
  removeFromCart: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => string  // formatted string
}
```

**Detalle a corregir:** `getCartTotal()` falla si `cartItems` está vacío
(`cartItems[0]` es `undefined`). Añadir guard en la nueva implementación:

```typescript
const getCartTotal = (): string => {
  if (cartItems.length === 0) return formatCurrency(0, null)
  const currency_info = cartItems[0].variant.currency_info
  return formatCurrency(
    cartItems.reduce((total, item) => {
      const price = item.variant.sale_price_in_cents ?? item.variant.price_in_cents
      return total + price * item.quantity
    }, 0),
    currency_info
  )
}
```

---

## 4. Tokens visuales y design system

**Origen:** `apps/web/src/index.css` + `apps/web/tailwind.config.js`

### Variables CSS (portar a `src/styles/globals.css` en Next.js)

```css
:root {
  /* Colores de marca */
  --color-base:   #0D0D0D;   /* negro base / fondo */
  --color-carbon: #1A1A1A;   /* superficies, cards */
  --color-hueso:  #F5F5F5;   /* texto sobre oscuro */
  --color-acento: #E8FF00;   /* lima — CTAs únicamente */

  /* Mapeo shadcn (HSL) */
  --background: 0 0% 5%;
  --foreground: 0 0% 100%;
  --primary: 65 100% 50%;          /* #E8FF00 */
  --primary-foreground: 0 0% 5%;
  --secondary: 0 0% 12%;
  --secondary-foreground: 0 0% 100%;
  --muted: 0 0% 15%;
  --muted-foreground: 0 0% 65%;
  --accent: 65 100% 50%;
  --accent-foreground: 0 0% 5%;
  --card: 0 0% 8%;
  --card-foreground: 0 0% 100%;
  --popover: 0 0% 8%;
  --popover-foreground: 0 0% 100%;
  --border: 0 0% 15%;
  --input: 0 0% 15%;
  --ring: 65 100% 50%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --radius: 0px;   /* estética brutalista — sin border-radius */

  /* Espaciado responsivo */
  --space-xs:  clamp(0.25rem, 0.5vw, 0.5rem);
  --space-sm:  clamp(0.5rem,  1vw,   1rem);
  --space-md:  clamp(1rem,    2vw,   1.5rem);
  --space-lg:  clamp(1.5rem,  3vw,   2.5rem);
  --space-xl:  clamp(2.5rem,  5vw,   4rem);
  --space-2xl: clamp(4rem,    8vw,   8rem);
  --space-3xl: clamp(6rem,   12vw,  12rem);
}
```

### Tipografía

```
Titulares: Bebas Neue (Google Fonts)
Texto:     Inter (Google Fonts)

h1: clamp(3rem, 8vw, 6rem)    line-height: 0.95
h2: clamp(2.25rem, 6vw, 4.5rem)
h3: clamp(1.75rem, 4vw, 3rem)
h4: clamp(1.25rem, 2.5vw, 2rem)

Todos los headings: uppercase, letter-spacing: 0.05em, font-weight: 400
```

### Clases de componente personalizadas (portar a `globals.css`)

```css
.btn-brutalist    /* CTA primario: fondo lima, texto negro, sin radius */
.btn-outline      /* CTA secundario: borde, sin fondo */
.input-brutalist  /* inputs: borde 1px, sin radius, foco lima */
.section-spacing  /* padding vertical 3xl */
.container-custom /* max-width: 1440px, padding horizontal lg */
.card-premium     /* card oscura, border, hover translateY(-4px) */
```

### Tailwind — extensiones de color a añadir en `tailwind.config.ts`

```typescript
theme: {
  extend: {
    colors: {
      // Marca HybridRox
      'hx-base':   '#0D0D0D',
      'hx-carbon': '#1A1A1A',
      'hx-hueso':  '#F5F5F5',
      'hx-acento': '#E8FF00',
      // shadcn (mantener para compatibilidad de componentes)
      border:      'hsl(var(--border))',
      input:       'hsl(var(--input))',
      ring:        'hsl(var(--ring))',
      background:  'hsl(var(--background))',
      foreground:  'hsl(var(--foreground))',
      primary: {
        DEFAULT:    'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      // ... resto de tokens shadcn
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
    fontFamily: {
      display: ['Bebas Neue', 'sans-serif'],
      body:    ['Inter', 'sans-serif'],
    },
  },
}
```

---

## 5. Configuración shadcn/ui

Para el nuevo proyecto, instalar shadcn con esta config base:

```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils":      "@/lib/utils",
    "ui":         "@/components/ui",
    "lib":        "@/lib",
    "hooks":      "@/hooks"
  }
}
```

**Diferencia clave:** `"rsc": true` (Next.js App Router) vs `"rsc": false` que usaba
el proyecto anterior (React SPA). Los componentes de shadcn se generan con la directiva
`'use client'` solo donde es necesario.

Componentes que se usaban y que hay que reinstalar vía `npx shadcn@latest add`:
`accordion`, `alert-dialog`, `avatar`, `badge`, `breadcrumb`, `button`, `calendar`,
`card`, `carousel`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`,
`drawer`, `dropdown-menu`, `form`, `input`, `input-otp`, `label`, `menubar`,
`navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`,
`scroll-area`, `select`, `separator`, `sheet`, `skeleton`, `slider`, `sonner`,
`switch`, `table`, `tabs`, `textarea`, `toast`, `toggle`, `toggle-group`, `tooltip`

---

## 6. PocketBase — modelo de datos

**El backend está intacto.** Esta sección documenta las colecciones existentes
para que el nuevo frontend las consuma correctamente.

```
Colección          Campos principales
─────────────────────────────────────────────────────
blog_posts         title, slug, content, related_posts (relación)
testimonials       (campos por confirmar en admin)
waitlist           email, created
contact_submissions nombre, email, mensaje, created
products           title, sku, supplier, cost, margin_percentage,
                   shipping_time_days, athlete_type, bundle_id,
                   is_new, is_on_sale, is_bestseller, is_premium, variants
bundles            (campos por confirmar en admin)
newsletter_signups email, created
```

**URL de PocketBase:** `/hcgi/platform` (path gestionado por Hostinger).
En el nuevo proyecto, esta URL va en:
```
POCKETBASE_URL=/hcgi/platform
```

Acceso desde Next.js: Server Components o Route Handlers usando el SDK oficial
`pocketbase` en el servidor. Nunca exponer el cliente de PocketBase al browser
directamente.

---

## 7. i18n

El proyecto usaba `i18next` con soporte `es` / `en`. Las traducciones estaban en
`src/i18n/translations.js`. En el nuevo proyecto se puede usar `next-intl` o
`next-i18next`, que integran con el App Router de Next.js.

Los idiomas soportados: `es` (principal), `en`.

---

*Este documento es de solo lectura. No actualizarlo — es un snapshot histórico.*
*Fuente de verdad del proyecto activo: `README.md`, `CLAUDE.md`, `docs/DEVELOPMENT.md`.*
