import { FaEye, FaCar } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import useThemeStore from "../../states/themeStore";

type RentalCardProps = {
  rentalCompany?: 'avis' | 'hertz' | 'enterprise rent-a-car' | 'europcar';
  rentalPickUpDate: Date;
  rentalReturnDate: Date;
  rentalPickUpLocation?: string;
  rentalCarType?: 'Economy' | 'Luxury' | 'SUV' | 'Van';
  rentalEstimatedPrice?: number;
  status: string;
  requestId?: string;
}

const RentalCard = ({
  rentalCompany,
  rentalPickUpDate,
  rentalReturnDate,
  rentalPickUpLocation,
  rentalCarType,
  rentalEstimatedPrice,
  status,
  requestId
}: RentalCardProps) => {
  const { blackBrown, mainBlue, redBrown } = useThemeStore();

  const formatDate = (date: Date) => {
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
      case 'avis': return 'Avis';
      case 'hertz': return 'Hertz';
      case 'enterprise rent-a-car': return 'Enterprise Rent-A-Car';
      case 'europcar': return 'Europcar';
      default: return company.charAt(0).toUpperCase() + company.slice(1);
    }
  };

  const calculateRentalDays = () => {
    const pickupDate = new Date(rentalPickUpDate);
    const returnDate = new Date(rentalReturnDate);
    const timeDiff = returnDate.getTime() - pickupDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4" style={{ borderLeftColor: redBrown }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaCar style={{ color: redBrown }} className="text-2xl" />
          <div>
            <h3 className="font-semibold text-lg">Car Rental - {formatCompanyName(rentalCompany)}</h3>
            <p className="text-gray-600 text-sm">{rentalCarType || 'N/A'}</p>
            <p className="text-gray-600 text-xs">{formatDate(rentalPickUpDate)} - {formatDate(rentalReturnDate)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold text-lg">{formatPrice(rentalEstimatedPrice)}</p>
            <p className="text-gray-500 text-xs">{calculateRentalDays()} days</p>
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
                  <h4 className="font-semibold text-lg mb-2">Car Rental Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Company:</span> {formatCompanyName(rentalCompany)}</p>
                    <p><span className="font-medium">Car Type:</span> {rentalCarType || 'N/A'}</p>
                    <p><span className="font-medium">Pickup Location:</span> {rentalPickUpLocation || 'N/A'}</p>
                    <hr className="my-2" />
                    <p><span className="font-medium">Pickup Date:</span> {formatDate(rentalPickUpDate)}</p>
                    <p><span className="font-medium">Return Date:</span> {formatDate(rentalReturnDate)}</p>
                    <p><span className="font-medium">Rental Duration:</span> {calculateRentalDays()} days</p>
                    <hr className="my-2" />
                    <p><span className="font-medium">Estimated Price:</span> {formatPrice(rentalEstimatedPrice)}</p>
                    {rentalEstimatedPrice && (
                      <p><span className="font-medium">Price per day:</span> R{(rentalEstimatedPrice / calculateRentalDays()).toFixed(2)}</p>
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

export default RentalCard;