
import { getHomepageChannelItems } from '@/app/actions';
import { HomepageChannelManager } from '@/components/admin/HomepageChannelManager';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function HomepageChannelPage() {
  const items = await getHomepageChannelItems();

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
              <Link href="/admin/settings">
                  <ArrowLeft className="h-4 w-4" />
              </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Homepage Channel Management</h1>
            <p className="mt-1 text-muted-foreground">
                Edit content for the "Victories, Voices, and Visions" section on the homepage.
            </p>
          </div>
      </div>
      <HomepageChannelManager initialItems={items} />
    </div>
  );
}
