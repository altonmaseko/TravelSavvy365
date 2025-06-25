import { FaEye, FaCar } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import useThemeStore from "../../states/themeStore";

type UberCardProps = {
  uberPickUpLocation?: string;
  uberDropOffLocation?: string;
  uberPickUpTime?: string;
  uberRideType?: 'Standard' | 'Premium' | 'Luxury';
  uberDate?: Date;
  uberNotes?: string;
  uberEstimatedPrice?: number;
  status: string;
  requestId?: string;
}

const UberCard = ({
  uberPickUpLocation,
  uberDropOffLocation,
  uberPickUpTime,
  uberRideType,
  uberDate,
  uberNotes,
  uberEstimatedPrice,
  status,
  requestId
}: UberCardProps) => {
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

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4" style={{ borderLeftColor: redBrown }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaCar style={{ color: redBrown }} className="text-2xl" />
          <div>
            <h3 className="font-semibold text-lg">Uber - {uberRideType || 'Standard'}</h3>
            <p className="text-gray-600 text-sm">{formatDate(uberDate)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold text-lg">{formatPrice(uberEstimatedPrice)}</p>
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
                  <h4 className="font-semibold text-lg mb-2">Uber Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Ride Type:</span> {uberRideType || 'N/A'}</p>
                    <p><span className="font-medium">Pickup:</span> {uberPickUpLocation || 'N/A'}</p>
                    <p><span className="font-medium">Drop-off:</span> {uberDropOffLocation || 'N/A'}</p>
                    <p><span className="font-medium">Pickup Time:</span> {uberPickUpTime || 'N/A'}</p>
                    <p><span className="font-medium">Date:</span> {formatDate(uberDate)}</p>
                    <p><span className="font-medium">Estimated Price:</span> {formatPrice(uberEstimatedPrice)}</p>
                    {uberNotes && (
                      <p><span className="font-medium">Notes:</span> {uberNotes}</p>
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

export default UberCard;