
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
import { Loader2, Save, PlusCircle, Trash2 } from 'lucide-react';
import { addOrUpdateHomepageChannelItems, getHomepageChannelItems } from '@/app/actions';
import { homepageChannelItemSchema, type HomepageChannelItem, type HomepageChannelItemsForm } from '@/lib/schemas';
import { ImageUploader } from './ImageUploader';
import { v4 as uuidv4 } from 'uuid';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';

type HomepageChannelManagerProps = {
  initialItems: HomepageChannelItem[];
};

export function HomepageChannelManager({ initialItems }: HomepageChannelManagerProps) {
  const { toast } = useToast();
  
  const [activeAccordionItems, setActiveAccordionItems] = useState<string[]>(initialItems.map(item => item.id));

  const form = useForm<HomepageChannelItemsForm>({
    defaultValues: { items: initialItems },
  });

  const { fields, append, remove, update } = useForm<any>({
      defaultValues: { items: initialItems }
  }).control;

  const watchedItems = form.watch('items');

  const handleImageSave = (index: number, result: { url: string, path: string }) => {
    const newItems = [...form.getValues().items];
    newItems[index].image = result.url;
    newItems[index].imagePath = result.path;
    form.setValue('items', newItems, { shouldDirty: true });
    form.handleSubmit(onSubmit)();
  };
  
  const handleAddNewItem = () => {
    const newItem: HomepageChannelItem = {
      id: uuidv4(),
      title: 'New Item',
      description: 'A brief description.',
      image: 'https://placehold.co/600x400',
      imagePath: '',
      order: watchedItems.length,
    };
    const newItems = [...watchedItems, newItem];
    form.setValue('items', newItems);
    setActiveAccordionItems(prev => [...prev, newItem.id]);
    form.handleSubmit(onSubmit)();
  };
  
  const handleRemoveItem = (index: number, id: string) => {
    const newItems = watchedItems.filter((_, i) => i !== index);
    form.setValue('items', newItems);
    setActiveAccordionItems(prev => prev.filter(itemId => itemId !== id));
    form.handleSubmit(onSubmit)();
  };

  const onSubmit = async (data: HomepageChannelItemsForm) => {
    form.control.register('items', { value: data.items.map((item, index) => ({ ...item, order: index })) });
    const result = await addOrUpdateHomepageChannelItems(data);
    if (result.success) {
      toast({ title: 'Success!', description: 'Homepage channel has been updated.' });
      const updatedItems = await getHomepageChannelItems();
      form.reset({ items: updatedItems }); 
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.message });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle>Homepage Channel Management</CardTitle>
                <CardDescription>
                    Edit content for the "Victories, Voices, and Visions" section on the homepage.
                </CardDescription>
            </div>
            <Button onClick={handleAddNewItem}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Accordion type="multiple" value={activeAccordionItems} onValueChange={setActiveAccordionItems} className="w-full">
              {watchedItems.map((item, index) => (
                <AccordionItem value={item.id} key={item.id}>
                  <AccordionTrigger>
                    <span className="text-lg font-semibold text-foreground">Channel Item #{index + 1}: {item.title}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 p-4 border rounded-lg bg-card grid md:grid-cols-2 gap-6 relative">
                       <AlertDialog>
                          <AlertDialogTrigger asChild>
                             <Button variant="destructive" size="icon" className="absolute top-4 right-4 z-10">
                                <Trash2 className="h-4 w-4" />
                             </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete this item. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleRemoveItem(index, item.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      <div className="space-y-4">
                         <FormField
                            control={form.control}
                            name={`items.${index}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`items.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                      </div>
                      <div>
                         <ImageUploader
                            storageKey={`homepageChannelImage${index + 1}`}
                            title="Item Image or Video"
                            description="Upload saves all changes."
                            imageUrl={item.image}
                            onImageSave={(result) => handleImageSave(index, result)}
                          />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-6 flex justify-end">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    Save All Changes
                </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
