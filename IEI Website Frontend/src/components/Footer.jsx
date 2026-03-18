import React, { useState } from 'react'
import { MapPin, Phone, Mail, X, Linkedin, Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo and Main Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4">
              <img 
                src="/images/iei_Logo.jpg" 
                alt="IEI Logo" 
                className="h-16 w-16 object-contain rounded-full bg-white p-1"
              />
            </div>
            <h3 className="text-xl mb-2 font-bold text-center md:text-left"
                style={{ fontFamily: "'Old English Text MT', 'UnifrakturMaguntia', cursive" }}>
              The Institution of<br />Engineers (India)
            </h3>
          </div>

          {/* Column 2: Contact Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-blue-500 pb-2">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin size={18} className="text-blue-400 mt-1" />
                <p className="text-sm text-gray-300">
                  Address: Near Government College of Engineering Aurangabad, Chh. Sambhajinagar, Station Road, Chh. Sambhajinagar-431005
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <Phone size={18} className="text-blue-400 mt-1" />
                <p className="text-sm text-gray-300">
                  Phone: +91(0240) 2332772 / 2348424
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <Mail size={18} className="text-blue-400 mt-1" />
                <p className="text-sm text-gray-300">
                  Email: aurangabadlc@ieindia.org
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Location QR Code */}
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold text-blue-400 mb-3">Scan for Location</p>
            <div className="bg-white p-2 rounded-lg mb-3">
              <img 
                src="/images/location_qr.png" 
                alt="Location QR Code" 
                className="h-32 w-32 object-contain"
              />
            </div>
            <a 
              href="https://share.google/Zpphsz46zCuRq8xqF"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition font-medium"
            >
              Click here for Location
            </a>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-blue-500 pb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-blue-400 transition">About IEI</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Membership</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Events</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Gallery</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 pt-4 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400 mb-4">Follow Us</p>
          <div className="flex justify-center gap-4 mb-6">
            <a href="#" className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center hover:bg-cyan-500 transition">
              <Facebook size={18} className="text-white" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center hover:bg-cyan-500 transition">
              <Linkedin size={18} className="text-white" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center hover:bg-cyan-500 transition">
              <Instagram size={18} className="text-white" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center hover:bg-cyan-500 transition">
              <Twitter size={18} className="text-white" />
            </a>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-4 pt-4 border-t border-gray-700 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} The Institution of Engineers (India), Chh. Sambhajinagar. All Rights Reserved.</p>
          <p className="mt-2">
            Developed By{' '}
            <button 
              onClick={() => setShowDeveloperModal(true)}
              className="text-blue-400 hover:text-blue-300 hover:underline font-medium"
            >
              Mr. Karan Bankar
            </button>
          </p>
        </div>

        {/* Developer Modal */}
        {showDeveloperModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white text-gray-800 rounded-lg shadow-lg w-full max-w-md relative overflow-hidden">
              {/* Close button */}
              <button 
                onClick={() => setShowDeveloperModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="p-6">
                <div className="flex flex-col items-center">
                  {/* Developer Image */}
                  <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center mb-4 overflow-hidden border-4 border-blue-500">
                    <img 
                      src="/images/karan.jpeg" 
                      alt="Karan Bankar" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">Mr. Karan Bankar</h3>
                  <p className="text-gray-600 mb-4">Full Stack Developer</p>
                  
                  <div className="flex flex-col gap-3 w-full max-w-xs">
                    {/* Email */}
                    <div className="flex items-center gap-2">
                      <Mail className="text-blue-600" size={18} />
                      <a href="mailto:karanbankar54@gmail.com" className="text-gray-600 hover:text-blue-600 hover:underline">
                        karanbankar54@gmail.com
                      </a>
                    </div>
                    
                    {/* LinkedIn */}
                    <div className="flex items-center gap-2">
                      <Linkedin className="text-blue-600" size={18} />
                      <a 
                        href="https://www.linkedin.com/in/karan-bankar-453b57252/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 hover:underline"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100 px-6 py-3 text-center">
                <p className="text-sm text-gray-600">Thank you for visiting!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}

export default Footer
