'use client';

import { useState } from 'react';

// TODO: Define a more detailed BucketMonster type later, possibly with image URLs, stats, etc.
interface BucketMonster {
  id: string;
  name: string;
  currentMood: string;
  imageUrl: string;
}

const getMonsterImageUrl = (mood: string): string => {
  const moodText = mood.replace(/\s+/g, '+'); // Ensure mood text is URL-friendly
  return `https://via.placeholder.com/300x300.png?text=Bucket+Monster+(${moodText})`;
};

const initialMonsterMood = 'Content';
const initialMonster: BucketMonster = {
  id: 'bm001',
  name: 'Sparky',
  currentMood: initialMonsterMood,
  imageUrl: getMonsterImageUrl(initialMonsterMood),
};

const userMoodOptions = ['Happy', 'Excited', 'Calm', 'Sad', 'Anxious', 'Overwhelmed'];
// Possible monster moods based on AI logic (can be different from user moods)
const monsterMoods = { 
  JOYFUL: 'Joyful',
  UNDERSTANDING: 'Understanding',
  PEACEFUL: 'Peaceful',
  CONTENT: 'Content'
};

export default function BucketMonstersPage() {
  const [monster, setMonster] = useState<BucketMonster>(initialMonster);
  const [userMood, setUserMood] = useState<string>(userMoodOptions[0]);

  const handleCheckIn = () => {
    let newMonsterMood = monsterMoods.CONTENT; // Default

    // AI Logic Placeholder: Determine monster's mood based on user's mood
    switch (userMood) {
      case 'Happy':
      case 'Excited':
        newMonsterMood = monsterMoods.JOYFUL;
        break;
      case 'Sad':
      case 'Anxious':
      case 'Overwhelmed':
        newMonsterMood = monsterMoods.UNDERSTANDING;
        break;
      case 'Calm':
        newMonsterMood = monsterMoods.PEACEFUL;
        break;
      default:
        newMonsterMood = monsterMoods.CONTENT; // Fallback or for other user moods
    }

    const newImageUrl = getMonsterImageUrl(newMonsterMood);
    setMonster({ ...monster, currentMood: newMonsterMood, imageUrl: newImageUrl });

    console.log(`Checked in with ${monster.name}. User mood: ${userMood}. Monster mood updated to: ${newMonsterMood}.`);
    alert(`You checked in with ${monster.name}! It's now feeling ${newMonsterMood}. (Token reward pending implementation)`);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary">Your Bucket Monster</h1>
        <p className="text-xl mt-2 text-neutral-content">Your AI emotional companion on your wellness journey.</p>
      </header>

      <section className="card lg:card-side bg-base-200 shadow-xl mb-8">
        <figure className="p-4 lg:p-8 flex-shrink-0 lg:w-1/3">
          {/* eslint-disable-next-line @next/next/no-img-element */} 
          <img 
            src={monster.imageUrl} 
            alt={`${monster.name} the Bucket Monster - ${monster.currentMood}`}
            className="rounded-lg object-cover w-full h-auto max-w-xs mx-auto lg:max-w-none transition-all duration-500 ease-in-out"
          />
        </figure>
        <div className="card-body flex-grow">
          <h2 className="card-title text-3xl text-secondary">Meet {monster.name}!</h2>
          <p className="text-lg">Current Mood: <span className="font-semibold badge badge-lg badge-accent">{monster.currentMood}</span></p>
          <p className="mt-4 text-neutral-content">
            {monster.name} is here to support you. Check in regularly to see how it reflects your journey and earn $BaiBai tokens!
          </p>
          <p className="mt-2 text-xs italic text-neutral-content/70">
            Future feature: Watch {monster.name} evolve and transform. Youll even be able to mint it as an NFT!
          </p>
        </div>
      </section>

      <section className="p-6 bg-base-100 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">How are you feeling today?</h2>
        <div className="form-control w-full mb-4">
          <select 
            className="select select-bordered select-lg focus:select-primary"
            value={userMood}
            onChange={(e) => setUserMood(e.target.value)}
          >
            {userMoodOptions.map((mood) => (
              <option key={mood} value={mood}>{mood}</option>
            ))}
          </select>
        </div>
        <button 
          className="btn btn-primary btn-lg w-full"
          onClick={handleCheckIn}
        >
          Check-in with {monster.name}
        </button>
      </section>

      {/* Placeholder for Monster Collection/Evolution - for later development */}
      {/* 
      <section>
        <h2 className="text-2xl font-semibold mb-4">{"Your Monster's Journey"}</h2>
        <p className="text-neutral-content">{`Track ${monster.name}'s evolution and past moods here.`}</p>
      </section>
      */}
    </div>
  );
} 