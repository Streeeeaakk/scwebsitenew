
import { getNewsArticles } from '@/app/actions';
import { NewsManager } from '@/components/admin/NewsManager';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function NewsSettingsPage() {
  const articles = await getNewsArticles();

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
              <Link href="/admin/settings">
                  <ArrowLeft className="h-4 w-4" />
              </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">News Article Management</h1>
            <p className="mt-1 text-muted-foreground">
                Add, edit, and delete news articles. This also controls news on the homepage.
            </p>
          </div>
      </div>
      <NewsManager articles={articles} />
    </div>
  );
}
