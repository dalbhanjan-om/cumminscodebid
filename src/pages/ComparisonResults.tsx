import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Hotel, Compass, Utensils } from 'lucide-react';


interface TravelerData {
  type: string;
  rating: number;
  experience: string;
  budget: string;
  duration: string;
  stay: string;
  mustVisit: string[];
  foodRecommendations?: string[];
  accommodations?: {
    budget: string[];
    midRange: string[];
    luxury: string[];
  };
  travelTips?: string[];
}


const ComparisonResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
 
  const destination = location.state?.destination || {
    title: "London",
    description: "Explore the vibrant city of London",
    image: "https://via.placeholder.com/800x400"
  };


  const travelerTypes: TravelerData[] = [
    {
      type: "Solo Traveler",
      rating: 4.6,
      experience: "Experience by Quinn Wilson",
      budget: "$1692 per person",
      duration: "4 days",
      stay: "Mid-range Hotel / Airbnb",
      mustVisit: ["London Eye", "Tower of London", "British Museum"],
      foodRecommendations: ["Borough Market", "Dishoom", "The Clove Club"],
      accommodations: {
        budget: ["Generator Hostel", "YHA London Central"],
        midRange: ["Premier Inn", "CitizenM Tower of London"],
        luxury: ["The Savoy", "Shangri-La The Shard"]
      },
      travelTips: [
        "Get an Oyster card for public transport",
        "Book museums in advance",
        "Join free walking tours"
      ]
    },
    {
      type: "Solo Female Traveler",
      rating: 4.2,
      experience: "Experience by Avery Chen",
      budget: "$840 per person",
      duration: "4 days",
      stay: "Mid-range Hotel / Airbnb",
      mustVisit: [
        "Hyde Park",
        "Camden Market",
        "Natural History Museum",
        "Westminster Abbey"
      ]
    },
    {
      type: "Budget Traveler",
      rating: 4.2,
      experience: "Experience by Taylor Reed",
      budget: "$404 per person",
      duration: "9 days",
      stay: "Hostel / Budget Hotel",
      mustVisit: [
        "Greenwich Park",
        "Tate Modern",
        "St. Paul's Cathedral",
        "Covent Garden"
      ]
    }
  ];


  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Travel Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Average Duration</h3>
                <p className="text-gray-600">4-7 days recommended</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Budget Range</h3>
                <p className="text-gray-600">$400 - $1700 per person</p>
              </div>
            </div>
          </div>
        );


      case "Accommodations":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Recommended Stays</h2>
            {travelerTypes.map((traveler) => (
              <div key={traveler.type} className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">{traveler.type}</h3>
                <p className="mb-2">Preferred: {traveler.stay}</p>
                {traveler.accommodations && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(traveler.accommodations).map(([type, places]) => (
                      <div key={type}>
                        <h4 className="font-medium mb-1 capitalize">{type}</h4>
                        <ul className="list-disc list-inside text-gray-600">
                          {places.map((place, i) => (
                            <li key={i}>{place}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );


      // ...add other cases for remaining tabs...
     
      default:
        return null;
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to london
      </button>


      <div>
        <h1 className="text-3xl font-bold mb-1">Comparing Travel Experiences in london</h1>
        <p className="text-gray-600 mb-6">Compare different travel styles based on real traveler experiences</p>


        {/* Traveler type filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {travelerTypes.map((traveler) => (
            <button
              key={traveler.type}
              className="px-4 py-2 bg-gray-100 rounded-full text-sm"
            >
              {traveler.type}
            </button>
          ))}
        </div>


        {/* Navigation tabs */}
        <div className="flex border-b mb-6">
          {["Overview", "Accommodations", "Food & Dining", "Must-Visit Places", "Travel Tips"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 flex items-center gap-2
                ${activeTab === tab ? "border-b-2 border-blue-600 font-medium" : "text-gray-600"}
              `}
            >
              {tab === "Overview" && <Compass className="w-4 h-4" />}
              {tab === "Accommodations" && <Hotel className="w-4 h-4" />}
              {tab === "Food & Dining" && <Utensils className="w-4 h-4" />}
              {tab === "Must-Visit Places" && <MapPin className="w-4 h-4" />}
              {tab}
            </button>
          ))}
        </div>


        {/* Tab Content */}
        <div className="mb-8">
          {renderTabContent()}
        </div>


        {/* Traveler Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {travelerTypes.map((traveler, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              {/* Card Header with Color Background */}
              <div className="bg-teal-700 text-white p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{traveler.type}</h2>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{traveler.rating}</span>
                  </div>
                </div>
                <p className="text-sm opacity-90">{traveler.experience}</p>
              </div>
             
              {/* Card Body */}
              <div className="bg-white p-4 border border-gray-200">
                {/* Budget */}
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <span className="text-gray-500 mr-2">💰</span>
                    <span className="font-medium">Budget:</span>
                  </div>
                  <div className="text-right">{traveler.budget}</div>
                </div>
               
                {/* Duration */}
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <span className="text-gray-500 mr-2">🕒</span>
                    <span className="font-medium">Duration:</span>
                  </div>
                  <div className="text-right">{traveler.duration}</div>
                </div>
               
                {/* Stay */}
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <span className="text-gray-500 mr-2">🏠</span>
                    <span className="font-medium">Stay:</span>
                  </div>
                  <div className="text-right">{traveler.stay}</div>
                </div>
               
                {/* Must Visit */}
                <div>
                  <div className="flex items-center mb-1">
                    <span className="text-gray-500 mr-2">📍</span>
                    <span className="font-medium">Top Must-Visit:</span>
                  </div>
                  <ul className="list-disc list-inside">
                    {traveler.mustVisit.map((place, i) => (
                      <li key={i} className="text-gray-700">{place}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default ComparisonResults;



