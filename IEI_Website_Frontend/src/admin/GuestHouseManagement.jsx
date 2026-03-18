import React, { useState, useEffect } from 'react';
import { Home, CheckCircle, XCircle, Trash2, MessageCircle, Calendar, Clock, User, Phone, Mail, Eye, X } from 'lucide-react';
import API_BASE_URL from '../config';


const API_URL = `${API_BASE_URL}/api/guesthouse`;

const GuestHouseManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.success) {
        setRequests(data.data);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      alert('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm('Are you sure you want to approve this request?')) return;

    try {
      const response = await fetch(`${API_URL}/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'approved' })
      });

      const data = await response.json();
      if (data.success) {
        alert('Request approved successfully!');
        fetchRequests();
        // Auto-send WhatsApp message
        sendWhatsAppMessage(id);
      }
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Failed to approve request');
    }
  };

  const handleReject = async (id) => {
    const reason = window.prompt('Enter reason for rejection (optional):');
    if (reason === null) return; // User cancelled

    try {
      const response = await fetch(`${API_URL}/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          status: 'rejected',
          adminNotes: reason 
        })
      });

      const data = await response.json();
      if (data.success) {
        alert('Request rejected successfully!');
        fetchRequests();
        // Auto-send WhatsApp message
        sendWhatsAppMessage(id);
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Failed to reject request');
    }
  };

  const sendWhatsAppMessage = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/whatsapp`, {
        method: 'POST'
      });

      const data = await response.json();
      if (data.success) {
        // Open WhatsApp in new tab
        window.open(data.whatsappUrl, '_blank');
      }
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this request?')) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (data.success) {
        alert('Request deleted successfully!');
        fetchRequests();
      }
    } catch (error) {
      console.error('Error deleting request:', error);
      alert('Failed to delete request');
    }
  };

  const filteredRequests = requests.filter(req => {
    if (filter === 'all') return true;
    return req.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading requests...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Guest House Requests</h2>
          <p className="text-gray-600 mt-1">Manage booking requests and send WhatsApp notifications</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 font-medium border-b-2 transition ${
            filter === 'all'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          All ({requests.length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 font-medium border-b-2 transition ${
            filter === 'pending'
              ? 'border-yellow-600 text-yellow-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Pending ({requests.filter(r => r.status === 'pending').length})
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-4 py-2 font-medium border-b-2 transition ${
            filter === 'approved'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Approved ({requests.filter(r => r.status === 'approved').length})
        </button>
        <button
          onClick={() => setFilter('rejected')}
          className={`px-4 py-2 font-medium border-b-2 transition ${
            filter === 'rejected'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Rejected ({requests.filter(r => r.status === 'rejected').length})
        </button>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No {filter !== 'all' ? filter : ''} requests found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredRequests.map((request) => (
            <RequestCard
              key={request._id}
              request={request}
              onApprove={handleApprove}
              onReject={handleReject}
              onDelete={handleDelete}
              onSendWhatsApp={sendWhatsAppMessage}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const RequestCard = ({ request, onApprove, onReject, onDelete, onSendWhatsApp, getStatusColor, getStatusIcon }) => {
  const [showIdProof, setShowIdProof] = useState(false);

  return (
    <>
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-900">{request.name}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(request.status)}`}>
              {getStatusIcon(request.status)}
              {request.status.toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Submitted on {new Date(request.createdAt).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>

      {/* Request Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-blue-600" />
            <span className="text-gray-600">Membership:</span>
            <span className="font-medium text-gray-900">{request.membershipId}</span>
          </div>
          {request.referralMemberId && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-purple-600" />
              <span className="text-gray-600">Referral:</span>
              <span className="font-medium text-gray-900">{request.referralMemberId}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-green-600" />
            <span className="text-gray-600">Mobile:</span>
            <span className="font-medium text-gray-900">{request.mobile}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span className="text-gray-600">Check-in:</span>
            <span className="font-medium text-gray-900">{request.fromDate} at {request.checkInTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-orange-600" />
            <span className="text-gray-600">Check-out:</span>
            <span className="font-medium text-gray-900">{request.toDate} at {request.checkOutTime}</span>
          </div>
        </div>
      </div>

      {/* Admin Notes */}
      {request.adminNotes && (
        <div className="mb-4 p-3 bg-gray-50 rounded border border-gray-200">
          <p className="text-sm text-gray-600">
            <strong>Admin Notes:</strong> {request.adminNotes}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        {request.idProofPhoto && (
          <button
            onClick={() => setShowIdProof(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            View ID Proof
          </button>
        )}

        {request.status === 'pending' && (
          <>
            <button
              onClick={() => onApprove(request._id)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition text-sm font-medium"
            >
              <CheckCircle className="w-4 h-4" />
              Approve
            </button>
            <button
              onClick={() => onReject(request._id)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-sm font-medium"
            >
              <XCircle className="w-4 h-4" />
              Reject
            </button>
          </>
        )}
        
        {(request.status === 'approved' || request.status === 'rejected') && (
          <button
            onClick={() => onSendWhatsApp(request._id)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition text-sm font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            Send WhatsApp
          </button>
        )}

        <button
          onClick={() => onDelete(request._id)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition text-sm font-medium ml-auto"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>

    {/* ID Proof Modal */}
    {showIdProof && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative">
          <button
            onClick={() => setShowIdProof(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">ID Proof - {request.name}</h3>
            <div className="bg-gray-100 rounded-lg flex items-center justify-center min-h-96">
              <img 
                src={request.idProofPhoto} 
                alt="ID Proof" 
                className="max-w-full max-h-96 object-contain rounded"
              />
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default GuestHouseManagement;
