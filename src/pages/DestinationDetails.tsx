import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Calendar, Users, Globe, Sun, Cloud, Plane } from 'lucide-react';

interface DestinationInfo {
  name: string;
  description: string;
  climate: string;
  bestTimeToVisit: string;
  culturalHighlights: string[];
  averageCost: string;
  travelTips: string[];
  similarDestinations: string[];
}

function DestinationDetails() {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('q') || '';
  const [loading, setLoading] = useState(true);
  const [destinationInfo, setDestinationInfo] = useState<DestinationInfo | null>(null);

  useEffect(() => {
    // Simulated ML API call - replace with actual ML integration
    const fetchDestinationInfo = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual ML API response
        const mockData: DestinationInfo = {
          name: destination,
          description: "A vibrant destination known for its rich cultural heritage, stunning architecture, and diverse culinary scene. The city seamlessly blends historical charm with modern innovation.",
          climate: "Mediterranean climate with warm summers and mild winters. Average temperatures range from 20°C to 30°C in summer and 5°C to 15°C in winter.",
          bestTimeToVisit: "Spring (April-May) and Fall (September-October) offer the most pleasant weather and fewer tourists.",
          culturalHighlights: [
            "Historic city center with UNESCO World Heritage sites",
            "Traditional festivals and local celebrations",
            "World-renowned museums and art galleries",
            "Ancient architectural marvels"
          ],
          averageCost: "$150-200 per day including accommodation, food, and activities",
          travelTips: [
            "Book accommodations in advance during peak season",
            "Use public transportation for easy city navigation",
            "Visit major attractions early morning to avoid crowds",
            "Learn basic local phrases for better communication"
          ],
          similarDestinations: [
            "Barcelona, Spain",
            "Florence, Italy",
            "Vienna, Austria"
          ]
        };
        
        setDestinationInfo(mockData);
      } catch (error) {
        console.error('Error fetching destination info:', error);
      } finally {
        setLoading(false);
      }
    };

    if (destination) {
      fetchDestinationInfo();
    }
  }, [destination]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!destinationInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Destination not found</h2>
          <p className="text-gray-600 mt-2">Please try searching for a different destination.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-blue-600 p-8 text-white">
            <h1 className="text-4xl font-bold mb-4 flex items-center">
              <MapPin className="h-8 w-8 mr-3" />
              {destinationInfo.name}
            </h1>
            <p className="text-xl">{destinationInfo.description}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Climate and Best Time */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Sun className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-semibold">Climate</h2>
            </div>
            <p className="text-gray-600 mb-6">{destinationInfo.climate}</p>
            
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-semibold">Best Time to Visit</h2>
            </div>
            <p className="text-gray-600">{destinationInfo.bestTimeToVisit}</p>
          </div>

          {/* Cultural Highlights */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-semibold">Cultural Highlights</h2>
            </div>
            <ul className="space-y-3">
              {destinationInfo.culturalHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-600">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Tips */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Plane className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-semibold">Travel Tips</h2>
            </div>
            <ul className="space-y-3">
              {destinationInfo.travelTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">{index + 1}.</span>
                  <span className="text-gray-600">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Similar Destinations */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Cloud className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-semibold">Similar Destinations</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {destinationInfo.similarDestinations.map((destination, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition duration-150">
                  <span className="text-gray-600">{destination}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cost Information */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold">Average Daily Cost</h2>
          </div>
          <p className="text-gray-600">{destinationInfo.averageCost}</p>
        </div>
      </div>
    </div>
  );
}

export default DestinationDetails;