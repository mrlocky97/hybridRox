// ─── Ecommerce types ───────────────────────────────────────────────────────
// Portados desde EcommerceApi.js (Horizons) — ver docs/REFERENCE_HORIZONS.md

export interface CurrencyInfo {
  code: string
  symbol: string
  template?: string
  decimal_digits?: number
}

export interface VariantOption {
  id: string
  option_id: string
  variant_id: string
  value: string
}

export interface ProductOptionValue {
  id: string
  option_id: string
  variant_id: string
  value: string
}

export interface ProductOption {
  id: string
  title: string
  values: ProductOptionValue[]
}

export interface ProductVariant {
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

export interface ProductImage {
  url: string
  order: number
  type: string
}

export interface ProductCollection {
  product_id: string
  collection_id: string
  order: number
}

export interface ProductAdditionalInfo {
  id: string
  order: number
  title: string
  description: string // HTML
}

export interface ProductCustomField {
  id: string
  title: string
  is_required: boolean
}

export interface ProductRelatedProduct {
  id: string
  section_title: string
  related_type: string
  related_id: string
  position: number
}

export interface ProductListItem {
  id: string
  title: string
  subtitle: string | null
  ribbon_text: string | null
  description: string // HTML
  image: string       // thumbnail URL
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

export interface Category {
  id: string
  title: string
  image_url: string | null
  store_id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  metadata: Record<string, string> | null
}

export interface CheckoutItem {
  variant_id: string
  quantity: number
  custom_field_values?: { custom_field_id: string; value: string }[]
}

export interface CheckoutCustomer {
  external_id: string
  email?: string
}

export interface InitializeCheckoutParams {
  items: CheckoutItem[]
  successUrl: string
  cancelUrl: string
  locale?: string
  customer?: CheckoutCustomer
}

export interface CartItem {
  product: ProductListItem
  variant: ProductVariant
  quantity: number
}
