import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'HybridRox — Entrena para dos mundos. Domínalos ambos.',
    template: '%s | HybridRox',
  },
  description:
    'Accesorios y formación para atletas híbridos: Hyrox, CrossFit, OCR y fuerza. Equípate. Aprende. Domina.',
  keywords: ['hyrox', 'crossfit', 'atleta híbrido', 'ocr', 'fuerza', 'accesorios deportivos'],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'HybridRox',
    title: 'HybridRox — Entrena para dos mundos. Domínalos ambos.',
    description:
      'Accesorios y formación para atletas híbridos: Hyrox, CrossFit, OCR y fuerza.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HybridRox',
    description: 'Accesorios y formación para atletas híbridos.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
