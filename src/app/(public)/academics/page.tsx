
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import type { AcademicProgram } from '@/lib/schemas';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BookOpen, Briefcase, HeartPulse, Building2, School } from 'lucide-react';
import { getAcademicPrograms } from '@/app/actions';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const ICONS: { [key: string]: React.ElementType } = {
  Building2,
  Briefcase,
  BookOpen,
  HeartPulse,
  School,
};


export default function AcademicsPage() {
  const [programs, setPrograms] = useState<AcademicProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Academic Programs | Southland College';
    
    const fetchPrograms = async () => {
        setIsLoading(true);
        try {
            const dbPrograms = await getAcademicPrograms();
            setPrograms(dbPrograms);
        } catch (error) {
            console.error("Failed to fetch academic programs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchPrograms();
  }, []);

  return (
    <div className="bg-background">
      <PageHeader 
        title="Academic Programs"
        description="Explore our diverse range of undergraduate and graduate programs across various disciplines, each designed to provide a comprehensive and enriching educational experience."
        storageKey="academicsPageHeader"
        defaultImage="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
        imageHint="students walking on campus"
      />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-80 w-full rounded-xl" />
            ))
          ) : (
            programs.map((program) => {
              const Icon = ICONS[program.icon as string] || Building2;
              return (
                <Link key={program.slug} href={`/academics/${program.slug}`} className="block group">
                  <Card className="relative flex flex-col justify-end text-left p-6 border bg-card rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-80 overflow-hidden">
                    {program.image && (
                        <Image
                            src={program.image}
                            alt={program.school}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                    
                    <div className="relative z-10 text-white">
                        <div className="bg-primary/80 backdrop-blur-sm text-primary-foreground h-12 w-12 flex items-center justify-center rounded-full mb-4 shadow-lg">
                            <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold">{program.school}</h3>
                        <p className="text-sm text-white/80 mt-1 leading-relaxed">{program.description}</p>
                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center font-semibold text-sm text-accent">
                                Learn More <ArrowRight className="h-4 w-4 ml-2" />
                            </div>
                        </div>
                    </div>
                  </Card>
                </Link>
              );
            })
          )}
        </div>

        <div className="mt-24 text-center border-2 border-dashed border-primary/20 rounded-xl p-12 bg-secondary">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Research & Innovation
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            At Southland, we believe in pushing the boundaries of knowledge. Our students and faculty are actively involved in groundbreaking research that makes a real-world impact.
          </p>
          <Button asChild size="lg" className="mt-8 shadow-lg shadow-primary/20 hover:shadow-primary/40">
            <Link href="/contact">Partner with Us <ChevronRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
