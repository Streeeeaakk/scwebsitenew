
'use client';

import { useState, useEffect } from 'react';
import { Users, Bike, Paintbrush, Heart, Briefcase, ArrowRight, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EventsCalendarModal } from '@/components/EventsCalendarModal';
import { PageHeader } from '@/components/PageHeader';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getStudentLifeSections } from '@/app/actions';
import type { StudentLifeSection } from '@/lib/schemas';
import Image from 'next/image';

const ICONS: { [key: string]: React.ElementType } = {
  Users,
  Bike,
  Paintbrush,
  Heart,
  Briefcase,
  CalendarDays,
};

const hardcodedSections: Omit<StudentLifeSection, 'id' | 'imagePath'>[] = [
    {
        title: 'Student Organizations', description: 'Find your community from over 50 student-led clubs and organizations. Develop leadership skills, pursue your passions, and make lifelong friends.', icon: 'Users', href: '/student-life/student-organizations', cta: 'Explore Clubs', storageKey: 'studentLifeOrgs', imageHint: 'group of students', image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop', order: 0
    },
    {
        title: 'Athletics & Recreation', description: 'Stay active and show your school spirit. Join one of our varsity teams or participate in intramural sports and fitness classes.', icon: 'Bike', href: '/student-life/athletics-and-recreation', cta: 'View Teams', storageKey: 'studentLifeAthletics', imageHint: 'basketball game', image: 'https://images.unsplash.com/photo-1541250848049-b9f71362cb36?q=80&w=2070&auto=format&fit=crop', order: 1
    },
    {
        title: 'Arts & Culture', description: "Express your creativity and immerse yourself in the arts. From theater productions to art exhibitions, there's always something to inspire you.", icon: 'Paintbrush', href: '/student-life/arts-and-culture', cta: 'Discover Arts', storageKey: 'studentLifeArts', imageHint: 'painting art class', image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=2073&auto=format&fit=crop', order: 2
    },
    {
        title: 'Health & Wellness', description: 'Your well-being is our priority. Access a range of services including counseling, health workshops, and wellness programs to support a healthy mind and body.', icon: 'Heart', href: '/student-life/health-and-wellness', cta: 'Learn More', storageKey: 'studentLifeWellness', imageHint: 'yoga wellness', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop', order: 3
    },
    {
        title: 'Career Services', description: 'Prepare for your future with our dedicated career services team. Get help with resumes, interviews, and connecting with top employers for internships and jobs.', icon: 'Briefcase', href: '/student-life/career-services', cta: 'Plan Your Career', storageKey: 'studentLifeCareers', imageHint: 'job interview', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop', order: 4
    },
    {
        title: 'Campus Events', description: "There's always something happening at Southland. Check out our full calendar to find events, workshops, and important dates.", icon: 'CalendarDays', isModal: true, cta: 'View Full Calendar', storageKey: 'studentLifeCalendar', imageHint: 'event calendar', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop', order: 5
    },
];

const LifeSectionItem = ({ section }: { section: Omit<StudentLifeSection, 'id' | 'imagePath'> }) => {
    const Icon = ICONS[section.icon] || Users;

    const CardBody = (
        <Card className="group relative overflow-hidden rounded-xl border-2 border-transparent hover:border-primary transition-all duration-300 shadow-lg hover:shadow-2xl h-full">
            <div className="absolute inset-0">
                 <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>
            <CardContent className="relative z-10 flex flex-col justify-end h-96 p-6 text-white">
                <div>
                    <div className="bg-primary/80 backdrop-blur-sm text-primary-foreground h-12 w-12 flex items-center justify-center rounded-full mb-4 shadow-lg">
                        <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                    <p className="mt-2 text-white/90">{section.description}</p>
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center text-sm font-semibold text-accent">{section.cta} <ArrowRight className="ml-2 h-4 w-4" /></div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    if (section.isModal) {
        return (
            <EventsCalendarModal>
                <div className="h-full cursor-pointer">{CardBody}</div>
            </EventsCalendarModal>
        )
    }

    return (
        <Link href={section.href || '#'} className="group block h-full">
            {CardBody}
        </Link>
    );
};


export default function StudentLifePage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="bg-background">
       <PageHeader
        title="Vibrant Campus Life"
        description="At Southland College, education extends beyond the classroom. Discover a rich and supportive community where you can grow, connect, and thrive."
        storageKey="studentLifePageHeader"
        defaultImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
        imageHint="students on campus"
       />
      <Breadcrumbs />
      
      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-96 w-full" />)
            ) : (
              hardcodedSections.map((section) => (
                  <LifeSectionItem key={section.title} section={section} />
              ))
            )}
        </div>
      </div>
    </div>
  );
}
