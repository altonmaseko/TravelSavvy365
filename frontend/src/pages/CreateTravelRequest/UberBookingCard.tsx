import React, { useState } from 'react'
import { MdDriveEta, MdLocationOn } from 'react-icons/md';

const UberBookingCard = () => {

  const [pickupLocation, setPickupLocation] = useState('123 Main St, Johannesburg');
  const [dropoffLocation, setDropoffLocation] = useState('456 Elm St, Sandton');
  const [rideType, setRideType] = useState('Standard');

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
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter pickup location"
          />
        </div>

        {/* Dropoff Location */}
        <div className="flex items-center space-x-2">
          <MdLocationOn className="text-xl text-gray-600" />
          <input
            type="text"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter dropoff location"
          />
        </div>

        {/* Ride Type */}
        <div className="flex items-center space-x-2">
          <MdDriveEta className="text-xl text-gray-600" />
          <select
            value={rideType}
            onChange={(e) => setRideType(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>

        {/* Estimated Price */}
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Estimated Price:</span>
          <span className="text-gray-600">R150</span>
        </div>
      </div>
    </div>
  )
}

export default UberBookingCard