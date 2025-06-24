import { create } from "zustand";

type requestType = {
  travelType: 'uber' | 'shuttle' | 'rental' | 'flight';

  // uber 
  uberPickUpLocation?: string;
  uberDropOffLocation?: string;
  uberPickUpTime?: string;
  uberRideType?: 'Standard' | 'Premium' | 'Luxury';
  uberDate?: Date;
  uberNotes?: string;
  uberEstimatedPrice?: number;

  // shuttle
  shuttleCompany?: 'intercape' | 'greyhound' | 'translux' | 'eldos' | 'citiliner' | 'bazbus';
  shuttleDate?: Date;
  shuttlePickUpTime?: string;
  shuttlePickUpLocation?: string;
  shuttleDropOffLocation?: string;
  shuttlePassengers?: number;
  shuttleLuggage?: number;
  shuttleSpecialRequests?: string;
  shuttleTotalPrice?: number;

  // flight
  flightCompany?: 'flysafair' | 'airlink' | 'lift';
  flightTripType?: 'one-way' | 'return' | 'multi-city' | 'round-trip';
  flightDepartureDate?: Date;
  flightDepartureCity?: string;
  flightReturnCity?: string;
  flightReturnDate?: Date;
  flightDepartureTimePreference?: 'morning' | 'afternoon' | 'evening' | 'flexible';
  flightReturnTimePreference?: 'morning' | 'afternoon' | 'evening' | 'flexible';
  flightAdultPassengers?: number;
  flightChildPassengers?: number;
  flightInfantPassengers?: number;
  flightClass?: 'Economy' | 'Premium Economy' | 'Business';
  flightCheckedBags?: number;
  flightSpecialRequests?: string;
  flightEstimatedTotalPrice?: number;



  // car rental
  rentalCompany?: 'avis' | 'hertz' | 'enterprise rent-a-car' | 'europcar';
  rentalPickUpDate: Date;
  rentalReturnDate: Date;
  rentalPickUpLocation?: string;
  rentalCarType?: 'Economy' | 'Luxury' | 'SUV' | 'Van';
  rentalEstimatedPrice?: number;

  // FUNCTION TYPES

  // Uber
  setUberPickUpLocation: (uberPickUpLocation: string) => void;
  setUberDropOffLocation: (uberDropOffLocation: string) => void;
  setUberPickUpTime: (uberPickUpTime: string) => void;
  setUberRideType: (uberRideType: 'Standard' | 'Premium' | 'Luxury') => void;
  setUberDate: (uberDate: Date) => void;
  setUberNotes: (uberNotes: string) => void;
  setUberEstimatedPrice: (uberEstimatedPrice: number) => void;

  // Shuttle
  setShuttleDate: (shuttleDate: Date) => void;
  setShuttlePickUpTime: (shuttlePickUpTime: string) => void;
  setShuttlePickUpLocation: (shuttlePickUpLocation: string) => void;
  setShuttleDropOffLocation: (shuttleDropOffLocation: string) => void;
  setShuttlePassengers: (shuttlePassengers: number) => void;
  setShuttleLuggage: (shuttleLuggage: number) => void;
  setShuttleSpecialRequests: (shuttleSpecialRequests: string) => void;
  setShuttleTotalPrice: (shuttleTotalPrice: number) => void;
  setShuttleCompany: (shuttleCompany: 'intercape' | 'greyhound' | 'translux' | 'eldos' | 'citiliner' | 'bazbus') => void;

  // Flight
  setFlightCompany: (flightCompany: 'flysafair' | 'airlink' | 'lift') => void;
  setFlightTripType: (flightTripType: 'one-way' | 'return' | 'multi-city' | 'round-trip') => void;
  setFlightDepartureDate: (flightDepartureDate: Date) => void;
  setFlightReturnDate: (flightReturnDate: Date) => void;
  setFlightDepartureTimePreference: (flightDepartureTimePreference: 'morning' | 'afternoon' | 'evening' | 'flexible') => void;
  setFlightReturnTimePreference: (flightReturnTimePreference: 'morning' | 'afternoon' | 'evening' | 'flexible') => void;
  setFlightAdultPassengers: (flightAdultPassengers: number) => void;
  setFlightChildPassengers: (flightChildPassengers: number) => void;
  setFlightInfantPassengers: (flightInfantPassengers: number) => void;
  setFlightClass: (flightClass: 'Economy' | 'Premium Economy' | 'Business') => void;
  setFlightCheckedBags: (flightCheckedBags: number) => void;
  setFlightSpecialRequests: (flightSpecialRequests: string) => void;
  setFlightDepartureCity: (flightDepartureCity: string) => void;
  setFlightReturnCity: (flightReturnCity: string) => void;
  setFlightEstimatedTotalPrice: (flightEstimatedTotalPrice: number) => void;

  // Car Rental
  setRentalPickUpDate: (rentalPickUpDate: Date) => void;
  setRentalReturnDate: (rentalReturnDate: Date) => void;
  setRentalPickUpLocation?: (rentalPickUpLocation: string) => void;
  setRentalCarType: (rentalCarType: 'Economy' | 'Luxury' | 'SUV' | 'Van') => void;
  setRentalEstimatedPrice: (rentalEstimatedPrice: number) => void;
  setRentalCompany: (rentalCompany: 'avis' | 'hertz' | 'enterprise rent-a-car' | 'europcar') => void;



};

const useRequests = create<requestType>((set) => ({
  travelType: 'uber',

  // uber
  uberPickUpLocation: '',
  uberDropOffLocation: '',
  uberPickUpTime: '',
  uberDate: new Date(),
  uberRideType: 'Standard',
  uberNotes: '',

  // shuttle
  shuttleDate: new Date(),
  shuttlePickUpTime: '',
  shuttlePickUpLocation: '',
  shuttleDropOffLocation: '',
  shuttlePassengers: 1,
  shuttleLuggage: 0,
  shuttleSpecialRequests: '',

  // flight
  flightCompany: 'flysafair',
  flightTripType: 'one-way',
  flightDepartureCity: '',
  flightReturnCity: '',
  flightDepartureDate: new Date(),
  flightReturnDate: new Date(),
  flightDepartureTimePreference: 'flexible',
  flightReturnTimePreference: 'flexible',
  flightAdultPassengers: 1,
  flightChildPassengers: 0,
  flightInfantPassengers: 0,
  flightClass: 'Economy',
  flightCheckedBags: 0,
  flightSpecialRequests: '',

  // car rental
  rentalPickUpDate: new Date(),
  rentalReturnDate: new Date(),

  // Function setters
  setUberPickUpLocation: (uberPickUpLocation) => set({ uberPickUpLocation }),
  setUberDropOffLocation: (uberDropOffLocation) => set({ uberDropOffLocation }),
  setUberPickUpTime: (uberPickUpTime) => set({ uberPickUpTime }),
  setUberRideType: (uberRideType) => set({ uberRideType }),
  setUberDate: (uberDate) => set({ uberDate }),
  setUberNotes: (uberNotes) => set({ uberNotes }),
  setUberEstimatedPrice: (uberEstimatedPrice) => set({ uberEstimatedPrice }),

  setShuttleDate: (shuttleDate) => set({ shuttleDate }),
  setShuttlePickUpTime: (shuttlePickUpTime) => set({ shuttlePickUpTime }),
  setShuttlePickUpLocation: (shuttlePickUpLocation) => set({ shuttlePickUpLocation }),
  setShuttleDropOffLocation: (shuttleDropOffLocation) => set({ shuttleDropOffLocation }),
  setShuttlePassengers: (shuttlePassengers) => set({ shuttlePassengers }),
  setShuttleLuggage: (shuttleLuggage) => set({ shuttleLuggage }),
  setShuttleSpecialRequests: (shuttleSpecialRequests) => set({ shuttleSpecialRequests }),
  setShuttleTotalPrice: (shuttleTotalPrice) => set({ shuttleTotalPrice }),
  setShuttleCompany: (shuttleCompany) => set({ shuttleCompany }),

  setFlightCompany: (flightCompany) => set({ flightCompany }),
  setFlightTripType: (flightTripType) => set({ flightTripType }),
  setFlightDepartureDate: (flightDepartureDate) => set({ flightDepartureDate }),
  setFlightReturnDate: (flightReturnDate) => set({ flightReturnDate }),
  setFlightDepartureTimePreference: (flightDepartureTimePreference) => set({ flightDepartureTimePreference }),
  setFlightReturnTimePreference: (flightReturnTimePreference) => set({ flightReturnTimePreference }),
  setFlightAdultPassengers: (flightAdultPassengers) => set({ flightAdultPassengers }),
  setFlightChildPassengers: (flightChildPassengers) => set({ flightChildPassengers }),
  setFlightInfantPassengers: (flightInfantPassengers) => set({ flightInfantPassengers }),
  setFlightClass: (flightClass) => set({ flightClass }),
  setFlightCheckedBags: (flightCheckedBags) => set({ flightCheckedBags }),
  setFlightSpecialRequests: (flightSpecialRequests) => set({ flightSpecialRequests }),
  setFlightDepartureCity: (flightDepartureCity) => set({ flightDepartureCity }),
  setFlightReturnCity: (flightReturnCity) => set({ flightReturnCity }),
  setFlightEstimatedTotalPrice: (flightEstimatedTotalPrice) => set({ flightEstimatedTotalPrice }),

  setRentalPickUpDate: (rentalPickUpDate) => set({ rentalPickUpDate }),
  setRentalReturnDate: (rentalReturnDate) => set({ rentalReturnDate }),
  setRentalPickUpLocation: (rentalPickUpLocation) => set({ rentalPickUpLocation }),
  setRentalCarType: (rentalCarType) => set({ rentalCarType }),
  setRentalEstimatedPrice: (rentalEstimatedPrice) => set({ rentalEstimatedPrice }),
  setRentalCompany: (rentalCompany) => set({ rentalCompany }),
}));


export { useRequests, type requestType };
