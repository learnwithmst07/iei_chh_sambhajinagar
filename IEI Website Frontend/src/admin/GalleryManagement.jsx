import React, { useState, useEffect } from 'react'
import { Trash2, Edit2, Plus, X } from 'lucide-react'

const API_URL = 'http://localhost:5000/api/gallery';

const GalleryManagement = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Other',
    order: 0
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const categories = ['Events', 'Activities', 'Infrastructure', 'Members', 'Other'];

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      if (data.success) {
        setGalleryItems(data.data);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
      alert('Error fetching gallery items');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const removePreviewImage = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (imagePath) => {
    setExistingImages(prev => prev.filter(img => img !== imagePath));
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item._id);
      setFormData({
        title: item.title,
        description: item.description,
        category: item.category,
        order: item.order
      });
      setExistingImages(item.images);
      setSelectedFiles([]);
      setPreviewImages([]);
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        category: 'Other',
        order: 0
      });
      setSelectedFiles([]);
      setPreviewImages([]);
      setExistingImages([]);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      category: 'Other',
      order: 0
    });
    setSelectedFiles([]);
    setPreviewImages([]);
    setExistingImages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('order', formData.order);
    
    if (editingId) {
      formDataToSend.append('existingImages', JSON.stringify(existingImages));
    }
    
    selectedFiles.forEach(file => {
      formDataToSend.append('images', file);
    });

    console.log('Creating/Updating gallery');
    console.log('editingId:', editingId);
    console.log('existingImages:', existingImages);

    try {
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? 'PUT' : 'POST';
      
      console.log('Sending to:', url);
      console.log('Method:', method);
      console.log('FormData entries:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`  ${key}:`, value);
      }
      
      const response = await fetch(url, {
        method,
        body: formDataToSend
      });

      console.log('Response status:', response.status);
      
      const data = await response.json();
      
      console.log('Response data:', data);
      
      if (data.success) {
        alert(editingId ? 'Gallery item updated successfully!' : 'Gallery item created successfully!');
        fetchGallery();
        closeModal();
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error saving gallery item:', error);
      console.error('Error details:', error.message);
      alert('Failed to save gallery item: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery item? This will also delete all associated images.')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
          alert('Gallery item deleted successfully');
          fetchGallery();
        } else {
          alert('Error: ' + data.message);
        }
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        alert('Error deleting gallery item');
      }
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading gallery items...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gallery Management</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Add Gallery Item
        </button>
      </div>

      {/* Gallery Items Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Images</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {galleryItems.length > 0 ? (
              galleryItems.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{item.title}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.images.length} image(s)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.order}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => openModal(item)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition mr-2"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded transition"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  No gallery items yet. Create one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-gray-800">
                {editingId ? 'Edit Gallery Item' : 'Create Gallery Item'}
              </h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter gallery item title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter gallery item description"
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Existing Images</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {existingImages.map((imagePath) => (
                      <div key={imagePath} className="relative group">
                        <img
                          src={imagePath.startsWith('http') ? imagePath : `http://localhost:5000${imagePath}`}
                          alt="Gallery"
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(imagePath)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Add Images {editingId ? '(Optional)' : '*'}
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Supported formats: JPEG, PNG, GIF, WebP. Max 5MB per file.</p>
              </div>

              {/* Preview New Images */}
              {previewImages.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preview New Images</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {previewImages.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePreviewImage(index)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  {editingId ? 'Update Gallery Item' : 'Create Gallery Item'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
