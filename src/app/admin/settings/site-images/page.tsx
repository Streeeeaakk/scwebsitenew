
import { ImageManager } from '@/components/admin/ImageManager';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SiteImagesPage() {
  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
              <Link href="/admin/settings">
                  <ArrowLeft className="h-4 w-4" />
              </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Site Image Management</h1>
            <p className="mt-1 text-muted-foreground">
                Update images across the website. Changes are saved and will persist.
            </p>
          </div>
      </div>
      <ImageManager />
    </div>
  );
}
