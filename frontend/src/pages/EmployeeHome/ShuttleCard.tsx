import { FaEye, FaBus } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import useThemeStore from "../../states/themeStore";

type ShuttleCardProps = {
  shuttleCompany?: 'intercape' | 'greyhound' | 'translux' | 'eldos' | 'citiliner' | 'bazbus';
  shuttleDate?: Date;
  shuttlePickUpTime?: string;
  shuttlePickUpLocation?: string;
  shuttleDropOffLocation?: string;
  shuttlePassengers?: number;
  shuttleLuggage?: number;
  shuttleSpecialRequests?: string;
  shuttleTotalPrice?: number;
  status: string;
  requestId?: string;
}

const ShuttleCard = ({
  shuttleCompany,
  shuttleDate,
  shuttlePickUpTime,
  shuttlePickUpLocation,
  shuttleDropOffLocation,
  shuttlePassengers,
  shuttleLuggage,
  shuttleSpecialRequests,
  shuttleTotalPrice,
  status,
  requestId
}: ShuttleCardProps) => {
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
    return company.charAt(0).toUpperCase() + company.slice(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4" style={{ borderLeftColor: redBrown }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaBus style={{ color: redBrown }} className="text-2xl" />
          <div>
            <h3 className="font-semibold text-lg">Shuttle - {formatCompanyName(shuttleCompany)}</h3>
            <p className="text-gray-600 text-sm">{formatDate(shuttleDate)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold text-lg">{formatPrice(shuttleTotalPrice)}</p>
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
                  <h4 className="font-semibold text-lg mb-2">Shuttle Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Company:</span> {formatCompanyName(shuttleCompany)}</p>
                    <p><span className="font-medium">Date:</span> {formatDate(shuttleDate)}</p>
                    <p><span className="font-medium">Pickup Time:</span> {shuttlePickUpTime || 'N/A'}</p>
                    <p><span className="font-medium">Pickup Location:</span> {shuttlePickUpLocation || 'N/A'}</p>
                    <p><span className="font-medium">Drop-off Location:</span> {shuttleDropOffLocation || 'N/A'}</p>
                    <p><span className="font-medium">Passengers:</span> {shuttlePassengers || 'N/A'}</p>
                    <p><span className="font-medium">Luggage:</span> {shuttleLuggage || 'N/A'}</p>
                    <p><span className="font-medium">Total Price:</span> {formatPrice(shuttleTotalPrice)}</p>
                    {shuttleSpecialRequests && (
                      <p><span className="font-medium">Special Requests:</span> {shuttleSpecialRequests}</p>
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

export default ShuttleCard;