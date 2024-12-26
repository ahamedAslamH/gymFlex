import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function ClassTypeSelector({ onSelect }) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="cursor-pointer hover:shadow-lg transition-shadow" 
            onClick={() => onSelect('offline')}>
        <CardHeader>
          <CardTitle>Offline Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-48 w-full mb-4">
            <Image
              src="https://images.unsplash.com/photo-1671321666765-f4630f7eb5f6?q=80&w=1200"
              alt="Offline Classes"
              fill
              className="object-cover rounded-t-xl"
            />
          </div>
          <p className="text-gray-600">Join us at our state-of-the-art facility for personalized training sessions.</p>
          <ul className="mt-4 space-y-2">
            <li>✓ Personal trainer guidance</li>
            <li>✓ Access to all equipment</li>
            <li>✓ Flexible scheduling</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelect('online')}>
        <CardHeader>
          <CardTitle>Online Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-48 w-full mb-4">
            <Image
              src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80"
              alt="Online Classes"
              fill
              className="object-cover rounded-t-xl"
            />
          </div>
          <p className="text-gray-600">Train from anywhere with our live virtual sessions.</p>
          <ul className="mt-4 space-y-2">
            <li>✓ Live video sessions</li>
            <li>✓ Interactive feedback</li>
            <li>✓ Record and review</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 