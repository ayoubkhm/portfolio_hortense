import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hortense de Ruidiaz - Photographe & Drone',
    short_name: 'Hortense Photo',
    description:
      'Photographe professionnelle spécialisée en mariage et prise de vue par drone à Bordeaux.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF7F2',
    theme_color: '#FAF7F2',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
