
import { ImageGallery } from '@/components/admin/ImageGallery';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function GalleryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
              <Link href="/admin/settings">
                  <ArrowLeft className="h-4 w-4" />
              </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Image Gallery</h1>
            <p className="mt-1 text-muted-foreground">
                A central place to view all images uploaded for news and site content.
            </p>
          </div>
      </div>
      <ImageGallery />
    </div>
  );
}
