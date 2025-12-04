
'use client';

import { PageHeader } from '@/components/PageHeader';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AthleticsAndRecreationPage() {
  return (
    <div className="bg-background">
      <PageHeader
        title="Athletics & Recreation"
        description="Stay active and show your school spirit. Join one of our varsity teams or participate in intramural sports and fitness classes."
        storageKey="studentLifeAthletics"
        defaultImage="https://images.unsplash.com/photo-1541250848049-b9f71362cb36?q=80&w=2070&auto=format&fit=crop"
        imageHint="basketball game"
      />
      <Breadcrumbs />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto space-y-12">
            <section className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">Home of the Southland Eagles</h2>
                <p className="text-lg text-muted-foreground">Athletics and recreation are at the heart of the Southland College experience. We provide a wide range of opportunities for students to compete, stay fit, and develop skills in teamwork and leadership. Go Eagles!</p>
            </section>

            <section>
                <Card className="overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-foreground mb-4">Varsity Sports</h3>
                            <p className="text-muted-foreground">Our varsity teams, the Southland Eagles, compete at the highest level of collegiate sports. We foster an environment of excellence, dedication, and sportsmanship. We are proud members of the National Collegiate Athletic Conference (NCAC).</p>
                             <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-5">
                                <li>Basketball (Men's and Women's)</li>
                                <li>Volleyball (Women's)</li>
                                <li>Soccer (Men's)</li>
                                <li>Track & Field</li>
                                <li>Swimming & Diving</li>
                            </ul>
                        </div>
                        <div className="relative h-64 md:h-auto">
                            <Image src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1935&auto=format&fit=crop" alt="Soccer team" fill className="object-cover" data-ai-hint="soccer match" />
                        </div>
                    </div>
                </Card>
            </section>

            <section>
                 <Card className="overflow-hidden">
                    <div className="grid md:grid-cols-2">
                         <div className="relative h-64 md:h-auto md:order-2">
                            <Image src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" alt="Fitness center" fill className="object-cover" data-ai-hint="fitness gym" />
                        </div>
                        <div className="p-8 md:order-1">
                            <h3 className="text-2xl font-bold text-foreground mb-4">Intramural & Club Sports</h3>
                            <p className="text-muted-foreground">Looking for a more casual way to play? Our intramural and club sports are open to all students, regardless of skill level. It's a great way to stay active, meet new people, and have fun. Seasons run throughout the academic year.</p>
                             <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-5">
                                <li>Flag Football</li>
                                <li>3-on-3 Basketball Tournament</li>
                                <li>Ultimate Frisbee Club</li>
                                <li>Yoga and Zumba Classes</li>
                            </ul>
                        </div>
                    </div>
                </Card>
            </section>

             <section className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">Facilities</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Our modern facilities provide the perfect environment for our athletes and students to train and compete. This includes a fully-equipped fitness center, an Olympic-sized swimming pool, and the Eagles Nest Arena.</p>
                <Button asChild size="lg" className="mt-8">
                    <Link href="/contact">Contact Us for a Campus Tour</Link>
                </Button>
            </section>

        </div>
      </div>
    </div>
  );
}
