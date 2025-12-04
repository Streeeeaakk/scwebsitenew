
'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export function TextManager() {
  return (
      <div>
        <Card>
            <CardHeader>
                <CardTitle>Homepage Content Management</CardTitle>
                <CardDescription>
                    This section is no longer editable via this panel. Homepage content is now managed directly in the code.
                </CardDescription>
            </CardHeader>
             <CardContent>
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-24 text-center">
                    <h3 className="text-lg font-semibold text-muted-foreground">Content No Longer Managed Here</h3>
                    <p className="text-sm text-muted-foreground">The "Why Choose Us" section has been replaced with a dynamic media channel. Its content is now managed in `src/app/(public)/page.tsx`.</p>
                </div>
             </CardContent>
        </Card>
      </div>
  )
}
