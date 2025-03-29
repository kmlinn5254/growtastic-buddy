
import { useState } from "react";
import { Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface ImageUploaderProps {
  preview: string | null;
  isAnalyzing: boolean;
  onImageSubmit: (e: React.FormEvent) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader = ({ preview, isAnalyzing, onImageSubmit, onFileChange }: ImageUploaderProps) => {
  const { toast } = useToast();
  
  return (
    <form onSubmit={onImageSubmit}>
      <div className="mb-6">
        <label 
          htmlFor="image-upload" 
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer
            ${preview ? 'border-plant-primary bg-plant-light/10' : 'border-gray-300 hover:border-plant-light bg-gray-50'}`}
        >
          {preview ? (
            <img 
              src={preview} 
              alt="Plant preview" 
              className="h-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 10MB)</p>
            </div>
          )}
          <Input 
            id="image-upload" 
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
        </label>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-plant-primary hover:bg-plant-dark"
        disabled={isAnalyzing || !preview}
      >
        {isAnalyzing ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin">⏳</span>
            Analyzing...
          </>
        ) : (
          <>
            <Camera className="mr-2 h-4 w-4" />
            Analyze Plant
          </>
        )}
      </Button>
    </form>
  );
};

export default ImageUploader;
