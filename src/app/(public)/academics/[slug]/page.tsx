
'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, Mail, Phone, Users } from 'lucide-react';
import Link from 'next/link';
import type { AcademicProgram, FacultyMember } from '@/lib/schemas';
import { Skeleton } from '@/components/ui/skeleton';
import { getAcademicPrograms } from '@/app/actions';
import { PageHeader } from '@/components/PageHeader';

export default function DepartmentPage() {
  const [program, setProgram] = useState<AcademicProgram | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      return;
    }

    const fetchProgram = async () => {
      setIsLoading(true);
      try {
        const programs = await getAcademicPrograms();
        const foundProgram = programs.find(p => p.slug === slug);
        
        if (foundProgram) {
          setProgram(foundProgram);
          document.title = `${foundProgram.school} | Southland College`;
        } else {
          setProgram(null);
        }
      } catch (error) {
        console.error("Error fetching academic program:", error);
        setProgram(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgram();
  }, [slug]);

  if (isLoading) {
    return (
        <div className="bg-background">
          <div className="relative w-full h-[400px] bg-muted/30">
            <div className="container mx-auto px-4 h-full flex flex-col justify-center">
                <Skeleton className="h-14 w-2/3" />
                <Skeleton className="h-6 w-full mt-4" />
            </div>
          </div>
          <div className="container mx-auto max-w-6xl px-4 py-16">
             <Skeleton className="h-10 w-48 mb-8" />
             <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
                <div className="space-y-8">
                    <Skeleton className="h-96 w-full" />
                </div>
             </div>
          </div>
        </div>
    );
  }

  if (!program) {
    notFound();
  }

  const { id, school, description, mission, courses, faculty, image } = program;

  return (
    <div className="bg-background">
        <PageHeader
            title={school}
            description={description}
            storageKey={`academics-header-${id}`}
            defaultImage={image || ''}
            imageHint="academic building"
        />

      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8">
            <Button asChild variant="outline" size="sm">
                <Link href="/academics">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to All Programs
                </Link>
            </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
                <section>
                    <h2 className="text-3xl font-bold text-foreground mb-4">Department Mission</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">{mission}</p>
                </section>
                
                <section>
                    <h2 className="text-3xl font-bold text-foreground mb-6">Programs</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {courses.map(course => (
                            <div key={course} className="border bg-card rounded-lg shadow-sm p-6 flex items-center justify-center text-center h-full hover:shadow-md transition-shadow">
                                <h3 className="font-semibold text-foreground">{course}</h3>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <aside className="space-y-8">
                 <Card className="border bg-background rounded-lg shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Users className="h-6 w-6 text-primary"/>
                            <span className="font-bold text-foreground">Meet the Faculty</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       {faculty.map(member => (
                           <div key={member.name} className="flex items-center gap-4">
                               <div className="relative h-16 w-16 rounded-full overflow-hidden border bg-muted flex-shrink-0 aspect-square">
                                    {member.image ? (
                                        <Image 
                                            src={member.image}
                                            alt={member.name} 
                                            fill
                                            sizes="64px"
                                            className="object-cover" 
                                            data-ai-hint="professional portrait"
                                            key={member.image} // Force re-render on image URL change
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-muted" />
                                    )}
                               </div>
                               <div>
                                   <h4 className="font-semibold text-foreground">{member.name}</h4>
                                   <p className="text-sm text-muted-foreground">{member.title}</p>
                               </div>
                           </div>
                       ))}
                    </CardContent>
                </Card>
                <Card className="bg-primary text-primary-foreground rounded-lg shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Mail className="h-6 w-6"/>
                            <span className="font-bold">Contact the Department</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-2">For inquiries, please reach out to us:</p>
                        <div className="flex items-center gap-2 mt-2">
                            <Phone className="h-4 w-4"/>
                            <span>(123) 456-7890 ext. 123</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <Mail className="h-4 w-4"/>
                             <a href="mailto:eng.dept@southlandcollege.edu" className="hover:underline">eng.dept@southlandcollege.edu</a>
                        </div>
                    </CardContent>
                </Card>
            </aside>
        </div>
      </div>
    </div>
  );
}
