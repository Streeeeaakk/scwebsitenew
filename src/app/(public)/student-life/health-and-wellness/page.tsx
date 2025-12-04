
'use client';

import { PageHeader } from '@/components/PageHeader';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { HeartPulse, Shield, Brain, Utensils } from 'lucide-react';
import Image from 'next/image';

export default function HealthAndWellnessPage() {
  const services = [
    {
      icon: HeartPulse,
      title: 'Medical Services',
      description: 'Our on-campus clinic provides primary care, first aid, and health consultations for all students. Staffed by registered nurses and a consulting physician.',
    },
    {
      icon: Brain,
      title: 'Counseling & Mental Health',
      description: 'Confidential individual and group counseling sessions to help students manage stress, anxiety, and other personal challenges. Your well-being is our priority.',
    },
    {
      icon: Shield,
      title: 'Health Education',
      description: 'We host regular workshops and campaigns on topics like nutrition, stress management, sexual health, and substance abuse prevention to empower students to make informed choices.',
    },
    {
      icon: Utensils,
      title: 'Nutrition Services',
      description: 'Meet with our registered dietitian to discuss healthy eating habits, manage dietary restrictions, and develop a personalized nutrition plan that works for you.',
    },
  ];

  return (
    <div className="bg-background">
      <PageHeader
        title="Health & Wellness"
        description="Your well-being is our priority. Access a range of services including counseling, health workshops, and wellness programs to support a healthy mind and body."
        storageKey="studentLifeWellness"
        defaultImage="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop"
        imageHint="yoga wellness"
      />
      <Breadcrumbs />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto">
          <section className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Supporting Your Total Well-being</h2>
            <p className="text-lg text-muted-foreground">At Southland College, we believe that academic success is deeply connected to physical and mental health. Our Health & Wellness Center provides a comprehensive, holistic approach to student well-being, offering a wide range of services in a safe, confidential, and supportive environment.</p>
          </section>

          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => (
                <Card key={service.title} className="flex items-start p-6 gap-6">
                   <div className="bg-primary text-primary-foreground p-3 rounded-lg mt-1">
                      <service.icon className="h-6 w-6" />
                    </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                    <p className="mt-2 text-muted-foreground">{service.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
          
           <section>
              <div className="relative rounded-lg overflow-hidden h-96">
                <Image src="https://images.unsplash.com/photo-1506126613408-4e7e9b7da073?q=80&w=2070&auto=format&fit=crop" alt="Yoga class" fill className="object-cover" data-ai-hint="yoga meditation" />
                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center p-4">
                   <div>
                      <h3 className="text-4xl font-bold text-white mb-4">Wellness Workshops</h3>
                      <p className="text-lg text-white/90 max-w-2xl mx-auto">Join our weekly yoga, meditation, and mindfulness sessions to de-stress and refocus. All levels are welcome.</p>
                   </div>
                 </div>
              </div>
          </section>

        </div>
      </div>
    </div>
  );
}
