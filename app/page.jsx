import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import MembershipPlans from '../components/MembershipPlans'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

export default function Home() {
  return (
    (<div className="min-h-screen bg-gray-100">
      <Navbar />
      <Hero />
      <Features />
      <MembershipPlans />
      <Testimonials />
      <Footer />
    </div>)
  );
}

