import React, { useState } from 'react';
import { Check, X, CreditCard } from 'lucide-react';


function Pricing() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);


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


  const faqs = [
    {
      question: "How does the billing cycle work?",
      answer: "Your subscription starts the day you subscribe and renews monthly. You can cancel anytime before the next billing cycle."
    },
    {
      question: "Can I switch between plans?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. The new rate will be prorated for the remainder of the billing cycle."
    },
    {
      question: "Is there a refund policy?",
      answer: "We offer a 14-day money-back guarantee for all new subscriptions. After that, refunds are handled on a case-by-case basis."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal."
    }
  ];


  const handleGetStarted = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };


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
                  onClick={() => handleGetStarted(plan)}
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


        {/* FAQs Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>


        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full m-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Complete Purchase</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>


              {selectedPlan && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold">{selectedPlan.name}</p>
                  <p className="text-gray-600">{selectedPlan.price}/{selectedPlan.period}</p>
                </div>
              )}


              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="1234 5678 9012 3456"
                    />
                    <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>


                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="123"
                    />
                  </div>
                </div>


                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default Pricing;
