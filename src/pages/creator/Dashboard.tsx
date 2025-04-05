import React from 'react';

function CreatorDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Creator Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Content Statistics</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Total Posts</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div>
              <p className="text-gray-600">Total Views</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Create New Post
            </button>
            <button className="w-full border border-gray-300 py-2 px-4 rounded hover:bg-gray-50">
              View Analytics
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-gray-600">No recent activity</p>
        </div>
      </div>
    </div>
  );
}

export default CreatorDashboard;
