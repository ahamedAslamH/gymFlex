import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Fitness Enthusiast',
    content: 'GymFlex has completely transformed my fitness journey. The trainers are exceptional and the community is so supportive!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100',
  },
  {
    name: 'Mike Chen',
    role: 'Professional Athlete',
    content: 'As a professional athlete, I need top-notch facilities and expertise. GymFlex delivers on all fronts. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Yoga Instructor',
    content: 'The variety of classes at GymFlex is impressive. It\'s been great for my personal practice and for inspiring my own teaching.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100',
  },
]

export default function Testimonials() {
  return (
    (<section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Members Say
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Don't just take our word for it - hear from our satisfied members.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <CardTitle>{testimonial.name}</CardTitle>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>)
  );
}

