// hotelbedsController.js
import { HotelbedsService } from './hotelbedsService.js';

const hotelbedsService = new HotelbedsService();

/**
 * Check Hotelbeds API status
 */
export const checkHotelbedsStatus = async (req, res) => {
    try {
        const status = await hotelbedsService.checkStatus();
        
        res.json({
            message: 'Hotelbeds API status retrieved',
            data: status,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Status check error:', error);
        res.status(500).json({
            message: 'Failed to check Hotelbeds status',
            error: error.message
        });
    }
};

/**
 * Search hotels using Hotelbeds API
 */
export const searchHotelbedsHotels = async (req, res) => {
    try {
        const {
            destination,
            checkIn,
            checkOut,
            adults = 2,
            children = 0,
            rooms = 1,
            childrenAges = [],
            currency = 'USD',
            language = 'ENG'
        } = req.query;

        // Validation
        if (!destination) {
            return res.status(400).json({
                message: 'Destination is required'
            });
        }

        if (!checkIn || !checkOut) {
            return res.status(400).json({
                message: 'Check-in and check-out dates are required (YYYY-MM-DD format)'
            });
        }

        // Validate dates
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const today = new Date();

        if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
            return res.status(400).json({
                message: 'Invalid date format. Use YYYY-MM-DD'
            });
        }

        if (checkInDate <= today) {
            return res.status(400).json({
                message: 'Check-in date must be in the future'
            });
        }

        if (checkOutDate <= checkInDate) {
            return res.status(400).json({
                message: 'Check-out date must be after check-in date'
            });
        }

        // Parse children ages if provided
        let parsedChildrenAges = [];
        if (childrenAges && typeof childrenAges === 'string') {
            parsedChildrenAges = childrenAges.split(',').map(age => parseInt(age.trim()));
        } else if (Array.isArray(childrenAges)) {
            parsedChildrenAges = childrenAges.map(age => parseInt(age));
        }

        const searchParams = {
            destination,
            checkIn,
            checkOut,
            adults: parseInt(adults),
            children: parseInt(children),
            rooms: parseInt(rooms),
            childrenAges: parsedChildrenAges,
            currency,
            language
        };

        const results = await hotelbedsService.searchHotels(searchParams);
        
        res.json({
            message: 'Hotel search completed',
            data: results,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Hotel search error:', error);
        res.status(500).json({
            message: 'Hotel search failed',
            error: error.message
        });
    }
};

/**
 * Check rates for a specific rate key (for RECHECK rates)
 */
export const checkHotelRates = async (req, res) => {
    try {
        const { rateKey } = req.body;

        if (!rateKey) {
            return res.status(400).json({
                message: 'Rate key is required'
            });
        }

        const results = await hotelbedsService.checkRates(rateKey);
        
        res.json({
            message: 'Rate check completed',
            data: results,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Rate check error:', error);
        res.status(500).json({
            message: 'Rate check failed',
            error: error.message
        });
    }
};

/**
 * Create a hotel booking
 */
export const createHotelBooking = async (req, res) => {
    try {
        const {
            rateKey,
            holder,
            rooms,
            clientReference,
            remark,
            tolerance = 2.00,
            travelRequestId // Link to your travel request system
        } = req.body;

        // Validation
        if (!rateKey || !holder || !rooms) {
            return res.status(400).json({
                message: 'Missing required fields: rateKey, holder, rooms'
            });
        }

        if (!holder.name || !holder.surname) {
            return res.status(400).json({
                message: 'Holder name and surname are required'
            });
        }

        if (!Array.isArray(rooms) || rooms.length === 0) {
            return res.status(400).json({
                message: 'At least one room is required'
            });
        }

        // Validate room paxes
        for (const room of rooms) {
            if (!room.paxes || !Array.isArray(room.paxes) || room.paxes.length === 0) {
                return res.status(400).json({
                    message: 'Each room must have at least one guest (pax)'
                });
            }

            for (const pax of room.paxes) {
                if (!pax.name || !pax.surname || !pax.type) {
                    return res.status(400).json({
                        message: 'Each guest must have name, surname, and type (AD/CH)'
                    });
                }
            }
        }

        const bookingData = {
            rateKey,
            holder,
            rooms,
            clientReference: clientReference || `TMS_${req.user?.id}_${Date.now()}`,
            remark: remark || `Booking created via Travel Management System${travelRequestId ? ` for request ${travelRequestId}` : ''}`,
            tolerance: parseFloat(tolerance)
        };

        const bookingResult = await hotelbedsService.createBooking(bookingData);
        
        // If linked to travel request, you could update the travel request status here
        if (travelRequestId) {
            // Update travel request with booking reference
            // This would integrate with your existing travel request system
            console.log(`Booking ${bookingResult.reference} created for travel request ${travelRequestId}`);
        }

        res.status(201).json({
            message: 'Hotel booking created successfully',
            data: {
                ...bookingResult,
                travelRequestId,
                bookingDetails: {
                    environment: bookingResult.environment,
                    instructions: bookingResult.environment === 'test' ? 
                        'This is a test booking. No actual charges will occur.' :
                        'This is a live booking. Please ensure payment processing is complete.'
                }
            },
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Booking creation error:', error);
        res.status(500).json({
            message: 'Booking creation failed',
            error: error.message,
            details: 'Please check rate availability and try again'
        });
    }
};

/**
 * Get booking details
 */
export const getHotelBooking = async (req, res) => {
    try {
        const { reference } = req.params;
        const { language = 'ENG' } = req.query;

        const booking = await hotelbedsService.getBooking(reference, language);
        
        res.json({
            message: 'Booking details retrieved',
            data: booking,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Get booking error:', error);
        res.status(404).json({
            message: 'Booking not found or retrieval failed',
            error: error.message
        });
    }
};

/**
 * Get available destinations
 */
export const getHotelDestinations = async (req, res) => {
    try {
        const { language = 'ENG' } = req.query;
        
        const destinations = await hotelbedsService.getDestinations(language);
        
        res.json({
            message: 'Destinations retrieved',
            data: destinations,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Get destinations error:', error);
        res.status(500).json({
            message: 'Failed to retrieve destinations',
            error: error.message
        });
    }
};

/**
 * Integration endpoint: Search hotels for travel request
 * This integrates with your existing travel request system
 */
export const searchHotelsForTravelRequest = async (req, res) => {
    try {
        const { travelRequestId } = req.params;
        const {
            destination,
            checkIn,
            checkOut,
            adults = 2,
            children = 0,
            rooms = 1
        } = req.query;

        // You could fetch travel request details here to get destination/dates
        // For now, we'll use the provided parameters

        if (!destination || !checkIn || !checkOut) {
            return res.status(400).json({
                message: 'Destination, check-in, and check-out dates are required'
            });
        }

        const searchParams = {
            destination,
            checkIn,
            checkOut,
            adults: parseInt(adults),
            children: parseInt(children),
            rooms: parseInt(rooms)
        };

        const results = await hotelbedsService.searchHotels(searchParams);
        
        // Add travel request context to results
        const enhancedResults = {
            ...results,
            travelRequestId,
            bookingInstructions: {
                message: 'To book a hotel, use the /api/booking/hotelbeds/book endpoint with the rateKey',
                requiredFields: ['rateKey', 'holder', 'rooms'],
                nextSteps: [
                    'Select a hotel and room rate',
                    'If rateType is RECHECK, call /api/booking/hotelbeds/rates/check first',
                    'Submit booking with guest details',
                    'Receive booking confirmation'
                ]
            }
        };

        res.json({
            message: `Hotels found for travel request ${travelRequestId}`,
            data: enhancedResults,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Travel request hotel search error:', error);
        res.status(500).json({
            message: 'Hotel search for travel request failed',
            error: error.message
        });
    }
};

/**
 * Get booking history for a user
 */
export const getUserBookingHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // In a real implementation, you'd query your database for bookings by this user
        // For now, we'll return a mock response
        
        const mockBookings = [
            {
                reference: 'HTB-123456',
                status: 'CONFIRMED',
                hotel: 'Demo Hotel Cape Town',
                checkIn: '2025-06-15',
                checkOut: '2025-06-18',
                totalAmount: 450.00,
                currency: 'EUR',
                createdDate: '2025-05-28'
            }
        ];

        res.json({
            message: 'Booking history retrieved',
            data: {
                userId,
                bookings: mockBookings,
                total: mockBookings.length
            },
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Get booking history error:', error);
        res.status(500).json({
            message: 'Failed to retrieve booking history',
            error: error.message
        });
    }
};

/**
 * Validate rate before booking (utility endpoint)
 */
export const validateRateForBooking = async (req, res) => {
    try {
        const { rateKey, guestCount } = req.body;

        if (!rateKey) {
            return res.status(400).json({
                message: 'Rate key is required'
            });
        }

        // Check if rate needs validation (RECHECK type)
        if (rateKey.includes('RECHECK') || req.body.forceCheck) {
            const rateCheck = await hotelbedsService.checkRates(rateKey);
            
            res.json({
                message: 'Rate validated successfully',
                data: {
                    valid: true,
                    rateDetails: rateCheck,
                    requiresRecheck: true,
                    updatedRateKey: rateCheck.rate.rateKey
                },
                timestamp: new Date().toISOString()
            });
        } else {
            res.json({
                message: 'Rate is bookable without recheck',
                data: {
                    valid: true,
                    requiresRecheck: false,
                    rateKey: rateKey
                },
                timestamp: new Date().toISOString()
            });
        }

    } catch (error) {
        console.error('Rate validation error:', error);
        res.status(500).json({
            message: 'Rate validation failed',
            error: error.message,
            data: {
                valid: false,
                reason: 'Rate no longer available or invalid'
            }
        });
    }
};

/**
 * Get hotel content/details (would use Content API in full implementation)
 */
export const getHotelDetails = async (req, res) => {
    try {
        const { hotelCode } = req.params;
        const { language = 'ENG' } = req.query;

        if (!hotelCode) {
            return res.status(400).json({
                message: 'Hotel code is required'
            });
        }

        // Mock hotel details (in real implementation, use Hotelbeds Content API)
        const mockHotelDetails = {
            code: hotelCode,
            name: `Hotel ${hotelCode}`,
            description: 'Luxury hotel with excellent amenities and service',
            images: [
                'https://images.unsplash.com/photo-1566073771259-6a8506099945',
                'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'
            ],
            facilities: [
                { code: 'WIFI', description: 'Free WiFi' },
                { code: 'POOL', description: 'Swimming Pool' },
                { code: 'SPA', description: 'Spa Services' },
                { code: 'GYM', description: 'Fitness Center' },
                { code: 'REST', description: 'Restaurant' }
            ],
            address: 'Hotel Address Street 123',
            phone: '+1-234-567-8900',
            email: 'info@hotel.com',
            coordinates: { latitude: -33.9249, longitude: 18.4241 },
            categoryCode: '4EST',
            categoryName: '4 STARS'
        };

        res.json({
            message: 'Hotel details retrieved',
            data: mockHotelDetails,
            note: 'Using mock data. Configure Hotelbeds Content API for real hotel details.',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Get hotel details error:', error);
        res.status(500).json({
            message: 'Failed to retrieve hotel details',
            error: error.message
        });
    }
};

