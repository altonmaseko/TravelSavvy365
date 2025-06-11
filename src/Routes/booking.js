// bookingRoutes.js
import express from 'express';
import {
    searchHotels,
    searchFlights,
    getFlightStatus,
    searchTravelPackage,
    getApiInfo,
    createBookingRequest,
    getPopularDestinations
} from '../Controllers/bookingController.js';
import { authenticateToken } from '../Controllers/travelController.js';

const router = express.Router();

// Public routes (no authentication required for searching)
router.get('/destinations/popular', getPopularDestinations);
router.get('/api-info', getApiInfo);

// Hotel search routes
router.get('/hotels/search/:city', searchHotels);

// Flight search routes
router.get('/flights/search', searchFlights);
router.get('/flights/status/:flightNumber', getFlightStatus);

// Travel package search (hotels + flights combined)
router.get('/package/search', searchTravelPackage);

// Protected routes (authentication required)
//router.use(authenticateToken);

// Booking request routes (requires authentication)
router.post('/request', createBookingRequest);

export default router;