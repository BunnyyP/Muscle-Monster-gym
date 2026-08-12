export interface Track {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  duration: string;
  year: string;
  vibe: string;
}

export interface GymQuote {
  id: number;
  text: string;
  speaker: string;
  category: 'motivation' | 'humor' | 'diet' | 'rules';
}

export interface MemberReceipt {
  id: string;
  name: string;
  phone: string;
  batch: 'Morning Desi 6 AM' | 'Evening Heavy Iron 6 PM' | 'Afternoon Hardcore 2 PM';
  membershipType: '1 Month - ₹1100' | '3 Months - ₹3000' | 'Annual Iron Legend - ₹10000';
  amount: number;
  date: string;
  receiptNo: string;
}

export interface DietItem {
  id: string;
  name: string;
  cost: string;
  protein: string;
  description: string;
  popularIn2000s: boolean;
  tag: string;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  targetMuscle: string;
  repsAndSets: string;
  desiEquipment: string;
  guruAdvice: string;
  difficulty: 'Desi Beginner' | 'Hardcore Iron' | 'Pehlwan Mode';
}
