import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Utensils, Hotel, Camera, Compass, Star } from 'lucide-react';


interface DestinationData {
  image: string;
  title: string;
  description: string;
  price: string;
}


const DestinationTemplate = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { title } = useParams();
  const location = useLocation();
  const destination = location.state?.destination as DestinationData;
  const navigate = useNavigate();


  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Compass className="w-5 h-5" /> },
    { id: 'accommodation', label: 'Accommodation', icon: <Hotel className="w-5 h-5" /> },
    { id: 'dining', label: 'Food & Dining', icon: <Utensils className="w-5 h-5" /> },
    { id: 'popular places', label: 'Popular Places', icon: <Star className="w-5 h-5" /> },
  ];


  // Add error handling
  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Destination not found</h1>
          <button
            onClick={() => navigate('/search')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Return to Search
          </button>
        </div>
      </div>
    );
  }


  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">About {destination.title}</h2>
            <p className="text-gray-600 leading-relaxed">{destination.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Best Time to Visit</h3>
                <p className="text-gray-600">March to May, September to November</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Average Cost</h3>
                <p className="text-gray-600">{destination.price} per person</p>
              </div>
            </div>
          </div>
        );
      case 'accommodation':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Where to Stay</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Luxury Hotels</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Grand Hotel Royal</li>
                  <li>Palace Resort & Spa</li>
                  <li>Luxury Collection</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Budget Stays</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Comfort Inn</li>
                  <li>Traveler's Lodge</li>
                  <li>City Hostels</li>
                </ul>
              </div>
            </div>
          </div>
        );
      // Add other cases for remaining tabs...
      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen">
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${destination.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-5xl font-bold mb-4">{destination.title}</h1>
          <p className="text-xl">{destination.description}</p>
          <p className="text-3xl font-bold mt-4">{destination.price}</p>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 py-8">
.        <div className="flex space-x-1 overflow-x-auto border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 transition-colors relative
                ${activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
                }
              `}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>


        <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};


export default DestinationTemplate;



