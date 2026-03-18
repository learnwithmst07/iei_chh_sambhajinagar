import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FileText, X, Image as ImageIcon } from 'lucide-react';
import API_BASE_URL from '../config';


const API_URL = `${API_BASE_URL}/api/highlights`;

const HighlightManagement = () => {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingHighlight, setEditingHighlight] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullContent: '',
    order: 0
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    fetchHighlights();
  }, []);

  const fetchHighlights = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.success) {
        setHighlights(data.data);
      }
    } catch (error) {
      console.error('Error fetching highlights:', error);
      alert('Failed to fetch highlights');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
    
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...previews]);
  };

  const removePreviewImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = async (imagePath) => {
    if (!editingHighlight) return;
    
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`${API_URL}/${editingHighlight._id}/images`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imagePath })
      });

      const data = await response.json();
      if (data.success) {
        setExistingImages(prev => prev.filter(img => img !== imagePath));
        alert('Image deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('fullContent', formData.fullContent);
    formDataToSend.append('order', formData.order);
    
    if (editingHighlight) {
      formDataToSend.append('existingImages', JSON.stringify(existingImages));
    }
    
    selectedFiles.forEach(file => {
      formDataToSend.append('images', file);
    });

    try {
      const url = editingHighlight ? `${API_URL}/${editingHighlight._id}` : API_URL;
      const method = editingHighlight ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formDataToSend
      });

      const data = await response.json();
      
      if (data.success) {
        alert(editingHighlight ? 'Highlight updated successfully!' : 'Highlight created successfully!');
        fetchHighlights();
        closeModal();
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error saving highlight:', error);
      alert('Failed to save highlight');
    }
  };

  const handleEdit = (highlight) => {
    setEditingHighlight(highlight);
    setFormData({
      title: highlight.title,
      description: highlight.description,
      fullContent: highlight.fullContent || '',
      order: highlight.order || 0
    });
    setExistingImages(highlight.images || []);
    setSelectedFiles([]);
    setPreviewImages([]);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this highlight?')) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (data.success) {
        alert('Highlight deleted successfully!');
        fetchHighlights();
      }
    } catch (error) {
      console.error('Error deleting highlight:', error);
      alert('Failed to delete highlight');
    }
  };

  const openModal = () => {
    setEditingHighlight(null);
    setFormData({
      title: '',
      description: '',
      fullContent: '',
      order: 0
    });
    setSelectedFiles([]);
    setPreviewImages([]);
    setExistingImages([]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingHighlight(null);
    setSelectedFiles([]);
    setPreviewImages([]);
    setExistingImages([]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading highlights...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">IEI Highlights Management</h2>
          <p className="text-gray-600 mt-1">Manage highlights with image carousel</p>
        </div>
        <button
          onClick={openModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Add New Highlight
        </button>
      </div>

      {highlights.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No highlights found</p>
          <p className="text-gray-500 text-sm mt-2">Click "Add New Highlight" to create your first highlight</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight) => (
            <HighlightCard
              key={highlight._id}
              highlight={highlight}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showModal && (
        <HighlightModal
          formData={formData}
          editingHighlight={editingHighlight}
          existingImages={existingImages}
          previewImages={previewImages}
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
          onRemovePreview={removePreviewImage}
          onRemoveExisting={removeExistingImage}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

const HighlightCard = ({ highlight, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      {highlight.images && highlight.images.length > 0 && (
        <img
          src={highlight.images[0].startsWith('http') ? highlight.images[0] : `${API_BASE_URL}${highlight.images[0]}`}
          alt={highlight.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-gray-900 line-clamp-2 flex-1">{highlight.title}</h3>
          <div className="flex gap-2 ml-2">
            <button
              onClick={() => onEdit(highlight)}
              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(highlight._id)}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{highlight.description}</p>
        
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <ImageIcon className="w-4 h-4" />
          <span>{highlight.images?.length || 0} images</span>
        </div>
      </div>
    </div>
  );
};

const HighlightModal = ({
  formData,
  editingHighlight,
  existingImages,
  previewImages,
  onInputChange,
  onFileChange,
  onRemovePreview,
  onRemoveExisting,
  onSubmit,
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {editingHighlight ? 'Edit Highlight' : 'Add New Highlight'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 40th Indian Engineering Congress"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onInputChange}
              required
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Brief description for the card"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Content</label>
            <textarea
              name="fullContent"
              value={formData.fullContent}
              onChange={onInputChange}
              rows="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Detailed content for the detail page"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images * (3 images recommended for carousel)
            </label>
            
            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-600 mb-2">Existing Images:</p>
                <div className="grid grid-cols-3 gap-2">
                  {existingImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img.startsWith('http') ? img : `${API_BASE_URL}${img}`}
                        alt={`Existing ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => onRemoveExisting(img)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preview New Images */}
            {previewImages.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-600 mb-2">New Images:</p>
                <div className="grid grid-cols-3 gap-2">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => onRemovePreview(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload 3 images for best carousel effect. Max 5MB per image.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              {editingHighlight ? 'Update Highlight' : 'Create Highlight'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HighlightManagement;
