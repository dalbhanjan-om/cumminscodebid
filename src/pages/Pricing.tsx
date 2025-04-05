import React from 'react';
import { Check } from 'lucide-react';

function Pricing() {
  const plans = [
    {
      name: 'Basic Explorer',
      price: '$9.99',
      period: 'month',
      description: 'Perfect for occasional travelers',
      features: [
        'Access to basic travel guides',
        'Community forum access',
        'Basic trip planning tools',
        'Email support'
      ]
    },
    {
      name: 'Premium Voyager',
      price: '$19.99',
      period: 'month',
      description: 'For serious travel enthusiasts',
      features: [
        'All Basic Explorer features',
        'Premium travel guides',
        'Priority support',
        'Exclusive deals and discounts',
        'Advanced trip planning tools'
      ],
      popular: true
    },
    {
      name: 'Elite Adventurer',
      price: '$39.99',
      period: 'month',
      description: 'Ultimate travel experience',
      features: [
        'All Premium Voyager features',
        'Personal travel consultant',
        'Custom itinerary creation',
        'VIP airport lounge access',
        'Luxury hotel upgrades',
        '24/7 concierge service'
      ]
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Choose Your Travel Plan</h2>
          <p className="text-xl text-gray-600">Select the perfect membership for your travel style</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-blue-500 text-white text-center py-2">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">/{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  Get Started
                </button>
              </div>
              <div className="border-t border-gray-100 p-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pricing;