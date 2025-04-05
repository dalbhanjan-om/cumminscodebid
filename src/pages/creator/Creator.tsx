import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ImagePlus, Plus, Save } from 'lucide-react';

function Creator() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('basic-info');

  useEffect(() => {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(userJson);
    if (user.role !== 'Creator') {
      navigate('/');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    basicInfo: {
      destination: '',
      description: '',
      tripDuration: '',
      approximateCost: '',
      accommodation: '',
    },
    attractions: [{
      name: '',
      description: ''
    }],
    foodAndDining: {
      recommendations: ''
    },
    travelTips: '',
    photos: [] as File[]
  });

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [e.target.name]: e.target.value
      }
    }));
  };

  const addAttraction = () => {
    setFormData(prev => ({
      ...prev,
      attractions: [...prev.attractions, { name: '', description: '' }]
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }));
  };

  const handlePublish = async () => {
    setIsSaving(true);
    try {
      // Here you would typically send the formData to your backend
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error publishing post:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <button 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          onClick={handlePublish}
          disabled={isSaving}
        >
          <Save className="w-5 h-5 mr-2" />
          {isSaving ? 'Publishing...' : 'Publish'}
        </button>
      </div>
      
      <Tabs defaultValue="basic-info" className="space-y-6">
        <TabsList>
          <TabsTrigger value="basic-info">Basic Information</TabsTrigger>
          <TabsTrigger value="attractions">Attractions</TabsTrigger>
          <TabsTrigger value="food-dining">Food & Dining</TabsTrigger>
          <TabsTrigger value="travel-tips">Travel Tips</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.basicInfo.destination}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.basicInfo.description}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Trip Duration</label>
              <input
                type="text"
                name="tripDuration"
                value={formData.basicInfo.tripDuration}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Approximate Cost</label>
              <input
                type="text"
                name="approximateCost"
                value={formData.basicInfo.approximateCost}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Accommodation</label>
              <textarea
                name="accommodation"
                value={formData.basicInfo.accommodation}
                onChange={handleBasicInfoChange}
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="attractions">
          <div className="space-y-6">
            {formData.attractions.map((attraction, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-medium">Attraction #{index + 1}</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={attraction.name}
                    onChange={(e) => {
                      const newAttractions = [...formData.attractions];
                      newAttractions[index].name = e.target.value;
                      setFormData(prev => ({ ...prev, attractions: newAttractions }));
                    }}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={attraction.description}
                    onChange={(e) => {
                      const newAttractions = [...formData.attractions];
                      newAttractions[index].description = e.target.value;
                      setFormData(prev => ({ ...prev, attractions: newAttractions }));
                    }}
                    className="w-full p-2 border rounded"
                    rows={4}
                  />
                </div>
              </div>
            ))}
            <button
              onClick={addAttraction}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Another Attraction
            </button>
          </div>
        </TabsContent>

        <TabsContent value="food-dining">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Recommended Restaurants & Dishes</label>
              <textarea
                value={formData.foodAndDining.recommendations}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  foodAndDining: { recommendations: e.target.value }
                }))}
                className="w-full p-2 border rounded"
                rows={8}
                placeholder="Share your favorite restaurants and must-try local dishes..."
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="travel-tips">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Travel Tips & Recommendations</label>
              <textarea
                value={formData.travelTips}
                onChange={(e) => setFormData(prev => ({ ...prev, travelTips: e.target.value }))}
                className="w-full p-2 border rounded"
                rows={8}
                placeholder="Share practical advice, best times to visit, local customs, etc..."
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="photos">
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {formData.photos.map((photo, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
              <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 aspect-square">
                <ImagePlus className="h-8 w-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">Add Photos</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <div className="prose max-w-none">
            <h2>{formData.basicInfo.destination}</h2>
            <p>{formData.basicInfo.description}</p>
            {/* Add more preview content */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Creator;
