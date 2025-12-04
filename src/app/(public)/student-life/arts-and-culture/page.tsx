
'use client';

import { PageHeader } from '@/components/PageHeader';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function ArtsAndCulturePage() {
  return (
    <div className="bg-background">
      <PageHeader
        title="Arts & Culture"
        description="Express your creativity and immerse yourself in the arts. From theater productions to art exhibitions, there's always something to inspire you."
        storageKey="studentLifeArts"
        defaultImage="https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=2073&auto=format&fit=crop"
        imageHint="painting art class"
      />
      <Breadcrumbs />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto space-y-12">
            <section className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">A Vibrant Hub of Creativity</h2>
                <p className="text-lg text-muted-foreground">At Southland College, we believe that the arts are an essential part of a well-rounded education. Our campus is a vibrant hub where students can explore their creative passions, discover new talents, and engage with a diverse range of cultural experiences.</p>
            </section>

            <section>
                <Card className="overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-foreground mb-4">Theater Productions</h3>
                            <p className="text-muted-foreground">Our drama club, the Southland Players, stages several productions each year, from classic plays to contemporary musicals. Students can get involved in all aspects of theater, including acting, directing, set design, and stage management. Auditions are open to all students, regardless of their major.</p>
                        </div>
                        <div className="relative h-64 md:h-auto">
                            <Image src="https://images.unsplash.com/photo-1507924538820-ede94a04019d?q=80&w=2070&auto=format&fit=crop" alt="Theater production" fill className="object-cover" data-ai-hint="theater stage" />
                        </div>
                    </div>
                </Card>
            </section>

            <section>
                 <Card className="overflow-hidden">
                    <div className="grid md:grid-cols-2">
                         <div className="relative h-64 md:h-auto md:order-2">
                            <Image src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop" alt="Art gallery" fill className="object-cover" data-ai-hint="art gallery" />
                        </div>
                        <div className="p-8 md:order-1">
                            <h3 className="text-2xl font-bold text-foreground mb-4">Visual Arts & Exhibitions</h3>
                            <p className="text-muted-foreground">The campus art gallery hosts a rotating series of exhibitions featuring work from students, faculty, and visiting artists. We offer workshops in painting, sculpture, photography, and digital media, providing students with the tools and guidance to express their artistic vision.</p>
                        </div>
                    </div>
                </Card>
            </section>

             <section>
                <Card className="overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-foreground mb-4">Music & Dance</h3>
                            <p className="text-muted-foreground">Whether you're a seasoned performer or a curious beginner, there's a place for you in our music and dance programs. Join the college choir, the jazz ensemble, or one of our dance troupes. We celebrate a wide variety of styles, from traditional folk dance to modern hip-hop.</p>
                        </div>
                        <div className="relative h-64 md:h-auto">
                            <Image src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop" alt="Music performance" fill className="object-cover" data-ai-hint="concert music band" />
                        </div>
                    </div>
                </Card>
            </section>

        </div>
      </div>
    </div>
  );
}
