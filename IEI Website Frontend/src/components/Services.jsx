import React from 'react'

const Services = () => {
  const services = [
    "To promote the general advancement of engineering and their application",
    "Grant certificate of competency for practice of Engineering Profession",
    "Arrange and promote for settlement of disputes in Engineering by arbitration and act as or nominate arbitrators",
    "Confer to the Government and other bodies the views regarding matters directly or indirectly affecting the Engineering profession",
    "Promote study of Engineering through R & D activities and grants",
    "Encourage elevate and recognise the technical knowledge and practice of individuals and organisations through scholarships, awards and other benefaction",
    "Pioneer in providing Non-formal Engineering Education (popularly known as AMIE Exam) in India",
    "Dissemination and updating of engineering and technological knowledge among its members, through Technical Activities",
    "Inculcating and promoting amongst engineers and technologists a sense of responsibility and commitment to the social objectives of the profession",
    "Fostering national and international cooperation in engineering and technology",
    "Facilitates Continued Professional Development (CPD)",
    "To promote efficiency and honourable dealings to suppress malpractice in engineering"
  ];

  return (
    <div id="services" className="bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3">
            <span className="text-gray-800">Our </span>
            <span className="text-red-600">Services</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-red-600"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-sm border-l-4 border-blue-600"
            >
              <p className="text-blue-600 hover:text-blue-900 text-sm sm:text-base font-medium leading-relaxed transition-colors duration-200 cursor-pointer">
                {service}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services
