import React, { useState, useEffect } from 'react'
import { FileText, ChevronLeft, ChevronRight } from 'lucide-react'

const API_URL = 'http://localhost:5000/api/highlights';

const Content = ({ onHighlightClick }) => {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHighlights();
  }, []);

  const fetchHighlights = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      if (data.success) {
        setHighlights(data.data);
      } else {
        setHighlights(getDefaultHighlights());
      }
    } catch (error) {
      console.error('Error fetching highlights:', error);
      setHighlights(getDefaultHighlights());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultHighlights = () => [
    {
      _id: '1',
      title: "40th Indian Engineering Congress at National Institute of Technology, Durgapur",
      description: "Join us for the prestigious engineering congress",
      images: []
    },
    {
      _id: '2',
      title: "Dual Recognition of IEI as an Awarding body and Assessment Agency by NCVET",
      description: "A milestone achievement for IEI",
      images: []
    },
    {
      _id: '3',
      title: "IEI Merchandise Items for Sale",
      description: "Get your official IEI merchandise",
      images: []
    }
  ];

  if (loading) {
    return (
      <div className="bg-yellow-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Loading highlights...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="highlights" className="bg-yellow-50 py-8">
      <div className="container mx-auto px-4">
        {/* IEI Highlights Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 border-b-2 border-orange-500 pb-2 bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-t-lg">
            <FileText className="text-orange-500" size={20} />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">IEI Highlights</h2>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {highlights.map((highlight) => (
            <HighlightCard 
              key={highlight._id} 
              highlight={highlight}
              onMoreClick={onHighlightClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Highlight Card with Auto-Sliding Carousel
const HighlightCard = ({ highlight, onMoreClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = highlight.images || [];

  // Auto-slide effect
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleMoreClick = () => {
    if (onMoreClick) {
      onMoreClick(highlight);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Carousel */}
      <div className="relative w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex].startsWith('http') ? images[currentImageIndex] : `http://localhost:5000${images[currentImageIndex]}`}
              alt={highlight.title}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-1 rounded-full transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-1 rounded-full transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition ${
                        index === currentImageIndex
                          ? 'bg-white'
                          : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileText className="text-blue-400" size={60} />
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-3">
          {highlight.title}
        </h3>
        <button
          onClick={handleMoreClick}
          className="text-red-600 hover:text-red-800 text-sm font-semibold"
        >
          more...
        </button>
      </div>
    </div>
  );
};

export default Content
