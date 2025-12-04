
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';
import { studentLifeSectionsSchema, type StudentLifeSection, type StudentLifeSectionsForm } from '@/lib/schemas';
import { ImageUploader } from './ImageUploader';
import { updateStudentLifeSections, getStudentLifeSections } from '@/app/actions';
import { Reorder } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { GripVertical } from 'lucide-react';
import { Switch } from '../ui/switch';

type StudentLifeManagerProps = {
  initialSections: StudentLifeSection[];
};

export function StudentLifeManager({ initialSections }: StudentLifeManagerProps) {
  const { toast } = useToast();

  const [sections, setSections] = useState(initialSections);

  const form = useForm<StudentLifeSectionsForm>({
    resolver: zodResolver(studentLifeSectionsSchema),
    defaultValues: { sections: initialSections },
  });

  const { isSubmitting } = form.formState;
  const watchedSections = form.watch('sections');

  const handleReorder = (newOrder: StudentLifeSection[]) => {
    form.setValue('sections', newOrder, { shouldDirty: true });
    setSections(newOrder); // Update local state for re-rendering
  };

  const handleImageSave = (index: number, result: { url: string; path: string }) => {
    const newSections = [...form.getValues().sections];
    newSections[index].image = result.url;
    newSections[index].imagePath = result.path;
    form.setValue('items', newSections, { shouldDirty: true });
    toast({ title: 'Image Updated', description: 'Click "Save All Changes" to finalize.' });
  };
  
  const onSubmit = async (data: StudentLifeSectionsForm) => {
    const dataToSave = {
        sections: data.sections.map((section, index) => ({
            ...section,
            order: index,
        }))
    };
    
    const result = await updateStudentLifeSections(dataToSave);

    if (result.success) {
      toast({ title: 'Success!', description: 'Student Life sections have been updated.' });
      const updatedSections = await getStudentLifeSections();
      setSections(updatedSections);
      form.reset({ sections: updatedSections });
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.message });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="p-6">
            <Reorder.Group axis="y" values={sections} onReorder={handleReorder} className="space-y-6">
              {sections.map((section, index) => (
                <Reorder.Item key={section.id} value={section}>
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 pt-2">
                                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                            </div>
                            <div className="flex-grow grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name={`sections.${index}.title`}
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`sections.${index}.description`}
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl><Textarea {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                     <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name={`sections.${index}.cta`}
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Button Text</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            )}
                                        />
                                         <FormField
                                            control={form.control}
                                            name={`sections.${index}.icon`}
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Icon Name</FormLabel>
                                                <FormControl><Input placeholder="e.g. Users" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name={`sections.${index}.isModal`}
                                        render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-background">
                                            <div className="space-y-0.5">
                                            <FormLabel>Is Modal Trigger?</FormLabel>
                                            <FormMessage />
                                            </div>
                                            <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            </FormControl>
                                        </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <ImageUploader
                                        storageKey={section.storageKey}
                                        title="Section Image"
                                        description="Update the card background."
                                        imageUrl={watchedSections[index]?.image || ''}
                                        onImageSave={(result) => handleImageSave(index, result)}
                                        folder="images"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                  </Card>
                </Reorder.Item>
              ))}
            </Reorder.Group>
            <div className="mt-6 flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save All Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
