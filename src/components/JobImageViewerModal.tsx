
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';

interface JobImageViewerModalProps {
  children: React.ReactNode;
  imageUrl: string;
  altText: string;
}

export function JobImageViewerModal({ children, imageUrl, altText }: JobImageViewerModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl w-full p-0 border-0 bg-transparent shadow-none">
        <DialogHeader className="sr-only">
          <DialogTitle>{altText}</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-[2/3] w-full max-w-2xl mx-auto h-auto max-h-[90vh]">
            <Image
                src={imageUrl}
                alt={altText}
                fill
                sizes="90vw"
                className="object-contain"
            />
        </div>
      </DialogContent>
    </Dialog>
  );
}
