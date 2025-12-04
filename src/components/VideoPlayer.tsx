
'use client';

import { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface VideoPlayerProps {
  src: string;
}

export function VideoPlayer({ src }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the video is in view
  });

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (inView) {
        videoElement.play().catch(error => {
          // Autoplay was prevented. This is common in some browsers.
          // The user will have to interact with the page first.
          console.warn("Video autoplay was prevented:", error);
        });
      } else {
        videoElement.pause();
      }
    }
  }, [inView]);

  return (
    <div ref={ref} className="h-full w-full">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      />
    </div>
  );
}
