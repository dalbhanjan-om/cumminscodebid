import React, { useState } from 'react';
import { CreditCard, Calendar, Lock } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: {
    title: string;
    price: number;
  };
}

export function PaymentModal({ isOpen, onClose, destination }: PaymentModalProps) {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
        <p className="mb-4">Booking for: {destination.title}</p>
        <p className="text-xl font-bold mb-6">Total: ${destination.price}</p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Card Number</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Expiry Date</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="123"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cardholder Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="John Doe"
            />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
