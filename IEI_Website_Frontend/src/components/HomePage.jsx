import React, { useEffect, useState } from 'react'
import { Building2, Users, Award, Target } from 'lucide-react'

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div id="about" className="bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Section Header with Animation */}
        <div className={`text-center mb-12 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-blue-900">About IEI</span>{' '}
            <span className="text-orange-600">Chh. Sambhajinagar</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Content with Staggered Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Vision */}
          <div className={`transition-all duration-1000 delay-300 transform ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
              <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Target className="text-orange-600" size={28} />
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed flex-grow">
                To be the premier organization for engineering professionals in the Marathwada region, 
                fostering innovation, excellence, and sustainable development through collaborative efforts 
                and continuous learning.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className={`transition-all duration-1000 delay-500 transform ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
              <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Award className="text-orange-600" size={28} />
                Our Mission
              </h3>
              <ul className="space-y-2 text-gray-700 flex-grow">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>Promote engineering excellence and innovation in the region</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>Facilitate professional development and networking opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>Support engineering education and research initiatives</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>Contribute to societal development through engineering solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
