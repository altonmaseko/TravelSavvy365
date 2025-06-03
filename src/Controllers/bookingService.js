import dotenv from 'dotenv';

dotenv.config();

const MAKCORPS_BASE_URL = 'https://api.makcorps.com';
const FLIGHTAPI_BASE_URL = 'https://api.flightapi.io';
const AVIATIONSTACK_BASE_URL = 'https://api.aviationstack.com/v1';

/**
 * Hotel Booking Service with multiple API options
 */
export class HotelBookingService {
    constructor() {
        this.makcorpsApiKey = process.env.MAKCORPS_API_KEY;
        this.rapidApiKey = process.env.RAPIDAPI_KEY;
        this.serpApiKey = process.env.SERPAPI_KEY;
    }

    /**
     * Search hotels in a city using multiple fallback APIs
     * @param {string} city - City name (e.g., "london", "cape-town")
     * @returns {Object} Hotel search results
     */
    async searchHotelsByCity(city) {
        // Try different API sources in order of preference
        const apiAttempts = [
            () => this.searchWithMakcorps(city),
            () => this.searchWithGoogleHotels(city),
            () => this.getMockHotelData(city) // Always available fallback
        ];

        for (const attemptApi of apiAttempts) {
            try {
                const result = await attemptApi();
                if (result && result.hotels && result.hotels.length > 0) {
                    return result;
                }
            } catch (error) {
                console.warn(`API attempt failed: ${error.message}`);
                continue; // Try next API
            }
        }

        // If all real APIs fail, return mock data
        return this.getMockHotelData(city);
    }

    /**
     * Search hotels using Makcorps API (requires registration)
     */
    async searchWithMakcorps(city) {
        if (!this.makcorpsApiKey) {
            throw new Error('Makcorps API key not configured');
        }

        // Note: Makcorps now requires paid plans, no completely free tier
        const url = `${MAKCORPS_BASE_URL}/search-by-city-id`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': this.makcorpsApiKey
            }
        });

        if (!response.ok) {
            throw new Error(`Makcorps API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return this.transformMakcorpsData(data);
    }

    /**
     * Search hotels using Google Hotels via SerpApi (has free tier)
     */
    async searchWithGoogleHotels(city) {
        if (!this.serpApiKey) {
            throw new Error('SerpApi key not configured');
        }

        const url = 'https://serpapi.com/search.json';
        const params = new URLSearchParams({
            engine: 'google_hotels',
            q: `hotels in ${city}`,
            check_in_date: this.getRandomFutureDate(),
            check_out_date: this.getRandomFutureDate(3),
            adults: '2',
            currency: 'USD',
            api_key: this.serpApiKey
        });

        const response = await fetch(`${url}?${params}`);
        
        if (!response.ok) {
            throw new Error(`Google Hotels API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return this.transformGoogleHotelsData(data, city);
    }

    /**
     * Transform Google Hotels API response
     */
    transformGoogleHotelsData(rawData, city) {
        if (!rawData.properties || !Array.isArray(rawData.properties)) {
            return { hotels: [], total: 0 };
        }

        const hotels = rawData.properties.map((property, index) => ({
            id: `google_${index}`,
            name: property.name || 'Hotel Name',
            price: {
                amount: property.rate_per_night?.lowest || Math.floor(Math.random() * 200) + 50,
                tax: 0,
                total: property.rate_per_night?.lowest || Math.floor(Math.random() * 200) + 50,
                currency: 'USD',
                vendor: 'Google Hotels'
            },
            rating: property.overall_rating || 4.0,
            reviews: property.reviews || 100,
            location: property.location || city,
            amenities: property.amenities || ['WiFi', 'Parking'],
            images: property.images ? [property.images[0]?.thumbnail] : [],
            bookingUrl: property.booking_link || `https://www.google.com/travel/hotels?q=${encodeURIComponent(property.name)}`,
            apiProvider: 'Google Hotels'
        }));

        return {
            hotels,
            total: hotels.length,
            searchLocation: city,
            limitations: {
                message: "Google Hotels API - Real data with SerpApi key",
                realTimeData: true,
                maxResults: 20
            }
        };
    }

    /**
     * Transform Makcorps API response
     */
    transformMakcorpsData(rawData) {
        // This would handle the actual Makcorps response structure
        // Since it requires paid plan, we'll use mock structure for now
        return {
            hotels: [],
            total: 0,
            message: "Makcorps requires paid plan - contact support@makcorps.com"
        };
    }

    /**
     * Generate random future date for hotel searches
     */
    getRandomFutureDate(daysFromNow = 1) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromNow + Math.floor(Math.random() * 30));
        return date.toISOString().split('T')[0];
    }

    /**
     * Enhanced mock hotel data that looks realistic
     */
    getMockHotelData(city) {
        const cityData = this.getCityHotelData(city);
        
        const hotels = cityData.hotels.map((hotel, index) => ({
            id: `mock_${index}`,
            name: hotel.name,
            price: {
                amount: hotel.basePrice + Math.floor(Math.random() * 100),
                tax: Math.floor(hotel.basePrice * 0.1),
                total: hotel.basePrice + Math.floor(Math.random() * 100) + Math.floor(hotel.basePrice * 0.1),
                currency: 'USD',
                vendor: hotel.vendor
            },
            rating: hotel.rating,
            reviews: hotel.reviews,
            location: hotel.location,
            amenities: hotel.amenities,
            images: hotel.images,
            description: hotel.description,
            bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel.name)}`,
            apiProvider: 'Demo Data',
            isDemo: true
        }));

        return {
            hotels,
            total: hotels.length,
            searchLocation: city,
            limitations: {
                message: "Demo mode: Real APIs available with valid API keys",
                realTimeData: false,
                upgrade: "Get real data by registering for SerpApi (free tier) or Makcorps"
            }
        };
    }

    /**
     * Get realistic hotel data for different cities
     */
    getCityHotelData(city) {
        const cityName = city.toLowerCase().replace(/[-\s]+/g, ' ');
        
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
                        vendor: 'Booking.com',
                        description: 'Luxury waterfront hotel with stunning Table Mountain views',
                        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945']
                    },
                    {
                        name: 'Belmond Mount Nelson Hotel',
                        basePrice: 320,
                        rating: 4.7,
                        reviews: 892,
                        location: 'Gardens, Cape Town',
                        amenities: ['Historic Property', 'Gardens', 'Spa', 'Pool', 'Fine Dining'],
                        vendor: 'Hotels.com',
                        description: 'Iconic pink hotel in the heart of Cape Town',
                        images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa']
                    },
                    {
                        name: 'Cape Grace Hotel',
                        basePrice: 250,
                        rating: 4.6,
                        reviews: 658,
                        location: 'V&A Waterfront, Cape Town',
                        amenities: ['Harbor Views', 'Spa', 'Pool', 'Butler Service'],
                        vendor: 'Expedia',
                        description: 'Boutique luxury hotel overlooking the yacht marina',
                        images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96']
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
                        amenities: ['Luxury Spa', 'Private Villas', 'Fine Dining', 'Pool'],
                        vendor: 'Booking.com',
                        description: 'Ultra-luxury boutique hotel in exclusive Sandhurst',
                        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b']
                    },
                    {
                        name: 'Four Seasons Hotel The Westcliff',
                        basePrice: 180,
                        rating: 4.7,
                        reviews: 1024,
                        location: 'Westcliff, Johannesburg',
                        amenities: ['City Views', 'Spa', 'Pool', 'Multiple Restaurants'],
                        vendor: 'Hotels.com',
                        description: 'Elegant hotel overlooking the city and zoo',
                        images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4']
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
                        amenities: ['Thames Views', 'Historic Luxury', 'Spa', 'Multiple Restaurants'],
                        vendor: 'Booking.com',
                        description: 'Legendary luxury hotel on the Thames',
                        images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa']
                    },
                    {
                        name: 'The Langham London',
                        basePrice: 380,
                        rating: 4.7,
                        reviews: 1834,
                        location: 'Marylebone, London',
                        amenities: ['Historic Property', 'Afternoon Tea', 'Spa', 'Oxford Circus'],
                        vendor: 'Hotels.com',
                        description: 'Victorian grandeur meets modern luxury',
                        images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96']
                    }
                ]
            }
        };

        return hotelDatabases[cityName] || {
            hotels: [
                {
                    name: `Grand Hotel ${city}`,
                    basePrice: 120,
                    rating: 4.2,
                    reviews: 456,
                    location: `City Center, ${city}`,
                    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Gym'],
                    vendor: 'Booking.com',
                    description: `Comfortable hotel in the heart of ${city}`,
                    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945']
                },
                {
                    name: `${city} Plaza Hotel`,
                    basePrice: 90,
                    rating: 4.0,
                    reviews: 234,
                    location: `Downtown, ${city}`,
                    amenities: ['Free WiFi', 'Restaurant', 'Business Center'],
                    vendor: 'Hotels.com',
                    description: `Modern accommodation in ${city}`,
                    images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa']
                }
            ]
        };
    }

    /**
     * Get hotel details by ID (if premium API is available)
     */
    async getHotelDetails(hotelId) {
        // This would require premium API access
        throw new Error('Hotel details require premium API access. Contact support@makcorps.com');
    }
}

/**
 * Flight Booking Service using FlightAPI and Aviationstack
 */
export class FlightBookingService {
    constructor() {
        this.flightApiKey = process.env.FLIGHTAPI_KEY;
        this.aviationStackKey = process.env.AVIATIONSTACK_KEY;
    }

    /**
     * Search flights between two cities
     * @param {Object} searchParams - Flight search parameters
     * @returns {Object} Flight search results
     */
    async searchFlights(searchParams) {
        const { 
            origin, 
            destination, 
            departureDate, 
            returnDate = null, 
            passengers = 1,
            currency = 'USD' 
        } = searchParams;

        try {
            // Using FlightAPI for flight search
            const url = `${FLIGHTAPI_BASE_URL}/flight-search`;
            
            const params = new URLSearchParams({
                origin: origin,
                destination: destination,
                departure_date: departureDate,
                ...(returnDate && { return_date: returnDate }),
                passengers: passengers.toString(),
                currency: currency,
                api_key: this.flightApiKey
            });

            const response = await fetch(`${url}?${params}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                // Fallback to mock data for demo
                return this.getMockFlightData(searchParams);
            }

            const data = await response.json();
            return this.transformFlightData(data, searchParams);

        } catch (error) {
            console.error('Error searching flights:', error);
            // Return mock data for demo purposes
            return this.getMockFlightData(searchParams);
        }
    }

    /**
     * Get real-time flight status using Aviationstack
     */
    async getFlightStatus(flightNumber, date) {
        try {
            const url = `${AVIATIONSTACK_BASE_URL}/flights`;
            const params = new URLSearchParams({
                access_key: this.aviationStackKey,
                flight_iata: flightNumber,
                flight_date: date
            });

            const response = await fetch(`${url}?${params}`);
            
            if (!response.ok) {
                throw new Error(`Flight status API Error: ${response.status}`);
            }

            const data = await response.json();
            return this.transformFlightStatusData(data);

        } catch (error) {
            console.error('Error getting flight status:', error);
            return this.getMockFlightStatus(flightNumber);
        }
    }

    /**
     * Transform flight search results
     */
    transformFlightData(rawData, searchParams) {
        // This would transform actual API response
        // For now, returning structured mock data
        return this.getMockFlightData(searchParams);
    }

    /**
     * Transform flight status data
     */
    transformFlightStatusData(rawData) {
        if (!rawData.data || rawData.data.length === 0) {
            return { found: false, status: 'Flight not found' };
        }

        const flight = rawData.data[0];
        return {
            found: true,
            flightNumber: flight.flight.iata,
            airline: flight.airline.name,
            status: flight.flight_status,
            departure: {
                airport: flight.departure.airport,
                scheduled: flight.departure.scheduled,
                estimated: flight.departure.estimated,
                actual: flight.departure.actual,
                terminal: flight.departure.terminal,
                gate: flight.departure.gate
            },
            arrival: {
                airport: flight.arrival.airport,
                scheduled: flight.arrival.scheduled,
                estimated: flight.arrival.estimated,
                actual: flight.arrival.actual,
                terminal: flight.arrival.terminal,
                gate: flight.arrival.gate
            }
        };
    }

    /**
     * Mock flight data for demo purposes (when API calls fail or for testing)
     */
    getMockFlightData(searchParams) {
        const { origin, destination, departureDate, returnDate } = searchParams;
        
        const mockFlights = [
            {
                id: 'FL001',
                airline: 'South African Airways',
                flightNumber: 'SA123',
                origin: {
                    code: origin,
                    name: this.getAirportName(origin),
                    city: origin
                },
                destination: {
                    code: destination,
                    name: this.getAirportName(destination),
                    city: destination
                },
                departure: {
                    date: departureDate,
                    time: '08:30',
                    terminal: '1'
                },
                arrival: {
                    date: departureDate,
                    time: '10:45',
                    terminal: '2'
                },
                duration: '2h 15m',
                price: {
                    amount: Math.floor(Math.random() * 1000) + 500,
                    currency: 'USD',
                    vendor: 'FlightAPI'
                },
                bookingUrl: `https://www.google.com/flights?q=${origin}+${destination}+${departureDate}`,
                aircraft: 'Boeing 737-800',
                class: 'Economy'
            },
            {
                id: 'FL002',
                airline: 'British Airways',
                flightNumber: 'BA456',
                origin: {
                    code: origin,
                    name: this.getAirportName(origin),
                    city: origin
                },
                destination: {
                    code: destination,
                    name: this.getAirportName(destination),
                    city: destination
                },
                departure: {
                    date: departureDate,
                    time: '14:20',
                    terminal: '1'
                },
                arrival: {
                    date: departureDate,
                    time: '16:55',
                    terminal: '3'
                },
                duration: '2h 35m',
                price: {
                    amount: Math.floor(Math.random() * 800) + 700,
                    currency: 'USD',
                    vendor: 'FlightAPI'
                },
                bookingUrl: `https://www.google.com/flights?q=${origin}+${destination}+${departureDate}`,
                aircraft: 'Airbus A320',
                class: 'Economy'
            }
        ];

        // Add return flights if it's a round trip
        if (returnDate) {
            const returnFlights = mockFlights.map(flight => ({
                ...flight,
                id: flight.id + '_return',
                flightNumber: flight.flightNumber.replace(/\d+/, (num) => parseInt(num) + 1),
                origin: flight.destination,
                destination: flight.origin,
                departure: {
                    date: returnDate,
                    time: flight.arrival.time,
                    terminal: flight.arrival.terminal
                },
                arrival: {
                    date: returnDate,
                    time: flight.departure.time,
                    terminal: flight.departure.terminal
                }
            }));
            
            return {
                outbound: mockFlights,
                return: returnFlights,
                total: mockFlights.length + returnFlights.length,
                searchParams,
                apiProvider: 'FlightAPI (Demo Mode)',
                limitations: {
                    message: "Demo mode: Real prices available with API key",
                    realTimeData: false,
                    limitedResults: true
                }
            };
        }

        return {
            flights: mockFlights,
            total: mockFlights.length,
            searchParams,
            apiProvider: 'FlightAPI (Demo Mode)',
            limitations: {
                message: "Demo mode: Real prices available with API key",
                realTimeData: false,
                limitedResults: true
            }
        };
    }

    /**
     * Mock flight status for demo
     */
    getMockFlightStatus(flightNumber) {
        const statuses = ['On Time', 'Delayed', 'Boarding', 'Departed', 'Arrived'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

        return {
            found: true,
            flightNumber: flightNumber,
            airline: 'Demo Airlines',
            status: randomStatus,
            departure: {
                airport: 'O.R. Tambo International',
                scheduled: '10:30',
                estimated: randomStatus === 'Delayed' ? '11:15' : '10:30',
                terminal: 'A',
                gate: 'A12'
            },
            arrival: {
                airport: 'Cape Town International',
                scheduled: '12:45',
                estimated: randomStatus === 'Delayed' ? '13:30' : '12:45',
                terminal: 'B',
                gate: 'B8'
            },
            apiProvider: 'Aviationstack (Demo Mode)'
        };
    }

    /**
     * Helper function to get airport names
     */
    getAirportName(code) {
        const airports = {
            'JNB': 'O.R. Tambo International Airport',
            'CPT': 'Cape Town International Airport',
            'DUR': 'King Shaka International Airport',
            'PLZ': 'Port Elizabeth Airport',
            'BFN': 'Bram Fischer International Airport',
            'LHR': 'London Heathrow Airport',
            'JFK': 'John F. Kennedy International Airport',
            'LAX': 'Los Angeles International Airport'
        };
        return airports[code] || `${code} Airport`;
    }
}

/**
 * Unified Booking Service that combines both hotel and flight services
 */
export class UnifiedBookingService {
    constructor() {
        this.hotelService = new HotelBookingService();
        this.flightService = new FlightBookingService();
        // Import HotelbedsService here for better hotel data
        this.hotelbedsService = null; // Will be initialized if available
        this.initializeHotelbedsService();
    }

    /**
     * Initialize Hotelbeds service if credentials are available
     */
    async initializeHotelbedsService() {
        try {
            // Dynamic import to avoid circular dependency
            const { HotelbedsService } = await import('./hotelbedsService.js');
            this.hotelbedsService = new HotelbedsService();
        } catch (error) {
            console.log('Hotelbeds service not available, using fallback');
        }
    }

    /**
     * Search for both hotels and flights for a complete travel package
     */
    async searchTravelPackage(params) {
        const {
            destination,
            origin,
            departureDate,
            returnDate,
            passengers = 1,
            includeHotels = true,
            includeFlights = true
        } = params;

        try {
            const results = {};

            // Search flights if requested
            if (includeFlights && origin) {
                try {
                    results.flights = await this.flightService.searchFlights({
                        origin,
                        destination: this.getAirportCodeFromCity(destination),
                        departureDate,
                        returnDate,
                        passengers
                    });
                } catch (error) {
                    console.error('Flight search failed:', error);
                    results.flights = {
                        flights: [],
                        total: 0,
                        error: 'Flight search temporarily unavailable',
                        provider: 'FlightAPI (Error)'
                    };
                }
            }

            // Search hotels if requested
            if (includeHotels) {
                try {
                    // Try Hotelbeds first (professional hotel data)
                    if (this.hotelbedsService) {
                        const hotelSearchParams = {
                            destination: this.getHotelDestinationCode(destination),
                            checkIn: departureDate,
                            checkOut: returnDate || this.addDaysToDate(departureDate, 3),
                            adults: passengers,
                            currency: 'USD'
                        };
                        
                        results.hotels = await this.hotelbedsService.searchHotels(hotelSearchParams);
                    } else {
                        // Fallback to enhanced mock data
                        results.hotels = await this.hotelService.searchHotelsByCity(destination);
                    }
                } catch (error) {
                    console.error('Hotel search failed:', error);
                    // Always provide fallback hotel data
                    results.hotels = await this.hotelService.searchHotelsByCity(destination);
                }
            }

            // Calculate estimated total package cost
            const flightCost = this.extractFlightCost(results.flights);
            const hotelCost = this.extractHotelCost(results.hotels);
            const totalNights = returnDate ? 
                Math.ceil((new Date(returnDate) - new Date(departureDate)) / (1000 * 60 * 60 * 24)) : 1;

            results.packageSummary = {
                estimatedTotal: flightCost + (hotelCost * totalNights),
                currency: 'USD',
                breakdown: {
                    flights: flightCost,
                    hotels: hotelCost * totalNights,
                    hotelsPerNight: hotelCost,
                    nights: totalNights
                },
                searchDate: new Date().toISOString(),
                destination,
                origin,
                dateRange: `${departureDate} to ${returnDate || this.addDaysToDate(departureDate, totalNights)}`
            };

            // Add booking instructions
            results.bookingInstructions = {
                hotels: results.hotels?.provider === 'Hotelbeds' ? 
                    'Use /api/booking/hotelbeds/book for real hotel bookings' :
                    'Hotelbeds integration available for real hotel bookings',
                flights: 'Flight booking integration available',
                package: 'Book hotels and flights separately, then link to travel request'
            };

            return results;

        } catch (error) {
            console.error('Error searching travel package:', error);
            
            // Return meaningful error response with fallback data
            return {
                error: true,
                message: error.message,
                fallbackData: {
                    hotels: await this.getFallbackHotelData(destination),
                    flights: this.getFallbackFlightData(origin, destination, departureDate, returnDate),
                    packageSummary: {
                        estimatedTotal: 500,
                        currency: 'USD',
                        breakdown: { flights: 300, hotels: 200 },
                        note: 'Estimated costs using fallback data'
                    }
                }
            };
        }
    }

    /**
     * Extract flight cost from flight search results
     */
    extractFlightCost(flightResults) {
        if (!flightResults || !flightResults.flights) return 0;
        
        if (flightResults.outbound && flightResults.return) {
            // Round trip
            const outboundCost = flightResults.outbound[0]?.price?.amount || 0;
            const returnCost = flightResults.return[0]?.price?.amount || 0;
            return outboundCost + returnCost;
        } else if (flightResults.flights && flightResults.flights.length > 0) {
            // One way
            return flightResults.flights[0]?.price?.amount || 0;
        }
        
        return 0;
    }

    /**
     * Extract hotel cost from hotel search results
     */
    extractHotelCost(hotelResults) {
        if (!hotelResults || !hotelResults.hotels || hotelResults.hotels.length === 0) {
            return 100; // Default fallback price per night
        }
        
        const firstHotel = hotelResults.hotels[0];
        return firstHotel.price?.total || firstHotel.price?.amount || 100;
    }

    /**
     * Get airport code from city name
     */
    getAirportCodeFromCity(city) {
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

    /**
     * Get hotel destination code from city name
     */
    getHotelDestinationCode(city) {
        const cityToDestination = {
            'cape town': 'CPT',
            'cape-town': 'CPT', 
            'johannesburg': 'JNB',
            'durban': 'DUR',
            'london': 'LHR',
            'paris': 'PAR',
            'barcelona': 'BCN',
            'madrid': 'MAD',
            'palma': 'PMI',
            'mallorca': 'PMI'
        };
        
        return cityToDestination[city.toLowerCase()] || city.toLowerCase().replace(/\s+/g, '-');
    }

    /**
     * Add days to a date string
     */
    addDaysToDate(dateString, days) {
        const date = new Date(dateString);
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0];
    }

    /**
     * Get fallback hotel data for error scenarios
     */
    async getFallbackHotelData(destination) {
        return {
            hotels: [
                {
                    id: 'fallback_1',
                    name: `${destination} Business Hotel`,
                    price: { total: 120, currency: 'USD' },
                    rating: 4.0,
                    provider: 'Fallback Data'
                }
            ],
            total: 1,
            provider: 'Fallback Mode',
            message: 'Using fallback data due to API error'
        };
    }

    /**
     * Get fallback flight data for error scenarios
     */
    getFallbackFlightData(origin, destination, departureDate, returnDate) {
        const flights = [
            {
                id: 'fallback_flight',
                airline: 'Demo Airlines',
                price: { amount: 300, currency: 'USD' },
                origin: { code: origin },
                destination: { code: this.getAirportCodeFromCity(destination) },
                departure: { date: departureDate }
            }
        ];

        return {
            flights,
            total: 1,
            provider: 'Fallback Mode',
            message: 'Using fallback data due to API error'
        };
    }

    /**
     * Get API usage statistics
     */
    getApiLimitations() {
        return {
            hotels: {
                provider: 'Makcorps',
                freeLimit: '30 API calls',
                limitations: [
                    'Random future dates only',
                    'Maximum 30 hotels per search',
                    'No room/guest count customization',
                    'No real-time booking'
                ],
                upgradeInfo: 'Contact support@makcorps.com for premium features'
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
            recommendations: [
                'Register for free API keys to access real data',
                'Consider upgrading to paid plans for production use',
                'Implement caching to reduce API calls',
                'Monitor API usage to avoid exceeding limits'
            ]
        };
    }
}