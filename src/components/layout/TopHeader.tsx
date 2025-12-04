
'use client';

import Link from 'next/link';
import { Facebook, Youtube, Phone, Mail } from 'lucide-react';
import { Button } from '../ui/button';

export function TopHeader() {
  const socialLinks = [
      { icon: Facebook, href: "#", label: "Facebook" },
      { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <div className="w-full bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 h-10 flex items-center justify-between">
             <div className="flex items-center gap-6 text-xs">
                <a href="tel:(034) 746 7297" className="flex items-center gap-2 hover:text-accent transition-colors">
                    <Phone className="h-4 w-4" />
                    <span>(034) 746 7297</span>
                </a>
                <a href="mailto:info@southlandcollege.edu.ph" className="flex items-center gap-2 hover:text-accent transition-colors">
                    <Mail className="h-4 w-4" />
                    <span>info@southlandcollege.edu.ph</span>
                </a>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm" className="h-auto py-1 px-2 text-xs hover:bg-primary-foreground/10 hover:text-primary-foreground">
                      <Link href="/contact">Contact</Link>
                    </Button>
                    <Button asChild size="sm" className="h-auto py-1 px-3 text-xs bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link href="/admissions">Apply Now</Link>
                    </Button>
                </div>
                <div className="h-4 w-px bg-primary-foreground/30 mx-2 hidden sm:block"></div>
                {socialLinks.map(link => (
                    <a key={link.label} href={link.href} aria-label={link.label} className="hover:text-accent transition-colors">
                        <link.icon className="h-4 w-4" />
                    </a>
                ))}
            </div>
        </div>
    </div>
  );
}
