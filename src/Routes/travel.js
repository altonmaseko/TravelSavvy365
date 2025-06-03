// travel.js
import express from 'express';
import {
    requestTravel,
    getTravelRequests,
    updateTravelRequestStatus,
    getTravelRequestById,
    cancelTravelRequest,
    getDashboardStats,
    authenticateToken
} from '../Controllers/travelController.js';

const router = express.Router();

// Apply authentication middleware to all routes

//router.use(authenticateToken);

// Employee routes
router.post('/request', requestTravel);
router.get('/my-requests', getTravelRequests);
router.delete('/request/:requestId', cancelTravelRequest);

// General routes
router.get('/requests', getTravelRequests);
router.get('/request/:requestId', getTravelRequestById);
router.get('/dashboard/stats', getDashboardStats);

// Manager/Admin routes
router.put('/request/:requestId/status', updateTravelRequestStatus);

export default router;