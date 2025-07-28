import { BioGenerator } from '@/components/bio-generator';
import { ModeToggle } from '@/components/mode-toggle';
import { Heart } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>
      
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-primary animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
            DinnerTonight
          </h1>
          <p className="text-xl text-muted-foreground">
            Create your perfect dating profile bio with AI magic ✨
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <BioGenerator
            professions={[
              'Musician',
              'Chef',
              'Teacher',
              'Artist',
              'Writer',
              'Entrepreneur',
              'Developer',
              'Designer',
              'Doctor',
              'Engineer'
            ]}
            interests={[
              'Travel',
              'Music',
              'Cooking',
              'Photography',
              'Sports',
              'Reading',
              'Gaming',
              'Hiking',
              'Art',
              'Movies'
            ]}
            traits={[
              'Creative',
              'Adventurous',
              'Passionate',
              'Energetic',
              'Thoughtful',
              'Ambitious',
              'Funny',
              'Caring',
              'Optimistic',
              'Curious'
            ]}
          />
        </div>
      </div>
    </main>
  );
}