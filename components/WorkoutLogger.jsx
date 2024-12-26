'use client'

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const exerciseTypes = [
  'Bench Press', 'Squats', 'Deadlifts', 'Pull-ups', 
  'Push-ups', 'Shoulder Press', 'Bicep Curls', 'Tricep Extensions'
];

export default function WorkoutLogger() {
  const { user } = useAuth();
  const [workout, setWorkout] = useState({
    exercise: '',
    sets: '',
    reps: '',
    weight: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to log workouts');
      return;
    }

    setLoading(true);
    try {
      const workoutData = {
        userId: user.uid,
        exercise: workout.exercise,
        sets: parseInt(workout.sets),
        reps: parseInt(workout.reps),
        weight: parseFloat(workout.weight),
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, 'workouts'), workoutData);
      
      toast.success('Workout logged successfully!');
      
      // Reset form
      setWorkout({
        exercise: '',
        sets: '',
        reps: '',
        weight: '',
      });
    } catch (error) {
      console.error('Error logging workout:', error);
      toast.error('Failed to log workout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Log Your Workout</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Exercise
            </label>
            <select
              value={workout.exercise}
              onChange={(e) => setWorkout({ ...workout, exercise: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select Exercise</option>
              {exerciseTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sets
              </label>
              <Input
                type="number"
                min="1"
                value={workout.sets}
                onChange={(e) => setWorkout({ ...workout, sets: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reps
              </label>
              <Input
                type="number"
                min="1"
                value={workout.reps}
                onChange={(e) => setWorkout({ ...workout, reps: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
              <Input
                type="number"
                min="0"
                step="0.5"
                value={workout.weight}
                onChange={(e) => setWorkout({ ...workout, weight: e.target.value })}
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Logging...' : 'Log Workout'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 