'use client'

import { useState, useEffect } from 'react'
import { Award, Users, Wrench, Star } from 'lucide-react'

const WhyChooseUs = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    const testimonials = [
        {
            name: "Susan S.",
            text: "This is our go-to for repairs and service on our Silverado HD2500. Great customer service. We recommend them!",
            rating: 5
        },
        {
            name: "Gene G.",
            text: "Amazing! Best team in the business. Drew and the crew always take great care of us. Everyone I recommend them to has had the same experience.",
            rating: 5
        },
        {
            name: "Milo R.",
            text: "Great service! Anthony and Donovan and their staff are top notch. They go above and beyond your typical service. If you need injector work done on your diesel this is the place to go. My 03' Duramax runs better than new. Thank you Guys for such great work, greatly appreciated.",
            rating: 5
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          <div>
            <h2 className="text-4xl font-bold mb-6">Why Choose Us?</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Bosch Certified Excellence</h3>
                  <p className="text-gray-400">First Diesel Vehicle Diagnostic facility in the United States, certified by Bosch for the highest standards of service.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">75 Years of Trust</h3>
                  <p className="text-gray-400">Three generations of expertise serving the diesel community with unmatched knowledge and reliability.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">State-of-the-Art Equipment</h3>
                  <p className="text-gray-400">Latest diagnostic tools and precision equipment ensuring your diesel systems perform at their peak.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-2xl">
            <div className="bg-gray-800 p-6 rounded-xl h-80 flex flex-col">
              <h3 className="text-2xl font-bold mb-4 text-center">Customer Testimonial</h3>

              <div className="flex-1 flex flex-col justify-center text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>

                <div className="h-24 mb-4 flex items-center justify-center">
                  <p className="text-lg italic text-center leading-relaxed line-clamp-4 overflow-hidden">
                    "{testimonials[activeTestimonial].text}"
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="font-semibold">{testimonials[activeTestimonial].name}</div>
                </div>
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === activeTestimonial ? 'bg-blue-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs