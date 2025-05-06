'use client';

import { IconExternalLink } from '@tabler/icons-react';

interface ArtPiece {
  id: string;
  title: string;
  description: string;
  visualPlaceholderUrl: string;
  // Potential future fields: audioSampleUrl, motionPreviewUrl (e.g., short video/gif)
}

const artPieces: ArtPiece[] = [
  {
    id: 'pos001',
    title: 'Ethereal Bloom',
    description: 'A gently evolving visual symphony where abstract floral patterns bloom and recede in harmony with calming soundscapes. Designed to induce a meditative state and promote tranquility.',
    visualPlaceholderUrl: 'https://via.placeholder.com/600x400.png?text=Ethereal+Bloom+(Sound+%26+Motion+Art)',
  },
  {
    id: 'pos002',
    title: 'Cosmic Flow',
    description: 'Experience the universe unfolding. Pulsating nebulae and swirling galaxies react to an ambient soundtrack, creating a sense of awe and interconnectedness. Ideal for immersive projection.',
    visualPlaceholderUrl: 'https://via.placeholder.com/600x400.png?text=Cosmic+Flow+(Sound+%26+Motion+Art)',
  },
  {
    id: 'pos003',
    title: 'Rhythmic Resonance',
    description: 'Geometric shapes and vibrant colors dance to an uplifting, rhythmic beat. This piece is designed to energize and inspire creativity, perfect for interactive installations or dynamic therapy sessions.',
    visualPlaceholderUrl: 'https://via.placeholder.com/600x400.png?text=Rhythmic+Resonance+(Sound+%26+Motion+Art)',
  },
];

export default function PresentsOfSoundPage() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-primary">Presents of Sound</h1>
        <p className="text-xl lg:text-2xl mt-3 text-neutral-content">
          Generative, immersive sound-and-motion art pieces for healing and inspiration.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center mb-8 text-secondary">Explore the Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artPieces.map((piece) => (
            <div key={piece.id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={piece.visualPlaceholderUrl} 
                alt={piece.title} 
                className="rounded-t-lg object-cover w-full h-64"
              />
              <div className="card-body">
                <h3 className="card-title text-2xl">{piece.title}</h3>
                <p className="text-neutral-content/80 text-sm leading-relaxed mt-2 min-h-[100px]">{piece.description}</p>
                {/* Placeholder for future interaction like play sample or view preview */}
                {/* <div className="card-actions justify-end mt-4">
                  <button className="btn btn-outline btn-primary btn-sm">Preview Motion</button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center p-8 bg-base-100 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 text-accent">Experience & Licensing</h2>
        <p className="text-lg text-neutral-content mb-6 max-w-3xl mx-auto">
          Our Presents of Sound are designed for a variety of applications, including immersive wellness spaces, therapeutic environments, VR experiences, and large-scale event projections. Each piece is a unique generative artwork that responds to its environment or predefined algorithms to create an ever-evolving audio-visual journey.
        </p>
        <p className="text-lg text-neutral-content mb-8 max-w-3xl mx-auto">
          We offer flexible licensing options for businesses, therapists, event organizers, and individuals seeking to incorporate these transformative experiences into their offerings.
        </p>
        <a 
          href="mailto:connect@amritasethi.com?subject=Presents%20of%20Sound%20Licensing%20Inquiry"
          className="btn btn-primary btn-lg"
        >
          Inquire About Licensing <IconExternalLink size={20} className="ml-2" />
        </a>
      </section>
    </div>
  );
} 