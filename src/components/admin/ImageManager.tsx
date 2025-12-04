
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ImageUploader } from './ImageUploader';
import { setSiteImage } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { useImageStore } from '@/lib/image-cache';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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

const imageSections = {
    'General': [
        { key: 'siteLogo', title: 'Site Logo', description: 'The main logo used in the header and footer. Recommended size: wide rectangle (e.g. 200x50px).' },
        { key: 'favicon', title: 'Browser Logo (Favicon)', description: 'The icon that appears in the browser tab. Recommended size: 32x32px or 64x64px.' },
        { key: 'openGraphImage', title: 'Link Preview Image (Open Graph)', description: 'The image that appears when you share a link to your site. Recommended size: 1200x630px.' },
    ],
    'Homepage': [
        { key: 'homepageHeroImage', title: 'Hero Section Background', description: 'The main background image for the homepage hero section.' },
        { key: 'homepageWelcomeImage', title: 'Welcome Section Image', description: 'Image for the welcome section on the homepage.' },
        { key: 'homepageByTheNumbersBackground', title: '"The Channel" Background', description: 'Background for "The Channel" section.' },
        { key: 'newsAndUpdatesBackground', title: 'News &amp; Updates Background', description: 'Background for the News &amp; Updates section.' },
        { key: 'scholarshipBackground', title: 'Scholarship Section Background', description: 'Image for the Scholarship card on the homepage.' },
    ],
    'Homepage Channel': [
        { key: 'homepageChannelImage1', title: 'Channel Image 1', description: 'First image in the homepage channel grid.' },
        { key: 'homepageChannelImage2', title: 'Channel Image 2', description: 'Second image in the homepage channel grid.' },
        { key: 'homepageChannelImage3', title: 'Channel Image 3', description: 'Third image in the homepage channel grid.' },
        { key: 'homepageChannelImage4', title: 'Channel Image 4', description: 'Fourth image in the homepage channel grid.' },
        { key: 'homepageChannelImage5', title: 'Channel Image 5', description: 'Fifth image in the homepage channel grid.' },
        { key: 'homepageChannelImage6', title: 'Channel Image 6', description: 'Sixth image in the homepage channel grid.' },
    ],
    'Page Headers': [
        { key: 'aboutPageHeader', title: 'About Page Header', description: 'Background for the About Us page header.' },
        { key: 'academicsPageHeader', title: 'Academics Page Header', description: 'Background for the Academics page header.' },
        { key: 'admissionsPageHeader', title: 'Admissions Page Header', description: 'Background for the Admissions page header.' },
        { key: 'administrationPageHeader', title: 'Administration Page Header', description: 'Background for the Administration page header.' },
        { key: 'alumniPageHeader', title: 'Alumni Page Header', description: 'Background for the Alumni page header.' },
        { key: 'contactPageHeader', title: 'Contact Page Header', description: 'Background for the Contact page header.' },
        { key: 'newsPageHeader', title: 'News Page Header', description: 'Background for the News page header.' },
        { key: 'studentLifePageHeader', title: 'Student Life Page Header', description: 'Background for the Student Life page header.' },
        { key: 'careersPageHeader', title: 'Careers Page Header', description: 'Background for the Careers page header.' },
    ],
    'About Us Page': [
        { key: 'aboutCampus', title: 'Main Campus Image', description: 'The main image featured at the top of the About Us page.' }
    ],
    'Administration Page': [
        { key: 'adminPresident', title: "President's Portrait", description: 'Portrait of Juan Antonio Z. Villaluz.' },
        { key: 'adminExecVP', title: "Executive VP's Portrait", description: 'Portrait of Miguel M. Zayco.' },
        { key: 'adminVPAcademics', title: "VP for Academics' Portrait", description: 'Portrait of Dr. Imelda M. Patricio, LPT.' },
        { key: 'adminVPAdmin', title: "VP for Administration's Portrait", description: 'Portrait of Adrian O. Rival, CPA.' },
        { key: 'adminChairman', title: "Chairman's Portrait", description: 'Portrait of Annette Z. Villaluz.' },
    ],
    'Student Life Page': [
        { key: 'studentLifeOrgs', title: 'Student Organizations Image', description: 'Image for the Student Organizations section.' },
        { key: 'studentLifeAthletics', title: 'Athletics &amp; Recreation Image', description: 'Image for the Athletics &amp; Recreation section.' },
        { key: 'studentLifeEvents', title: 'Campus Events Image', description: 'Image for the Campus Events section.' },
        { key: 'studentLifeWellness', title: 'Health &amp; Wellness Image', description: 'Image for the Health &amp; Wellness section.' },
        { key: 'studentLifeArts', title: 'Arts &amp; Culture Image', description: 'Image for the Arts &amp; Culture section.' },
        { key: 'studentLifeCareers', title: 'Career Services Image', description: 'Image for the Career Services section.' },
        { key: 'studentLifeCalendar', title: 'Upcoming Events Image', description: 'Image for the Upcoming Events calendar section.' },
    ],
}

type ImageKey = keyof typeof DEFAULT_IMAGES;

export function ImageManager() {
    const { images: imageUrls, setImage } = useImageStore();
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    // The image loading is now handled globally in RootLayout.
    // This component now just checks if the store is populated.
    useEffect(() => {
        if (Object.keys(imageUrls).length > 0) {
            setIsLoading(false);
        }
    }, [imageUrls]);

    const handleImageSave = async (key: ImageKey, url: string) => {
        // Save to DB
        const result = await setSiteImage(key, url);
        if (result.success) {
            // Update global zustand store directly
            setImage(key, url); 
        } else {
            toast({ variant: 'destructive', title: 'Failed to Save Image', description: result.message });
        }
    }
    
    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-5 w-2/3 mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-48 w-full" />
                </CardContent>
            </Card>
        )
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Site Image Management</CardTitle>
                    <CardDescription>
                        Update various images across the website. Drag and drop a new image onto a card to upload and replace it. Changes are saved to your Firebase backend and will persist.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                      {Object.entries(imageSections).map(([sectionName, images], index) => (
                        <AccordionItem value={`item-${index}`} key={sectionName}>
                           <AccordionTrigger className="text-xl font-bold text-foreground">{sectionName}</AccordionTrigger>
                           <AccordionContent>
                                <div className="grid md:grid-cols-2 gap-6 pt-4">
                                  {images.map(imageInfo => {
                                      const key = imageInfo.key as ImageKey;
                                      return (
                                        <ImageUploader 
                                            key={key}
                                            storageKey={key}
                                            title={imageInfo.title}
                                            description={imageInfo.description}
                                            imageUrl={imageUrls[key]}
                                            onImageSave={(result) => handleImageSave(key, result.url)}
                                        />
                                      )
                                  })}
                                </div>
                           </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}

// Custom hook to use the new global image cache
export const useStoredImage = (key: string, defaultImage?: string): string => {
    const imageUrlFromStore = useImageStore((state) => state.images[key]);
    
    // On the server, the store might be empty.
    // On the client, it will be populated by the AppInitializer.
    return imageUrlFromStore || defaultImage || '';
};


export const ImageClient = ({ storageKey, alt, className, hint }: { storageKey: string, alt: string, className?: string, hint: string }) => {
    const imageUrl = useStoredImage(storageKey);

    if (!imageUrl) {
        // Return a placeholder or null to avoid rendering an Image component with an empty src
        return <div className={cn("bg-muted w-full h-full", className)} />;
    }

    return <Image src={imageUrl} alt={alt} fill className={cn("object-cover", className)} data-ai-hint={hint} key={imageUrl} />;
};

    