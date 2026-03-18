import React from 'react'
import { X } from 'lucide-react'

const CommitteeModal = ({ isOpen, onClose }) => {
  const committeeMembers = [
    { name: "Dr. Deepak T. Bornare", division: "Agriculture" },
    { name: "Ar. Sudhir. P. Kulkarni", division: "Architecture" },
    { name: "Dr. Bhagwan K. Sakhale", division: "Chemical" },
    { name: "Er. Jaising N. Hire", division: "Civil" },
    { name: "Er. Rajendra P. Kale", division: "Civil" },
    { name: "Er. Kapil L. Kulkarni", division: "Civil" },
    { name: "Dr. Ratnadeep R. Deshmukh", division: "Computer" },
    { name: "Er. Ulhas A. Mudholkar", division: "Electrical" },
    { name: "Dr. Girish R. Basole", division: "Electronics & Telecom." },
    { name: "Dr. Sunil D. Shinde", division: "Environment" },
    { name: "Er. Anup A. Dawargawe", division: "Marine" },
    { name: "Dr. Subhash V. Lahane", division: "Mechanical" },
    { name: "Dr. Abhay B. Kulkarni", division: "Mechanical" },
    { name: "Dr. D.C. Gour", division: "Metallurgical & Material" },
    { name: "Dr. V. K. Joshi", division: "Textile" }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="sticky top-0 right-0 absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>

        <div className="p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">Committee Members</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {committeeMembers.map((member, index) => (
              <div 
                key={index}
                className="p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors border border-gray-200 hover:border-blue-300 hover:shadow-md"
              >
                <p className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg">{member.name}</p>
                <div className="mt-2 sm:mt-3">
                  <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-blue-100 text-blue-700 text-xs sm:text-sm font-semibold rounded-full">
                    {member.division}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitteeModal;
