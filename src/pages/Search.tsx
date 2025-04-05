import React, { useState } from 'react';
import { Search as SearchIcon, MapPin, Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();


  const destinations = [
    {
      image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "Rome, Italy",
      description: "Explore ancient history and modern culture in the Eternal City.",
      price: "$1,299"
    },
    {
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "Bali, Indonesia",
      description: "Experience tropical paradise and rich cultural heritage.",
      price: "$899"
    },
    {
      image: "https://images.unsplash.com/photo-1492714729882-9edf81a65fcd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "Swiss Alps",
      description: "Discover breathtaking mountain views and luxury resorts.",
      price: "$1,499"
    }
  ];


  const handleViewDetails = (destination) => {
    navigate(`/destination/${encodeURIComponent(destination.title)}`, {
      state: { destination }
    });
  };


  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-center mb-8">Find Your Perfect Destination</h1>
       
        {/* Search Filters */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Where to?"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>2 Travelers</option>
                <option>1 Traveler</option>
                <option>3 Travelers</option>
                <option>4+ Travelers</option>
              </select>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg flex items-center justify-center transition duration-150">
              <SearchIcon className="h-5 w-5 mr-2" />
              Search
            </button>
          </div>
        </div>
      </div>


      {/* Search Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {destinations.map((destination, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-200">
            <img src={destination.image} alt={destination.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{destination.title}</h3>
              <p className="text-gray-600 mb-4">{destination.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">{destination.price}</span>
                <button
                  onClick={() => handleViewDetails(destination)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-150"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default SearchPage;

