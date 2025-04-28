import { MdLocationOn, MdDriveEta, MdDateRange } from 'react-icons/md';
import { useState } from 'react';
import useThemeStore from '../themeStore';

const CarRentalBookingCard = () => {
  const { mainBlue, bondiBlue, lightBlue, blackBrown, redBrown } = useThemeStore();

  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [carType, setCarType] = useState('Economy');

  return (
    <div className="w-full flex flex-col items-center py-4">
      <div
        className="w-full rounded-xl shadow-xl p-8 space-y-6 bg-white"
      >
        {/* Title */}
        <div className="border-b pb-4 mb-6" style={{ borderColor: lightBlue }}>
          <h3 className="text-3xl font-bold" style={{ color: mainBlue }}>
            Book Your Car
          </h3>
          <p className="text-sm mt-2" style={{ color: mainBlue }}>
            Enter your details below to reserve your rental.
          </p>
        </div>

        {/* Pickup Location */}
        <div className="flex items-center space-x-3">
          <MdLocationOn className="text-2xl" style={{ color: bondiBlue }} />
          <input
            type="text"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2"
            placeholder="Pickup location"
          />
        </div>

        {/* Pickup Date */}
        <div className="flex items-center space-x-3">
          <MdDateRange className="text-2xl" style={{ color: bondiBlue }} />
          <p>Pick Up Date</p>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2"
          />
        </div>

        {/* Return Date */}
        <div className="flex items-center space-x-3">
          <MdDateRange className="text-2xl" style={{ color: bondiBlue }} />

          <p>Return Date</p>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2"
          />
        </div>

        {/* Car Type */}
        <div className="flex items-center space-x-3">
          <MdDriveEta className="text-2xl" style={{ color: bondiBlue }} />
          <select
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2"
          >
            <option value="Economy">Economy</option>
            <option value="SUV">SUV</option>
            <option value="Luxury">Luxury</option>
            <option value="Van">Van</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default CarRentalBookingCard;
