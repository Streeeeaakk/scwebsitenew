
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ImageIcon, Home, Newspaper, GalleryHorizontal, ArrowRight, BookOpen, Briefcase, Users, Tv, Bike } from 'lucide-react';

const managementSections = [
  {
    icon: ImageIcon,
    title: 'Site Image Management',
    description: 'Update images for page headers, backgrounds, and other key areas across the entire website.',
    href: '/admin/settings/site-images',
    cta: 'Manage Images'
  },
  {
    icon: Tv,
    title: 'Homepage Channel',
    description: 'Manage the six items in the "Victories, Voices, and Visions" section on the homepage.',
    href: '/admin/settings/homepage-channel',
    cta: 'Manage Channel'
  },
  {
    icon: Newspaper,
    title: 'News Articles',
    description: 'Create, edit, delete, and manage all news articles and campus announcements.',
    href: '/admin/settings/news',
    cta: 'Manage Articles'
  },
  {
    icon: BookOpen,
    title: 'Academics Management',
    description: 'Edit department details, mission statements, faculty information, and instructor portraits.',
    href: '/admin/settings/academics',
    cta: 'Manage Academics'
  },
   {
    icon: Briefcase,
    title: 'Careers Management',
    description: 'Add, edit, and manage job opening announcements for the careers page.',
    href: '/admin/settings/careers',
    cta: 'Manage Careers'
  },
  {
    icon: Bike,
    title: 'Student Life Management',
    description: 'Update the cards and content displayed on the main Student Life page.',
    href: '/admin/settings/student-life',
    cta: 'Manage Student Life'
  },
  {
    icon: Home,
    title: 'Legacy Homepage Content',
    description: 'Edit deprecated sections of the homepage, such as the "Why Choose Us?" feature.',
    href: '/admin/settings/homepage',
    cta: 'Edit Homepage'
  },
  {
    icon: GalleryHorizontal,
    title: 'Image Gallery',
    description: 'View all images uploaded to your Firebase Storage, and copy their URLs for use anywhere.',
    href: '/admin/settings/gallery',
    cta: 'View Gallery'
  }
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <header>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Content Management</h1>
          <p className="mt-1 text-muted-foreground">
              Choose a section below to manage content for your website.
          </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managementSections.map((section) => (
          <Card key={section.href} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                 <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                   <section.icon className="h-6 w-6" />
                 </div>
                 <CardTitle className="text-xl">{section.title}</CardTitle>
              </div>
              <CardDescription className="pt-4">{section.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button asChild className="w-full">
                <Link href={section.href}>{section.cta} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
