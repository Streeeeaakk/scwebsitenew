
import { getStudentLifeSections } from '@/app/actions';
import { StudentLifeManager } from '@/components/admin/StudentLifeManager';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function StudentLifeSettingsPage() {
  const sections = await getStudentLifeSections();

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
              <Link href="/admin/settings">
                  <ArrowLeft className="h-4 w-4" />
              </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Student Life Management</h1>
            <p className="mt-1 text-muted-foreground">
                Edit content for the cards displayed on the Student Life page.
            </p>
          </div>
      </div>
      <StudentLifeManager initialSections={sections} />
    </div>
  );
}
