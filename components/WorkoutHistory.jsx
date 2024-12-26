'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, getDocs, onSnapshot } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export default function WorkoutHistory() {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!user) return;

    const workoutsRef = collection(db, 'workouts');
    const q = query(
      workoutsRef,
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const workoutData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate(),
      }));
      setWorkouts(workoutData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching workouts:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const formatDate = (date) => {
    if (!date) return '';
    return format(date, 'PPpp');
  };

  const displayedWorkouts = showAll ? workouts : workouts.slice(0, 5);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Workout History</span>
          <span className="text-sm font-normal text-gray-500">
            Showing {displayedWorkouts.length} of {workouts.length} workouts
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading workouts...</p>
          ) : workouts.length > 0 ? (
            <>
              <div className="space-y-4">
                {displayedWorkouts.map((workout) => (
                  <div 
                    key={workout.id}
                    className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg">{workout.exercise}</h3>
                      <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          workout.type === 'online' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {workout.type || 'offline'}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(workout.timestamp)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 grid grid-cols-3 gap-4">
                      <div className="flex items-center">
                        <span className="font-medium">Sets:</span>
                        <span className="ml-2">{workout.sets}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Reps:</span>
                        <span className="ml-2">{workout.reps}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Weight:</span>
                        <span className="ml-2">{workout.weight}kg</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {workouts.length > 5 && (
                <div className="text-center mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? 'Show Less' : 'Show More'}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No workouts logged yet</p>
              <p className="text-sm text-gray-400 mt-2">
                Start logging your workouts to see your history here
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 