import React from 'react';
import { Calendar, Award, Users, BookOpen } from 'lucide-react';

const Activities = () => {
  const activities = [
    {
      title: "Technical Lectures",
      description: "Regular technical lectures by industry experts and academic professionals",
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      title: "Professional Development Programs",
      description: "Training programs to enhance professional skills of engineers",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Academic Awards",
      description: "Recognition for outstanding academic achievements in engineering",
      icon: Award,
      color: "text-yellow-600"
    },
    {
      title: "Technical Visits",
      description: "Organized visits to industrial sites and engineering projects",
      icon: Calendar,
      color: "text-red-600"
    }
  ];

  return (
    <div id="activities" className="bg-gradient-to-br from-white via-blue-50 to-white py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gray-900">IEI </span>
            <span className="text-blue-600">Activities</span>
          </h2>
          <div className="w-32 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The Institution of Engineers (India), Chh. Sambhajinagar Chapter organizes various
            activities to promote engineering excellence and professional development.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            
            return (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-all duration-300 border-t-4 border-blue-500"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                    <Icon className={activity.color} size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{activity.title}</h3>
                <p className="text-gray-600 text-center">{activity.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Activities;
