import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, CreditCard, Star, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const destinationsList = [
  {
    image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Paris, France",
    description: "The City of Light awaits with its iconic landmarks and charming streets.",
    category: "popular",
    price: 1499,
    rating: 4.5
  },
  {
    image: "https://images.unsplash.com/photo-1533050487297-09b450131914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Tokyo, Japan",
    description: "Experience the perfect blend of tradition and modern innovation.",
    category: "popular",
    price: 1499,
    rating: 4.5
  },
  {
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Santorini, Greece",
    description: "Discover whitewashed buildings and breathtaking Mediterranean views.",
    category: "popular",
    price: 1499,
    rating: 4.5
  },
  {
    image: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "New York City, USA",
    description: "The city that never sleeps offers endless entertainment and cultural experiences.",
    category: "popular",
    price: 1499,
    rating: 4.5
  },
  {
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Venice, Italy",
    description: "Float through the romantic canals of this timeless Italian city.",
    category: "popular",
    price: 1499,
    rating: 4.5
  },
  {
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Barcelona, Spain",
    description: "Immerse yourself in stunning architecture and vibrant Mediterranean culture.",
    category: "popular",
    price: 1499,
    rating: 4.5
  },
  {
    image: "https://images.unsplash.com/photo-1580674285049-833a8211d816",
    title: "Maldives",
    description: "Crystal clear waters and luxurious overwater bungalows.",
    category: "trending",
    price: 2499,
    rating: 4.8
  },
  {
    image: "https://images.unsplash.com/photo-1549893072-4bc678461494",
    title: "Dubai, UAE",
    description: "Experience luxury and modern architecture in the desert.",
    category: "popular",
    price: 1899,
    rating: 4.7
  }
];

function Destinations() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    rating: 0,
    priceMin: 0,
    priceMax: 5000,
    sortBy: 'recommended'
  });
  
  // Simulated API call
  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    };
    fetchDestinations();
  }, [searchQuery, activeTab]);

  const filteredDestinations = destinationsList.filter(destination => {
    const matchesSearch = destination.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || destination.category === activeTab;
    const matchesPrice = destination.price >= filters.priceMin && destination.price <= filters.priceMax;
    const matchesRating = destination.rating >= filters.rating;
    return matchesSearch && matchesTab && matchesPrice && matchesRating;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleBookNow = (destination: any) => {
    // Convert the destination title to a URL-friendly slug
    const slug = destination.title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/destination/${slug}`, { state: { destination } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Explore Our Destinations</h1>
          <p className="text-xl mb-8 max-w-2xl">Discover amazing places around the world and start planning your next adventure.</p>
          
          {/* Search Bar with Filter Button */}
          <div className="max-w-2xl flex gap-4 items-center">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white text-blue-900 px-4 py-4 rounded-lg flex items-center gap-2 hover:bg-blue-50 transition-colors"
            >
              <Filter className="h-5 w-5" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Filter Dropdown */}
      {showFilters && (
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> Price Range
                </h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange('priceMax', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-600">
                    ${filters.priceMin} - ${filters.priceMax}
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4" /> Minimum Rating
                </h3>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="0">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Sort By
                </h3>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Apply Filters Button */}
              <div className="flex items-end">
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex space-x-4 border-b">
          {['all', 'popular', 'trending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="py-4 flex flex-wrap gap-4 items-center">
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
            <div className="text-sm text-gray-600">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-200">
                <img src={destination.image} alt={destination.title} className="w-full h-64 object-cover"/>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{destination.title}</h3>
                    <span className="text-green-600 font-bold">${destination.price}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-500">★ {destination.rating}</span>
                    <button 
                      onClick={() => handleBookNow(destination)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No destinations found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Destinations;