
'use client';

import { useState, useEffect } from 'react';
import type { NewsItem, NewsFormData } from '@/lib/schemas';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsFormSchema } from '@/lib/schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Loader2, Plus, Star, Eye } from 'lucide-react';
import { addOrUpdateArticle, deleteArticle, getNewsArticles } from '@/app/actions';
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
import { ImageUploader } from './ImageUploader';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import Image from 'next/image';

export function NewsManager({ articles: initialArticles }: { articles: NewsItem[] }) {
    const { toast } = useToast();
    
    const [articles, setArticles] = useState<NewsItem[]>(initialArticles);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<NewsItem | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const newsForm = useForm<NewsFormData>({
        resolver: zodResolver(newsFormSchema),
        defaultValues: {
            title: '',
            slug: '',
            date: new Date().toISOString().split('T')[0],
            category: 'Campus News',
            description: '',
            fullContent: '',
            image: '',
            hint: '',
            imagePath: '',
            isFeatured: false,
        }
    });
    
    useEffect(() => {
        setArticles(initialArticles);
    }, [initialArticles]);
    
    useEffect(() => {
        if (isDialogOpen) {
          const defaultValues = editingArticle 
              ? { 
                  ...editingArticle,
                  date: new Date(editingArticle.date).toISOString().split('T')[0],
                  isFeatured: editingArticle.isFeatured || false,
                  category: editingArticle.category || 'Campus News',
                } 
              : {
                  title: '',
                  slug: '',
                  date: new Date().toISOString().split('T')[0],
                  category: 'Campus News',
                  description: '',
                  fullContent: '',
                  image: '',
                  hint: '',
                  imagePath: '',
                  isFeatured: false,
                };
          newsForm.reset(defaultValues as any);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDialogOpen, editingArticle]);
    
    const handleAddNew = () => {
        setEditingArticle(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (article: NewsItem) => {
        setEditingArticle(article);
        setIsDialogOpen(true);
    };

    const handleDelete = async (articleId: string) => {
        setIsDeleting(articleId);
        try {
            const result = await deleteArticle(articleId);
            if (result.success) {
                toast({ title: 'Article Deleted', description: 'The article has been successfully deleted.' });
                // No need to fetch again, revalidation will trigger update
            } else {
                toast({ variant: 'destructive', title: 'Deletion Failed', description: result.message });
            }
        } catch (error) {
            console.error("Delete operation failed", error);
            toast({ variant: 'destructive', title: 'Error', description: 'Could not delete the article.' });
        } finally {
            setIsDeleting(null);
        }
    };

    const onNewsSubmit = async (data: NewsFormData) => {
        try {
            const result = await addOrUpdateArticle({
              ...data,
              id: editingArticle?.id,
            });

            if (result.success) {
                toast({ title: editingArticle ? 'Article Updated' : 'Article Added', description: result.message });
                setIsDialogOpen(false);
                // No need to fetch, revalidation will trigger update.
            } else {
                toast({ variant: 'destructive', title: 'Save Failed', description: result.message || 'An unknown error occurred.' });
            }
        } catch (error) {
             console.error("An unexpected error occurred during form submission:", error);
             toast({ variant: 'destructive', title: 'An Unexpected Error Occurred', description: 'Please check the console for details.' });
        }
    };

    const { isSubmitting } = newsForm.formState;
    const currentImageUrl = newsForm.watch('image');

    return (
        <div>
             <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>News Articles &amp; Homepage</CardTitle>
                            <CardDescription>
                                Add, view, edit, or delete news articles. This also controls the news on the homepage.
                            </CardDescription>
                        </div>
                        <Button onClick={handleAddNew}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add New Article
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Featured</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {articles.map((item) => (
                                <TableRow key={item.id} className={item.isFeatured ? 'bg-secondary' : ''}>
                                    <TableCell>
                                        <div className="w-16 h-10 relative rounded-md overflow-hidden bg-muted">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium max-w-xs truncate">{item.title}</TableCell>
                                    <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>
                                        {item.isFeatured && <Star className="h-5 w-5 text-accent fill-accent" />}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button asChild variant="outline" size="icon">
                                            <Link href={`/admin/news?slug=${item.slug}`} target="_blank">
                                                <Eye className="h-4 w-4" />
                                                <span className="sr-only">Preview</span>
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={() => handleEdit(item)} disabled={!!isDeleting}>
                                            <Pencil className="h-4 w-4" />
                                            <span className="sr-only">Edit</span>
                                        </Button>
                                        <AlertDialog>
                                          <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="icon" disabled={isDeleting === item.id}>
                                              {isDeleting === item.id ? <Loader2 className="h-4 w-4 animate-spin"/> : <Trash2 className="h-4 w-4" />}
                                              <span className="sr-only">Delete</span>
                                            </Button>
                                          </AlertDialogTrigger>
                                          <AlertDialogContent>
                                            <AlertDialogHeader>
                                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                              <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete the article and its image from storage.
                                              </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                                              <AlertDialogAction onClick={() => handleDelete(item.id)}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>{editingArticle ? 'Edit Article' : 'Add New Article'}</DialogTitle>
                        <DialogDescription>
                            {editingArticle ? 'Make changes to your article here.' : 'Create a new news article for your website.'} Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...newsForm}>
                        <form onSubmit={newsForm.handleSubmit(onNewsSubmit)} className="space-y-4 max-h-[80vh] overflow-y-auto p-1 pr-4">
                            <FormField
                                control={newsForm.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Southland Eagles Win Championship" {...field} disabled={isSubmitting} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={newsForm.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} disabled={isSubmitting} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={newsForm.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Campus News" {...field} disabled={isSubmitting} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={newsForm.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description (Short)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="A short summary that appears on the news list page." {...field} disabled={isSubmitting} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={newsForm.control}
                                name="fullContent"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Content</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="The full content of the news article." className="min-h-[150px]" {...field} disabled={isSubmitting} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={newsForm.control}
                                name="image"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Article Image</FormLabel>
                                     <FormControl>
                                        <ImageUploader 
                                            title="Upload Article Image"
                                            description="Drag &amp; drop or click to replace the image."
                                            imageUrl={currentImageUrl}
                                            folder="news-images"
                                            onImageSave={(result) => {
                                                newsForm.setValue('image', result.url, { shouldValidate: true, shouldDirty: true });
                                                newsForm.setValue('imagePath', result.path, { shouldDirty: true });
                                            }}
                                        />
                                     </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                            />
                            <FormField
                                control={newsForm.control}
                                name="hint"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image Hint</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., basketball game" {...field} disabled={isSubmitting} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={newsForm.control}
                                name="isFeatured"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-muted/50">
                                    <div className="space-y-0.5">
                                      <FormLabel>Mark as Featured Article</FormLabel>
                                      <FormMessage />
                                      <p className="text-xs text-muted-foreground">
                                        The featured article is displayed prominently at the top of the news page.
                                     </p>
                                    </div>
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        disabled={isSubmitting}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                             <DialogFooter className="pt-4 bg-background sticky bottom-0 p-4 border-t">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary" disabled={isSubmitting}>Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Changes
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

    