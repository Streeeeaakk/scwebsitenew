
'use client';

import { type Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ImageClient } from '@/components/admin/ImageManager';
import { PageHeader } from '@/components/PageHeader';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const administrators = [
  {
    name: 'Juan Antonio Z. Villaluz',
    title: 'President',
    storageKey: 'adminPresident',
    hint: 'professional man portrait',
    bio: 'As President, Mr. Villaluz provides visionary leadership, steering Southland College towards academic excellence and community engagement with unwavering dedication.',
    isProminent: true,
  },
  {
    name: 'Annette Z. Villaluz',
    title: 'Chairman',
    storageKey: 'adminChairman',
    hint: 'professional woman portrait elegant',
    bio: 'As Chairman, Ms. Villaluz guides the board with strategic insight, upholding the mission and vision of Southland College for future generations.',
    isProminent: true,
  },
  {
    name: 'Miguel M. Zayco',
    title: 'Executive Vice President',
    storageKey: 'adminExecVP',
    hint: 'professional man portrait suit',
    bio: 'As Executive Vice President, Mr. Zayco oversees strategic initiatives and ensures operational excellence across all departments of the college.',
    isProminent: false,
  },
  {
    name: 'Dr. Imelda M. Patricio, LPT',
    title: 'VP for Academics',
    storageKey: 'adminVPAcademics',
    hint: 'professional woman portrait',
    bio: "Dr. Patricio champions academic integrity and innovation, overseeing all educational programs to ensure the highest standards of learning and instruction.",
    isProminent: false,
  },
  {
    name: 'Adrian O. Rival, CPA',
    title: 'VP for Administration',
    storageKey: 'adminVPAdmin',
    hint: 'professional man portrait glasses',
    bio: "Mr. Rival manages the college's administrative functions, ensuring the seamless operation of campus services and facilities to support the student body.",
    isProminent: false,
  },
];

const AdminCard = ({ admin, isProminent }: { admin: typeof administrators[0], isProminent: boolean }) => (
    <Card 
        className={cn(
            "flex flex-col md:flex-row items-center gap-6 md:gap-8 p-6 bg-card border rounded-2xl shadow-xl overflow-hidden",
            isProminent && "md:col-span-3"
        )}
    >
        <div className={cn(
            "relative h-48 w-48 md:h-56 md:w-56 flex-shrink-0 rounded-lg overflow-hidden border-2 border-primary/10 shadow-inner group"
        )}>
             <ImageClient
                storageKey={admin.storageKey as any}
                alt={admin.name}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                hint={admin.hint}
            />
        </div>
        <div className={cn("text-center", !isProminent && "md:text-left")}>
            <CardHeader className="p-0">
                <CardTitle className={cn("font-bold text-foreground", isProminent ? "text-3xl" : "text-xl")}>{admin.name}</CardTitle>                              
                <p className={cn("font-semibold mt-1", isProminent ? "text-lg text-primary" : "text-base text-primary")}>{admin.title}</p>
            </CardHeader>
            <CardContent className="p-0 mt-4">
                <p className="text-muted-foreground text-base leading-relaxed">{admin.bio}</p>
            </CardContent>
        </div>
    </Card>
)

export default function AdministrationPage() {
  const prominentAdmins = administrators.filter(a => a.isProminent);
  const otherAdmins = administrators.filter(a => !a.isProminent);

  return (
    <div className="bg-background">
        <PageHeader 
            title="Our Leadership"
            description="Meet the dedicated individuals who guide Southland College with passion and expertise, ensuring a commitment to excellence in education and student life."
            storageKey="administrationPageHeader"
            defaultImage="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2134&auto=format&fit=crop"
            imageHint="team meeting office"
        />
        <Breadcrumbs />
        <div className="container mx-auto px-4 py-24">
            <div className="space-y-12">
                {prominentAdmins.map((admin) => (
                    <AdminCard key={admin.name} admin={admin} isProminent />
                ))}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                     {otherAdmins.map((admin) => (
                         <Card key={admin.name} className="flex flex-col items-center text-center p-6 bg-card border rounded-2xl shadow-xl overflow-hidden">
                            <div className="relative h-48 w-48 flex-shrink-0 rounded-lg overflow-hidden border-2 border-primary/10 shadow-inner group mb-6">
                                <ImageClient
                                    storageKey={admin.storageKey as any}
                                    alt={admin.name}
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    hint={admin.hint}
                                />
                            </div>
                            <div>
                                <CardHeader className="p-0">
                                    <CardTitle className="text-xl font-bold text-foreground">{admin.name}</CardTitle>                              
                                    <p className="text-primary font-semibold mt-1 text-base">{admin.title}</p>
                                </CardHeader>
                                <CardContent className="p-0 mt-4">
                                    <p className="text-muted-foreground text-sm leading-relaxed">{admin.bio}</p>
                                </CardContent>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}
