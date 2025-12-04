
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { ImageIcon, Loader2, AlertTriangle, Film } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface UploadResult {
    url: string;
    path: string;
}

interface ImageUploaderProps {
    storageKey?: string; 
    title: string;
    description: string;
    imageUrl: string;
    onImageSave: (result: UploadResult) => void;
    folder?: string;
}

const isVideoUrl = (url: string) => {
    return url.match(/\.(mp4|webm|ogg|mov)$/i) !== null;
}

export const ImageUploader = ({ storageKey, title, description, imageUrl, onImageSave, folder = 'images' }: ImageUploaderProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleFileSelect = async (file: File | null | undefined) => {
        if (!file) return;
        if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
            toast({ variant: 'destructive', title: 'Invalid File Type', description: 'Please upload an image or video file.' });
            return;
        }

        setSelectedFile(file);
        setIsUploading(true);
        setUploadProgress(0);
        setUploadError(null);

        // Simulate progress for immediate feedback
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            if (progress < 90) {
              setUploadProgress(progress);
            }
        }, 150);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder); 
        
        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          const result = await response.json();

          clearInterval(interval);
          setUploadProgress(100);

          if (!response.ok || result.error || !result.url || !result.path) {
              const errorMessage = result.error || 'An unknown error occurred.';
              setUploadError(errorMessage);
              toast({ variant: 'destructive', title: 'Upload Failed', description: errorMessage });
          } else {
              onImageSave({ url: result.url, path: result.path });
              toast({ title: 'File Uploaded!', description: 'The new file has been saved and is now live.' });
          }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
            setUploadError(errorMessage);
            toast({ variant: 'destructive', title: 'Upload Exception', description: errorMessage });
        } finally {
            setTimeout(() => {
                setIsUploading(false);
                setSelectedFile(null);
            }, 1000);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(false); };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        handleFileSelect(file);
    };

    const renderPreview = () => {
        if (isUploading && selectedFile) {
            return (
                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground h-full p-4">
                    <Loader2 className="h-10 w-10 animate-spin" />
                    <p className="font-medium">Uploading...</p>
                    <p className="text-xs truncate max-w-full">"{selectedFile.name}"</p>
                    <Progress value={uploadProgress} className="w-3/4 mt-2" />
                </div>
            )
        }
        if (uploadError) {
             return (
                 <div className="flex flex-col items-center justify-center gap-2 text-destructive h-full p-4">
                    <AlertTriangle className="h-10 w-10" />
                    <p className="font-semibold">Upload Failed</p>
                    <p className="text-xs text-center">{uploadError}</p>
                    <Button variant="secondary" size="sm" className="mt-2" onClick={(e) => { e.stopPropagation(); setUploadError(null); }}>Try Again</Button>
                 </div>
             )
        }
        if (imageUrl) {
            if (isVideoUrl(imageUrl)) {
                return <video src={imageUrl} controls className="h-full w-full object-contain" key={imageUrl}></video>
            }
            return <Image src={imageUrl} alt="Image preview" fill className="object-cover" key={imageUrl} />
        }
        return (
            <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground h-full">
                <ImageIcon className="h-10 w-10" />
                <p>Drag & drop a file here, or click to select</p>
            </div>
        )
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div
                    className={cn(
                        'relative w-full border-2 border-dashed rounded-lg p-4 text-center transition-colors',
                        { 'cursor-pointer hover:border-primary/80': !isUploading },
                        isDragging ? 'border-primary bg-primary/10' : 'border-input',
                        uploadError ? 'border-destructive bg-destructive/10' : ''
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => !isUploading && fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*,video/*"
                        onChange={(e) => handleFileSelect(e.target.files?.[0])}
                        disabled={isUploading}
                    />
                    <div className="relative aspect-video w-full rounded-md overflow-hidden bg-muted">
                       {renderPreview()}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
