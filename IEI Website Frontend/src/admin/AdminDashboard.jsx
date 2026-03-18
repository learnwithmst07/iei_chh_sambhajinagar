import React, { useState, useEffect } from 'react';
import { LogOut, Home as HomeIcon, Calendar, Users, Settings, FileText, Home, Image as ImageIcon, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import API_BASE_URL from '../config';

import EventManagement from './EventManagement';
import HighlightManagement from './HighlightManagement';
import GalleryManagement from './GalleryManagement';
import GuestHouseManagement from './GuestHouseManagement';
import MessageManagement from './MessageManagement';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [pendingGuestHouseRequests, setPendingGuestHouseRequests] = useState(0);
  const adminEmail = localStorage.getItem('adminEmail') || 'admin@iei.com';

  useEffect(() => {
    fetchPendingRequests();
    // Poll for new requests every 10 seconds
    const interval = setInterval(fetchPendingRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/guesthouse`);
      const data = await response.json();
      if (data.success) {
        const pending = data.data.filter(req => req.status === 'pending').length;
        setPendingGuestHouseRequests(pending);
      }
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Welcome back, {adminEmail}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 font-medium border-b-2 transition ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <HomeIcon className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-3 font-medium border-b-2 transition ${
                activeTab === 'events'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Events
            </button>
            <button
              onClick={() => setActiveTab('highlights')}
              className={`px-4 py-3 font-medium border-b-2 transition ${
                activeTab === 'highlights'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Highlights
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-3 font-medium border-b-2 transition ${
                activeTab === 'gallery'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Image className="w-4 h-4 inline mr-2" />
              Gallery
            </button>
            <button
              onClick={() => setActiveTab('guesthouse')}
              className={`px-4 py-3 font-medium border-b-2 transition relative ${
                activeTab === 'guesthouse'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="w-4 h-4 inline mr-2" />
              Guest House
              {pendingGuestHouseRequests > 0 && (
                <span className="absolute top-2 right-2 w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-3 font-medium border-b-2 transition ${
                activeTab === 'messages'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Messages
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={<HomeIcon className="w-6 h-6" />}
                title="Total Pages"
                value="5"
                bgColor="bg-blue-500"
              />
              <StatCard
                icon={<Calendar className="w-6 h-6" />}
                title="Events"
                value="0"
                bgColor="bg-green-500"
              />
              <StatCard
                icon={<Users className="w-6 h-6" />}
                title="Members"
                value="0"
                bgColor="bg-purple-500"
              />
              <StatCard
                icon={<Settings className="w-6 h-6" />}
                title="Settings"
                value="Active"
                bgColor="bg-orange-500"
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <ActionButton 
                  title="Manage Events" 
                  description="Add or edit events"
                  onClick={() => setActiveTab('events')}
                />
                <ActionButton 
                  title="Manage Highlights" 
                  description="Update IEI highlights"
                  onClick={() => setActiveTab('highlights')}
                />
                <ActionButton 
                  title="Manage Gallery" 
                  description="Upload photos"
                  onClick={() => setActiveTab('gallery')}
                />
                <ActionButton title="Settings" description="Configure website settings" />
              </div>
            </div>

            {/* Info Message */}
            {/* <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                🚀 Admin Panel Setup Complete
              </h3>
              <p className="text-blue-700">
                Event management is now fully functional! Click on "Events" tab or "Manage Events" to start adding events.
              </p>
            </div> */}
          </>
        ) : activeTab === 'events' ? (
          <EventManagement />
        ) : activeTab === 'highlights' ? (
          <HighlightManagement />
        ) : activeTab === 'gallery' ? (
          <GalleryManagement />
        ) : activeTab === 'guesthouse' ? (
          <GuestHouseManagement />
        ) : activeTab === 'messages' ? (
          <MessageManagement />
        ) : null}
      </main>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, title, value, bgColor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-xs sm:text-sm text-gray-600 font-medium mb-2 uppercase tracking-wide">{title}</p>
          <p className="text-3xl sm:text-4xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${bgColor} p-3 sm:p-4 rounded-lg text-white flex-shrink-0`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// Action Button Component
const ActionButton = ({ title, description, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition duration-200"
    >
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
};

export default AdminDashboard;
