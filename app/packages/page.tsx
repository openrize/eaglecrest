import { getPackages } from '@/lib/data';
import PackagesClient from '@/components/PackagesClient';

export default async function PackagesPage() {
    const packages = await getPackages();
    return <PackagesClient initialPackages={packages} />;
}
