
'use client';

import { useEffect } from 'react';
import { useImageStore } from '@/lib/image-cache';
import { setupInitialData } from '@/app/actions';

const DEFAULT_IMAGES = {
    siteLogo: 'https://i.imgur.com/xOQZ1Jg.png',
    favicon: '',
    openGraphImage: 'https://i.imgur.com/39J0yD1.png',
    homepageHeroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
    homepageWelcomeImage: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop',
    homepageByTheNumbersBackground: 'https://images.unsplash.com/photo-1543165389-c28383a85b61?q=80&w=2070&auto=format&fit=crop',
    scholarshipBackground: 'https://images.unsplash.com/photo-1529148492464-3e721b96582e?q=80&w=1974&auto=format&fit=crop',
    aboutCampus: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop',
    adminPresident: 'https://placehold.co/400x400.png',
    adminExecVP: 'https://placehold.co/400x400.png',
    adminVPAcademics: 'https://placehold.co/400x400.png',
    adminVPAdmin: 'https://placehold.co/400x400.png',
    adminChairman: 'https://placehold.co/400x400.png',
    studentLifeOrgs: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop',
    studentLifeAthletics: 'https://images.unsplash.com/photo-1541250848049-b9f71362cb36?q=80&w=2070&auto=format&fit=crop',
    studentLifeEvents: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2070&auto=format&fit=crop',
    studentLifeWellness: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop',
    aboutPageHeader: 'https://images.unsplash.com/photo-1576426863848-c21f68c6aa98?q=80&w=2070&auto=format&fit=crop',
    academicsPageHeader: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop',
    admissionsPageHeader: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop',
    administrationPageHeader: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2134&auto=format&fit=crop',
    alumniPageHeader: 'https://images.unsplash.com/photo-1579269527749-c4a4c581c479?q=80&w=2070&auto=format&fit=crop',
    contactPageHeader: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=2070&auto=format&fit=crop',
    newsPageHeader: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop',
    studentLifePageHeader: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
    studentLifeArts: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=2073&auto=format&fit=crop',
    studentLifeCareers: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop',
    studentLifeCalendar: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop',
    careersPageHeader: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop',
    newsAndUpdatesBackground: 'https://images.unsplash.com/photo-1505664194779-8beace7a2044?q=80&w=2070&auto=format&fit=crop',
    homepageChannelImage1: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2070&auto=format&fit=crop',
    homepageChannelImage2: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop',
    homepageChannelImage3: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?q=80&w=2070&auto=format&fit=crop',
    homepageChannelImage4: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop',
    homepageChannelImage5: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
    homepageChannelImage6: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop',
};

type ImageKey = keyof typeof DEFAULT_IMAGES;

interface AppInitializerProps {
  serverImages: Record<string, string>;
}

export function AppInitializer({ serverImages }: AppInitializerProps) {
  useEffect(() => {
    // This effect runs only once on the client after initial hydration.
    // It initializes the image store with server-provided data.
    const combinedImages = Object.keys(DEFAULT_IMAGES).reduce((acc, key) => {
        const typedKey = key as ImageKey;
        acc[typedKey] = serverImages[typedKey] || DEFAULT_IMAGES[typedKey];
        return acc;
    }, {} as Record<ImageKey, string>);

    useImageStore.setState({ images: combinedImages });
    
    // Also, run any one-time setup tasks
    setupInitialData();
  }, [serverImages]);

  return null; // This component does not render anything.
}

    