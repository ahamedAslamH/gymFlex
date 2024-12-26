'use client'

import { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

export default function RepCounter() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const detectorRef = useRef(null);
  const requestRef = useRef(null);
  
  const [repCount, setRepCount] = useState(0);
  const [isUp, setIsUp] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize TensorFlow model
  const initializeDetector = async () => {
    setIsLoading(true);
    try {
      const tf = await import('@tensorflow/tfjs');
      const poseDetection = await import('@tensorflow-models/pose-detection');
      
      await tf.ready();
      const model = poseDetection.SupportedModels.MoveNet;
      const detector = await poseDetection.createDetector(model, {
        modelType: 'thunder'
      });
      detectorRef.current = detector;
    } catch (error) {
      console.error('Error loading TensorFlow:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate angle between three points
  const calculateAngle = (a, b, c) => {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - 
                   Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs(radians * 180.0 / Math.PI);
    if (angle > 180.0) angle = 360 - angle;
    return angle;
  };

  // Process each frame
  const detectPose = async () => {
    if (!videoRef.current || !detectorRef.current) return;

    const poses = await detectorRef.current.estimatePoses(videoRef.current);
    
    if (poses.length > 0) {
      const pose = poses[0];
      const rightShoulder = pose.keypoints[6];
      const rightElbow = pose.keypoints[8];
      const rightWrist = pose.keypoints[10];

      if (rightShoulder.score > 0.3 && rightElbow.score > 0.3 && rightWrist.score > 0.3) {
        const angle = calculateAngle(rightShoulder, rightElbow, rightWrist);
        
        // Detect curl movement
        if (!isUp && angle < 50) {
          setIsUp(true);
        } else if (isUp && angle > 160) {
          setIsUp(false);
          setRepCount(prev => prev + 1);
        }
      }
    }

    requestRef.current = requestAnimationFrame(detectPose);
  };

  // Handle camera toggle
  const toggleCamera = async () => {
    if (!isCameraOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraOn(true);
        await initializeDetector();
        requestRef.current = requestAnimationFrame(detectPose);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    } else {
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <Card>
          <CardHeader>
            <CardTitle>Bicep Curl Counter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                  <div className="text-white">Loading TensorFlow.js...</div>
                </div>
              )}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between items-center">
              <Button 
                onClick={toggleCamera}
                disabled={isLoading}
              >
                {isCameraOn ? 'Stop Camera' : 'Start Camera'}
              </Button>
              <div className="text-3xl font-bold">
                Reps: {repCount}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 