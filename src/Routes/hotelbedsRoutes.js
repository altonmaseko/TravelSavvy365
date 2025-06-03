import express from 'express';
import {
    checkHotelbedsStatus,
    searchHotelbedsHotels,
    checkHotelRates,
    createHotelBooking,
    getHotelBooking,
    cancelHotelBooking,
    getHotelDestinations,
    searchHotelsForTravelRequest,
    getUserBookingHistory,
    validateRateForBooking,
    getHotelDetails
} from '../Controllers/hotelbedsController.js';
import { authenticateToken } from '../Controllers/travelController.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/status', checkHotelbedsStatus);
router.get('/destinations', getHotelDestinations);
router.get('/hotels/search', searchHotelbedsHotels);
router.get('/hotels/:hotelCode/details', getHotelDetails);
router.post('/rates/check', checkHotelRates);
router.post('/rates/validate', validateRateForBooking);

// Protected routes (authentication required)
//router.use(authenticateToken);

// Booking management routes
router.post('/book', createHotelBooking);
router.get('/bookings/:reference', getHotelBooking);
router.delete('/bookings/:reference', cancelHotelBooking);
router.get('/bookings/user/history', getUserBookingHistory);

// Integration routes with travel request system
router.get('/travel-request/:travelRequestId/hotels', searchHotelsForTravelRequest);

export default router;