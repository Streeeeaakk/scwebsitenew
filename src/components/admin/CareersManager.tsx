
'use client';

import { useState, useEffect } from 'react';
import type { JobPosting, JobPostingFormData } from '@/lib/schemas';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobPostingSchema } from '@/lib/schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Loader2, Plus, GripVertical, Save } from 'lucide-react';
import { addOrUpdateJobPosting, deleteJobPosting, updateJobPostingOrder, getJobPostings } from '@/app/actions';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ImageUploader } from './ImageUploader';
import { Reorder } from "framer-motion";

export function CareersManager({ initialJobs }: { initialJobs: JobPosting[] }) {
    const { toast } = useToast();
    
    const [jobs, setJobs] = useState<JobPosting[]>(initialJobs);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    useEffect(() => {
        setJobs(initialJobs);
    }, [initialJobs]);

    const handleReorder = async (newOrder: JobPosting[]) => {
        setJobs(newOrder);
        const orderToSave = newOrder.map((job, index) => ({ id: job.id, order: index }));
        await updateJobPostingOrder(orderToSave);
        toast({ title: "Order Saved", description: "The new order for job postings has been saved." });
    };
    
    const handleAddNew = async () => {
        try {
            const result = await addOrUpdateJobPosting({
                title: 'New Job Posting',
                date: new Date().toISOString().split('T')[0],
                image: 'https://placehold.co/1200x600',
                imagePath: '',
            });

            if (result.success && result.id) {
                const newJobs = await getJobPostings();
                setJobs(newJobs);
                toast({ title: 'New Job Added', description: 'A new job posting has been created.' });
            } else {
                toast({ variant: 'destructive', title: 'Failed to Add', description: result.message || 'Could not create new job.' });
            }
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'An unexpected error occurred.' });
        }
    };
    
     const handleDelete = async (jobId: string) => {
        setIsDeleting(jobId);
        try {
            const result = await deleteJobPosting(jobId);
            if (result.success) {
                toast({ title: 'Job Posting Deleted', description: 'The job posting has been removed.' });
                setJobs(prev => prev.filter(j => j.id !== jobId));
            } else {
                toast({ variant: 'destructive', title: 'Deletion Failed', description: result.message });
            }
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Could not delete the job posting.' });
        } finally {
            setIsDeleting(null);
        }
    };

    const handleJobUpdate = (updatedJob: JobPosting) => {
        setJobs(prevJobs => prevJobs.map(job => job.id === updatedJob.id ? updatedJob : job));
    };

    return (
        <div>
             <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Manage Job Postings</CardTitle>
                            <CardDescription>
                                Add, edit, reorder, and delete job postings.
                            </CardDescription>
                        </div>
                        <Button onClick={handleAddNew}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add New Job
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {jobs.length > 0 ? (
                        <Reorder.Group axis="y" values={jobs} onReorder={handleReorder} className="space-y-6">
                            {jobs.map((job) => (
                                <Reorder.Item key={job.id} value={job}>
                                     <JobCard 
                                         job={job} 
                                         onDelete={() => handleDelete(job.id)}
                                         isDeleting={isDeleting === job.id}
                                         onUpdate={handleJobUpdate}
                                     />
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-24 text-center">
                            <h3 className="text-lg font-semibold text-muted-foreground">No Job Postings</h3>
                            <p className="text-sm text-muted-foreground">Click "Add New Job" to create your first job posting.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

function JobCard({ job, onDelete, isDeleting, onUpdate }: { job: JobPosting, onDelete: () => void, isDeleting: boolean, onUpdate: (job: JobPosting) => void }) {
    const { toast } = useToast();
    const [currentImageUrl, setCurrentImageUrl] = useState(job.image);

    const form = useForm<JobPostingFormData>({
        resolver: zodResolver(jobPostingSchema),
        defaultValues: {
            title: job.title,
            date: new Date(job.date).toISOString().split('T')[0],
            image: job.image,
            imagePath: job.imagePath,
        }
    });
    
    useEffect(() => {
        form.reset({
            title: job.title,
            date: new Date(job.date).toISOString().split('T')[0],
            image: job.image,
            imagePath: job.imagePath,
        });
        setCurrentImageUrl(job.image);
    }, [job, form]);

    const { isSubmitting } = form.formState;

    const handleSave = async (data: JobPostingFormData) => {
        try {
            const result = await addOrUpdateJobPosting({ ...job, ...data });
            if (result.success) {
                toast({ title: 'Success', description: 'Job posting has been updated.' });
                // We fetch all jobs again to get the canonical state from the server
                const updatedJobs = await getJobPostings();
                const updatedJob = updatedJobs.find(j => j.id === job.id);
                if (updatedJob) onUpdate(updatedJob);
            } else {
                toast({ variant: 'destructive', title: 'Error', description: result.message });
            }
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'An unexpected error occurred.' });
        }
    };
    
    const handleImageUpdate = (url: string, path: string) => {
        form.setValue('image', url, { shouldValidate: true, shouldDirty: true });
        form.setValue('imagePath', path, { shouldDirty: true });
        setCurrentImageUrl(url);
    }

    return (
        <Card className="bg-muted/30">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSave)}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                                <CardTitle className="text-xl">Edit Job Posting</CardTitle>
                            </div>
                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm" disabled={isDeleting}>
                                        {isDeleting ? <Loader2 className="h-4 w-4 animate-spin"/> : <Trash2 className="h-4 w-4" />}
                                        <span className="ml-2 hidden sm:inline">Delete</span>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>This will permanently delete this job posting.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                           <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl><Input placeholder="e.g., Job Openings at Southland College" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Posting Date</FormLabel>
                                        <FormControl><Input type="date" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                         <ImageUploader
                            title="Job Posting Image"
                            description="Recommended: 1200x600 pixels."
                            imageUrl={currentImageUrl}
                            folder="careers"
                            onImageSave={(result) => handleImageUpdate(result.url, result.path)}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2"/> : <Save className="h-4 w-4 mr-2" />}
                            Save Changes
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
