
'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Briefcase, GraduationCap, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const placeholderAlumniData = {
    'wesley-hans-m-platil': {
        name: 'Wesley Hans M. Platil',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop',
        cover: 'https://images.unsplash.com/photo-1554147090-e1221a04a025?q=80&w=2070&auto=format&fit=crop',
        title: 'Lead Developer at Studio',
        class: '2014',
        department: 'School of Engineering, Computer Studies, and Architecture',
        email: 'wesleyhans.platil@southlandcollege.edu.ph',
        bio: 'Passionate about building innovative web applications and mentoring the next generation of developers. Specializing in AI integration and full-stack development. Proud Southland Alumnus.'
    },
    // Add other profiles here as needed
}

export default function AlumniProfilePage() {
  const params = useParams();
  const slug = params.slug as string;
  
  // In a real app, you would fetch this data from a database based on the slug/ID
  const user = placeholderAlumniData[slug as keyof typeof placeholderAlumniData] || {
      name: 'Alumnus Not Found',
      avatar: '',
      cover: 'https://images.unsplash.com/photo-1517816743773-6e10f182d633?q=80&w=2070&auto=format&fit=crop',
      title: 'Unknown Position',
      class: 'N/A',
      department: 'N/A',
      email: '',
      bio: 'The profile you are looking for does not exist or has been moved.'
  };

  return (
    <div className="bg-muted/40 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="mb-4">
            <Button asChild variant="outline">
                <Link href="/alumni/feed">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Feed
                </Link>
            </Button>
        </div>
        <Card className="overflow-hidden">
            <div className="relative h-48 md:h-64 bg-secondary">
                 <Image 
                    src={user.cover}
                    alt={`${user.name}'s cover photo`}
                    fill
                    className="object-cover"
                 />
                 <div className="absolute inset-0 bg-black/20" />
                 <div className="absolute bottom-0 left-6 translate-y-1/2">
                    <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-background overflow-hidden">
                        {user.avatar && <Image src={user.avatar} alt={user.name} fill className="object-cover" />}
                    </div>
                 </div>
            </div>
            <div className="pt-24 pb-8 px-6">
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                        <p className="text-lg text-muted-foreground mt-1">{user.bio}</p>
                    </div>
                     <div className="flex gap-2 mt-4 md:mt-0">
                        <Button><MessageCircle className="h-4 w-4 mr-2" /> Message</Button>
                        <Button variant="outline"><Mail className="h-4 w-4 mr-2" /> Email</Button>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <span>{user.title}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        <span>Graduated <b>{user.class}</b> from <b>{user.department}</b></span>
                    </div>
                </div>
            </div>
        </Card>
        {/* Further profile content like posts, about section, etc. would go here */}
      </div>
    </div>
  );
}
