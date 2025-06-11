import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { connectToDB } from '../config/mongoClient.js';

// Middleware to verify JWT token
export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Request a new travel
export const requestTravel = async (req, res) => {
  try {
    const {
      destination,
      startDate,
      endDate,
      purpose,
      transportationType,
      accommodationRequired,
      estimatedCost,
      additionalNotes
    } = req.body;

    if (!destination || !startDate || !endDate || !purpose || !transportationType) {
      return res.status(400).json({
        message: 'Missing required fields: destination, startDate, endDate, purpose, transportationType'
      });
    }

    const db = await connectToDB();
    const travelRequests = db.collection('travelRequests');

    const newRequest = {
      _id: uuidv4(),
      employeeId: req.user.id,
      destination,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      purpose,
      transportationType,
      accommodationRequired: accommodationRequired || false,
      estimatedCost: estimatedCost || 0,
      additionalNotes: additionalNotes || '',
      status: 'pending',
      submissionDate: new Date(),
      lastUpdated: new Date(),
      approvalHistory: []
    };

    await travelRequests.insertOne(newRequest);

    res.status(201).json({
      message: 'Travel request submitted successfully',
      requestId: newRequest._id,
      request: newRequest
    });

  } catch (error) {
    console.error('Error creating travel request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get travel requests (filtered by role and query params)
export const getTravelRequests = async (req, res) => {
  try {
    const db = await connectToDB();
    const travelRequests = db.collection('travelRequests');
    const users = db.collection('users');

    const { status, employeeId } = req.query;
    let query = {};

    if (req.user.role === 'line_manager') {
      const teamMembers = await users.find({ managerId: req.user.id }).toArray();
      const teamMemberIds = teamMembers.map(u => u._id || u.id);
      query.employeeId = { $in: teamMemberIds };
    } else if (req.user.role === 'employee') {
      query.employeeId = req.user.id;
    }
    // Admin can see all (no filter)

    if (status) {
      query.status = status;
    }
    if (employeeId) {
      query.employeeId = employeeId;
    }

    const requests = await travelRequests.find(query).sort({ submissionDate: -1 }).toArray();

    res.json({
      requests,
      total: requests.length
    });

  } catch (error) {
    console.error('Error fetching travel requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update travel request status (approve/reject)
export const updateTravelRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status, comments } = req.body;

    if (!['approved', 'rejected', 'pending', 'processed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const db = await connectToDB();
    const travelRequests = db.collection('travelRequests');

    const request = await travelRequests.findOne({ _id: requestId });

    if (!request) {
      return res.status(404).json({ message: 'Travel request not found' });
    }

    if (req.user.role === 'employee' && request.employeeId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to modify this request' });
    }

    const previousStatus = request.status;

    const approvalEntry = {
      date: new Date(),
      action: status,
      actionBy: req.user.email,
      comments: comments || '',
      previousStatus
    };

    await travelRequests.updateOne(
      { _id: requestId },
      {
        $set: { status, lastUpdated: new Date() },
        $push: { approvalHistory: approvalEntry }
      }
    );

    const updatedRequest = await travelRequests.findOne({ _id: requestId });

    res.json({
      message: `Travel request ${status} successfully`,
      request: updatedRequest
    });

  } catch (error) {
    console.error('Error updating travel request status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get specific travel request by ID
export const getTravelRequestById = async (req, res) => {
  try {
    const { requestId } = req.params;
    const db = await connectToDB();
    const travelRequests = db.collection('travelRequests');
    const users = db.collection('users');

    const request = await travelRequests.findOne({ _id: requestId });

    if (!request) {
      return res.status(404).json({ message: 'Travel request not found' });
    }

    // Authorization checks
    if (req.user.role === 'employee' && request.employeeId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to view this request' });
    }

    if (req.user.role === 'line_manager') {
      const teamMembers = await users.find({ managerId: req.user.id }).toArray();
      const teamMemberIds = teamMembers.map(u => u._id || u.id);
      if (!teamMemberIds.includes(request.employeeId)) {
        return res.status(403).json({ message: 'Unauthorized to view this request' });
      }
    }

    res.json({ request });

  } catch (error) {
    console.error('Error fetching travel request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Cancel/delete a travel request
export const cancelTravelRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const db = await connectToDB();
    const travelRequests = db.collection('travelRequests');

    const request = await travelRequests.findOne({ _id: requestId });

    if (!request) {
      return res.status(404).json({ message: 'Travel request not found' });
    }

    if (request.employeeId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to cancel this request' });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Can only cancel pending requests' });
    }

    await travelRequests.deleteOne({ _id: requestId });

    res.json({ message: 'Travel request cancelled successfully' });

  } catch (error) {
    console.error('Error cancelling travel request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const db = await connectToDB();
    const travelRequests = db.collection('travelRequests');
    const users = db.collection('users');

    let userRequests;

    if (req.user.role === 'employee') {
      userRequests = await travelRequests.find({ employeeId: req.user.id }).toArray();
    } else if (req.user.role === 'line_manager') {
      const teamMembers = await users.find({ managerId: req.user.id }).toArray();
      const teamMemberIds = teamMembers.map(u => u._id || u.id);
      userRequests = await travelRequests.find({ employeeId: { $in: teamMemberIds } }).toArray();
    } else {
      userRequests = await travelRequests.find().toArray();
    }

    const stats = {
      total: userRequests.length,
      pending: userRequests.filter(r => r.status === 'pending').length,
      approved: userRequests.filter(r => r.status === 'approved').length,
      rejected: userRequests.filter(r => r.status === 'rejected').length,
      processed: userRequests.filter(r => r.status === 'processed').length,
      totalEstimatedCost: userRequests.reduce((sum, r) => sum + (r.estimatedCost || 0), 0),
      recentRequests: userRequests
        .sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate))
        .slice(0, 5)
    };

    res.json(stats);

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
