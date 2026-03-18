import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/messages';

const MessageManagement = () => {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ message: '', isActive: false });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (err) {
      setError('Failed to fetch messages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.message.trim()) {
      setError('Message is required');
      return;
    }

    try {
      setLoading(true);
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setFormData({ title: '', content: '', isActive: false });
        setEditingId(null);
        fetchMessages();
      } else {
        setError(data.message || 'Failed to save message');
      }
    } catch (err) {
      setError('Error saving message');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (msg) => {
    setFormData({
      message: msg.message,
      isActive: msg.isActive
    });
    setEditingId(msg._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      const data = await response.json();

      if (data.success) {
        fetchMessages();
      } else {
        setError(data.message || 'Failed to delete message');
      }
    } catch (err) {
      setError('Error deleting message');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ message: '', isActive: false });
    setEditingId(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Chairman's Message Management</h1>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {editingId ? 'Edit Message' : 'Add New Message'}
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Enter the message that will scroll at the top of the website"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label className="ml-2 text-gray-700 font-semibold">Set as Active (Display on Website)</label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold flex items-center gap-2"
              >
                <Plus size={18} />
                {editingId ? 'Update Message' : 'Add Message'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Messages List Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">All Messages</h2>

          {loading && <p className="text-gray-600">Loading...</p>}

          {messages.length === 0 ? (
            <p className="text-gray-600">No messages yet. Create one to get started!</p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`p-4 border rounded-lg ${
                    msg.isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-gray-700">{msg.message}</p>
                      {msg.isActive && (
                        <span className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(msg)}
                        className="text-blue-600 hover:text-blue-800 p-2"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="text-red-600 hover:text-red-800 p-2"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageManagement;
