'use client'

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import ClassTypeSelector from '@/components/classes/ClassTypeSelector';
import OfflineBookingForm from '@/components/classes/OfflineBookingForm';
import OnlineClassForm from '@/components/classes/OnlineClassForm';
import WorkoutPlans from '@/components/classes/WorkoutPlans';

export default function ClassesPage() {
  const { user } = useAuth();
  const [classType, setClassType] = useState(null);
  const [showWorkoutPlans, setShowWorkoutPlans] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-8">Fitness Classes</h1>
        
        {!classType ? (
          <ClassTypeSelector onSelect={setClassType} />
        ) : (
          <div className="space-y-8">
            <Button 
              variant="outline" 
              onClick={() => {
                setClassType(null);
                setShowWorkoutPlans(false);
              }}
            >
              ← Back to Class Types
            </Button>

            {classType === 'offline' && (
              <OfflineBookingForm onComplete={() => setShowWorkoutPlans(true)} />
            )}

            {classType === 'online' && (
              <OnlineClassForm onComplete={() => setShowWorkoutPlans(true)} />
            )}

            {showWorkoutPlans && <WorkoutPlans classType={classType} />}
          </div>
        )}
      </div>
    </div>
  );
} 


//  <by aslam></by>    