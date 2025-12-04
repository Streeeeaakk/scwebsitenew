
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const emailRegistrationSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  middleName: z.string().optional(),
  noMiddleName: z.boolean(),
  lastName: z.string().min(1, 'Last Name is required'),
  suffix: z.string().optional(),
  noSuffix: z.boolean(),
  officialName: z.string().min(1, 'Full name from official records is required'),
  dobMonth: z.string().min(1, 'Month is required'),
  dobDay: z.string().min(1, 'Day is required'),
  dobYear: z.string().min(1, 'Year is required'),
  campus: z.string().min(1, 'Campus is required'),
  college: z.string().min(1, 'College/School is required'),
  degree: z.string().min(1, 'Degree/Certificate is required'),
  yearStarted: z.string().min(1, 'Year Started is required'),
  yearGraduated: z.string().min(1, 'Year Graduated is required'),
  studentNo: z.string().optional(),
  personalEmail: z.string().email('Please enter a valid email'),
  confirmPersonalEmail: z.string().email('Please enter a valid email'),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms',
  }),
  captcha: z.string().min(1, 'CAPTCHA is required'),
}).refine(data => data.personalEmail === data.confirmPersonalEmail, {
    message: "Emails don't match",
    path: ["confirmPersonalEmail"],
});

type EmailRegistrationFormData = z.infer<typeof emailRegistrationSchema>;

const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());
const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
];

export default function AlumniEmailRegistrationPage() {
    const form = useForm<EmailRegistrationFormData>({
        resolver: zodResolver(emailRegistrationSchema),
        defaultValues: {
            noMiddleName: false,
            noSuffix: false,
            agreeTerms: false,
            campus: 'Southland College - Kabankalan',
        }
    });

    function onSubmit(values: EmailRegistrationFormData) {
        console.log(values);
        // Handle form submission
    }

    return (
        <div className="bg-background">
            <PageHeader
                title="Alumni Email Registration"
                description="Register now to get your very own @alumni.southlandcollege.edu.ph email account."
                storageKey="alumniEmailRegHeader"
                defaultImage="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070&auto=format&fit=crop"
                imageHint="professional meeting"
            />
            <Breadcrumbs />
            <div className="container mx-auto px-4 py-24">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Alumni Registration</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-muted-foreground space-y-4">
                                        <p>
                                            Register now to get your very own @alumni.southlandcollege.edu.ph email account.
                                        </p>
                                        <p>
                                            We'll verify your information and you'll hear from us when your account is ready. The information you submit will also be used to update your records with the Southland College Office of Alumni Relations.
                                        </p>
                                        <p>
                                            The Southland College Alumni Email (fullname.batch@alumni.southlandcollege.edu.ph) is a service created only for bonafide Southland alumni, as verified by the Office of Alumni Relations (OAR). It may not be issued to anyone other than the alumnus/alumna requesting the service. Only one email account per alumnus/alumna is allowed. The OAR will request periodic status updates from Southland Alumni in order to confirm their continued relationship with the College.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Reminders</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            <li>Register using a <strong>valid email address</strong> where we can send your confirmation link. Disable any service that might block messages from reaching your inbox.</li>
                                            <li>Enter your <strong>correct full name</strong> to avoid any problems in processing your registration. Your name, degree, and other information will be used to verify your records.</li>
                                            <li>Take a look at your <strong>junk/spam folders</strong> to make sure the confirmation link didn't end up there.</li>
                                        </ol>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>About Yourself</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <FormField name="firstName" control={form.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name *</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                                <p className="text-xs text-muted-foreground">Must be your complete given name (e.g., Juan Miguel, Maria Cristina)</p>
                                            </FormItem>
                                        )} />
                                        <FormField name="middleName" control={form.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Middle Name *</FormLabel>
                                                <FormControl><Input {...field} disabled={form.watch('noMiddleName')} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField name="noMiddleName" control={form.control} render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>I do not have a middle name.</FormLabel>
                                                </div>
                                            </FormItem>
                                        )} />
                                        <FormField name="lastName" control={form.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name *</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField name="suffix" control={form.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Suffix *</FormLabel>
                                                <FormControl><Input {...field} disabled={form.watch('noSuffix')} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField name="noSuffix" control={form.control} render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>My name does not end with a suffix (e.g., Jr., Sr., I, II, etc.)</FormLabel>
                                                </div>
                                            </FormItem>
                                        )} />
                                        <FormField name="officialName" control={form.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full name on Official Records when you graduated from Southland</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                                <p className="text-xs text-muted-foreground">Enter your full name on Official Records when you graduated from Southland College. Leave this blank if there were no changes to your name.</p>
                                            </FormItem>
                                        )} />
                                        <div>
                                            <FormLabel>Date of Birth *</FormLabel>
                                            <div className="grid grid-cols-3 gap-4 mt-2">
                                                <FormField name="dobMonth" control={form.control} render={({ field }) => (
                                                    <FormItem><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select month" /></SelectTrigger></FormControl><SelectContent>{months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                                                )} />
                                                <FormField name="dobDay" control={form.control} render={({ field }) => (
                                                    <FormItem><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select day" /></SelectTrigger></FormControl><SelectContent>{days.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                                                )} />
                                                <FormField name="dobYear" control={form.control} render={({ field }) => (
                                                    <FormItem><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger></FormControl><SelectContent>{years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                                                )} />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Your Most Recent Southland College Degree/Certificate</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <FormField name="campus" control={form.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Campus *</FormLabel>
                                                <FormControl>
                                                    <Input {...field} disabled />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField name="college" control={form.control} render={({ field }) => (
                                            <FormItem><FormLabel>College, School, or Institute *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField name="degree" control={form.control} render={({ field }) => (
                                            <FormItem><FormLabel>Degree/Certificate & Major *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField name="yearStarted" control={form.control} render={({ field }) => (
                                                <FormItem><FormLabel>Year Started</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger></FormControl><SelectContent>{years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                                            )} />
                                            <FormField name="yearGraduated" control={form.control} render={({ field }) => (
                                                <FormItem><FormLabel>Year Graduated *</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger></FormControl><SelectContent>{years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                                            )} />
                                        </div>
                                         <FormField name="studentNo" control={form.control} render={({ field }) => (
                                            <FormItem><FormLabel>Student No. [YYYY-NNNNN]</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                    </CardContent>
                                </Card>
                                
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Contact Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <FormField name="personalEmail" control={form.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Personal Email Address *</FormLabel>
                                                <FormControl><Input type="email" placeholder="your.name@example.com" {...field} /></FormControl>
                                                <FormMessage />
                                                <p className="text-xs text-muted-foreground">We will send an email to this address with instructions on how to confirm your registration. Only confirmed registrations will be processed.</p>
                                            </FormItem>
                                        )} />
                                        <FormField name="confirmPersonalEmail" control={form.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Re-type Email Address *</FormLabel>
                                                <FormControl><Input type="email" placeholder="your.name@example.com" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6 space-y-4">
                                        <FormField name="agreeTerms" control={form.control} render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>I understand and agree that by clicking the Register button below I am deemed to have read, understood and signed this certification and data privacy consent form.</FormLabel>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )} />
                                        
                                        <FormField name="captcha" control={form.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>CAPTCHA</FormLabel>
                                                <div className="flex items-center gap-4">
                                                    <div className="bg-muted p-2 rounded-md text-2xl tracking-[.5em] font-bold line-through">
                                                        3581
                                                    </div>
                                                    <FormControl><Input placeholder="Type the numbers you see above" {...field} /></FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </CardContent>
                                </Card>
                                
                                <Button type="submit" size="lg" className="w-full">Register</Button>
                            </form>
                        </Form>
                    </div>

                    <aside className="space-y-8">
                        <Card>
                             <CardHeader>
                                <CardTitle>Give to Southland</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">To select the campaign that you want to donate to, click the dropdown menu below and select your preferred available campaign.</p>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select campaign to support" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="scholarship-fund">Scholarship Fund</SelectItem>
                                        <SelectItem value="campus-development">Campus Development</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className="w-full">Donate</Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 text-sm text-muted-foreground space-y-4">
                                 <div>
                                    <h4 className="font-bold text-foreground">Southland College</h4>
                                    <p>Office of Alumni Relations</p>
                                 </div>
                                 <div>
                                    <h4 className="font-bold text-foreground">Mission</h4>
                                    <p>To serve as an active link between Southland alumni and the rest of the academic community in order to encourage the maximum participation, involvement, support and commitment of these individuals to the goals and mission of the College.</p>
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-foreground">Vision</h4>
                                     <p>To effectively act as liaison between Southland and its external publics, especially its alumni--to ensure their active participation, involvement, support and commitment vis-a-vis Southland's social mission.</p>
                                 </div>
                                 <Separator />
                                 <div className="space-y-1">
                                    <p><strong className="text-foreground">Office Address:</strong> Rizal St, Kabankalan City, 6111 Negros Occidental</p>
                                    <p><strong className="text-foreground">Phone:</strong> (034) 746 7297</p>
                                    <p><strong className="text-foreground">Email Address:</strong> alumni.relations@southlandcollege.edu.ph</p>
                                 </div>
                                 <Separator />
                                 <div className="space-y-2">
                                     <Link href="#" className="flex items-center text-primary hover:underline">Privacy Notice <ExternalLink className="ml-2 h-4 w-4" /></Link>
                                     <Link href="#" className="flex items-center text-primary hover:underline">FAQs for Southland Alumni Email <ExternalLink className="ml-2 h-4 w-4" /></Link>
                                 </div>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </div>
        </div>
    );
}
