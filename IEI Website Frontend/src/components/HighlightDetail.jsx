import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Calendar, MapPin, Clock, Users } from 'lucide-react'
import API_BASE_URL from '../config'
;

const HighlightDetail = ({ highlight, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = highlight?.images || [];

  // Auto-slide effect
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!highlight) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900 pr-8">IEI Highlight Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image Carousel */}
          {images.length > 0 && (
            <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden mb-6">
              <img
                src={images[currentImageIndex].startsWith('http') ? images[currentImageIndex] : `${API_BASE_URL}${images[currentImageIndex]}`}
                alt={highlight.title}
                className="w-full h-full object-contain"
              />
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full transition"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full transition"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>

                  {/* Dots Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition ${
                          index === currentImageIndex
                            ? 'bg-white'
                            : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {highlight.title}
          </h1>

          {/* Date */}
          <div className="flex items-center gap-2 text-gray-600 mb-6">
            <Calendar className="w-5 h-5" />
            <span>{new Date(highlight.createdAt).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {highlight.description}
            </p>
          </div>

          {/* Full Content */}
          {highlight.fullContent && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Details</h3>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {highlight.fullContent}
              </div>
            </div>
          )}

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">All Images</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
                      index === currentImageIndex
                        ? 'border-blue-600'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={img.startsWith('http') ? img : `${API_BASE_URL}${img}`}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Close Button */}
          {/* <div className="mt-8 flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              Close
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HighlightDetail;
