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
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
