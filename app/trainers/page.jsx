'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { motion } from 'framer-motion';

const trainers = [
  {
    name: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?q=80&w=500',
    specialization: 'Cardio & HIIT',
    achievements: [
      'NASM Certified Personal Trainer',
      '10+ years experience in HIIT training',
      'Former Olympic athlete',
      'Helped 1000+ clients achieve their fitness goals'
    ],
    description: 'Specializes in high-intensity cardio workouts and endurance training.',
  },
  {
    name: 'Mike Thompson',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=500',
    specialization: 'Strength & Powerlifting',
    achievements: [
      'ISSA Master Trainer',
      'National Powerlifting Champion',
      '15+ years of strength coaching',
      'Certified Nutrition Specialist'
    ],
    description: 'Expert in strength training and muscle development programs.',
  },
  {
    name: 'Emma Chen',
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=500',
    specialization: 'Yoga & Flexibility',
    achievements: [
      'RYT-500 Yoga Certification',
      'Former professional dancer',
      'Mindfulness meditation expert',
      'Specialized in injury recovery'
    ],
    description: 'Combines traditional yoga with modern flexibility training.',
  },
  {
    name: 'David Rodriguez',
    image: 'https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?q=80&w=500',
    specialization: 'CrossFit & Functional Training',
    achievements: [
      'CrossFit Level 3 Trainer',
      'Former military fitness instructor',
      'Sports nutrition certified',
      'Functional movement specialist'
    ],
    description: 'Focuses on functional fitness and athletic performance.',
  },
  {
    name: 'Lisa Parker',
    image: 'https://images.unsplash.com/photo-1518310952931-b1de897abd40?q=80&w=500',
    specialization: 'Weight Loss & Nutrition',
    achievements: [
      'ACE Certified Personal Trainer',
      'Precision Nutrition Coach',
      'Weight management specialist',
      'Transformation specialist of the year 2023'
    ],
    description: 'Expert in sustainable weight loss and lifestyle transformation.',
  }
];

export default function TrainersPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-8">Our Expert Trainers</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64 w-full">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="space-y-2">
                    <CardTitle>{trainer.name}</CardTitle>
                    <Badge variant="secondary">{trainer.specialization}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{trainer.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {trainer.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 