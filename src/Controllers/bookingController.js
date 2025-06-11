import { 
    HotelBookingService, 
    FlightBookingService
} from './bookingService.js';

const hotelService = new HotelBookingService();
const flightService = new FlightBookingService();

/**
 * Search hotels in a specific city
 */
export const searchHotels = async (req, res) => {
    try {
        const { city } = req.params;
        
        if (!city) {
            return res.status(400).json({
                message: 'City parameter is required'
            });
        }

        const results = await hotelService.searchHotelsByCity(city);
        
        res.json({
            message: 'Hotels found successfully',
            data: results,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error in searchHotels:', error);
        res.status(500).json({
            message: 'Failed to search hotels',
            error: error.message,
            limitations: 'This is a free API with limitations. Register at makcorps.com for full features.'
        });
    }
};

/**
 * Search flights between cities
 */
export const searchFlights = async (req, res) => {
    try {
        const { 
            origin, 
            destination, 
            departureDate, 
            returnDate, 
            passengers = 1 
        } = req.query;

        // Validation
        if (!origin || !destination || !departureDate) {
            return res.status(400).json({
                message: 'Missing required parameters: origin, destination, departureDate'
            });
        }

        // Validate date format
        const depDate = new Date(departureDate);
        if (isNaN(depDate.getTime())) {
            return res.status(400).json({
                message: 'Invalid departure date format. Use YYYY-MM-DD'
            });
        }

        // Validate return date if provided
        if (returnDate) {
            const retDate = new Date(returnDate);
            if (isNaN(retDate.getTime()) || retDate <= depDate) {
                return res.status(400).json({
                    message: 'Invalid return date. Must be after departure date and in YYYY-MM-DD format'
                });
            }
        }

        const searchParams = {
            origin: origin.toUpperCase(),
            destination: destination.toUpperCase(),
            departureDate,
            returnDate,
            passengers: parseInt(passengers)
        };

        const results = await flightService.searchFlights(searchParams);
        
        res.json({
            message: 'Flights found successfully',
            data: results,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error in searchFlights:', error);
        res.status(500).json({
            message: 'Failed to search flights',
            error: error.message,
            limitations: 'This is demo mode. Register at flightapi.io for real-time data.'
        });
    }
};

/**
 * Get flight status by flight number
 */
export const getFlightStatus = async (req, res) => {
    try {
        const { flightNumber } = req.params;
        const { date = new Date().toISOString().split('T')[0] } = req.query;

        if (!flightNumber) {
            return res.status(400).json({
                message: 'Flight number is required'
            });
        }

        const results = await flightService.getFlightStatus(flightNumber, date);
        
        res.json({
            message: results.found ? 'Flight status retrieved successfully' : 'Flight not found',
            data: results,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error in getFlightStatus:', error);
        res.status(500).json({
            message: 'Failed to get flight status',
            error: error.message
        });
    }
};

/**
 * Search for complete travel package (hotels + flights) with proper error handling
 */
export const searchTravelPackage = async (req, res) => {
    try {
        const { 
            destination, 
            origin, 
            departureDate, 
            returnDate, 
            passengers = 1,
            includeHotels = 'true',
            includeFlights = 'true'
        } = req.query;

        // Validation
        if (!destination) {
            return res.status(400).json({
                message: 'Destination is required'
            });
        }

        if (includeFlights === 'true' && (!origin || !departureDate)) {
            return res.status(400).json({
                message: 'Origin and departure date are required when including flights'
            });
        }

        const results = {};
        let hasErrors = false;
        const errors = [];

        // Search flights if requested
        if (includeFlights === 'true' && origin && departureDate) {
            try {
                const flightSearchParams = {
                    origin: origin.toUpperCase(),
                    destination: getAirportCodeFromCity(destination),
                    departureDate,
                    returnDate,
                    passengers: parseInt(passengers)
                };

                results.flights = await flightService.searchFlights(flightSearchParams);
            } catch (error) {
                console.error('Flight search failed:', error);
                hasErrors = true;
                errors.push('Flight search temporarily unavailable');
                results.flights = {
                    flights: [],
                    total: 0,
                    error: 'Flight search failed',
                    provider: 'FlightAPI (Error)'
                };
            }
        }

        // Search hotels if requested - Use working method
        if (includeHotels === 'true') {
            try {
                // Try Hotelbeds integration first
                if (process.env.HOTELBEDS_API_KEY && process.env.HOTELBEDS_SECRET) {
                    results.hotels = await searchHotelsWithHotelbeds(destination, departureDate, returnDate, passengers);
                } else {
                    // Use enhanced fallback data
                    results.hotels = await getEnhancedHotelFallback(destination);
                }
            } catch (error) {
                console.error('Hotel search failed:', error);
                hasErrors = true;
                errors.push('Hotel search temporarily unavailable');
                results.hotels = await getEnhancedHotelFallback(destination);
            }
        }

        // Calculate package summary
        const flightCost = extractFlightCost(results.flights);
        const hotelCost = extractHotelCost(results.hotels);
        const totalNights = returnDate ? 
            Math.ceil((new Date(returnDate) - new Date(departureDate)) / (1000 * 60 * 60 * 24)) : 
            3; // Default 3 nights if no return date

        results.packageSummary = {
            estimatedTotal: flightCost + (hotelCost * totalNights),
            currency: 'USD',
            breakdown: {
                flights: flightCost,
                hotels: hotelCost * totalNights,
                hotelsPerNight: hotelCost,
                nights: totalNights
            },
            searchParams: {
                destination,
                origin,
                departureDate,
                returnDate: returnDate || addDaysToDate(departureDate, totalNights),
                passengers: parseInt(passengers)
            },
            searchDate: new Date().toISOString()
        };

        // Add booking instructions
        results.bookingInstructions = {
            hotels: process.env.HOTELBEDS_API_KEY ? 
                'Use /api/booking/hotelbeds/book for live hotel bookings' :
                'Add Hotelbeds credentials for live hotel booking',
            flights: 'Flight booking available through integrated APIs',
            package: 'Book components separately, then link to travel request'
        };

        const response = {
            message: 'Travel package search completed',
            data: results,
            warnings: hasErrors ? errors : undefined,
            timestamp: new Date().toISOString()
        };

        res.json(response);

    } catch (error) {
        console.error('Error in searchTravelPackage:', error);
        res.status(500).json({
            message: 'Travel package search failed',
            error: error.message,
            fallbackData: await getCompleteFallbackData(req.query)
        });
    }
};

/**
 * Get API limitations and upgrade information
 */
export const getApiInfo = async (req, res) => {
    try {
        const limitations = {
            hotels: {
                provider: 'Multiple Sources',
                hotelbeds: {
                    status: process.env.HOTELBEDS_API_KEY ? 'Configured' : 'Not Configured',
                    inventory: '300,000+ hotels worldwide',
                    features: ['Real-time booking', 'Live rates', 'Instant confirmation']
                },
                fallback: {
                    status: 'Always Available',
                    features: ['Enhanced mock data', 'City-specific hotels', 'Realistic pricing']
                }
            },
            flights: {
                provider: 'FlightAPI',
                freeLimit: '50 API calls',
                limitations: [
                    'Limited airline coverage in free tier',
                    'No real-time booking',
                    'Basic flight information only'
                ],
                upgradeInfo: 'Visit flightapi.io for paid plans starting at $49/month'
            },
            package: {
                features: [
                    'Combined hotel + flight search',
                    'Automatic cost calculation',
                    'Travel request integration',
                    'Multiple fallback options'
                ]
            },
            recommendations: [
                'Add Hotelbeds credentials for professional hotel booking',
                'Register for FlightAPI for expanded flight data',
                'Implement caching to reduce API calls',
                'Monitor API usage to avoid exceeding limits'
            ]
        };
        
        res.json({
            message: 'API information retrieved successfully',
            data: limitations,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error in getApiInfo:', error);
        res.status(500).json({
            message: 'Failed to get API information',
            error: error.message
        });
    }
};

/**
 * Create a booking request (integrated with travel request system)
 */
export const createBookingRequest = async (req, res) => {
    try {
        const {
            travelRequestId,
            bookingType, // 'hotel' | 'flight' | 'package'
            selectedHotel,
            selectedFlight,
            specialRequests
        } = req.body;

        // Validation
        if (!travelRequestId || !bookingType) {
            return res.status(400).json({
                message: 'Travel request ID and booking type are required'
            });
        }

        // This would integrate with your existing travel request system
        // For now, we'll create a booking record
        const bookingRequest = {
            id: `booking_${Date.now()}`,
            travelRequestId,
            employeeId: req.user.id,
            bookingType,
            selectedHotel: selectedHotel || null,
            selectedFlight: selectedFlight || null,
            specialRequests: specialRequests || '',
            status: 'pending_confirmation',
            createdAt: new Date().toISOString(),
            estimatedCost: calculateEstimatedCost(selectedHotel, selectedFlight),
            note: 'Booking request created. Admin will process actual booking through API providers.'
        };

        // In a real app, you'd save this to your database
        // For demo, we'll just return the booking request
        
        res.status(201).json({
            message: 'Booking request created successfully',
            data: bookingRequest,
            nextSteps: [
                'Admin will review the booking request',
                'Once approved, actual booking will be made through API providers',
                'Confirmation details will be sent via email'
            ],
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error in createBookingRequest:', error);
        res.status(500).json({
            message: 'Failed to create booking request',
            error: error.message
        });
    }
};

/**
 * Get popular destinations (mock data for demo)
 */
export const getPopularDestinations = async (req, res) => {
    try {
        const destinations = [
            {
                city: 'Cape Town',
                country: 'South Africa',
                airport: 'CPT',
                description: 'Beautiful coastal city with Table Mountain',
                averageHotelPrice: 120,
                averageFlightPrice: 250,
                imageUrl: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99'
            },
            {
                city: 'Johannesburg',
                country: 'South Africa',
                airport: 'JNB',
                description: 'Economic hub and gateway to Africa',
                averageHotelPrice: 100,
                averageFlightPrice: 200,
                imageUrl: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743'
            },
            {
                city: 'Durban',
                country: 'South Africa',
                airport: 'DUR',
                description: 'Coastal city with golden beaches',
                averageHotelPrice: 90,
                averageFlightPrice: 180,
                imageUrl: 'https://images.unsplash.com/photo-1551918120-9739cb430c6d'
            },
            {
                city: 'London',
                country: 'United Kingdom',
                airport: 'LHR',
                description: 'Historic capital with modern attractions',
                averageHotelPrice: 200,
                averageFlightPrice: 800,
                imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad'
            },
            {
                city: 'Barcelona',
                country: 'Spain',
                airport: 'BCN',
                description: 'Mediterranean culture and stunning architecture',
                averageHotelPrice: 150,
                averageFlightPrice: 650,
                imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded'
            }
        ];

        res.json({
            message: 'Popular destinations retrieved successfully',
            data: destinations,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error in getPopularDestinations:', error);
        res.status(500).json({
            message: 'Failed to get popular destinations',
            error: error.message
        });
    }
};

// ===== HELPER FUNCTIONS =====

/**
 * Search hotels using Hotelbeds integration
 */
async function searchHotelsWithHotelbeds(destination, checkIn, checkOut, passengers) {
    try {
        // Import HotelbedsService dynamically
        const { HotelbedsService } = await import('./hotelbedsService.js');
        const hotelbedsService = new HotelbedsService();

        const searchParams = {
            destination: getHotelDestinationCode(destination),
            checkIn,
            checkOut: checkOut || addDaysToDate(checkIn, 3),
            adults: parseInt(passengers) || 2,
            currency: 'USD'
        };

        return await hotelbedsService.searchHotels(searchParams);
    } catch (error) {
        console.error('Hotelbeds search failed:', error);
        throw error;
    }
}

/**
 * Get enhanced hotel fallback data
 */
async function getEnhancedHotelFallback(destination) {
    const cityData = getCitySpecificHotelData(destination);
    
    return {
        hotels: cityData.hotels.map((hotel, index) => ({
            id: `fallback_${index}`,
            name: hotel.name,
            price: {
                amount: hotel.basePrice + Math.floor(Math.random() * 50),
                currency: 'USD',
                total: hotel.basePrice + Math.floor(Math.random() * 50),
                vendor: hotel.vendor
            },
            rating: hotel.rating,
            reviews: hotel.reviews,
            location: hotel.location,
            amenities: hotel.amenities,
            images: [`https://images.unsplash.com/photo-${1566073771259 + index}-6a8506099945`],
            description: `Professional ${hotel.rating}-star hotel in ${hotel.location}`,
            bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel.name)}`,
            provider: 'Enhanced Fallback',
            isDemo: true
        })),
        total: cityData.hotels.length,
        provider: 'Enhanced Fallback Data',
        message: 'Add Hotelbeds credentials for real hotel data',
        searchLocation: destination,
        upgrade: {
            message: 'Get real-time hotel data with Hotelbeds integration',
            instruction: 'Add HOTELBEDS_API_KEY and HOTELBEDS_SECRET to your .env file'
        }
    };
}

/**
 * Get city-specific hotel data
 */
function getCitySpecificHotelData(destination) {
    const cityName = destination.toLowerCase().replace(/[-\s]+/g, ' ');
    
    const hotelDatabases = {
        'cape town': {
            hotels: [
                {
                    name: 'The Table Bay Hotel',
                    basePrice: 280,
                    rating: 4.8,
                    reviews: 1205,
                    location: 'V&A Waterfront, Cape Town',
                    amenities: ['Ocean View', 'Spa', 'Pool', 'Free WiFi', 'Restaurant'],
                    vendor: 'Booking.com'
                },
                {
                    name: 'Belmond Mount Nelson Hotel',
                    basePrice: 320,
                    rating: 4.7,
                    reviews: 892,
                    location: 'Gardens, Cape Town',
                    amenities: ['Historic Property', 'Gardens', 'Spa', 'Pool'],
                    vendor: 'Hotels.com'
                },
                {
                    name: 'Cape Grace Hotel',
                    basePrice: 250,
                    rating: 4.6,
                    reviews: 658,
                    location: 'V&A Waterfront, Cape Town',
                    amenities: ['Harbor Views', 'Spa', 'Pool', 'Butler Service'],
                    vendor: 'Expedia'
                }
            ]
        },
        'johannesburg': {
            hotels: [
                {
                    name: 'The Saxon Hotel, Villas and Spa',
                    basePrice: 200,
                    rating: 4.9,
                    reviews: 743,
                    location: 'Sandhurst, Johannesburg',
                    amenities: ['Luxury Spa', 'Private Villas', 'Fine Dining'],
                    vendor: 'Booking.com'
                },
                {
                    name: 'Four Seasons Hotel The Westcliff',
                    basePrice: 180,
                    rating: 4.7,
                    reviews: 1024,
                    location: 'Westcliff, Johannesburg',
                    amenities: ['City Views', 'Spa', 'Pool', 'Multiple Restaurants'],
                    vendor: 'Hotels.com'
                }
            ]
        },
        'london': {
            hotels: [
                {
                    name: 'The Savoy',
                    basePrice: 450,
                    rating: 4.8,
                    reviews: 2156,
                    location: 'Covent Garden, London',
                    amenities: ['Thames Views', 'Historic Luxury', 'Spa'],
                    vendor: 'Booking.com'
                },
                {
                    name: 'The Langham London',
                    basePrice: 380,
                    rating: 4.7,
                    reviews: 1834,
                    location: 'Marylebone, London',
                    amenities: ['Historic Property', 'Afternoon Tea', 'Spa'],
                    vendor: 'Hotels.com'
                }
            ]
        },
        'barcelona': {
            hotels: [
                {
                    name: 'Hotel Casa Fuster',
                    basePrice: 220,
                    rating: 4.5,
                    reviews: 892,
                    location: 'Gracia, Barcelona',
                    amenities: ['Rooftop Pool', 'Historic Building', 'City Views'],
                    vendor: 'Booking.com'
                },
                {
                    name: 'Hotel Arts Barcelona',
                    basePrice: 280,
                    rating: 4.6,
                    reviews: 1156,
                    location: 'Port Olimpic, Barcelona',
                    amenities: ['Beach Access', 'Spa', 'Michelin Restaurant'],
                    vendor: 'Hotels.com'
                }
            ]
        }
    };

    return hotelDatabases[cityName] || {
        hotels: [
            {
                name: `Grand Hotel ${destination}`,
                basePrice: 150,
                rating: 4.2,
                reviews: 456,
                location: `City Center, ${destination}`,
                amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Gym'],
                vendor: 'Booking.com'
            },
            {
                name: `${destination} Plaza Hotel`,
                basePrice: 120,
                rating: 4.0,
                reviews: 324,
                location: `Downtown, ${destination}`,
                amenities: ['Free WiFi', 'Restaurant', 'Business Center'],
                vendor: 'Hotels.com'
            }
        ]
    };
}

/**
 * Helper functions
 */
function getAirportCodeFromCity(city) {
    const cityToAirport = {
        'cape town': 'CPT',
        'cape-town': 'CPT',
        'johannesburg': 'JNB',
        'durban': 'DUR',
        'london': 'LHR',
        'paris': 'CDG',
        'barcelona': 'BCN',
        'madrid': 'MAD',
        'new york': 'JFK',
        'los angeles': 'LAX'
    };
    return cityToAirport[city.toLowerCase()] || city.toUpperCase();
}

function getHotelDestinationCode(city) {
    const cityToDestination = {
        'cape town': 'CPT',
        'cape-town': 'CPT',
        'johannesburg': 'JNB',
        'london': 'LHR',
        'barcelona': 'BCN',
        'madrid': 'MAD',
        'palma': 'PMI',
        'mallorca': 'PMI'
    };
    return cityToDestination[city.toLowerCase()] || city.toLowerCase();
}

function addDaysToDate(dateString, days) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}

function extractFlightCost(flightResults) {
    if (!flightResults || !flightResults.flights) return 300; // Default
    
    if (flightResults.outbound && flightResults.return) {
        const outbound = flightResults.outbound[0]?.price?.amount || 200;
        const returnFlight = flightResults.return[0]?.price?.amount || 200;
        return outbound + returnFlight;
    } else if (flightResults.flights && flightResults.flights.length > 0) {
        return flightResults.flights[0]?.price?.amount || 300;
    }
    return 300;
}

function extractHotelCost(hotelResults) {
    if (!hotelResults || !hotelResults.hotels || hotelResults.hotels.length === 0) {
        return 120; // Default per night
    }
    return hotelResults.hotels[0]?.price?.total || hotelResults.hotels[0]?.price?.amount || 120;
}

function calculateEstimatedCost(hotel, flight) {
    let total = 0;
    
    if (hotel && hotel.price) {
        total += hotel.price.total || hotel.price.amount || 0;
    }
    
    if (flight && flight.price) {
        total += flight.price.amount || 0;
    }
    
    return total;
}

async function getCompleteFallbackData(queryParams) {
    const { destination, origin, departureDate, returnDate, passengers } = queryParams;
    
    return {
        hotels: await getEnhancedHotelFallback(destination || 'default'),
        flights: {
            flights: [{
                id: 'fallback_flight',
                airline: 'Demo Airlines',
                flightNumber: 'DA123',
                price: { amount: 300, currency: 'USD' },
                origin: { code: origin || 'JNB', name: 'Origin Airport' },
                destination: { code: getAirportCodeFromCity(destination || 'CPT'), name: 'Destination Airport' },
                departure: { date: departureDate || '2025-06-15', time: '08:30' },
                arrival: { date: departureDate || '2025-06-15', time: '10:45' },
                provider: 'Fallback Mode'
            }],
            total: 1,
            provider: 'Demo Data'
        },
        packageSummary: {
            estimatedTotal: 720,
            currency: 'USD',
            breakdown: { 
                flights: 300, 
                hotels: 420,
                nights: 3
            },
            note: 'Fallback estimates - add API credentials for real data'
        }
    };
}