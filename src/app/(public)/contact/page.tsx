
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { contactFormSchema, type ContactFormData } from '@/lib/schemas';
import { Mail, MapPin, Phone, Loader2 } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { submitContactForm } from '@/app/actions';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: ContactFormData) {
    const result = await submitContactForm(values);

    if (result.success) {
        toast({
            title: 'Message Sent!',
            description: "Thank you for reaching out. We have received your message.",
        });
        form.reset();
    } else {
        toast({
            variant: 'destructive',
            title: 'Failed to Send Message',
            description: result.message || 'An unknown error occurred.',
        });
    }
  }

  return (
    <div className="bg-background">
      <PageHeader 
        title="Contact Us"
        description="Have questions? We're here to help. Reach out to us through the form below or through our contact details."
        storageKey="contactPageHeader"
        defaultImage="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=2070&auto=format&fit=crop"
        imageHint="customer support"
      />
      <Breadcrumbs />
      
      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
              <h2 className="text-3xl font-bold text-foreground">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0"/>
                    <div>
                        <h3 className="font-semibold text-lg text-foreground">Our Address</h3>
                        <p className="text-muted-foreground">Rizal St, Kabankalan City, 6111 Negros Occidental</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0"/>
                    <div>
                        <h3 className="font-semibold text-lg text-foreground">Email Us</h3>
                        <p className="text-muted-foreground">info@southlandcollege.edu.ph</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0"/>
                    <div>
                        <h3 className="font-semibold text-lg text-foreground">Call Us</h3>
                        <p className="text-muted-foreground">(034) 746 7297</p>
                    </div>
                </div>
              </div>
              <div className="mt-8 rounded-xl overflow-hidden h-80 border shadow-lg">
                  <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.401062102707!2d122.81817907583272!3d9.983691273313465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33ac113abdc74dc7%3A0xfd31dde515e4c24!2sSouthland%20College%20of%20Kabankalan%20City%2C%20Inc.!5e0!3m2!1sen!2sph!4v1757469868351!5m2!1sen!2sph"
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }}
                      allowFullScreen={false} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
              </div>
          </div>
          <div className="bg-card p-8 rounded-xl border shadow-lg">
            <h3 className="text-2xl font-bold text-foreground mb-4">Send us a Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Admission Inquiry" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your message here..." className="min-h-[120px]" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full shadow-lg shadow-primary/20 hover:shadow-primary/40" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
