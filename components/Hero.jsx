'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export default function Hero() {
  const router = useRouter();
  const [showInfo, setShowInfo] = useState(false);

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  return (
    <div className="relative bg-gray-900 overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          opacity: '0.3'
        }}
      />
      <div className="max-w-7xl mx-auto relative">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <motion.div 
              className="sm:text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block xl:inline">Transform Your Body</span>{' '}
                <span className="block text-indigo-600 xl:inline">Transform Your Life</span>
              </motion.h1>
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Join GymFlex today and start your fitness journey. Our expert trainers and state-of-the-art equipment are here to help you achieve your goals.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button size="lg" className="w-full" onClick={handleGetStarted}>
                    Get Started
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full"
                    onClick={() => setShowInfo(true)}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>

      <Dialog open={showInfo} onOpenChange={setShowInfo}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Welcome to GymFlex</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              At GymFlex, we believe in transforming lives through fitness. Our state-of-the-art facility offers:
            </div>
            <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
              <li>Modern equipment for all fitness levels</li>
              <li>Expert trainers with years of experience</li>
              <li>Personalized workout and nutrition plans</li>
              <li>Both online and offline training options</li>
              <li>Group classes and personal training sessions</li>
              <li>24/7 access for premium members</li>
            </ul>
            <div className="text-sm font-semibold text-muted-foreground">
              Start your fitness journey today and experience the GymFlex difference!
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

