'use client'

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import Image from 'next/image';

const workoutPlans = {
  online: [
    {
      image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1200',
      name: 'Beginner HIIT',
      duration: '30 mins',
      intensity: 'Low to Medium',
      schedule: ['Mon', 'Wed', 'Fri'],
      description: 'Perfect for beginners looking to build stamina and strength.',
    },
    {
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200',
      name: 'Yoga Flow',
      duration: '45 mins',
      intensity: 'Low',
      schedule: ['Tue', 'Thu', 'Sat'],
      description: 'Improve flexibility and mindfulness with guided yoga sessions.',
    },
    {
      image: 'https://images.unsplash.com/photo-1532383282788-13726c9b0820?q=80&w=1200',
      name: 'Dance Fitness',
      duration: '45 mins',
      intensity: 'Medium',
      schedule: ['Mon', 'Wed', 'Fri'],
      description: 'Fun cardio workout through dance movements.',
    },
    {
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200',
      name: 'Core Pilates',
      duration: '40 mins',
      intensity: 'Medium',
      schedule: ['Tue', 'Thu'],
      description: 'Strengthen your core and improve posture.',
    }
  ],
  offline: [
    {
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200',
      name: 'Strength Training',
      duration: '60 mins',
      intensity: 'High',
      schedule: ['Mon', 'Wed', 'Fri'],
      description: 'Build muscle and strength with professional guidance.',
    },
    {
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200',
      name: 'Circuit Training',
      duration: '45 mins',
      intensity: 'Medium to High',
      schedule: ['Tue', 'Thu'],
      description: 'Full-body workout combining cardio and strength exercises.',
    },
    {
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1200',
      name: 'CrossFit',
      duration: '50 mins',
      intensity: 'High',
      schedule: ['Mon', 'Wed', 'Fri'],
      description: 'High-intensity functional training for overall fitness.',
    },
    {
      image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200',
      name: 'Boxing Fitness',
      duration: '45 mins',
      intensity: 'High',
      schedule: ['Tue', 'Thu', 'Sat'],
      description: 'Learn boxing techniques while getting a full-body workout.',
    }
  ],
};

export default function WorkoutPlans({ classType }) {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBooking = async (plan) => {
    if (!user) {
      toast.error('Please log in to book a class');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        planName: plan.name,
        classType,
        timestamp: new Date(),
        schedule: plan.schedule,
      });
      
      toast.success('Class booked successfully!');
      setSelectedPlan(plan);
    } catch (error) {
      console.error('Error booking class:', error);
      toast.error('Failed to book class');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Available Workout Plans</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {workoutPlans[classType].map((plan, index) => (
          <Card 
            key={index}
            className={`overflow-hidden ${
              selectedPlan?.name === plan.name ? 'ring-2 ring-indigo-500' : ''
            }`}
          >
            <div className="relative h-48 w-full">
              <Image
                src={plan.image}
                alt={plan.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Duration: {plan.duration}</p>
                  <p className="text-sm text-gray-500">Intensity: {plan.intensity}</p>
                  <p className="text-sm text-gray-500">Schedule: {plan.schedule.join(', ')}</p>
                  <p className="mt-2">{plan.description}</p>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleBooking(plan)}
                  disabled={loading}
                >
                  {loading ? 'Booking...' : 'Book Now'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 