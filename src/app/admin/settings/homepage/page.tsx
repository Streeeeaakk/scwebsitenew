
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function HomepageContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
              <Link href="/admin/settings">
                  <ArrowLeft className="h-4 w-4" />
              </Link>
          </Button>
          <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Homepage Content</h1>
              <p className="mt-1 text-muted-foreground">
                  This section is for legacy content. New homepage sections are managed elsewhere.
              </p>
          </div>
      </div>
       <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-24 text-center">
            <h3 className="text-lg font-semibold text-muted-foreground">Content No Longer Managed Here</h3>
            <p className="text-sm text-muted-foreground">The "Victories, Voices, and Visions" channel is now managed under its own settings page.</p>
             <Button asChild variant="link">
                <Link href="/admin/settings/homepage-channel">Go to Homepage Channel Settings</Link>
            </Button>
        </div>
    </div>
  );
}
