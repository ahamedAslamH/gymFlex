'use client'

import { useState } from 'react';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import WorkoutLogger from '@/components/WorkoutLogger';
import WorkoutHistory from '@/components/WorkoutHistory';
import Navbar from '@/components/Navbar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export default function DashboardPage() {
  const { user, loading } = useRequireAuth();
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [showDietPlan, setShowDietPlan] = useState(false);

  if (loading) return <div>Loading...</div>;

  const getDietPlan = () => {
    // This would typically come from an API or database
    const dietPlans = {
      male: {
        weightLoss: {
          breakfast: ['Oatmeal with protein powder', 'Egg whites with whole grain toast', 'Greek yogurt with berries'],
          lunch: ['Grilled chicken salad', 'Quinoa bowl with vegetables', 'Turkey wrap with avocado'],
          dinner: ['Baked salmon with vegetables', 'Lean beef stir-fry', 'Tofu and vegetable curry'],
          snacks: ['Almonds', 'Protein shake', 'Apple with peanut butter']
        },
        weightGain: {
          breakfast: ['Protein pancakes', 'Whole eggs with oatmeal', 'Smoothie bowl with granola'],
          lunch: ['Brown rice with chicken breast', 'Pasta with meat sauce', 'Tuna sandwich with avocado'],
          dinner: ['Grilled steak with potatoes', 'Chicken curry with rice', 'Fish with quinoa'],
          snacks: ['Trail mix', 'Mass gainer shake', 'Banana with protein bar']
        }
      },
      female: {
        // Similar structure for female diet plans
      }
    };

    return dietPlans;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-8">Workout Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Workout Section */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-8">
              <WorkoutLogger />
              <WorkoutHistory />
            </div>
          </div>

          {/* Diet Plan Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Diet Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  type="number"
                  placeholder="Weight (kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />

                <Input
                  type="number"
                  placeholder="Height (cm)"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />

                <Button 
                  className="w-full"
                  onClick={() => setShowDietPlan(true)}
                  disabled={!gender || !weight || !height}
                >
                  Get Diet Plan
                </Button>
              </CardContent>
            </Card>

            {showDietPlan && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Diet Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {['breakfast', 'lunch', 'dinner', 'snacks'].map((mealTime) => (
                      <div key={mealTime} className="space-y-2">
                        <h3 className="font-semibold capitalize">{mealTime}</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {getDietPlan()[gender].weightLoss[mealTime].map((meal, index) => (
                            <li key={index}>{meal}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 