import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const API_URL = 'http://localhost:5000/api/gallery';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [autoSlideIndex, setAutoSlideIndex] = useState(0);

  const categories = ['All', 'Events', 'Activities', 'Infrastructure', 'Members', 'Other'];

  useEffect(() => {
    fetchGallery();
  }, []);

  // Auto-slide images in gallery grid
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoSlideIndex(prev => (prev + 1) % Math.max(1, galleryItems.length));
    }, 5000); // Change gallery every 5 seconds
    
    return () => clearInterval(interval);
  }, [galleryItems.length]);

  const fetchGallery = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      if (data.success) {
        setGalleryItems(data.data);
      } else {
        setGalleryItems([]);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
      setGalleryItems([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (item, index = 0) => {
    setSelectedItem(item);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedItem && selectedItem.images) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedItem.images.length);
    }
  };

  const prevImage = () => {
    if (selectedItem && selectedItem.images) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedItem.images.length) % selectedItem.images.length);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-white via-blue-50 to-white py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="gallery" className="bg-gradient-to-b from-white via-blue-50 to-white py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
            Photo <span className="text-blue-600">Gallery</span>
          </h2>
          <div className="w-20 sm:w-32 h-1 bg-blue-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            Explore our collection of photos from events, activities, and more
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {filteredItems.map((item) => (
              <GalleryCard key={item._id} item={item} onOpen={openLightbox} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No photos available in this category</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-200 transition z-10"
            >
              <X size={24} className="text-black" />
            </button>

            {/* Image Display */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              <img
                src={selectedItem.images[currentImageIndex].startsWith('http') ? selectedItem.images[currentImageIndex] : `http://localhost:5000${selectedItem.images[currentImageIndex]}`}
                alt={selectedItem.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />

              {/* Navigation Arrows */}
              {selectedItem.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 transition"
                  >
                    <ChevronLeft size={24} className="text-black" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 transition"
                  >
                    <ChevronRight size={24} className="text-black" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {currentImageIndex + 1} / {selectedItem.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Image Info */}
            <div className="bg-gray-900 text-white p-4 rounded-b-lg">
              <h3 className="text-xl font-bold mb-2">{selectedItem.title}</h3>
              {selectedItem.description && (
                <p className="text-gray-300 text-sm">{selectedItem.description}</p>
              )}
              <div className="mt-3 flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
                  {selectedItem.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Gallery Card Component with Auto-Sliding
const GalleryCard = ({ item, onOpen }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!item.images || item.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % item.images.length);
    }, 4000); // Auto-slide every 4 seconds

    return () => clearInterval(interval);
  }, [item.images]);

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer group"
      onClick={() => onOpen(item, 0)}
    >
      {/* Image Container with Auto-Sliding */}
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
        {item.images && item.images.length > 0 ? (
          <>
            <img
              src={item.images[currentImageIndex].startsWith('http') ? item.images[currentImageIndex] : `http://localhost:5000${item.images[currentImageIndex]}`}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {item.images.length > 1 && (
              <>
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-semibold">
                  +{item.images.length - 1}
                </div>
                {/* Image Dots */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {item.images.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 w-1.5 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white w-3' : 'bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800 flex-1">{item.title}</h3>
          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
            {item.category}
          </span>
        </div>
        {item.description && (
          <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
