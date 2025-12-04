
'use client';

import { AlumniFeedHeader } from '@/components/AlumniFeedHeader';

export default function AlumniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background min-h-screen">
      <AlumniFeedHeader />
      <main className="pt-14">
        {children}
      </main>
    </div>
  );
}

    