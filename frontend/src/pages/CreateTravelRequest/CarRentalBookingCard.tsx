import { MdLocationOn, MdDriveEta, MdDateRange } from 'react-icons/md';
import useThemeStore from '../../states/themeStore';
import { useRequests } from '@/states/useRequests';
import { useEffect } from 'react';

const CarRentalBookingCard = () => {
  const { bondiBlue } = useThemeStore();

  // const [pickupLocation, setPickupLocation] = useState('');
  // const [pickupDate, setPickupDate] = useState('');
  // const [returnDate, setReturnDate] = useState('');
  // const [carType, setCarType] = useState('Economy');

  const { rentalPickUpDate, rentalReturnDate, rentalCarType, rentalPickUpLocation, rentalEstimatedPrice, setRentalEstimatedPrice,
    setRentalPickUpDate,
    setRentalReturnDate,
    setRentalCarType,
    setRentalPickUpLocation } = useRequests()


  // Set default estimated price based on car type use useEffect to set the estimated price when car type changes
  useEffect(() => {
    let estimatedPrice = 50; // Default to Economy price
    switch (rentalCarType) {
      case 'SUV':
        estimatedPrice = 100; // R100 for SUV
        break;
      case 'Luxury':
        estimatedPrice = 200; // R200 for Luxury
        break;
      case 'Van':
        estimatedPrice = 150; // R150 for Van
        break;
      default:
        estimatedPrice = 50; // Default to Economy price
    }

    setRentalEstimatedPrice(estimatedPrice); // Update estimated price when car type changes
  }, [rentalCarType]);


  return (
    <div className="w-full flex flex-col items-center py-4">
      <div
        className="w-full rounded-xl shadow-xl p-8 space-y-6 bg-white"
      >
        {/* Title */}
        <div className="border-b pb-4 mb-6" >
          <h3 className="text-3xl font-bold" >
            Book Your Car
          </h3>
          <p className="text-sm mt-2" >
            Enter your details below to reserve your rental.
          </p>
        </div>

        {/* Pickup Location */}
        <div className="flex items-center space-x-3">
          <MdLocationOn className="text-2xl" style={{ color: bondiBlue }} />
          <input
            type="text"
            value={rentalPickUpLocation}
            onChange={(e) => setRentalPickUpLocation ? setRentalPickUpLocation(e.target.value) : null}
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
            value={rentalPickUpDate.toString().substring(0, 10)} // Format to YYYY-MM-DD
            onChange={(e) => setRentalPickUpDate(new Date(e.target.value))}
            className="flex-1 px-4 py-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2"
          />
        </div>

        {/* Return Date */}
        <div className="flex items-center space-x-3">
          <MdDateRange className="text-2xl" style={{ color: bondiBlue }} />

          <p>Return Date</p>
          <input
            type="date"
            value={rentalReturnDate.toString().substring(0, 10)} // Format to YYYY-MM-DD
            onChange={(e) => setRentalReturnDate(new Date(e.target.value))}
            className="flex-1 px-4 py-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2"
          />
        </div>

        {/* Car Type */}
        <div className="flex items-center space-x-3">
          <MdDriveEta className="text-2xl" style={{ color: bondiBlue }} />
          <select
            value={rentalCarType}
            onChange={(e) => setRentalCarType ? setRentalCarType(e.target.value as "Economy" | "SUV" | "Luxury" | "Van") : null}
            className="flex-1 px-4 py-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2"
          >
            <option value="Economy">Economy</option>
            <option value="SUV">SUV</option>
            <option value="Luxury">Luxury</option>
            <option value="Van">Van</option>
          </select>
        </div>

        {/* estimated price */}

        <div className="flex items-center space-x-3">
          <p className="text-lg font-semibold">Estimated Price:</p>
          <span className="text-lg font-bold text-green-600">
            ${rentalEstimatedPrice?.toFixed(2)} / day
          </span>

        </div>

      </div>
    </div>
  );
};

export default CarRentalBookingCard;
