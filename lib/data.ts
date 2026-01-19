import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

// Map Sanity results to our types
const mapSanityDestination = (d: any): Destination => ({
    id: d._id,
    name: d.name,
    image: d.image ? urlFor(d.image).url() : '/placeholder.jpg',
    rating: d.rating || 4.5,
    priceStart: d.priceStart || 0,
    description: d.description || 'Explore this amazing destination.',
    highlights: d.highlights || [],
    region: d.region || 'World',
    location: d.name, // Default location to name
    duration: '5-7 Days', // Default duration for destination overview
});

const mapSanityPackage = (p: any): Package => ({
    id: p._id,
    title: p.title,
    price: p.price || 0,
    duration: p.duration || 'N/A',
    image: p.image ? urlFor(p.image).url() : '/placeholder.jpg',
    description: p.description || '',
    highlights: p.highlights || [],
    itinerary: p.itinerary || [],
    destinationId: p.destination?._id,
    destination: p.destination?.name || 'Unknown Destination', // Mapped from reference
    rating: 0, // Default, as this might not be in package schema yet
    reviews: 0, // Default
    tags: [], // Default
});

export async function getDestinations(): Promise<Destination[]> {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return destinations;
    try {
        const data = await client.fetch(`*[_type == "destination"]`);
        return data.length > 0 ? data.map(mapSanityDestination) : destinations;
    } catch (error) {
        console.warn("Sanity fetch failed, using mock data:", error);
        return destinations;
    }
}

export async function getDestination(id: string): Promise<Destination | undefined> {
    const all = await getDestinations();
    return all.find(d => d.id === id);
}

export async function getPackages(): Promise<Package[]> {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return packages;
    try {
        const data = await client.fetch(`*[_type == "package"]{..., destination->}`);
        return data.length > 0 ? data.map(mapSanityPackage) : packages;
    } catch (error) {
        console.warn("Sanity fetch failed, using mock data:", error);
        return packages;
    }
}

export async function getPackage(id: string): Promise<Package | undefined> {
    const all = await getPackages();
    return all.find(p => p.id === id);
}

// Keep existing static data as fallback
export interface Destination {
    id: string;
    name: string;
    location: string; // Sanity uses 'location' or maps from name? Schema has 'region'. We'll map 'region' to this or keep 'location'
    region?: string; // Added
    image: string;
    priceStart: number;
    rating: number;
    duration: string;
    description: string;
    highlights: string[];
}

export interface Package {
    id: string;
    title: string;
    destination: string; // Mapped from reference
    destinationId?: string; // Added for linking
    price: number;
    duration: string; // e.g., "7 Days"
    rating: number;
    reviews: number;
    image: string;
    tags: string[];
    description?: string; // Added
    highlights?: string[]; // Added
    itinerary?: any[]; // Added
}

export const destinations: Destination[] = [
    {
        id: 'dest_1',
        name: 'Santorini',
        location: 'Greece',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2938&auto=format&fit=crop',
        priceStart: 1299,
        rating: 4.8,
        duration: '5-10 Days',
        description: 'Experience the world-famous sunsets and white-washed architecture of Santorini.',
        highlights: ['Oia Sunset', 'Volcanic Beaches', 'Wine Tasting'],
    },
    {
        id: 'dest_2',
        name: 'Bali',
        location: 'Indonesia',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2838&auto=format&fit=crop',
        priceStart: 899,
        rating: 4.7,
        duration: '7-14 Days',
        description: 'A tropical paradise known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.',
        highlights: ['Ubud Monkey Forest', 'Uluwatu Temple', 'Tegalalang Rice Terrace'],
    },
    {
        id: 'dest_3',
        name: 'Kyoto',
        location: 'Japan',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940&auto=format&fit=crop',
        priceStart: 1899,
        rating: 4.9,
        duration: '7-10 Days',
        description: 'Discover the heart of traditional Japan, famous for its classical Buddhist temples, gardens, imperial palaces, and wooden houses.',
        highlights: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Kinkaku-ji'],
    },
    {
        id: 'dest_4',
        name: 'Amalfi Coast',
        location: 'Italy',
        image: 'https://images.unsplash.com/photo-1633321088355-d0f8c1eaad48?q=80&w=2940&auto=format&fit=crop',
        priceStart: 2100,
        rating: 4.9,
        duration: '5-8 Days',
        description: 'Stunning coastline with colorful villages, steep cliffs, and a turquoise sea.',
        highlights: ['Positano', 'Ravello', 'Capri Day Trip'],
    },
    {
        id: 'dest_5',
        name: 'Reykjavik',
        location: 'Iceland',
        image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=2759&auto=format&fit=crop',
        priceStart: 1599,
        rating: 4.6,
        duration: '5-7 Days',
        description: 'Land of fire and ice, offering northern lights, blue lagoons, and dramatic landscapes.',
        highlights: ['Blue Lagoon', 'Golden Circle', 'Northern Lights'],
    },
    {
        id: 'dest_6',
        name: 'Maldives',
        location: 'Maldives',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2865&auto=format&fit=crop',
        priceStart: 2500,
        rating: 5.0,
        duration: '5-10 Days',
        description: 'Unrivaled luxury, white sandy beaches, and an underwater world.',
        highlights: ['Overwater Bungalows', 'Snorkeling', 'Private Dining'],
    },
];

export const packages: Package[] = [
    {
        id: 'pkg_1',
        title: 'Santorini Luxury Escape',
        destination: 'Santorini, Greece',
        price: 3200,
        duration: '7 Days',
        rating: 4.9,
        reviews: 124,
        image: 'https://images.unsplash.com/photo-1613395877344-13d4c79e4284?q=80&w=2940&auto=format&fit=crop',
        tags: ['Honeymoon', 'Luxury', 'Beach'],
    },
    {
        id: 'pkg_2',
        title: 'Bali Adventure & Wellness',
        destination: 'Bali, Indonesia',
        price: 1499,
        duration: '10 Days',
        rating: 4.7,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=2896&auto=format&fit=crop',
        tags: ['Adventure', 'Wellness', 'Nature'],
    },
    {
        id: 'pkg_3',
        title: 'Classic Japan Tour',
        destination: 'Tokyo & Kyoto, Japan',
        price: 2800,
        duration: '9 Days',
        rating: 4.8,
        reviews: 210,
        image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2853&auto=format&fit=crop',
        tags: ['Culture', 'City', 'Food'],
    },
    {
        id: 'pkg_4',
        title: 'Safari in Serengeti',
        destination: 'Tanzania',
        price: 4500,
        duration: '8 Days',
        rating: 5.0,
        reviews: 56,
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2936&auto=format&fit=crop',
        tags: ['Wildlife', 'Adventure', 'Luxury'],
    },
];
