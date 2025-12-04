
'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, BookOpen, Briefcase, HeartPulse, Building2, PlusCircle, Trash2, School } from 'lucide-react';
import { updateAcademicProgram, getAcademicPrograms } from '@/app/actions';
import { academicProgramSchema, type AcademicProgram, type FacultyMember } from '@/lib/schemas';
import { ImageUploader } from './ImageUploader';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from '@/components/ui/skeleton';

const ICONS: { [key: string]: React.ElementType } = {
  Building2,
  Briefcase,
  BookOpen,
  HeartPulse,
  School,
};

type AcademicsManagerProps = {
  initialPrograms: AcademicProgram[];
};

export function AcademicsManager({ initialPrograms }: AcademicsManagerProps) {
  const { toast } = useToast();

  const form = useForm<AcademicProgram>({
    resolver: zodResolver(academicProgramSchema),
  });
  
  const { fields: facultyFields, append: appendFaculty, remove: removeFaculty, update: updateFaculty } = useFieldArray({
    control: form.control,
    name: 'faculty'
  });

  const { fields: courseFields, append: appendCourse, remove: removeCourse } = useFieldArray({
      control: form.control,
      name: "courses"
  });

  const [activeProgramId, setActiveProgramId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [programs, setPrograms] = useState<AcademicProgram[]>(initialPrograms);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPrograms(initialPrograms);
    if (initialPrograms.length > 0) {
      setIsLoading(false);
    }
  }, [initialPrograms]);


  const handleAccordionChange = (programId: string) => {
    if (activeProgramId === programId) {
        // This is handled by the Accordion's collapsible prop implicitly
    } else {
        setActiveProgramId(programId);
        const programToEdit = programs.find(p => p.id === programId);
        if (programToEdit) {
            form.reset(programToEdit);
        }
    }
  };

  const onSubmit = async (data: AcademicProgram) => {
    setIsSubmitting(true);
    const result = await updateAcademicProgram(data);
    if (result.success) {
      toast({ title: 'Success!', description: 'Academic program has been updated.' });
      const updatedPrograms = await getAcademicPrograms();
      setPrograms(updatedPrograms);
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.message });
    }
    setIsSubmitting(false);
  };
  
  const handleImageSave = async (facultyIndex: number, newImageUrl: string) => {
    const currentProgram = form.getValues();
    const updatedFaculty = [...currentProgram.faculty];
    updatedFaculty[facultyIndex] = { ...updatedFaculty[facultyIndex], image: newImageUrl };
    
    const updatedProgramData = { ...currentProgram, faculty: updatedFaculty };

    const result = await updateAcademicProgram(updatedProgramData);

    if (result.success) {
      toast({ title: 'Portrait Updated!', description: 'The faculty member\'s image has been saved.' });
      // Refresh local state to reflect change immediately
      updateFaculty(facultyIndex, { ...currentProgram.faculty[facultyIndex], image: newImageUrl });
      
      const updatedPrograms = await getAcademicPrograms();
      setPrograms(updatedPrograms);
    } else {
      toast({ variant: 'destructive', title: 'Image Save Failed', description: result.message });
    }
  };
  
  const IconForProgram = ({ iconName }: { iconName: string }) => {
    const Icon = ICONS[iconName] || Building2;
    return <Icon className="h-5 w-5 text-primary" />;
  };
  
  if (isLoading) {
    return <Skeleton className="h-48 w-full" />;
  }
  
  if (programs.length === 0) {
     return (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-24 text-center">
            <h3 className="text-lg font-semibold text-muted-foreground">No Academic Programs Found</h3>
            <p className="text-sm text-muted-foreground">The database does not contain any academic programs to edit.</p>
        </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Accordion type="single" collapsible onValueChange={handleAccordionChange} value={activeProgramId || ""}>
          {programs.map((program) => (
            <AccordionItem value={program.id} key={program.id}>
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <IconForProgram iconName={program.icon} />
                  <span className="text-lg font-semibold text-foreground">{program.school}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6 p-4 border rounded-lg bg-card">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description (for Academics page)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Short description for the department list page." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mission"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department Mission (for Department page)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="The mission statement for the department page." className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Courses Section */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">Programs / Courses Offered</h3>
                      <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            appendCourse("");
                             setTimeout(() => form.handleSubmit(onSubmit)(), 100);
                          }}
                      >
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Course
                      </Button>
                    </div>
                     <p className="text-sm text-muted-foreground mb-6">
                        Changes to courses must be saved with the "Save Text Changes" button below.
                    </p>
                    <div className="space-y-4">
                      {courseFields.map((course, courseIndex) => (
                        <div key={course.id} className="flex items-center gap-2">
                            <FormField
                                control={form.control}
                                name={`courses.${courseIndex}`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl><Input placeholder="e.g. Bachelor of Science in..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="icon">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently remove this course. This action cannot be undone. You must click "Save Text Changes" after removing.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => removeCourse(courseIndex)}>
                                        Continue
                                    </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                      ))}
                    </div>
                  </div>


                  <div className="flex justify-end pt-6 border-t">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save Text Changes
                    </Button>
                  </div>

                  {/* Faculty Section */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">Faculty Management</h3>
                       <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            appendFaculty({ name: '', title: '', image: '' });
                            // After appending, we need to save this new empty member
                            setTimeout(() => form.handleSubmit(onSubmit)(), 100);
                          }}
                       >
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Faculty Member
                      </Button>
                    </div>
                     <p className="text-sm text-muted-foreground mb-6">
                        Changes to text fields must be saved with the "Save Text Changes" button above. Image uploads are saved automatically.
                    </p>
                    {facultyFields.map((facultyMember, facultyIndex) => (
                       <div key={facultyMember.id} className="relative p-4 border rounded-md bg-muted/50 mb-6 grid grid-cols-1 md:grid-cols-2 gap-x-6">
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name={`faculty.${facultyIndex}.name`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Faculty Name</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`faculty.${facultyIndex}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title / Position</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="sm" className="mt-2">
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Remove Faculty Member
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will permanently remove this faculty member. This action cannot be undone. You must click "Save Text Changes" after removing.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => removeFaculty(facultyIndex)}>
                                            Continue
                                        </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>

                            <div className="mt-4 md:mt-0">
                                <ImageUploader 
                                    storageKey={`faculty-${program.slug}-${facultyIndex}`}
                                    title="Faculty Portrait"
                                    description="Upload saves automatically."
                                    imageUrl={facultyMember.image || ''}
                                    folder="images"
                                    onImageSave={(result) => {
                                        handleImageSave(facultyIndex, result.url);
                                    }}
                                />
                            </div>
                       </div>
                    ))}
                  </div>
                  
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </form>
    </Form>
  );
}
