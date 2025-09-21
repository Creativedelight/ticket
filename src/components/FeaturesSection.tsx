import React from 'react';
import { BarChartIcon, LockIcon, ZapIcon, RefreshCwIcon } from 'lucide-react';
export function FeaturesSection() {
  const features = [{
    name: 'Real-time Analytics',
    description: 'Get detailed insights with our powerful analytics tools. Make data-driven decisions faster.',
    icon: BarChartIcon
  }, {
    name: 'Enterprise Security',
    description: 'Your data is protected with industry-leading security protocols and encryption.',
    icon: LockIcon
  }, {
    name: 'Lightning Fast',
    description: 'Our optimized platform ensures quick loading times and responsive interactions.',
    icon: ZapIcon
  }, {
    name: 'Regular Updates',
    description: 'We continuously improve our platform with new features and performance enhancements.',
    icon: RefreshCwIcon
  }];
  return <div className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Everything you need to take your business to the next level
          </p>
        </div>
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map(feature => <div key={feature.name} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-md text-indigo-600">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {feature.description}
                </p>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
}