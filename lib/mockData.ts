// Mock data for Nearby Travelers feature
// This simulates what would come from a real-time database

export interface NearbyUser {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  activity?: string;
  latOffset: number;  // Offset from city center
  lngOffset: number;
}

export interface NearbyGroup {
  id: string;
  name: string;
  emoji: string;
  description?: string;
  memberCount: number;
  members: {
    id: string;
    name: string;
    avatar: string;
  }[];
  latOffset: number;  // Offset from city center
  lngOffset: number;
  category: 'party' | 'food' | 'adventure' | 'culture' | 'relaxation';
}

export interface City {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  emoji: string;
}

// Available cities for location selection
export const cities: City[] = [
  { id: 'nyc', name: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060, emoji: '🗽' },
  { id: 'la', name: 'Los Angeles', country: 'USA', lat: 34.0522, lng: -118.2437, emoji: '🌴' },
  { id: 'miami', name: 'Miami', country: 'USA', lat: 25.7617, lng: -80.1918, emoji: '🏖️' },
  { id: 'chicago', name: 'Chicago', country: 'USA', lat: 41.8781, lng: -87.6298, emoji: '🌆' },
  { id: 'lasvegas', name: 'Las Vegas', country: 'USA', lat: 36.1699, lng: -115.1398, emoji: '🎰' },
  { id: 'sanfran', name: 'San Francisco', country: 'USA', lat: 37.7749, lng: -122.4194, emoji: '🌉' },
  { id: 'austin', name: 'Austin', country: 'USA', lat: 30.2672, lng: -97.7431, emoji: '🤠' },
  { id: 'barcelona', name: 'Barcelona', country: 'Spain', lat: 41.3851, lng: 2.1734, emoji: '🇪🇸' },
  { id: 'paris', name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, emoji: '🗼' },
  { id: 'london', name: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, emoji: '🇬🇧' },
];

// Default city (New York)
export const defaultCity = cities[0];

// Generate random offset for realistic spreading
const randomOffset = (range: number = 0.015) => (Math.random() - 0.5) * range;

export const nearbyUsers: NearbyUser[] = [
  {
    id: 'user-1',
    name: 'Sarah M.',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'online',
    activity: 'Exploring the city',
    latOffset: randomOffset(),
    lngOffset: randomOffset(),
  },
  {
    id: 'user-2',
    name: 'Mike T.',
    avatar: 'https://i.pravatar.cc/150?img=2',
    status: 'online',
    activity: 'Looking for dinner spots',
    latOffset: randomOffset(),
    lngOffset: randomOffset(),
  },
  {
    id: 'user-3',
    name: 'Emma L.',
    avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'away',
    activity: 'Sightseeing tour',
    latOffset: randomOffset(),
    lngOffset: randomOffset(),
  },
  {
    id: 'user-4',
    name: 'James K.',
    avatar: 'https://i.pravatar.cc/150?img=4',
    status: 'online',
    latOffset: randomOffset(),
    lngOffset: randomOffset(),
  },
  {
    id: 'user-5',
    name: 'Olivia R.',
    avatar: 'https://i.pravatar.cc/150?img=5',
    status: 'online',
    activity: 'Coffee lover ☕',
    latOffset: randomOffset(),
    lngOffset: randomOffset(),
  },
  {
    id: 'user-6',
    name: 'David P.',
    avatar: 'https://i.pravatar.cc/150?img=6',
    status: 'offline',
    latOffset: randomOffset(),
    lngOffset: randomOffset(),
  },
  {
    id: 'user-7',
    name: 'Sophie B.',
    avatar: 'https://i.pravatar.cc/150?img=7',
    status: 'online',
    activity: 'Solo traveler',
    latOffset: randomOffset(),
    lngOffset: randomOffset(),
  },
  {
    id: 'user-8',
    name: 'Alex W.',
    avatar: 'https://i.pravatar.cc/150?img=8',
    status: 'online',
    latOffset: randomOffset(),
    lngOffset: randomOffset(),
  },
];

export const nearbyGroups: NearbyGroup[] = [
  {
    id: 'group-1',
    name: 'Rooftop sunset drinks',
    emoji: '🌅',
    description: 'Catching the sunset with cocktails!',
    memberCount: 23,
    category: 'relaxation',
    latOffset: 0.008,
    lngOffset: 0.012,
    members: [
      { id: 'm1', name: 'Sarah', avatar: 'https://i.pravatar.cc/150?img=10' },
      { id: 'm2', name: 'John', avatar: 'https://i.pravatar.cc/150?img=11' },
      { id: 'm3', name: 'Lisa', avatar: 'https://i.pravatar.cc/150?img=12' },
    ],
  },
  {
    id: 'group-2',
    name: 'Food crawl tonight',
    emoji: '🍕',
    description: 'Exploring the best local eats',
    memberCount: 15,
    category: 'food',
    latOffset: -0.005,
    lngOffset: 0.008,
    members: [
      { id: 'm4', name: 'Carlos', avatar: 'https://i.pravatar.cc/150?img=13' },
      { id: 'm5', name: 'Maria', avatar: 'https://i.pravatar.cc/150?img=14' },
      { id: 'm6', name: 'Tom', avatar: 'https://i.pravatar.cc/150?img=15' },
    ],
  },
  {
    id: 'group-3',
    name: 'Club night 🎉',
    emoji: '🎉',
    description: 'Dancing until sunrise!',
    memberCount: 42,
    category: 'party',
    latOffset: 0.003,
    lngOffset: -0.006,
    members: [
      { id: 'm7', name: 'Jake', avatar: 'https://i.pravatar.cc/150?img=16' },
      { id: 'm8', name: 'Emma', avatar: 'https://i.pravatar.cc/150?img=17' },
      { id: 'm9', name: 'Chris', avatar: 'https://i.pravatar.cc/150?img=18' },
    ],
  },
  {
    id: 'group-4',
    name: 'Solo travelers meetup',
    emoji: '🎒',
    description: 'Connect with fellow adventurers',
    memberCount: 18,
    category: 'adventure',
    latOffset: -0.007,
    lngOffset: -0.004,
    members: [
      { id: 'm10', name: 'Nina', avatar: 'https://i.pravatar.cc/150?img=19' },
      { id: 'm11', name: 'Leo', avatar: 'https://i.pravatar.cc/150?img=20' },
      { id: 'm12', name: 'Mia', avatar: 'https://i.pravatar.cc/150?img=21' },
    ],
  },
  {
    id: 'group-5',
    name: 'Museum & gallery tour',
    emoji: '🏛️',
    description: 'Exploring art and history together',
    memberCount: 12,
    category: 'culture',
    latOffset: 0.012,
    lngOffset: 0.002,
    members: [
      { id: 'm13', name: 'Anna', avatar: 'https://i.pravatar.cc/150?img=22' },
      { id: 'm14', name: 'Ben', avatar: 'https://i.pravatar.cc/150?img=23' },
      { id: 'm15', name: 'Chloe', avatar: 'https://i.pravatar.cc/150?img=24' },
    ],
  },
  {
    id: 'group-6',
    name: 'Morning yoga in park',
    emoji: '🧘',
    description: 'Start your day with sunrise yoga',
    memberCount: 8,
    category: 'relaxation',
    latOffset: 0.006,
    lngOffset: 0.015,
    members: [
      { id: 'm16', name: 'Zen', avatar: 'https://i.pravatar.cc/150?img=25' },
      { id: 'm17', name: 'Luna', avatar: 'https://i.pravatar.cc/150?img=26' },
      { id: 'm18', name: 'Sol', avatar: 'https://i.pravatar.cc/150?img=27' },
    ],
  },
  {
    id: 'group-7',
    name: 'Bar hopping tonight',
    emoji: '🍺',
    description: 'Best bars and nightlife spots',
    memberCount: 35,
    category: 'party',
    latOffset: -0.002,
    lngOffset: 0.001,
    members: [
      { id: 'm19', name: 'DJ Max', avatar: 'https://i.pravatar.cc/150?img=28' },
      { id: 'm20', name: 'Stella', avatar: 'https://i.pravatar.cc/150?img=29' },
      { id: 'm21', name: 'Rico', avatar: 'https://i.pravatar.cc/150?img=30' },
    ],
  },
  {
    id: 'group-8',
    name: 'Hiking adventure',
    emoji: '🥾',
    description: 'Explore trails with amazing views',
    memberCount: 11,
    category: 'adventure',
    latOffset: -0.015,
    lngOffset: -0.008,
    members: [
      { id: 'm22', name: 'Trail', avatar: 'https://i.pravatar.cc/150?img=31' },
      { id: 'm23', name: 'Peak', avatar: 'https://i.pravatar.cc/150?img=32' },
      { id: 'm24', name: 'Summit', avatar: 'https://i.pravatar.cc/150?img=33' },
    ],
  },
];

// Helper to get absolute coordinates based on city
export function getUsersForCity(city: City): (NearbyUser & { lat: number; lng: number })[] {
  return nearbyUsers.map(user => ({
    ...user,
    lat: city.lat + user.latOffset,
    lng: city.lng + user.lngOffset,
  }));
}

export function getGroupsForCity(city: City): (NearbyGroup & { lat: number; lng: number })[] {
  return nearbyGroups.map(group => ({
    ...group,
    lat: city.lat + group.latOffset,
    lng: city.lng + group.lngOffset,
  }));
}

// Category colors for styling
export const categoryColors: Record<NearbyGroup['category'], string> = {
  party: '#FF6B6B',
  food: '#FFA94D',
  adventure: '#51CF66',
  culture: '#748FFC',
  relaxation: '#CC5DE8',
};
