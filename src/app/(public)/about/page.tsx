
'use client';

import { type Metadata } from 'next';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Target, Eye, Milestone, Building, GraduationCap, Medal, Star } from 'lucide-react';
import { ImageClient } from '@/components/admin/ImageManager';
import { PageHeader } from '@/components/PageHeader';
import { ClientBgWrapper } from '@/components/ClientBgWrapper';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const timelineEvents = [
  {
    year: '2009',
    title: 'Founding Year',
    description: 'Southland College was established in Kabankalan City with a vision to provide top-tier education in the region.',
    icon: Star,
  },
  {
    year: '2012',
    title: 'First Graduating Class',
    description: 'Celebrated the first batch of graduates, who went on to excel in their respective fields.',
    icon: GraduationCap,
  },
  {
    year: '2015',
    title: 'Launch of Engineering Program',
    description: 'The School of Engineering was inaugurated, offering cutting-edge programs in technology and innovation.',
    icon: Building,
  },
  {
    year: '2020',
    title: 'Campus Expansion',
    description: 'Completed the construction of a new wing for Arts & Sciences, providing modern facilities for students.',
    icon: Milestone,
  },
    {
    year: '2024',
    title: 'A Decade of Excellence',
    description: 'Marked over 15 years of academic excellence and commitment to community development.',
    icon: Medal,
  },
];

const TimelineSection = () => {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight text-foreground">
          Our Journey
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          From a humble beginning to a beacon of excellence in education.
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" aria-hidden="true"></div>
        <div className="space-y-16">
          {timelineEvents.map((event, index) => (
            <TimelineEvent key={event.year} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineEvent = ({ event, index }: { event: typeof timelineEvents[0], index: number }) => {
  const isEven = index % 2 === 0;
  const yearPosition = isEven ? 'right-1/2 translate-x-[calc(100%+3.5rem)]' : 'left-1/2 -translate-x-[calc(100%+3.5rem)]';
  
  return (
    <div className="relative flex items-center justify-center">
      <div className={`w-full md:w-5/12 p-6 bg-card rounded-xl border shadow-lg ${isEven ? 'md:ml-auto md:text-left' : 'md:mr-auto md:text-right'}`}>
          <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
          <p className="text-muted-foreground mt-2">{event.description}</p>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bg-background p-2 rounded-full border-2 border-primary/20">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30">
           <event.icon className="h-6 w-6" />
        </div>
      </div>
       <div className={`absolute top-1/2 -translate-y-1/2 font-bold text-foreground bg-background px-3 py-1 rounded-md border text-sm ${yearPosition}`}>
        {event.year}
      </div>
    </div>
  );
};


export default function AboutPage() {
  if (typeof window !== 'undefined') {
    document.title = 'About Us | Southland College';
  }

  return (
    <div className="bg-background">
      <PageHeader 
        title="About Southland College"
        description="Discover the history, mission, and vision that drive Southland College forward."
        storageKey="aboutPageHeader"
        defaultImage="https://images.unsplash.com/photo-1576426863848-c21f68c6aa98?q=80&w=2070&auto=format&fit=crop"
        imageHint="college library"
      />
      <Breadcrumbs />

      <section className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-xl overflow-hidden border shadow-lg">
            <ImageClient
              storageKey="aboutCampus"
              alt="Southland College Campus"
              className="object-cover"
              hint="college campus"
            />
          </div>
          <div className="space-y-4 text-left">
            <h2 className="text-3xl font-bold text-foreground">A Legacy of Excellence</h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              <span className="font-semibold text-foreground">Southland College of Kabankalan City, Inc.</span>, is a private, non-sectarian and coeducational institution located in Kabankalan City, Negros Occidental, Philippines. Kabankalan is the 2nd most progressive city in Negros Occidental.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              Though non-sectarian, the school has anchored its values formation on Biblical truths and teachings. Established in March 2009, it is one of the newest educational institutions in the Philippines.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              Despite its young stature, the majority of the school's administrators, faculty and staff are well-seasoned veterans with experience and qualifications that are significantly comparable to those in older and more established educational institutions throughout the country.
            </p>
          </div>
        </div>
      </section>

      <ClientBgWrapper
        storageKey="aboutCampus"
        defaultImage="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop"
        className="py-24 border-t"
        imageHint="college campus"
        isParallax
      >
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="flex flex-col items-center text-center p-8 border bg-card/80 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105">
               <div className="bg-primary text-primary-foreground p-4 rounded-full mb-6 shadow-lg shadow-primary/30">
                <Target className="h-8 w-8" />
              </div>
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-2xl text-foreground">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground text-base leading-relaxed">
                  Southland College is committed to enlightening the enterprising minds and molding the hearts of individuals as beacons of success in all aspects of their life and career in the midst of the metamorphic world.
                </p>
              </CardContent>
            </Card>

            <Card className="flex flex-col items-center text-center p-8 border bg-card/80 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105">
              <div className="bg-primary text-primary-foreground p-4 rounded-full mb-6 shadow-lg shadow-primary/30">
                <Eye className="h-8 w-8" />
              </div>
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-2xl text-foreground">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground text-base leading-relaxed">
                  A zenith educational institution that produces top-tier graduates to reign supreme in the global arena and in their career in the midst of the metamorphic world.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </ClientBgWrapper>

      <TimelineSection />
      
    </div>
  );
}
