
'use client';

import Link from 'next/link';
import { Facebook, Youtube } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';
import { ClientBgWrapper } from '../ClientBgWrapper';

export function Footer() {
  const quickLinks = [
      { label: "About", href: "/about" },
      { label: "Academics", href: "/academics" },
      { label: "Admissions", href: "/admissions" },
      { label: "Student Life", href: "/student-life" },
      { label: "Alumni", href: "/alumni" },
      { label: "View All Stories", href: "/news" },
  ];

  const socialLinks = [
      { icon: Facebook, href: "#", label: "Facebook" },
      { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
      <footer 
          className="relative z-10 bg-background text-foreground border-t"
      >
        <div className="container mx-auto px-4 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left pb-16">
            <div className="flex flex-col items-start col-span-1 md:col-span-2 lg:col-span-1">
              <Logo />
              <p className="mt-4 text-sm text-muted-foreground">
                  A tradition of excellence, a future of promise.
              </p>
            </div>
            
            <div className="w-full">
                <h3 className="text-base font-semibold mb-4 text-foreground">Quick Links</h3>
                <ul className="space-y-2">
                    {quickLinks.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                              {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-full">
                <h3 className="text-base font-semibold mb-4 text-foreground">Get In Touch</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>Rizal St, Kabankalan City, 6111 Negros Occidental</p>
                  <p>(034) 746 7297</p>
                  <p>info@southlandcollege.edu.ph</p>
                </div>
            </div>
            
            <div className="w-full">
              <h3 className="text-base font-semibold mb-4 text-foreground">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map(link => (
                    <a key={link.label} href={link.href} aria-label={link.label} className="text-muted-foreground hover:text-primary transition-colors">
                      <link.icon className="h-5 w-5" />
                    </a>
                ))}
              </div>
            </div>
          </div>

          <div className="py-8 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Southland College. All rights reserved.</p>
              <p className="text-xs text-muted-foreground mt-1">
                Developed by the MIS Department
              </p>
          </div>

        </div>
      </footer>
  );
}
