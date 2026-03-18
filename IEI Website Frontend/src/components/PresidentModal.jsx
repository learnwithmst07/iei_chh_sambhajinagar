import React from 'react'
import { X, ChevronDown } from 'lucide-react'

const PresidentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button - Top Right */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center shadow-md z-10 border border-gray-300"
        >
          <X size={18} className="text-gray-600" />
        </button>

        {/* Header */}
        <div className="text-center pt-10 pb-6 px-12">
          <h2 className="text-4xl font-bold text-red-600 mb-4" 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            The Profile of the Secretary
          </h2>
          <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>

        {/* IEI Logo and Tagline */}
        <div className="flex flex-col items-center py-6 px-12">
          <div className="flex items-center justify-center gap-8 mb-4">
            {/* IEI Logo */}
            <div className="flex items-center bg-white rounded-full p-2 shadow-md">
              <img 
                src="/images/iei_Logo.jpg" 
                alt="IEI Logo" 
                className="h-24 w-24 object-contain rounded-full"
              />
            </div>
            
            {/* Institution Name */}
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-900" 
                  style={{ fontFamily: "'UnifrakturMaguntia', 'Old English Text MT', cursive" }}>
                The Institution of Engineers (India) Chh. Sambhajinagar
              </h3>
            </div>
            
            {/* Sambhaji Nagar Logo */}
            <div className="flex items-center bg-white rounded-full p-2 shadow-md">
              <img 
                src="/images/sambhajinagar.png" 
                alt="Sambhaji Nagar Logo" 
                className="h-24 w-24 object-contain rounded-full"
              />
            </div>
          </div>
          
          {/* Tagline */}
          <p className="text-center text-base text-red-600 italic font-semibold mt-3"
             style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Relentless Journey Towards Engineering Advancement<br />
            and Nation Building Since 1920
          </p>
          
          {/* Down Arrow */}
          <ChevronDown className="text-gray-400 mt-3" size={28} />
        </div>

        {/* President Photo */}
        <div className="flex justify-center px-12 py-6">
  <div className="border-4 border-gray-200 rounded p-3 bg-white shadow-lg">
    
    <div className="w-72 h-96">
      <img
        src="images/sec.jpeg"
        alt="Secretary"
        className="w-full h-full object-cover rounded"
      />
    </div>

  </div>
</div>

        {/* President Name and Title */}
        <div className="text-center px-12 py-3">
          <h4 className="text-2xl font-bold text-blue-700">DR.SANDEEPKUMAR PRABHAKARRAO ABHANG</h4>
          <p className="text-lg text-blue-600 font-semibold">Secretary, IEI Chh. Sambhajinagar</p>
        </div>

        {/* Biography */}
        <div className="px-12 py-6 text-gray-700">
          <p className="text-base leading-relaxed text-justify mb-4">
            SANDEEPKUMAR PRABHAKARRAO ABHANG serves as the Secretary of The Institution of Engineers (India), Chh. Sambhajinagar Chapter. With his expertise and leadership, he guides the chapter's initiatives and strategic direction to promote engineering excellence in the region.
          </p>

          <h5 className="text-base font-bold text-blue-700 mb-3">ACADEMIC AND PROFESSIONAL BACKGROUND</h5>
          <p className="text-base leading-relaxed text-justify mb-4">
            MEMBERSHIP GRADE & ENGINEERING DIVISION: M-159792-7 (COMPUTER ENGINEERING DIVISION)
          </p>
          <p className="text-base leading-relaxed text-justify">
            PRESENT PROFESSIONAL POSITION: HEAD OF THE DEPARTMENT (COMPUTER SCIENCE AND ENGINEERING), CSMSS. CHH. SHAHU COLLEGE OF ENGINEERING, CHH. SAMBHAJINAGAR
          </p>
        </div>

        {/* Bottom Spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  )
}

export default PresidentModal
