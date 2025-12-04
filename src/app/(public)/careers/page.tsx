
'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/PageHeader';
import Image from 'next/image';
import { getJobPostings } from '@/app/actions';
import type { JobPosting } from '@/lib/schemas';
import { Skeleton } from '@/components/ui/skeleton';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JobImageViewerModal } from '@/components/JobImageViewerModal';

export default function CareersPage() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobs = await getJobPostings();
        setJobPostings(jobs);
      } catch (error) {
        console.error("Failed to fetch job postings:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchJobs();
  }, []);

  return (
    <div className="bg-background">
      <PageHeader
        title="Job Openings"
        description="Join our team and help us shape the future of education. We are looking for passionate and dedicated individuals."
        storageKey="careersPageHeader"
        defaultImage="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop"
        imageHint="team working together"
      />
      <Breadcrumbs />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Current Vacancies at Southland College
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="w-full aspect-[3/4] rounded-lg" />
              ))
            ) : jobPostings.length > 0 ? (
              jobPostings.map((job) => (
                <JobImageViewerModal key={job.id} imageUrl={job.image} altText={job.title}>
                  <div className="bg-secondary rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                    <div className="relative w-full aspect-[3/4]">
                      <Image 
                          src={job.image}
                          alt={job.title}
                          fill
                          className="object-cover"
                      />
                    </div>
                  </div>
                </JobImageViewerModal>
              ))
            ) : (
                <div className="md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-24 text-center">
                    <h3 className="text-lg font-semibold text-muted-foreground">No Openings Available</h3>
                    <p className="text-sm text-muted-foreground">There are currently no job openings. Please check back later.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
