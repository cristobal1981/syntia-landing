import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Host_Grotesk } from 'next/font/google'
import { SmoothScroll } from '@/components/site/smooth-scroll'
import { site } from '@/content/site'
import './globals.css'

const hostGrotesk = Host_Grotesk({
  subsets: ['latin'],
  variable: '--font-host-grotesk',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  weight: ['300', '400', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Syntia | Portal de cliente de tenaasesores',
    template: '%s | Syntia',
  },
  description: site.description,
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: site.name,
    title: 'Syntia | Portal de cliente de tenaasesores',
    description: site.description,
    url: site.url,
    images: [
      {
        url: '/brand/syntia-logo_horizontal-positivo.webp',
        width: 640,
        height: 160,
        alt: 'Syntia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Syntia | Portal de cliente de tenaasesores',
    description: site.description,
    images: ['/brand/syntia-logo_horizontal-positivo.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/brand/favicon.ico', sizes: '48x48' },
      { url: '/brand/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/brand/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/brand/site.webmanifest',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#041d23',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${hostGrotesk.variable} ${archivo.variable} bg-background`}
    >
      <body className="antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
