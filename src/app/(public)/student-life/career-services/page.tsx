
'use client';

import { PageHeader } from '@/components/PageHeader';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Briefcase, Handshake, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function CareerServicesPage() {
  const services = [
    { icon: Briefcase, title: 'Resume & Cover Letter Review', description: 'Get expert feedback to make your application stand out.' },
    { icon: Handshake, title: 'Mock Interviews', description: 'Practice your interview skills and receive constructive advice.' },
    { icon: Lightbulb, title: 'Career Counseling', description: 'Explore career paths and create a personalized action plan with our counselors.' },
  ];

  return (
    <div className="bg-background">
      <PageHeader
        title="Career Services"
        description="Prepare for your future with our dedicated career services team. Get help with resumes, interviews, and connecting with top employers."
        storageKey="studentLifeCareers"
        defaultImage="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop"
        imageHint="job interview"
      />
      <Breadcrumbs />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <section className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Your Bridge to a Successful Career</h2>
            <p className="text-lg text-muted-foreground">The Office of Career Services is committed to empowering Southland students and alumni to achieve their career goals. We provide comprehensive resources, personalized guidance, and connections to a vast network of employers.</p>
          </section>

          <section className="mb-16">
            <h3 className="text-2xl font-bold text-center text-foreground mb-8">Our Services</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map(service => (
                <Card key={service.title} className="text-center p-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary text-primary-foreground p-4 rounded-full">
                      <service.icon className="h-8 w-8" />
                    </div>
                  </div>
                  <CardHeader className="p-0">
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-2">
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          <section className="bg-secondary p-8 rounded-lg">
             <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative h-64 rounded-md overflow-hidden">
                     <Image src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop" alt="Job fair" fill className="object-cover" data-ai-hint="job fair" />
                </div>
                <div>
                     <h3 className="text-2xl font-bold text-foreground mb-4">Internships & Job Fairs</h3>
                     <p className="text-muted-foreground mb-4">We connect students with meaningful internship opportunities and host two major job fairs each year, attracting over 100 top companies from various industries. These events provide an invaluable platform for students to network with recruiters and secure their dream job before graduation.</p>
                     <Button asChild>
                        <Link href="/careers">View Job Openings</Link>
                     </Button>
                </div>
             </div>
          </section>

        </div>
      </div>
    </div>
  );
}
