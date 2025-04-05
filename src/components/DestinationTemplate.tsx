import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Hotel, Compass, Users, ChevronUp, ChevronDown, X } from 'lucide-react';


interface DestinationData {
  image: string;
  title: string;
  description: string;
  price: string;
}


interface ComparisonOptions {
  travelers: string[];
  count: number;
}


const DestinationTemplate = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonOptions, setComparisonOptions] = useState<ComparisonOptions>({
    travelers: [],
    count: 1
  });
  const { title } = useParams();
  const location = useLocation();
  const destination = location.state?.destination || {
    image: "https://via.placeholder.com/800x400",
    title: "London",
    description: "Explore the vibrant city of London, known for its rich history, iconic landmarks, and diverse culture.",
    price: "$1500"
  };
  const navigate = useNavigate();


  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Compass className="w-5 h-5" /> },
    { id: 'accommodation', label: 'Accommodation', icon: <Hotel className="w-5 h-5" /> },
    { id: 'tips', label: 'Travel Tips', icon: <MapPin className="w-5 h-5" /> },
  ];


  const travelerTypes = [
    { id: 'solo-m', label: 'Solo Male' },
    { id: 'solo-f', label: 'Solo Female' },
    { id: 'family', label: 'Family' },
    { id: 'couple', label: 'Couple' },
    { id: 'group', label: 'Friend Group' },
    { id: 'senior', label: 'Senior' },
    { id: 'business', label: 'Business' }
  ];


  const handleCompare = () => {
    if (comparisonOptions.travelers.length > 0) {
      navigate('/comparison-results', {
        state: {
          destination,
          options: comparisonOptions
        }
      });
    }
  };


  const handleTravelerTypeChange = (type: string) => {
    setComparisonOptions(prev => ({
      ...prev,
      travelers: prev.travelers.includes(type)
        ? prev.travelers.filter(t => t !== type)
        : [...prev.travelers, type]
    }));
  };


  const renderComparisonPanel = () => (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50
        ${showComparison ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Compare Options</h3>
          <button
            onClick={() => setShowComparison(false)}
            className="hover:bg-gray-100 p-1 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>


        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Travelers
            </label>
            <input
              type="number"
              min="1"
              value={comparisonOptions.count}
              onChange={(e) => setComparisonOptions(prev => ({
                ...prev,
                count: parseInt(e.target.value)
              }))}
              className="w-full p-2 border rounded-md"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Traveler Type
            </label>
            <div className="space-y-2">
              {travelerTypes.map(type => (
                <label key={type.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={comparisonOptions.travelers.includes(type.label)}
                    onChange={() => handleTravelerTypeChange(type.label)}
                    className="rounded text-blue-600"
                  />
                  <span>{type.label}</span>
                </label>
              ))}
            </div>
          </div>


          <button
            onClick={() => {
              if (comparisonOptions.travelers.length > 0) {
                setShowComparison(false);
                navigate('/comparison-results', {
                  state: {
                    destination,
                    options: comparisonOptions
                  }
                });
              }
            }}
            disabled={comparisonOptions.travelers.length === 0}
            className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors"
          >
            View Comparison
          </button>
        </div>
      </div>
    </div>
  );


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
            {comparisonOptions.travelers.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-bold mb-2">Comparison for {comparisonOptions.count} travelers</h3>
                <p>Total estimated cost: ${parseInt(destination.price.replace(/\D/g, '')) * comparisonOptions.count}</p>
                <div className="mt-2">
                  <p className="font-semibold">Travel type recommendations:</p>
                  <ul className="list-disc list-inside">
                    {comparisonOptions.travelers.map(type => (
                      <li key={type}>{type} - Recommended season: {type === 'Family' ? 'Summer' : 'Spring/Fall'}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
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
      <div className="relative">
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
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="absolute bottom-4 right-4 bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 hover:bg-blue-50 transition-colors"
        >
          <Users className="w-5 h-5" />
          <span>Compare</span>
          {showComparison ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>


      <div className="max-w-7xl mx-auto px-4 py-8">
        {renderComparisonPanel()}
        <div className="flex space-x-1 overflow-x-auto border-b border-gray-200">
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











