import { Track, GymQuote, DietItem, WorkoutExercise } from '../types';

export const INITIAL_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Muscle Monster Gym Anthem (Dhoom Mix)',
    artist: 'Pritam / Sunidhi Chauhan / Vishal',
    youtubeId: '8afBXZawfQw',
    duration: '04:12',
    year: '2004',
    vibe: 'High Octane Bench Press Energy'
  },
  {
    id: '2',
    title: 'Chak De India (Pump Up Title Track)',
    artist: 'Sukhwinder Singh / Salim-Sulaiman',
    youtubeId: 'OQuu88A0f4A',
    duration: '04:43',
    year: '2007',
    vibe: 'Desi Motivation & Hard Core Reps'
  },
  {
    id: '3',
    title: 'Brothers Anthem (Bodybuilding Motivation)',
    artist: 'Vishal Dadlani / Ajay-Atul',
    youtubeId: '_3mS_8aA1M4',
    duration: '05:53',
    year: '2015',
    vibe: 'Heavy Iron & Powerlifting Drive'
  },
  {
    id: '4',
    title: 'Sultan Title Track (Bhai Gym Energy)',
    artist: 'Sukhwinder Singh / Shadab Faridi',
    youtubeId: 'm7B442P1C8E',
    duration: '04:40',
    year: '2016',
    vibe: 'Desi Akhada & Heavy Squats'
  },
  {
    id: '5',
    title: 'Zinda (Bhaag Milkha Bhaag)',
    artist: 'Siddharth Mahadevan / Shankar-Ehsaan-Loy',
    youtubeId: '822eS1Cj3p0',
    duration: '03:31',
    year: '2013',
    vibe: 'Heavy Squats & Deadlift Fire'
  },
  {
    id: '6',
    title: 'Dangal Title Track (Workout Special)',
    artist: 'Daler Mehndi / Pritam',
    youtubeId: 'w4ClQO0FFQg',
    duration: '04:59',
    year: '2016',
    vibe: 'Extreme Endurance & Max Reps'
  },
  {
    id: '7',
    title: 'Dhoom Machale (Dhoom 1 Original)',
    artist: 'Sunidhi Chauhan',
    youtubeId: '1_I-m4cK0wM',
    duration: '06:17',
    year: '2004',
    vibe: 'Cardio & Treadmill Banger'
  },
  {
    id: '8',
    title: 'Kar Har Maidaan Fateh (Sanju)',
    artist: 'Sukhwinder Singh / Shreya Ghoshal',
    youtubeId: 'LdH7a0Y80UY',
    duration: '03:25',
    year: '2018',
    vibe: 'Unstoppable Mindset & Stamina'
  },
  {
    id: '9',
    title: 'Saki Saki (Musafir 2004 Classic)',
    artist: 'Sunidhi Chauhan / Sukhwinder Singh',
    youtubeId: 'qfEakfE9p34',
    duration: '05:08',
    year: '2004',
    vibe: 'Late Night Heavy Iron Session'
  },
  {
    id: '10',
    title: 'Malhari (Bajirao Mastani High Energy)',
    artist: 'Vishal Dadlani',
    youtubeId: 'Y8H4E3Y0Q8I',
    duration: '04:05',
    year: '2015',
    vibe: 'Monster Bicep Peak Workout'
  }
];

export const NOSTALGIC_QUOTES: GymQuote[] = [
  {
    id: 1,
    text: "Bhai kal chest aur triceps hai, time se 6 baje aana!",
    speaker: "Guruji (Senior Gym Trainer)",
    category: "motivation"
  },
  {
    id: 2,
    text: "Fees ₹1100/- per month. Month ke 1st week me deposit karo, varna ₹50/day fine!",
    speaker: "Reception Desk Notice",
    category: "rules"
  },
  {
    id: 3,
    text: "Desi Ghee khao, natural body banao! Injection aur duplicate powder mat lo!",
    speaker: "Old School Gym Owner",
    category: "diet"
  },
  {
    id: 4,
    text: "Bhai thoda spot de de, 100 kg bench press maar raha hu!",
    speaker: "Ramesh (Local Gym Heavy Lifter)",
    category: "humor"
  },
  {
    id: 5,
    text: "NO PAIN NO GAIN! Dumbbell rubber mat standard floor pe mat feko!",
    speaker: "Wall Stencil Poster",
    category: "rules"
  },
  {
    id: 6,
    text: "4 Egg Whites aur 2 Banana ka shake peene se hi 16 inch ka bicep banega!",
    speaker: "Bhaiyya (Gym Juice Corner)",
    category: "diet"
  },
  {
    id: 7,
    text: "LIGHTWEIGHT BABY! EVERYBODY WANTS TO BE A BODYBUILDER!",
    speaker: "Ronnie Coleman Poster",
    category: "motivation"
  },
  {
    id: 8,
    text: "Ghar ka khana, dahi chana aur 100 pushups daily = Pure Desi Hulk!",
    speaker: "Masterji",
    category: "diet"
  }
];

export const DIET_MENU: DietItem[] = [
  {
    id: 'd1',
    name: '4 Egg Whites + 2 Bananas Shake',
    cost: '₹35',
    protein: '18g Protein',
    description: 'Freshly blended at the Gym Juice counter in a heavy glass mug. Pure 2000s post-workout potion.',
    popularIn2000s: true,
    tag: 'POST WORKOUT'
  },
  {
    id: 'd2',
    name: 'Soaked Black Chana + Jaggery (Gud)',
    cost: '₹15',
    protein: '12g Protein',
    description: 'Overnight soaked Kala Chana with fresh ginger and brown jaggery. Desi stamina booster.',
    popularIn2000s: true,
    tag: 'DESI POWER'
  },
  {
    id: 'd3',
    name: 'Boiled Potatoes + Rock Salt',
    cost: '₹20',
    protein: 'Carb Reload',
    description: 'Pre-workout carb loader for maximum bench press pump and thick muscle veins.',
    popularIn2000s: true,
    tag: 'PRE WORKOUT'
  },
  {
    id: 'd4',
    name: 'Dabur Chyawanprash + Milk',
    cost: '₹25',
    protein: 'Immunity & Mass',
    description: 'One big tablespoon of Chyawanprash in warm buffalo milk before bedtime.',
    popularIn2000s: true,
    tag: 'NIGHT RECOVERY'
  },
  {
    id: 'd5',
    name: 'Desi Cow Ghee (1 Spoon on Roti)',
    cost: '₹30',
    protein: 'Healthy Fats',
    description: 'Joint lubrication & traditional strength secret passed down by wrestling pehlwans.',
    popularIn2000s: true,
    tag: 'JOINT CARE'
  }
];

export const GYM_MEMORIES = [
  "Heavy 20kg cast iron plates painted with silver spray paint",
  "Torn leather bench press pad fixed with yellow duct tape",
  "Cassette player with Dhoom & Saaki Saaki mixtape blasting on high bass",
  "Vintage weighing machine with the spinning red dial scale",
  "Register ledger book where Guruji wrote attendance with a blue Reynolds pen",
  "Tubes of Moov and Volini spray kept near the mirror",
  "Arnold Schwarzenegger Mr. Olympia poster with corner pin holes"
];

export const WORKOUT_EXERCISES: WorkoutExercise[] = [
  {
    id: 'w1',
    name: 'Heavy Flat Barbell Bench Press',
    targetMuscle: 'Chest & Triceps',
    repsAndSets: '4 Sets × 12, 10, 8, 6 Reps (Pyramid Heavy)',
    desiEquipment: 'Raw Steel Barbell with Silver Painted 20kg Plates',
    guruAdvice: 'Bhai spotter ko ready rakho. Barbell ko chest pe touch karke blast ke sath upar pheko!',
    difficulty: 'Hardcore Iron'
  },
  {
    id: 'w2',
    name: 'Standing Incline Dumbbell Bicep Curl',
    targetMuscle: 'Bicep Peak & Forearms',
    repsAndSets: '4 Sets × 15 Reps',
    desiEquipment: 'Heavy Cast Iron Hex Dumbbells (15kg & 20kg)',
    guruAdvice: 'Elbow piche nahi jaana chahiye. Wrists ko peak pe twist karo 16 inch bicep pump ke liye!',
    difficulty: 'Desi Beginner'
  },
  {
    id: 'w3',
    name: 'Desi Hindu Pushups (Dand-Baithak)',
    targetMuscle: 'Full Body Core, Shoulders & Chest',
    repsAndSets: '50 Reps Continuous (Non-Stop)',
    desiEquipment: 'Sutar Mat / Raw Wooden Floor',
    guruAdvice: 'Traditional wrestling pehlwan move! Saans kheench ke neeche jao aur saans chhodte hue upar aao.',
    difficulty: 'Pehlwan Mode'
  },
  {
    id: 'w4',
    name: 'Heavy Lat Pulldown (Behind The Neck)',
    targetMuscle: 'Upper Back V-Taper (Pankh)',
    repsAndSets: '4 Sets × 12 Reps',
    desiEquipment: 'Pulley Cable Station with Grease Wire',
    guruAdvice: 'Gardan ke piche full stretch do taaki V-Shape cobra back nikle!',
    difficulty: 'Hardcore Iron'
  },
  {
    id: 'w5',
    name: 'Barbell Military Shoulder Press',
    targetMuscle: 'Deltoids & Traps',
    repsAndSets: '4 Sets × 10 Reps',
    desiEquipment: 'Olympic Standing Rack Barbell',
    guruAdvice: 'Gurdhan seedhi rakho! Overhead lock karke 2 second hold karo.',
    difficulty: 'Hardcore Iron'
  },
  {
    id: 'w6',
    name: 'Deep Back Squats (Free Weight)',
    targetMuscle: 'Quads & Glutes (Jaan ki Strength)',
    repsAndSets: '5 Sets × 15, 12, 10, 8, 5 Reps',
    desiEquipment: 'Wooden Squat Rack with Leather Weight Belt',
    guruAdvice: 'Hip niche tak le jao. Half squat se legs nahi banenge, pure assi-degee deep squat karo!',
    difficulty: 'Pehlwan Mode'
  },
  {
    id: 'w7',
    name: 'Weighted Cable Tricep Rope Pushdown',
    targetMuscle: 'Tricep Horseshoe Peak',
    repsAndSets: '4 Sets × 15 Reps',
    desiEquipment: 'Vintage Cable Crossover Pulley',
    guruAdvice: 'Rope ko bottom pe squeeze karke split karo. Tricep ghode ke naall jaisa dikhna chahiye!',
    difficulty: 'Desi Beginner'
  }
];
