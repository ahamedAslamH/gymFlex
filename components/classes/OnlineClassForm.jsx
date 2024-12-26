'use client'

import { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function OnlineClassForm({ onComplete }) {
  const { user } = useAuth();
  const videoRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const streamRef = useRef(null);

  useEffect(() => {
    // Check if camera is available
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => setHasCamera(true))
      .catch(() => setHasCamera(false));

    // Cleanup function
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  const toggleCamera = async () => {
    if (!isCameraOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
        toast.error('Failed to access camera');
      }
    } else {
      stopCamera();
    }
  };

  const handleComplete = () => {
    stopCamera();
    onComplete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Online Class Setup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex gap-4">
          <Button
            onClick={toggleCamera}
            disabled={!hasCamera}
          >
            {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
          </Button>
          <Button
            onClick={handleComplete}
            disabled={!isCameraOn}
          >
            Continue to Class
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 