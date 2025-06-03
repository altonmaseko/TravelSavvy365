// travelController.js
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage for demo (replace with actual database)
let travelRequests = [];
let users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@company.com",
        employeeType: "employee",
        managerId: 2
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@company.com",
        employeeType: "line_manager",
        managerId: null
    },
    {
        id: 3,
        name: "Admin User",
        email: "admin@company.com",
        employeeType: "admin",
        managerId: null
    }
];

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

// Controller for employees to request travel
export const requestTravel = async (req, res) => {
    try {
        const {
            destination,
            startDate,
            endDate,
            purpose,
            transportationType, // 'flight', 'bus', 'car_rental', 'uber'
            accommodationRequired,
            estimatedCost,
            additionalNotes
        } = req.body;

        console.warn('Request body:', req.body);

        // Validation
        if (!destination || !startDate || !endDate || !purpose || !transportationType) {
            return res.status(400).json({
                message: 'Missing required fields: destination, startDate, endDate, purpose, transportationType'
            });
        }

        console.log(uuidv4());

        const newRequest = {
            id: uuidv4(),
            destination,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            purpose,
            transportationType,
            accommodationRequired: accommodationRequired || false,
            estimatedCost: estimatedCost || 0,
            additionalNotes: additionalNotes || '',
            status: 'pending', // pending, approved, rejected, processed
            submissionDate: new Date(),
            lastUpdated: new Date(),
            approvalHistory: []
        };

        travelRequests.push(newRequest);

        res.status(201).json({
            message: 'Travel request submitted successfully',
            requestId: newRequest.id,
            request: newRequest
        });

    } catch (error) {
        console.error('Error creating travel request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get travel requests for line managers
export const getTravelRequests = async (req, res) => {
    try {
        const { status, employeeId } = req.query;
        let requests = travelRequests;

        // Filter based on user role
        if (req.user.role === 'line_manager') {
            // Line managers see requests from their direct reports
            const teamMembers = users.filter(user => user.managerId === req.user.id);
            const teamMemberIds = teamMembers.map(member => member.id);
            requests = requests.filter(request => teamMemberIds.includes(request.employeeId));
        } else if (req.user.role === 'employee') {
            // Employees see only their own requests
            requests = requests.filter(request => request.employeeId === req.user.id);
        }
        // Admins see all requests (no filtering needed)

        // Apply additional filters
        if (status) {
            requests = requests.filter(request => request.status === status);
        }

        if (employeeId) {
            requests = requests.filter(request => request.employeeId === parseInt(employeeId));
        }

        // Sort by submission date (newest first)
        requests.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));

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

        const requestIndex = travelRequests.findIndex(request => request.id === requestId);
        
        if (requestIndex === -1) {
            return res.status(404).json({ message: 'Travel request not found' });
        }

        const request = travelRequests[requestIndex];

        // Authorization check
        if (req.user.role === 'employee' && request.employeeId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to modify this request' });
        }

        // Update the request
        const previousStatus = request.status;
        request.status = status;
        request.lastUpdated = new Date();

        // Add to approval history
        request.approvalHistory.push({
            date: new Date(),
            action: status,
            actionBy: req.user.email,
            comments: comments || '',
            previousStatus
        });

        travelRequests[requestIndex] = request;

        res.json({
            message: `Travel request ${status} successfully`,
            request
        });

    } catch (error) {
        console.error('Error updating travel request status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a specific travel request by ID
export const getTravelRequestById = async (req, res) => {
    try {
        const { requestId } = req.params;
        const request = travelRequests.find(request => request.id === requestId);

        if (!request) {
            return res.status(404).json({ message: 'Travel request not found' });
        }

        // Authorization check
        if (req.user.role === 'employee' && request.employeeId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to view this request' });
        }

        if (req.user.role === 'line_manager') {
            const teamMembers = users.filter(user => user.managerId === req.user.id);
            const teamMemberIds = teamMembers.map(member => member.id);
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

// Delete/cancel travel request
export const cancelTravelRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const requestIndex = travelRequests.findIndex(request => request.id === requestId);

        if (requestIndex === -1) {
            return res.status(404).json({ message: 'Travel request not found' });
        }

        const request = travelRequests[requestIndex];

        // Only employee who created the request can cancel it, and only if it's pending
        if (request.employeeId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to cancel this request' });
        }

        if (request.status !== 'pending') {
            return res.status(400).json({ message: 'Can only cancel pending requests' });
        }

        // Remove the request
        travelRequests.splice(requestIndex, 1);

        res.json({ message: 'Travel request cancelled successfully' });

    } catch (error) {
        console.error('Error cancelling travel request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
    try {
        let userRequests = travelRequests;

        if (req.user.role === 'employee') {
            userRequests = travelRequests.filter(request => request.employeeId === req.user.id);
        } else if (req.user.role === 'line_manager') {
            const teamMembers = users.filter(user => user.managerId === req.user.id);
            const teamMemberIds = teamMembers.map(member => member.id);
            userRequests = travelRequests.filter(request => teamMemberIds.includes(request.employeeId));
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