import { FaPlane, FaEye } from 'react-icons/fa';
import { FaCircleCheck, FaCircleInfo, FaXmark } from 'react-icons/fa6';
import useThemeStore from '../../states/themeStore';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

export interface FlightRequestData {
  id?: string;
  employeeName?: string;
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
  status?: string;
  requestDate?: Date;
}

interface RequestReviewFlightCardProps {
  request: FlightRequestData;
  onApprove?: (requestId: string) => void;
  onReject?: (requestId: string, reason: string) => void;
  onRequestInfo?: (requestId: string, info: string) => void;
}

const RequestReviewFlightCard: React.FC<RequestReviewFlightCardProps> = ({
  request,
  onApprove,
  onReject,
  onRequestInfo,
}) => {
  const { lightBlue } = useThemeStore();
  const [rejectReason, setRejectReason] = useState('');
  const [additionalInfoRequest, setAdditionalInfoRequest] = useState('');

  const handleApprove = () => {
    if (request.id && onApprove) {
      onApprove(request.id);
    } else {
      alert(`Approved locally. ${request.employeeName} will be notified.`);
    }
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection.');
      return;
    }

    if (request.id && onReject) {
      onReject(request.id, rejectReason);
    } else {
      alert(`Rejected locally. ${request.employeeName} will be notified.`);
    }

    setRejectReason('');
  };

  const handleRequestInfo = () => {
    if (!additionalInfoRequest.trim()) {
      alert('Please specify what additional information is required.');
      return;
    }

    if (request.id && onRequestInfo) {
      onRequestInfo(request.id, additionalInfoRequest);
    } else {
      alert(`Info requested locally. ${request.employeeName} will be notified.`);
    }

    setAdditionalInfoRequest('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-4 max-w-[400px]">
      {/* Header Icon */}
      <div className="flex items-center justify-center mb-4 ">
        <FaPlane className="text-3xl" />
      </div>

      {/* Summary Info */}
      <div className="text-center mb-4">
        <div className="text-2xl font-bold text-gray-800 mb-2">
          R{request.flightEstimatedTotalPrice ?? 'N/A'}
        </div>
        <div className="text-lg font-semibold  mb-2 capitalize">
          {request.flightCompany}
        </div>
        <div className="text-gray-600 mb-1">
          ✈️ {request.flightDepartureCity} → {request.flightReturnCity}
        </div>
        <div className="text-sm text-gray-500 mb-1">
          {request.flightTripType} • {request.flightClass}
        </div>
        <div className="text-sm text-gray-500">
          Employee: {request.employeeName}
        </div>
      </div>

      {/* Details Dialog */}
      <div className="flex justify-center mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <FaEye />
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Flight Request Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 text-sm">
              {[
                ['Employee', request.employeeName],
                ['Airline', request.flightCompany],
                ['Trip Type', request.flightTripType],
                ['Departure City', request.flightDepartureCity],
                ['Destination', request.flightReturnCity],
                ['Departure Date', request.flightDepartureDate?.toLocaleDateString()],
                ['Return Date', request.flightTripType === 'return' ? request.flightReturnDate?.toLocaleDateString() : undefined],
                ['Departure Time Preference', request.flightDepartureTimePreference],
                ['Return Time Preference', request.flightReturnTimePreference],
                ['Class', request.flightClass],
                ['Checked Bags', request.flightCheckedBags?.toString()],
                ['Passengers', `${request.flightAdultPassengers ?? 0} Adult(s), ${request.flightChildPassengers ?? 0} Child(ren), ${request.flightInfantPassengers ?? 0} Infant(s)`],
                ['Estimated Total', request.flightEstimatedTotalPrice ? `R${request.flightEstimatedTotalPrice}` : undefined],
                ['Special Requests', request.flightSpecialRequests],
                ['Request Date', request.requestDate?.toLocaleDateString()],
              ]
                .filter(([, val]) => val !== undefined && val !== null)
                .map(([label, value]) => (
                  <div key={label}>
                    <strong>{label}:</strong> <span className="text-gray-700">{value}</span>
                  </div>
                ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <Button
          className="flex gap-4 justify-center bg-green-600 hover:bg-green-700 text-white"
          onClick={handleApprove}
        >
          <FaCircleCheck />
          Approve
        </Button>

        {/* Reject Button */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className="flex gap-4 justify-center bg-red-600 hover:bg-red-700 text-white">
              <FaXmark />
              Reject
            </Button>
          </PopoverTrigger>
          <PopoverContent side="left" className="flex flex-col gap-4" style={{ background: lightBlue }}>
            <label className="text-sm font-medium">Reason for rejection</label>
            <Textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Reason for rejection..."
            />
            <Button
              className="mt-2 w-full bg-red-600 hover:bg-red-700"
              onClick={handleReject}
            >
              Send Rejection
            </Button>
          </PopoverContent>
        </Popover>

        {/* Request Info */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className="flex gap-4 justify-center bg-blue-600 hover:bg-blue-700 text-white">
              <FaCircleInfo />
              Request Info
            </Button>
          </PopoverTrigger>
          <PopoverContent side="left" className="flex flex-col gap-4" style={{ background: lightBlue }}>
            <label className="text-sm font-medium">Information needed</label>
            <Textarea
              value={additionalInfoRequest}
              onChange={(e) => setAdditionalInfoRequest(e.target.value)}
              placeholder="What more do you need?"
            />
            <Button className="mt-2 w-full" onClick={handleRequestInfo}>
              Send Request
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default RequestReviewFlightCard;
