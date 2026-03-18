import React, { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

const API_URL = 'http://localhost:5000/api/events';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from API
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      if (data.success) {
        setEvents(data.data);
      } else {
        // Fallback to default events if API fails
        setEvents(getDefaultEvents());
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      // Fallback to default events if API fails
      setEvents(getDefaultEvents());
    } finally {
      setLoading(false);
    }
  };

  // Default events as fallback
  const getDefaultEvents = () => [
    {
      title: "National Engineering Congress 2024",
      date: "15-17 December 2024",
      time: "09:00 AM - 05:00 PM",
      location: "IEI HQ, Kolkata",
      attendees: "500+ Expected",
      category: "Conference",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Technical Seminar on AI in Engineering",
      date: "22 December 2024",
      time: "10:00 AM - 01:00 PM",
      location: "IEI Chh. Sambhajinagar",
      attendees: "100+ Expected",
      category: "Seminar",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Workshop on Sustainable Infrastructure",
      date: "28-29 December 2024",
      time: "09:30 AM - 04:30 PM",
      location: "Engineering College Campus",
      attendees: "150+ Expected",
      category: "Workshop",
      color: "from-orange-500 to-orange-600"
    }
  ];

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-white via-blue-50 to-white py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="events" className="bg-gradient-to-b from-white via-blue-50 to-white py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <Calendar className="text-blue-600 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Upcoming <span className="text-blue-600">Events</span>
            </h2>
          </div>
          <div className="w-20 sm:w-32 h-1 bg-blue-600 mx-auto rounded-full mb-2 sm:mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            Join us for exciting engineering events and networking opportunities
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {events.map((event, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
            >
              {/* Event Category Badge */}
              <div className={`h-2 bg-gradient-to-r ${event.color}`}></div>
              
              {/* Event Content */}
              <div className="p-3 sm:p-4 md:p-6">
                {/* Category Tag */}
                <div className="mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${event.color}`}>
                    {event.category}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>

                {/* Event Details */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-blue-500 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-gray-700 font-medium text-sm">{event.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-gray-700 text-sm">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-gray-700 text-sm">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="text-purple-500 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-gray-700 text-sm">{event.attendees}</p>
                    </div>
                  </div>
                </div>

                {/* Register Button */}
                {/* <button className={`mt-6 w-full py-2.5 bg-gradient-to-r ${event.color} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                  Register Now
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {/* View All Events Button */}
        {/* <div className="text-center mt-12">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            View All Events →
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default UpcomingEvents
