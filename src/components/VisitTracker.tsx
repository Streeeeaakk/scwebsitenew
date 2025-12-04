
'use client';

import { useEffect } from 'react';
import { incrementSiteVisit } from '@/app/actions';

export function VisitTracker() {
  useEffect(() => {
    // We only want to run this once per page view on the client.
    // The empty dependency array ensures this.
    incrementSiteVisit();
  }, []);

  return null; // This component does not render anything.
}
