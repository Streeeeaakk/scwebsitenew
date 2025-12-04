
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowRight, Info, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { alumniSignUpSchema, type AlumniSignUpData } from '@/lib/schemas';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

function SignUpForm() {
    const { toast } = useToast();
    const [error, setError] = useState<string | null>(null);

    const form = useForm<AlumniSignUpData>({
        resolver: zodResolver(alumniSignUpSchema),
        defaultValues: { firstName: '', lastName: '', email: '', graduationYear: '', password: '' },
    });

    const { isSubmitting } = form.formState;

    const onSubmit = async (data: AlumniSignUpData) => {
        setError(null);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            
            toast({
                title: 'Account Created!',
                description: 'You can now sign in with your new account.',
            });
            form.reset();
        } catch (error) {
            let description = 'An unknown error occurred.';
            if (error instanceof FirebaseError) {
                if (error.code === 'auth/email-already-in-use') {
                    description = 'This email address is already in use.';
                }
            }
            setError(description);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Sign Up Failed</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                 )}
                 <Alert>
                    <Info className="h-4 w-4"/>
                    <AlertTitle>Important: Use Your Alumni Email</AlertTitle>
                    <AlertDescription>
                        You must use your official <b className="text-primary">@southlandcollege.edu.ph</b> email to create an account. If you don't have one, please{' '}
                        <Link href="/alumni/email-registration" className="underline font-semibold">register for one first</Link>.
                    </AlertDescription>
                 </Alert>
                <div className="grid grid-cols-2 gap-4">
                     <FormField control={form.control} name="firstName" render={({ field }) => (
                        <FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="Juan" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="lastName" render={({ field }) => (
                        <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="Dela Cruz" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Alumni Email</FormLabel><FormControl><Input placeholder="fullname.batch@southlandcollege.edu.ph" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="graduationYear" render={({ field }) => (
                    <FormItem><FormLabel>Graduation Year</FormLabel><FormControl><Input placeholder="e.g., 2012" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                </Button>
            </form>
        </Form>
    );
}

export default function AlumniPortalPage() {
    return (
        <div className="container mx-auto px-4 py-12 sm:py-24 flex items-center justify-center min-h-[calc(100vh-140px)]">
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle>Create Account</CardTitle>
                        <CardDescription>Join the alumni network to reconnect and stay updated.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SignUpForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
