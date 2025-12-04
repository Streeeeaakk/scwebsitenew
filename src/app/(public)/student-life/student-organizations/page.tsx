
'use client';

import { PageHeader } from '@/components/PageHeader';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function StudentOrganizationsPage() {
  const categories = [
    {
      name: 'Academic & Professional',
      description: 'Clubs related to specific majors and career paths, offering networking and skill-building opportunities.',
      clubs: ['Junior Philippine Institute of Accountants (JPIA)', 'Association of Information Technology Students (AITS)', 'Future Educators Society'],
    },
    {
      name: 'Special Interest & Hobby',
      description: 'Groups centered around common interests, from arts and literature to gaming and technology.',
      clubs: ['Southland College Photography Club', 'The Gamers Guild', 'Debate Society', 'Book Lovers Club'],
    },
    {
      name: 'Service & Advocacy',
      description: 'Organizations dedicated to community service, environmental protection, and social justice.',
      clubs: ['Red Cross Youth Council', 'Green Earth Advocates', 'Volunteers for Change'],
    },
  ];

  return (
    <div className="bg-background">
      <PageHeader
        title="Student Organizations"
        description="Find your community from over 50 student-led clubs and organizations. Develop leadership skills, pursue your passions, and make lifelong friends."
        storageKey="studentLifeOrgs"
        defaultImage="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop"
        imageHint="group of students"
      />
      <Breadcrumbs />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Get Involved, Make a Difference</h2>
            <p className="text-lg text-muted-foreground">Joining a student organization is one of the best ways to enhance your college experience. It's an opportunity to connect with like-minded peers, develop valuable leadership and teamwork skills, and make a real impact on campus and in the community.</p>
          </section>

          {categories.map((category) => (
            <Card key={category.name}>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <p className="text-muted-foreground pt-2">{category.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-foreground">
                  {category.clubs.map((club) => (
                    <li key={club}>{club}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
          
          <section className="text-center border-t pt-12">
             <h2 className="text-2xl font-bold text-foreground mb-4">Don't See a Club for You? Start Your Own!</h2>
             <p className="text-muted-foreground mb-6">The Office of Student Affairs makes it easy to start a new student organization. If you have a passion you want to share, we're here to help you get started.</p>
             <Button asChild size="lg">
                <Link href="/contact">Contact Student Affairs</Link>
             </Button>
          </section>

        </div>
      </div>
    </div>
  );
}
