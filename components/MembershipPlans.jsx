'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PaymentModal from './PaymentModal';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const plans = [
  {
    name: 'Basic',
    price: '₹2,499',
    features: ['Access to gym equipment', '2 group classes per week', 'Locker room access'],
  },
  {
    name: 'Pro',
    price: '₹4,999',
    features: ['Access to gym equipment', 'Unlimited group classes', 'Personal trainer session (1/month)', 'Locker room access'],
  },
  {
    name: 'Elite',
    price: '₹7,999',
    features: ['24/7 gym access', 'Unlimited group classes', 'Personal trainer sessions (2/month)', 'Nutrition consultation', 'Access to sauna and spa'],
  },
];

export default function MembershipPlans() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelection = (plan) => {
    if (!user) {
      toast.error('Please login to purchase a membership');
      return;
    }
    setSelectedPlan(plan);
  };

  const handleClosePayment = () => {
    setSelectedPlan(null);
  };

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Membership Plans
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the plan that fits your needs
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`flex flex-col justify-between transform transition-all duration-200 hover:scale-105 hover:shadow-xl ${
                plan.name === 'Pro' ? 'border-indigo-500 border-2' : ''
              }`}
            >
              <CardHeader>
                {plan.name === 'Pro' && (
                  <div className="absolute top-0 right-0 -mt-4 mr-4">
                    <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Popular
                    </span>
                  </div>
                )}
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-4xl font-bold text-indigo-600">
                  {plan.price}
                  <span className="text-base font-normal text-gray-500">/month</span>
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => handlePlanSelection(plan)}
                >
                  Choose Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Payment Modal */}
        {selectedPlan && (
          <PaymentModal
            isOpen={!!selectedPlan}
            onClose={handleClosePayment}
            plan={selectedPlan}
          />
        )}
      </div>
    </section>
  );
}

