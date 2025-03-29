
import { useState, useRef } from "react";
import { Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ImageUploaderProps {
  preview: string | null;
  isAnalyzing: boolean;
  onImageSubmit: (e: React.FormEvent) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader = ({ preview, isAnalyzing, onImageSubmit, onFileChange }: ImageUploaderProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraStream(stream);
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please check permissions or use file upload instead.",
        variant: "destructive"
      });
    }
  };
  
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
      setCameraActive(false);
    }
  };
  
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw the current video frame on the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to blob/file
        canvas.toBlob((blob) => {
          if (blob) {
            // Create a file from the blob
            const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
            
            // Create a synthetic event with the file
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            
            if (fileInputRef.current) {
              // Set the file input's files
              const fileInputEl = fileInputRef.current;
              
              // Create a new event that mimics a file input change
              const event = {
                target: {
                  files: dataTransfer.files
                }
              } as unknown as React.ChangeEvent<HTMLInputElement>;
              
              // Call the onFileChange handler with our synthetic event
              onFileChange(event);
              
              // Stop the camera
              stopCamera();
            }
          }
        }, "image/jpeg", 0.95);
      }
    }
  };
  
  return (
    <form onSubmit={onImageSubmit}>
      <Tabs defaultValue="upload" className="mb-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Image</TabsTrigger>
          <TabsTrigger value="camera" onClick={startCamera}>Take Photo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
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
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
              />
            </label>
          </div>
        </TabsContent>
        
        <TabsContent value="camera">
          <div className="mb-6">
            <div className="relative w-full h-64 overflow-hidden rounded-lg border-2 border-gray-300">
              {cameraActive ? (
                <>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                  <Button 
                    type="button"
                    onClick={captureImage}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-plant-primary hover:bg-plant-dark"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Capture
                  </Button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <Camera className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    Camera will appear here
                  </p>
                </div>
              )}
            </div>
            {/* Hidden canvas for capturing camera image */}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </TabsContent>
      </Tabs>
      
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
