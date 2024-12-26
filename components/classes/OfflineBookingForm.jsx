'use client'

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function OfflineBookingForm({ onComplete }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    fitnessGoal: '',
    preferredTime: '',
    medicalConditions: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'classBookings'), {
        userId: user.uid,
        type: 'offline',
        ...formData,
        timestamp: new Date(),
      });
      onComplete();
    } catch (error) {
      console.error('Error booking class:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Weight (kg)</label>
              <Input
                type="number"
                required
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Height (cm)</label>
              <Input
                type="number"
                required
                value={formData.height}
                onChange={(e) => setFormData({...formData, height: e.target.value})}
              />
            </div>
          </div>
          {/* Add more form fields */}
          <Button type="submit">Continue to Workout Plans</Button>
        </form>
      </CardContent>
    </Card>
  );
} 