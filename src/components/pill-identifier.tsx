"use client";

import { useState, useRef, useTransition } from "react";
import Image from "next/image";
import { Camera, FileUp, Loader2, Pill, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { handleIdentifyAndSummarize } from "@/lib/actions";
import type { IdentifyMedicineOutput } from "@/ai/flows/identify-medicine";

type Result = {
  identification: IdentifyMedicineOutput;
  summary: string;
} | null;

export function PillIdentifier() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<Result>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      setResult(null);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
    setPreview(null);
    setFile(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setError(null);
    setResult(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("image", file);
      const res = await handleIdentifyAndSummarize(formData);

      if (res.error) {
        setError(res.error);
      } else if (res.identification && res.summary) {
        setResult({ identification: res.identification, summary: res.summary });
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pill Identifier</CardTitle>
          <CardDescription>Upload a photo of a pill to identify it using AI.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
            
            {!preview ? (
              <div 
                className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => fileInputRef.current?.click()}
                onDrop={(e) => { e.preventDefault(); handleFileChange({ target: { files: e.dataTransfer.files } } as any); }}
                onDragOver={(e) => e.preventDefault()}
              >
                <FileUp className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 font-semibold">Click to upload or drag and drop</p>
                <p className="text-sm text-muted-foreground">PNG, JPG, or WEBP</p>
              </div>
            ) : (
              <div className="relative group">
                <Image
                  src={preview}
                  alt="Pill preview"
                  width={300}
                  height={300}
                  className="w-full h-auto max-h-80 object-contain rounded-lg border"
                  data-ai-hint="pill medication"
                />
                <Button variant="destructive" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleRemoveImage}>
                  <X className="h-4 w-4" />
                   <span className="sr-only">Remove Image</span>
                </Button>
              </div>
            )}
            
            <Button type="submit" disabled={isPending || !file} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Identifying...
                </>
              ) : (
                <>
                  <Camera className="mr-2 h-4 w-4" />
                  Identify Pill
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {isPending && <LoadingState />}
      {error && <ErrorState message={error} />}
      {result && <ResultState result={result} />}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
            <Skeleton className="h-8 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-6 w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
            <Skeleton className="h-8 w-1/3" />
        </CardHeader>
        <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Identification Failed</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

function ResultState({ result }: { result: Result }) {
  if (!result) return null;
  const confidencePercent = Math.round(result.identification.confidence * 100);

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-6 w-6 text-primary" />
            Identification Result
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-2xl font-bold">{result.identification.medicineName}</p>
          <div>
            <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium">Confidence</p>
                <p className="text-sm font-bold text-primary">{confidencePercent}%</p>
            </div>
            <Progress value={confidencePercent} className="w-full" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent-foreground fill-accent" />
            AI-Powered Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap leading-relaxed">{result.summary}</p>
        </CardContent>
      </Card>
    </div>
  );
}
