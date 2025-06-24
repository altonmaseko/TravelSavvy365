import { useRequests } from '@/states/useRequests';
import { useEffect, useState } from 'react'
import { MdCalendarMonth, MdDriveEta, MdLocationOn, MdLockClock, MdPunchClock } from 'react-icons/md';

const UberBookingCard = () => {

  // const [pickupLocation, setPickupLocation] = useState('123 Main St, Johannesburg');
  // const [dropoffLocation, setDropoffLocation] = useState('456 Elm St, Sandton');
  // const [rideType, setRideType] = useState('Standard');

  const { uberDropOffLocation, uberPickUpLocation, uberPickUpTime, uberRideType, uberDate, uberNotes, uberEstimatedPrice, setUberEstimatedPrice, setUberNotes,
    setUberDate, setUberDropOffLocation, setUberPickUpLocation, setUberPickUpTime, setUberRideType } = useRequests();

  // Set default estimated price based on ride type, use usestate
  useEffect(() => {
    let estimatedPrice = 50; // Default to Standard price
    switch (uberRideType) {
      case 'Premium':
        estimatedPrice = 100; // R100 for Premium
        break;
      case 'Luxury':
        estimatedPrice = 200; // R200 for Luxury
        break;
      default:
        estimatedPrice = 50; // Default to Standard price
    }
    setUberEstimatedPrice(estimatedPrice); // Update estimated price when ride type changes
  }, [uberRideType]);




  return (
    <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 mx-auto">
      <div className="border-b pb-4 mb-4">
        <h3 className="text-2xl font-semibold">Ride Details</h3>
      </div>
      <div className="space-y-4">
        {/* Pickup Location */}
        <div className="flex items-center space-x-2">
          <MdLocationOn className="text-xl text-gray-600" />
          <input
            type="text"
            value={uberPickUpLocation}
            onChange={(e) => setUberPickUpLocation ? setUberPickUpLocation(e.target.value) : null}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter pickup location"
          />
        </div>

        {/* Dropoff Location */}
        <div className="flex items-center space-x-2">
          <MdLocationOn className="text-xl text-gray-600" />
          <input
            type="text"
            value={uberDropOffLocation}
            onChange={(e) => setUberDropOffLocation ? setUberDropOffLocation(e.target.value) : null}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter dropoff location"
          />
        </div>

        {/* Ride Type */}
        <div className="flex items-center space-x-2">
          <MdDriveEta className="text-xl text-gray-600" />
          <select
            value={uberRideType}
            onChange={(e) => setUberRideType ? setUberRideType(e.target.value as "Standard" | "Premium" | "Luxury") : null}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>

        {/* Date */}
        <div className="flex items-center space-x-2">
          <MdCalendarMonth className="text-xl text-gray-600" />
          <input
            type="date"
            value={uberDate ? uberDate.toISOString().substring(0, 10) : ''} // Format to YYYY-MM-DD
            onChange={(e) => setUberDate ? setUberDate(new Date(e.target.value)) : null}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* PickUp Time */}
        <div className="flex items-center space-x-2">
          <MdPunchClock className="text-xl text-gray-600" />
          <input
            type="datetime-local"
            value={uberPickUpTime}
            onChange={(e) => setUberPickUpTime ? setUberPickUpTime(e.target.value) : null}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Ride Notes */}
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 font-medium">Ride Notes</label>
          <textarea
            value={uberNotes}
            onChange={(e) => setUberNotes ? setUberNotes(e.target.value) : null}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            rows={3}
            placeholder="Any special instructions or notes for the driver"
          />
        </div>

        {/* Estimated Price */}

        <div className="flex items-center space-x-2">
          <p className="text-lg font-semibold">Estimated Price:</p>
          <span className="text-lg font-bold text-green-600">
            R{(uberEstimatedPrice ?? 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default UberBookingCard