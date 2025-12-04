
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Star, Award, ChevronRight, BookOpen, Users, Building, Newspaper, ArrowRight, TrendingUp, Group, Milestone, Trophy, Palette, Briefcase, PlayCircle, CheckCircle2, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NewsItem, HomepageChannelItem } from "@/lib/schemas";
import { EnrollmentModal } from '@/components/EnrollmentModal';
import { NewsCard } from "@/components/NewsCard";
import { getNewsArticles, getHomepageChannelItems } from "@/app/actions";
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { ClientBgWrapper } from '@/components/ClientBgWrapper';
import { JobImageViewerModal } from '@/components/JobImageViewerModal';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { VideoPlayer } from '@/components/VideoPlayer';
import { useStoredImage, ImageClient } from '@/components/admin/ImageManager';
import { EventCard } from '@/components/EventCard';
import { EventsCalendarModal } from '@/components/EventsCalendarModal';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format, isSameDay } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const ICONS: { [key: string]: React.ElementType } = {
  GraduationCap,
  Award,
  Star,
  Users
};

const Counter = ({ to, duration = 2000, isYear = false }: { to: number, duration?: number, isYear?: boolean }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = to;
      if (end === 0) return;
      const stepTime = Math.abs(Math.floor(duration / end));

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) {
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [inView, to, duration]);

  return <span ref={inViewRef}>{isYear ? count : count.toLocaleString()}</span>;
};

const stats = [
    { number: 2009, label: "Founded", icon: Milestone, isYear: true },
    { number: 15, label: "Academic Programs", icon: BookOpen },
    { number: 2045, label: "Students Enrolled", icon: Group },
    { number: 95, label: "Graduate Employment Rate (%)", icon: TrendingUp },
]

const SectionTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn("flex w-full items-center justify-center gap-4 text-center mb-8 md:mb-12", className)}>
        <div className="flex-1 border-t border-primary/30"></div>
        <h2 className="flex-shrink-0 text-sm font-bold tracking-widest text-primary uppercase">
            {children}
        </h2>
        <div className="flex-1 border-t border-primary/30"></div>
    </div>
);


export default function Home() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [channelItems, setChannelItems] = useState<HomepageChannelItem[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [isLoadingChannel, setIsLoadingChannel] = useState(true);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const { ref: welcomeRef, inView: welcomeInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: newsRef, inView: newsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  useEffect(() => {
    async function fetchNews() {
      try {
        const articles = await getNewsArticles();
        setNewsItems(articles);
      } catch (error) {
        console.error("Failed to fetch news articles:", error);
      } finally {
        setIsLoadingNews(false);
      }
    }
    
    async function fetchChannelItems() {
      try {
        const items = await getHomepageChannelItems();
        setChannelItems(items);
      } catch (error) {
        console.error("Failed to fetch channel items:", error);
      } finally {
        setIsLoadingChannel(false);
      }
    }
    
    fetchNews();
    fetchChannelItems();
  }, []);
  
  const exploreItems = [
    {
      icon: BookOpen,
      title: "Academics",
      description: "Expert-led programs to challenge your mind.",
      href: "/academics",
      linkText: "View Programs",
      storageKey: "exploreAcademicsImage"
    },
    {
      icon: GraduationCap,
      title: "Admissions",
      description: "Start your application to join the Southland family.",
      href: "/admissions",
      linkText: "Apply Now",
      storageKey: "exploreAdmissionsImage"
    },
    {
      icon: Users,
      title: "Student Life",
      description: "Explore clubs, athletics, and campus events.",
      href: "/student-life",
      linkText: "Discover Life",
      storageKey: "exploreStudentLifeImage"
    },
    {
      icon: Building,
      title: "About Us",
      description: "Learn about our history, mission, and values.",
      href: "/about",
      linkText: "Learn More",
      storageKey: "exploreAboutUsImage"
    },
  ];

  const isVideoUrl = (url: string) => /\.(mp4|webm|mov)$/i.test(url);
  
  const allEvents = [
    {
      date: new Date(),
      title: 'Campus Tour for Prospective Students',
      time: '10:00 AM - 12:00 PM',
      location: 'Admissions Office',
      category: 'Admissions',
    },
    {
      date: new Date(),
      title: 'Engineering Department Open House',
      time: '1:00 PM - 3:00 PM',
      location: 'Science & Technology Wing',
      category: 'Academics',
    },
    {
      date: addDays(new Date(), 2),
      title: 'Final Exams Begin',
      time: 'All Day',
      location: 'Campus-wide',
      category: 'Academics',
    },
    {
      date: addDays(new Date(), 5),
      title: 'Guest Lecture: AI in Modern Business',
      time: '6:00 PM - 7:30 PM',
      location: 'Grand Auditorium',
      category: 'Lecture',
    },
    {
      date: addDays(new Date(), 10),
      title: 'Eagles vs. Rivals: Basketball Finals',
      time: '7:00 PM',
      location: 'University Arena',
      category: 'Athletics',
    },
    {
      date: addDays(new Date(), 15),
      title: 'End of Semester Celebration',
      time: '5:00 PM onwards',
      location: 'Main Quad',
      category: 'Student Life',
    },
];

const categoryColors: { [key: string]: string } = {
  Admissions: 'bg-blue-100 text-blue-800',
  Academics: 'bg-green-100 text-green-800',
  Lecture: 'bg-purple-100 text-purple-800',
  Athletics: 'bg-red-100 text-red-800',
  'Student Life': 'bg-yellow-100 text-yellow-800',
};

const selectedDayEvents = date ? allEvents.filter(event => isSameDay(event.date, date)) : [];
  
const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
};

  const ChannelItem = ({ item }: { item: HomepageChannelItem }) => {
    const isVideo = isVideoUrl(item.image);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen && videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Autoplay was prevented:", error);
            });
        }
    }, [isOpen]);

    const cardContent = (
      <Card className="group relative text-white aspect-[3/4] border-transparent bg-background/50 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2 overflow-hidden">
        {isVideo ? (
            <VideoPlayer src={item.image} />
        ) : (
            <Image src={item.image} className="object-cover group-hover:scale-110 transition-transform duration-500" alt={item.title} data-ai-hint="sports culture" fill />
        )}
        
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-white/80">{item.description}</p>
          </div>
      </Card>
    );

    if (isVideo) {
      return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className="cursor-pointer">{cardContent}</div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full p-0 border-0 bg-transparent shadow-none">
                <DialogHeader className="sr-only">
                    <DialogTitle>{item.title}</DialogTitle>
                </DialogHeader>
                <div className="relative aspect-video w-full">
                    <video ref={videoRef} src={item.image} autoPlay muted loop playsInline className="w-full h-full object-contain" />
                </div>
            </DialogContent>
        </Dialog>
      )
    }
    
    // For images, we wrap with the modal viewer
    return (
      <JobImageViewerModal imageUrl={item.image} altText={item.title}>
        {cardContent}
      </JobImageViewerModal>
    );
  };

  return (
    <div className="bg-background overflow-hidden">
      {/* Hero Section */}
      <ClientBgWrapper
        storageKey="homepageHeroImage"
        defaultImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
        className="relative h-screen w-full text-white flex items-center justify-center"
        imageHint="students on campus"
        withOverlay
      >
        <div className="relative z-10 text-center container mx-auto px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-shadow-lg shadow-black/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Enlightening Minds, Molding Hearts
          </motion.h1>
          <motion.p 
            className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-white/90 text-shadow-md shadow-black/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join a tradition of excellence and become a beacon of success in a metamorphic world.
          </motion.p>
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <EnrollmentModal>
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 shadow-lg shadow-primary/30 hover:shadow-primary/50">Apply Now</Button>
            </EnrollmentModal>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-2 bg-transparent text-white hover:bg-white hover:text-primary" asChild>
              <Link href="/academics">Explore Programs</Link>
            </Button>
          </motion.div>
        </div>
      </ClientBgWrapper>
      
      {/* Welcome Section */}
      <section 
        ref={welcomeRef} 
        className={cn(
          "py-24 bg-background transition-opacity duration-1000 ease-out",
          welcomeInView ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-4 text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={welcomeInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <SectionTitle>Welcome to Southland College</SectionTitle>
              <h2 className="text-4xl font-bold text-foreground tracking-tight">A Legacy of Excellence and Innovation</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Southland College of Kabankalan City, Inc., is a private, non-sectarian institution dedicated to providing top-tier education. Anchored in strong values, we have been molding the hearts and minds of individuals to become beacons of success since 2009.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                Our seasoned administrators and faculty are committed to delivering an educational experience that rivals established institutions nationwide, ensuring our graduates are prepared to lead and innovate in a constantly changing world.
              </p>
              <Button asChild size="lg" className="mt-6">
                <Link href="/about">Learn More About Us <ArrowRight className="ml-2 h-4 w-4"/></Link>
              </Button>
            </motion.div>
            <motion.div 
              className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={welcomeInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format=fit.crop" alt="Southland College Campus" fill className="object-cover" data-ai-hint="college campus" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Channel Section */}
      <ClientBgWrapper
        storageKey="homepageByTheNumbersBackground"
        defaultImage="https://images.unsplash.com/photo-1543165389-c28383a85b61?q=80&w=2070&auto=format&fit=crop"
        className="text-white flex items-center justify-center py-24"
        imageHint="abstract geometric pattern"
        isParallax
      >
        <div 
          ref={featuresRef}
          className={cn("relative z-10 container mx-auto px-4 transition-opacity duration-1000 ease-out", featuresInView ? "opacity-100" : "opacity-0")}
        >
          <div className="text-center md:mb-16 mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Victories, Voices, and Visions
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80">
                Experience the vibrant life beyond the classroom. From the thrill of the game to the beauty of the stage.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {isLoadingChannel ? (
                Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="aspect-[3/4] w-full" />)
              ) : channelItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ChannelItem item={item} />
                  </motion.div>
              ))}
          </div>
        </div>
      </ClientBgWrapper>
      
      {/* Scholarship Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Financial Aid &amp; Scholarships
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              We are committed to making education accessible. Southland College offers a variety of scholarships, benefits, and financial assistance programs to support your academic journey.
            </p>
          </div>
          <div className="max-w-5xl mx-auto mt-12 grid md:grid-cols-2 gap-x-12 gap-y-8 text-left">
            <div className="border-t-2 border-primary/20 pt-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Types of Assistance Available</h3>
              <ul className="space-y-3 text-lg text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span><span className="font-semibold text-foreground">Entrance Scholarships</span> for high-achieving new students.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span><span className="font-semibold text-foreground">Academic Scholarships</span> for students who maintain excellent grades.</span>
                </li>
                 <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span><span className="font-semibold text-foreground">Excellence Scholarships</span> for talented athletes and cultural performers.</span>
                </li>
              </ul>
            </div>
            <div className="border-t-2 border-primary/20 pt-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Benefits &amp; Privileges</h3>
              <ul className="space-y-3 text-lg text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span>Special benefits for student leaders, publication staff, and children of employees or church workers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span>Privileges for siblings, transferees, and loyal Southland students.</span>
                </li>
                 <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
                   <span>Government-funded programs like CHED, ESC, and local LGU assistance.</span>
                </li>
              </ul>
            </div>
          </div>
           <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/scholarships">
                View All Scholarships <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Upcoming Events Section */}
        <ClientBgWrapper
            storageKey="newsAndUpdatesBackground"
            defaultImage="https://images.unsplash.com/photo-1505664194779-8beace7a2044?q=80&w=2070&auto=format&fit=crop"
            className={cn("py-24 transition-all duration-1000 ease-out", newsInView ? "opacity-100 animate-fade-up" : "opacity-0")}
            imageHint="modern library"
            ref={newsRef}
            isParallax
        >
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold tracking-tight text-white">
                        Campus Events Calendar
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80">
                        Stay connected with the Southland community. Find out what's happening on campus.
                    </p>
                </div>
                
                 <Card className="grid grid-cols-1 md:grid-cols-3 bg-card/80 backdrop-blur-sm border-white/20">
                    <div className="md:col-span-2 p-6">
                        <div className="mb-4">
                            <h3 className="text-2xl font-bold text-foreground">
                                Events for {date ? format(date, 'MMMM d, yyyy') : 'All Upcoming Events'}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {selectedDayEvents.length > 0 ? `Found ${selectedDayEvents.length} event(s) on this day.` : 'No events scheduled for this day.'}
                            </p>
                        </div>
                        <ScrollArea className="h-96">
                            <div className="space-y-4 pr-6">
                                {selectedDayEvents.length > 0 ? selectedDayEvents.map(event => (
                                <div key={event.title} className="p-4 border rounded-lg bg-card/50 hover:bg-card/80 transition-colors">
                                    <Badge className={`mb-2 ${categoryColors[event.category]}`}>{event.category}</Badge>
                                    <h4 className="font-bold text-lg text-foreground">{event.title}</h4>
                                    <div className="text-sm text-muted-foreground mt-1 space-y-1">
                                    <p className="flex items-center gap-2"><Clock className="h-4 w-4" /> {event.time}</p>
                                    <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {event.location}</p>
                                    </div>
                                </div>
                                )) : (
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                    <p>Select a day on the calendar to see events.</p>
                                </div>
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                    <div className="col-span-1 p-6 flex justify-center items-center bg-secondary/30 rounded-r-lg">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            className="rounded-md border bg-background p-4 shadow-inner"
                            modifiers={{
                                hasEvent: allEvents.map(e => e.date)
                            }}
                            modifiersClassNames={{
                                hasEvent: "bg-primary/20 text-primary-foreground rounded-full",
                            }}
                        />
                    </div>
                </Card>

            </div>
        </ClientBgWrapper>
    </div>
  );
}

    