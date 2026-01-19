import { getDestinations } from '@/lib/data';
import DestinationsClient from '@/components/DestinationsClient';

export default async function DestinationsPage() {
    const destinations = await getDestinations();
    return <DestinationsClient initialDestinations={destinations} />;
}
