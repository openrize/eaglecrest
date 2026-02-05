'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { NearbyUser, NearbyGroup, City, getUsersForCity, getGroupsForCity } from '@/lib/mockData';
import styles from './NearbyMap.module.css';

// Dynamically import Leaflet components (they don't work with SSR)
const MapContainer = dynamic(
    () => import('react-leaflet').then(mod => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import('react-leaflet').then(mod => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import('react-leaflet').then(mod => mod.Marker),
    { ssr: false }
);
const Popup = dynamic(
    () => import('react-leaflet').then(mod => mod.Popup),
    { ssr: false }
);

interface NearbyMapProps {
    selectedCity: City;
    onUserSelect?: (user: NearbyUser & { lat: number; lng: number }) => void;
    onGroupSelect?: (group: NearbyGroup) => void;
    selectedGroup?: NearbyGroup | null;
}

export default function NearbyMap({ selectedCity, onUserSelect, onGroupSelect, selectedGroup }: NearbyMapProps) {
    const [isClient, setIsClient] = useState(false);
    const [L, setL] = useState<typeof import('leaflet') | null>(null);

    // Get users and groups for selected city
    const users = getUsersForCity(selectedCity);
    const groups = getGroupsForCity(selectedCity);

    useEffect(() => {
        setIsClient(true);

        // Import Leaflet CSS and module
        import('leaflet').then((leaflet) => {
            setL(leaflet.default);
        });
    }, []);

    if (!isClient || !L) {
        return (
            <div className={styles.mapWrapper}>
                <div className={styles.loadingOverlay}>
                    <div className={styles.loadingSpinner}></div>
                </div>
            </div>
        );
    }

    // Create custom icons
    const createUserIcon = (user: NearbyUser) => {
        return L.divIcon({
            className: styles.userMarker,
            html: `
        <img 
          src="${user.avatar}" 
          alt="${user.name}"
          class="${styles.userAvatar} ${styles[`userAvatar${user.status.charAt(0).toUpperCase() + user.status.slice(1)}`]}"
        />
      `,
            iconSize: [44, 44],
            iconAnchor: [22, 22],
        });
    };

    const createGroupIcon = (group: NearbyGroup) => {
        return L.divIcon({
            className: styles.groupMarker,
            html: `
        <div class="${styles.groupMarker}">
          <span class="${styles.groupEmoji}">${group.emoji}</span>
          <span class="${styles.groupName}">${group.name.slice(0, 15)}${group.name.length > 15 ? '...' : ''}</span>
        </div>
      `,
            iconSize: [150, 40],
            iconAnchor: [75, 20],
        });
    };

    const currentUserIcon = L.divIcon({
        className: styles.currentUserMarker,
        html: `<div class="${styles.currentUserMarker}"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    });

    const cityCenter: [number, number] = [selectedCity.lat, selectedCity.lng];

    return (
        <div className={styles.mapWrapper}>
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                crossOrigin=""
            />
            <MapContainer
                center={cityCenter}
                zoom={13}
                className={styles.mapContainer}
                zoomControl={true}
                key={selectedCity.id} // Force re-render on city change
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Current user location (city center) */}
                <Marker position={cityCenter} icon={currentUserIcon}>
                    <Popup>
                        <div className={styles.tooltip}>
                            <div className={styles.tooltipName}>You are here</div>
                            <div className={styles.tooltipActivity}>{selectedCity.name}, {selectedCity.country}</div>
                        </div>
                    </Popup>
                </Marker>

                {/* Nearby users */}
                {users.map(user => (
                    <Marker
                        key={user.id}
                        position={[user.lat, user.lng]}
                        icon={createUserIcon(user)}
                        eventHandlers={{
                            click: () => onUserSelect?.(user),
                        }}
                    >
                        <Popup>
                            <div className={styles.tooltip}>
                                <div className={styles.tooltipName}>{user.name}</div>
                                {user.activity && (
                                    <div className={styles.tooltipActivity}>{user.activity}</div>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Nearby groups */}
                {groups.map(group => (
                    <Marker
                        key={group.id}
                        position={[group.lat, group.lng]}
                        icon={createGroupIcon(group)}
                        eventHandlers={{
                            click: () => onGroupSelect?.(group),
                        }}
                    >
                        <Popup>
                            <div className={styles.tooltip}>
                                <div className={styles.tooltipName}>{group.emoji} {group.name}</div>
                                <div className={styles.tooltipActivity}>{group.memberCount} travelers</div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
