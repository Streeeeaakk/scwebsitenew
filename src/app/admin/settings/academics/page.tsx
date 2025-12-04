
import { getAcademicPrograms } from '@/app/actions';
import { AcademicsManager } from '@/components/admin/AcademicsManager';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function AcademicsSettingsPage() {
  const programs = await getAcademicPrograms();

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
              <Link href="/admin/settings">
                  <ArrowLeft className="h-4 w-4" />
              </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Academics Management</h1>
            <p className="mt-1 text-muted-foreground">
                Edit content for all academic departments, including faculty and their images.
            </p>
          </div>
      </div>
      <AcademicsManager initialPrograms={programs} />
    </div>
  );
}
