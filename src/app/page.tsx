import { AppHero } from '@/components/ui/ui-layout';
import Link from 'next/link';
import {
  IconHeartHandshake, // BaiBai AI (Doula)
  IconMoodKid,       // Bucket Monsters
  IconWaveSine,      // SoundBYTEs
  IconPerspective,   // Presents of Sound
  IconGift,          // Baby Gods & Goddesses
  IconShoppingCart,  // Marketplace
} from '@tabler/icons-react';

const features = [
  {
    title: 'BaiBai AI (Digital Doula)',
    description: 'AI-powered support, journaling prompts, and a safe space to reflect, process, and grow.',
    link: '/baibai-ai',
    icon: IconHeartHandshake,
  },
  {
    title: 'Bucket Monsters',
    description: 'AI-generated emotional avatars that reflect your daily mood and serve as companions for mental wellness.',
    link: '/bucket-monsters',
    icon: IconMoodKid,
  },
  {
    title: 'SoundBYTEs',
    description: 'Transform your voice and emotions into unique, personalized visual art. Available as commissions or via generative tools.',
    link: '/soundbytes',
    icon: IconWaveSine,
  },
  {
    title: 'Presents of Sound',
    description: 'Generative, immersive sound-and-motion art pieces for healing, inspiration, and therapeutic environments.',
    link: '/presents-of-sound',
    icon: IconPerspective,
  },
  {
    title: 'Baby Gods & Goddesses',
    description: 'Spiritual newborn-themed prints with optional NFT twins – a timeless gift for new beginnings.',
    link: '/baby-gods-goddesses',
    icon: IconGift,
  },
  {
    title: 'Marketplace',
    description: 'Curated products, affiliate items, and services for IVF, pregnancy, newborns, and wellness. (Coming Soon)',
    link: '/marketplace',
    icon: IconShoppingCart,
  },
];

export default function Page() {
  return (
    <>
      <AppHero
        title="Welcome to BaiBai"
        subtitle="A New Economy for Healing, Creativity & AI-Powered Emotional Wellness."
      />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-secondary">
          Explore the BaiBai Ecosystem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                <div className="card-body items-center text-center">
                  <Icon size={48} className="mb-4 text-primary" />
                  <h3 className="card-title text-2xl">{feature.title}</h3>
                  <p className="text-neutral-content/80 text-sm mt-2 min-h-[80px]">{feature.description}</p>
                  <div className="card-actions justify-center mt-auto pt-4">
                    <Link href={feature.link} className="btn btn-primary btn-outline">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
