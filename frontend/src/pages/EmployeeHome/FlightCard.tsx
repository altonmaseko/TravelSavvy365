import { FaEye, FaPlane } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import useThemeStore from "../../states/themeStore";

type FlightCardProps = {
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
  status: string;
  requestId?: string;
}

const FlightCard = ({
  flightCompany,
  flightTripType,
  flightDepartureDate,
  flightDepartureCity,
  flightReturnCity,
  flightReturnDate,
  flightDepartureTimePreference,
  flightReturnTimePreference,
  flightAdultPassengers,
  flightChildPassengers,
  flightInfantPassengers,
  flightClass,
  flightCheckedBags,
  flightSpecialRequests,
  flightEstimatedTotalPrice,
  status,
  requestId
}: FlightCardProps) => {
  const { blackBrown, mainBlue, redBrown } = useThemeStore();

  const formatDate = (date?: Date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatPrice = (price?: number) => {
    if (!price) return "N/A";
    return `R${price.toFixed(2)}`;
  };

  const formatCompanyName = (company?: string) => {
    if (!company) return "N/A";
    switch (company) {
      case 'flysafair': return 'FlySafair';
      case 'airlink': return 'Airlink';
      case 'lift': return 'Lift';
      default: return company.charAt(0).toUpperCase() + company.slice(1);
    }
  };

  const getTotalPassengers = () => {
    const adults = flightAdultPassengers || 0;
    const children = flightChildPassengers || 0;
    const infants = flightInfantPassengers || 0;
    return adults + children + infants;
  };

  const formatTripType = (tripType?: string) => {
    if (!tripType) return "N/A";
    return tripType.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4" style={{ borderLeftColor: redBrown }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaPlane style={{ color: redBrown }} className="text-2xl" />
          <div>
            <h3 className="font-semibold text-lg">Flight - {formatCompanyName(flightCompany)}</h3>
            <p className="text-gray-600 text-sm">{flightDepartureCity} → {flightReturnCity}</p>
            <p className="text-gray-600 text-xs">{formatDate(flightDepartureDate)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold text-lg">{formatPrice(flightEstimatedTotalPrice)}</p>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'approved' ? 'bg-green-100 text-green-800' :
              status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
              }`}>
              {status}
            </span>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <span>
                <FaEye style={{ color: redBrown }} className="text-2xl hover:scale-110 cursor-pointer" />
              </span>
            </PopoverTrigger>
            <PopoverContent side="left" className="w-80">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Flight Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Airline:</span> {formatCompanyName(flightCompany)}</p>
                    <p><span className="font-medium">Trip Type:</span> {formatTripType(flightTripType)}</p>
                    <p><span className="font-medium">Class:</span> {flightClass || 'N/A'}</p>
                    <hr className="my-2" />
                    <p><span className="font-medium">Departure City:</span> {flightDepartureCity || 'N/A'}</p>
                    <p><span className="font-medium">Departure Date:</span> {formatDate(flightDepartureDate)}</p>
                    <p><span className="font-medium">Departure Time Preference:</span> {flightDepartureTimePreference || 'N/A'}</p>
                    {(flightTripType === 'return' || flightTripType === 'round-trip') && (
                      <>
                        <p><span className="font-medium">Return City:</span> {flightReturnCity || 'N/A'}</p>
                        <p><span className="font-medium">Return Date:</span> {formatDate(flightReturnDate)}</p>
                        <p><span className="font-medium">Return Time Preference:</span> {flightReturnTimePreference || 'N/A'}</p>
                      </>
                    )}
                    <hr className="my-2" />
                    <p><span className="font-medium">Total Passengers:</span> {getTotalPassengers()}</p>
                    {flightAdultPassengers && <p><span className="font-medium">Adults:</span> {flightAdultPassengers}</p>}
                    {flightChildPassengers && <p><span className="font-medium">Children:</span> {flightChildPassengers}</p>}
                    {flightInfantPassengers && <p><span className="font-medium">Infants:</span> {flightInfantPassengers}</p>}
                    <p><span className="font-medium">Checked Bags:</span> {flightCheckedBags || 0}</p>
                    <p><span className="font-medium">Estimated Total:</span> {formatPrice(flightEstimatedTotalPrice)}</p>
                    {flightSpecialRequests && (
                      <p><span className="font-medium">Special Requests:</span> {flightSpecialRequests}</p>
                    )}
                  </div>
                </div>

                {status === "pending" && (
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit Request
                    </Button>
                    <Button variant="destructive" size="sm" className="flex-1">
                      Cancel Request
                    </Button>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;