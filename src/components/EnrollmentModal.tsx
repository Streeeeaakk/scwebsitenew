
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { submitEnrollmentInquiry } from '@/app/actions';
import { enrollmentSchema, type EnrollmentFormData } from '@/lib/schemas';

const academicPrograms = [
    'Bachelor of Science in Information Technology (BSIT)',
    'Bachelor of Science in Architecture (BSARCH)',
    'Bachelor of Science in Mechanical Engineering (BSME)',
    'Bachelor of Science in Civil Engineering (BSCE)',
    'Bachelor of Science in Electrical Engineering (BSEE)',
    'Bachelor of Science in Accountancy (BSA)',
    'Bachelor of Science in Business Administration (BSBA) with majors in Financial Management and Marketing Management',
    'Bachelor of Science in Accounting Information System (BSAIS)',
    'Bachelor of Science in Hospitality Management (BSHM)',
    'Bachelor of Science in Tourism Management (BSTM)',
    'Bachelor of Elementary Education (BEED)',
    'Bachelor of Secondary Education (BSED) with majors in English, Filipino, Mathematics, and Social Studies',
    'Bachelor of Arts in Political Science (AB PolSci)',
    'Bachelor of Science in Radiologic Technology',
    'Diploma in Midwifery',
];

export function EnrollmentModal({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const form = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      program: undefined,
      message: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: EnrollmentFormData) {
    const result = await submitEnrollmentInquiry(values);
    if (result.success) {
      toast({
        title: 'Inquiry Sent!',
        description: result.message,
      });
      form.reset();
      setOpen(false);
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: result.message,
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enrollment Inquiry</DialogTitle>
          <DialogDescription>
            Start your journey with us. Fill out the form below and our admissions team will get in touch with you shortly.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="program"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program of Interest</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a program" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {academicPrograms.map((program) => (
                        <SelectItem key={program} value={program}>
                          {program}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any specific questions you have..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Inquiry
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
