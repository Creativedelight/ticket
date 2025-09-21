import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
export function HeroSection() {
  return <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Modern solutions for</span>
              <span className="block text-indigo-600">your business</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
              Transform your business with our cutting-edge platform. Streamline
              operations, boost productivity, and drive growth with our
              innovative solutions.
            </p>
            <div className="mt-8 sm:flex">
              <div className="rounded-md shadow">
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  Get started
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                  Learn more
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
              <img className="w-full h-64 object-cover sm:h-72 md:h-96 lg:h-full" src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Team working on project" />
            </div>
          </div>
        </div>
      </div>
    </div>;
}