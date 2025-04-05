import React, { useState } from 'react';
import { ArrowRight, Globe, Shield, Users, Search, MapPin, Hotel, Utensils, Map, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/destination?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTravelerType, setSelectedTravelerType] = useState('all');

  const travelerTypes = [
    { id: 'all', label: 'All Travelers' },
    { id: 'solo', label: 'Solo Traveler' },
    { id: 'couple', label: 'Couples' },
    { id: 'family', label: 'Family' },
    { id: 'group', label: 'Group' }
  ];

  const explorerContent = (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-4 mb-8 border-b">
          {['Overview', 'Attractions', 'Food & Dining', 'Practical Info'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-6 py-3 font-medium ${
                activeTab === tab.toLowerCase()
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Traveler Type</h3>
          <div className="flex flex-wrap gap-4">
            {travelerTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedTravelerType(type.id)}
                className={`px-4 py-2 rounded-full ${
                  selectedTravelerType === type.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Hotel className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Accommodations</h3>
            <p className="text-gray-600 mb-4">Find perfect stays from luxury hotels to cozy hostels.</p>
            <Link to="/accommodations" className="text-blue-600 hover:underline">View Options →</Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Map className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Must Visit Places</h3>
            <p className="text-gray-600 mb-4">Discover iconic landmarks and hidden gems.</p>
            <Link to="/attractions" className="text-blue-600 hover:underline">Explore Places →</Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Info className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Travel Tips</h3>
            <p className="text-gray-600 mb-4">Expert advice for a perfect trip.</p>
            <Link to="/tips" className="text-blue-600 hover:underline">Read More →</Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-blue-900/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center">
          <div className="text-white text-center max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Explore the World with TravelGuild</h1>
            <p className="text-xl mb-8">Join our exclusive travel community and discover breathtaking destinations with expert-curated experiences.</p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto mb-8">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where would you like to go?"
                  className="w-full pl-12 pr-20 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition duration-150 flex items-center"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </button>
              </div>
            </form>

            <Link to="/pricing" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mt-8 transition duration-150">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {explorerContent}

      {/* Featured Destinations */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                title: "Paris, France",
                description: "The City of Light awaits with its iconic landmarks and charming streets."
              },
              {
                image: "https://images.unsplash.com/photo-1533050487297-09b450131914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                title: "Tokyo, Japan",
                description: "Experience the perfect blend of tradition and modern innovation."
              },
              {
                image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                title: "Santorini, Greece",
                description: "Discover whitewashed buildings and breathtaking Mediterranean views."
              }
            ].map((destination, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-200">
                <img src={destination.image} alt={destination.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{destination.title}</h3>
                  <p className="text-gray-600">{destination.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/destination" 
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-150"
            >
              Discover More Destinations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;