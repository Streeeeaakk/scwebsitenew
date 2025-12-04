
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Briefcase, Calendar, Edit, Users, MessageSquare, Network, BarChart, Building, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { AlumniUpdateInfoModal } from '@/components/AlumniUpdateInfoModal';
import { AlumniShareStoryModal } from '@/components/AlumniShareStoryModal';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import Image from 'next/image';
import { EventCard } from '@/components/EventCard';

const features = [
  {
    icon: Network,
    title: 'Alumni Directory',
    description: 'Find and reconnect with former classmates. Expand your professional network with fellow Southlanders.',
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop"
  },
  {
    icon: Briefcase,
    title: 'Career Opportunities',
    description: 'Access an exclusive job board with openings from companies looking to hire Southland talent.',
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  },
  {
    icon: Calendar,
    title: 'Events & Reunions',
    description: 'Stay informed about upcoming homecomings, batch reunions, and exclusive alumni gatherings.',
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop"
  },
];

const upcomingEvents = [
    {
      month: 'OCT',
      day: '25',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b6?q=80&w=2070&auto=format&fit=crop',
      title: 'Grand Alumni Homecoming 2024',
      description: 'Join us for a night of nostalgia, fun, and reconnection. Celebrate with old friends and make new memories.',
      href: '#',
    },
    {
      month: 'NOV',
      day: '12',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2134&auto=format&fit=crop',
      title: 'Alumni Professional Networking Night',
      description: 'Expand your professional circle and connect with Southlanders from various industries.',
      href: '#',
    },
    {
      month: 'DEC',
      day: '15',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop',
      title: 'Global Leadership Summit for Students & Alumni',
      description: 'Join young leaders to discuss pressing global issues and develop your leadership skills.',
      href: '#',
    },
];

const stats = [
    { number: '10,000+', label: 'Active Alumni', icon: Users },
    { number: '500+', label: 'Partner Companies', icon: Building },
    { number: '95%', label: 'Employed within 6 months', icon: BarChart },
];


export default function AlumniPage() {
  return (
    <div className="bg-background">
      <PageHeader
        title="Welcome, Southland Alumni"
        description="Your journey with Southland College doesn’t end at graduation. Reconnect with classmates, expand your professional network, and stay involved with our vibrant community."
        storageKey="alumniPageHeader"
        defaultImage="https://images.unsplash.com/photo-1579269527749-c4a4c581c479?q=80&w=2070&auto=format&fit=crop"
        imageHint="group of friends"
      />
      <Breadcrumbs />

      <section className="bg-secondary py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3"><GraduationCap className="h-8 w-8 text-primary"/>Featured Alumni</h2>
            <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">
              Celebrating the achievements and journeys of our notable alumni.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="flex flex-col">
              <CardContent className="p-6">
                <div className="relative aspect-[4/3] mb-4 rounded-lg overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c7da?q=80&w=2070&auto=format&fit=crop" alt="John Michael Reyes" layout="fill" objectFit="cover" data-ai-hint="professional portrait man" />
                </div>
                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">"Southland College gave me the technical foundation and the leadership skills to launch my own tech startup. The supportive faculty and challenging curriculum were instrumental in my success."</blockquote>
                <div className="mt-4">
                  <p className="font-bold text-lg text-foreground">JOHN MICHAEL REYES</p>
                  <p className="text-sm text-muted-foreground">Batch 2015 | BS Information Technology</p>
                  <p className="text-sm text-foreground font-semibold mt-1">Founder & CEO, Innovate Solutions</p>
                </div>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardContent className="p-6">
                 <div className="relative aspect-[4/3] mb-4 rounded-lg overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop" alt="Maria Santos" layout="fill" objectFit="cover" data-ai-hint="professional portrait woman" />
                </div>
                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">"The hands-on training I received in the Hospitality Management program at Southland was invaluable. It prepared me to excel in a fast-paced global industry and to lead with confidence and grace."</blockquote>
                 <div className="mt-4">
                  <p className="font-bold text-lg text-foreground">MARIA CLARA SANTOS</p>
                  <p className="text-sm text-muted-foreground">Batch 2018 | BS Hospitality Management</p>
                  <p className="text-sm text-foreground font-semibold mt-1">General Manager, The Grand Hotel Manila</p>
                </div>
              </CardContent>
            </Card>
            
             <Card className="flex flex-col">
                <CardContent className="p-6">
                     <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" alt="Alumni News Collage" layout="fill" objectFit="cover" data-ai-hint="news collage event photos" />
                    </div>
                    <div className="mt-4 text-center">
                        <h3 className="font-bold text-lg text-foreground">Alumni in the News</h3>
                        <p className="text-sm text-muted-foreground mt-1">Our alumni are making waves in various industries. From launching successful businesses to leading community projects, see how Southlanders are making a difference.</p>
                        <Button asChild variant="link" className="mt-2">
                           <Link href="/news">Read More Stories</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">The Power of Your Alumni Network</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
                Your connection to Southland is lifelong. Our alumni portal is designed to help you leverage that connection for personal and professional growth.
            </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} href="/alumni/feed" className="block group">
                 <Card className="relative flex flex-col justify-end text-left p-6 border bg-card rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-80 overflow-hidden">
                    {feature.image && (
                        <Image
                            src={feature.image}
                            alt={feature.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                    
                    <div className="relative z-10 text-white">
                        <div className="bg-primary/80 backdrop-blur-sm text-primary-foreground h-12 w-12 flex items-center justify-center rounded-full mb-4 shadow-lg">
                            <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="text-sm text-white/80 mt-1 leading-relaxed">{feature.description}</p>
                    </div>
                  </Card>
              </Link>
            );
          })}
        </div>
        <div className="mt-16 text-center">
             <Button asChild size="lg">
                <Link href="/alumni/portal">
                    Go to Alumni Portal <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
             </Button>
        </div>
      </section>
      
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Upcoming Events</h2>
            <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">
              Don't miss out on these opportunities to reconnect and celebrate with the Southland community.
            </p>
          </div>
            <Carousel 
                opts={{ loop: true, align: "start" }}
                plugins={[Autoplay({ delay: 5000 })]}
                className="max-w-5xl mx-auto"
            >
                <CarouselContent className="-ml-4">
                    {upcomingEvents.map((event, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                            <EventCard event={event} useCard={false} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
      </section>

       <section className="container mx-auto px-4 py-24 border-t">
         <div className="max-w-4xl mx-auto text-center">
           <h2 className="text-3xl font-bold text-foreground mb-4">Stay Connected</h2>
           <p className="text-muted-foreground text-lg mb-8">
             Your information helps us keep you informed about relevant opportunities and events. Share your story to inspire others!
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
             <AlumniUpdateInfoModal>
               <Button variant="outline" size="lg">
                 <Edit className="mr-2 h-4 w-4" /> Update Your Info
               </Button>
             </AlumniUpdateInfoModal>
             <AlumniShareStoryModal>
               <Button size="lg">
                 <MessageSquare className="mr-2 h-4 w-4" /> Share Your Story
               </Button>
             </AlumniShareStoryModal>
           </div>
         </div>
       </section>

    </div>
  );
}
