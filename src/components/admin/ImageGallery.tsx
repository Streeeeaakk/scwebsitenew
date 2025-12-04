
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Copy, Check, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { storage } from '@/lib/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

type StoredImage = {
  url: string;
  name: string;
};

export function ImageGallery() {
  const [images, setImages] = useState<StoredImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      setIsLoading(true);
      setError(null);
      try {
        const folders = ['images/', 'news-images/']; // 'images/' is the main folder now
        const imageList: StoredImage[] = [];
        const imageNames = new Set<string>();

        for (const folder of folders) {
            const folderRef = ref(storage, folder);
            const res = await listAll(folderRef);

            const urlPromises = res.items.map(async (itemRef) => {
                // Avoid adding duplicates if they somehow exist across folders
                if (!imageNames.has(itemRef.name)) {
                  const url = await getDownloadURL(itemRef);
                  imageList.push({ url, name: itemRef.name });
                  imageNames.add(itemRef.name);
                }
            });
            await Promise.all(urlPromises);
        }

        setImages(imageList);
      } catch (e: any) {
        console.error("Firebase Storage Error:", e);
        if (e.code === 'storage/object-not-found') {
             setError('Could not list files. This is often a permissions issue. Please check your Storage Security Rules to allow read access.');
        } else if (e.code === 'storage/unauthorized') {
            setError('You are not authorized to view these files. Make sure your Firebase Storage security rules allow read access.');
        } else if (e.message.includes('invalid-api-key') || e.message.includes('Firebase App is not created') || e.code === 'auth/invalid-api-key') {
            setError('Firebase is not configured correctly for the browser. Please ensure the configuration in `src/lib/firebase.ts` matches the config from your Firebase project settings.');
        }
        else {
            setError('An unknown error occurred while fetching images. Check the console for more details.');
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, []);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'Copied to Clipboard!',
      description: 'The image URL has been copied.',
    });
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Image Gallery</CardTitle>
          <CardDescription>All images uploaded to Firebase Storage.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="w-full aspect-square rounded-lg" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error Loading Gallery</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
    );
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Gallery</CardTitle>
        <CardDescription>
          A central place to view all images uploaded for news articles and site content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {images.map((image) => (
                <div key={image.url} className="group relative">
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted">
                    <Image
                    src={image.url}
                    alt={image.name}
                    width={250}
                    height={250}
                    className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-b-lg">
                    <p className="truncate text-xs font-medium">{image.name}</p>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="w-full justify-center mt-1 h-7 text-xs text-white hover:bg-white/20 hover:text-white"
                        onClick={() => handleCopy(image.url)}
                    >
                        {copiedUrl === image.url ? (
                            <Check className="h-3 w-3 mr-1" />
                        ) : (
                            <Copy className="h-3 w-3 mr-1" />
                        )}
                        Copy URL
                    </Button>
                </div>
                </div>
            ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-24 text-center">
                <h3 className="text-lg font-semibold text-muted-foreground">No Images Found</h3>
                <p className="text-sm text-muted-foreground">Your image gallery is empty. Upload some images via the "News" or "Site Images" tabs.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
