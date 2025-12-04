
import { getJobPostings } from '@/app/actions';
import { CareersManager } from '@/components/admin/CareersManager';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function CareersSettingsPage() {
  const jobs = await getJobPostings();

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
              <Link href="/admin/settings">
                  <ArrowLeft className="h-4 w-4" />
              </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Careers Management</h1>
            <p className="mt-1 text-muted-foreground">
                Add, edit, and manage job opening announcements for the careers page.
            </p>
          </div>
      </div>
      <CareersManager initialJobs={jobs} />
    </div>
  );
}
