import React from 'react';
export function TestimonialsSection() {
  const testimonials = [{
    content: 'This platform has completely transformed how our team works. The analytics features alone have increased our efficiency by 40%.',
    author: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }, {
    content: 'The security features give us peace of mind, and the customer support team is always responsive and helpful.',
    author: 'Michael Chen',
    role: 'CTO, Growth Systems',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }, {
    content: "We've been using this platform for a year now, and it has helped us scale our operations without adding headcount.",
    author: 'Emily Rodriguez',
    role: 'Operations Director, Nova Group',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }];
  return <div className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Trusted by Businesses Worldwide
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Don't just take our word for it - hear what our customers have to
            say
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <img className="h-12 w-12 rounded-full" src={testimonial.image} alt={testimonial.author} />
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600 italic">
                "{testimonial.content}"
              </p>
            </div>)}
        </div>
      </div>
    </div>;
}