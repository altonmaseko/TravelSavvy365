// RequestReviewUberCard.tsx
import { FaDotCircle, FaEye } from 'react-icons/fa';
import {
  FaArrowRightLong,
  FaCircleCheck,
  FaCircleInfo,
  FaXmark,
} from 'react-icons/fa6';
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
import useThemeStore from '@/states/themeStore';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export interface UberRequestData {
  id?: string;
  employeeName?: string;
  uberPickUpLocation?: string;
  uberDropOffLocation?: string;
  uberPickUpTime?: string;
  uberRideType?: 'Standard' | 'Premium' | 'Luxury';
  uberDate?: Date;
  uberNotes?: string;
  uberEstimatedPrice?: number;
  status?: string;
  requestDate?: Date;
}

interface RequestReviewUberCardProps {
  request: UberRequestData;
  onApprove?: (requestId: string) => void;
  onReject?: (requestId: string, reason: string) => void;
  onRequestInfo?: (requestId: string, info: string) => void;
}

const RequestReviewUberCard: React.FC<RequestReviewUberCardProps> = ({
  request,
  onApprove,
  onReject,
  onRequestInfo,
}) => {
  const { bondiBlue, blackBrown, lightBlue } = useThemeStore();
  const [rejectReason, setRejectReason] = useState('');
  const [additionalInfoRequest, setAdditionalInfoRequest] = useState('');

  const handleApprove = () => {
    if (request.id && onApprove) {
      onApprove(request.id);
    } else {


      toast.success(`Approval processed locally. ${request.employeeName} will be notified.`);


    }
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast.error('Please provide a reason for rejection.');
      return;
    }

    if (request.id && onReject) {
      onReject(request.id, rejectReason);
    } else {
      toast.success(`Rejection processed locally. ${request.employeeName} will be notified.`);
    }
    setRejectReason('');
  };

  const handleRequestInfo = () => {
    if (!additionalInfoRequest.trim()) {
      toast.error('Please specify the additional information required.');
      return;
    }

    if (request.id && onRequestInfo) {
      onRequestInfo(request.id, additionalInfoRequest);
    } else {
      toast.success(`Info request processed locally. ${request.employeeName} will be notified.`);
    }
    setAdditionalInfoRequest('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-4 max-w-[400px] flex-col justify-between">
      {/* Top Section */}
      <div>
        <div className="flex items-center justify-center mb-4 text-gray-600">
          <FaDotCircle className="text-green-500" />
          <FaArrowRightLong className="mx-2" />
          <FaDotCircle className="text-red-500" />
        </div>

        {/* Main Info */}
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-gray-800 mb-2">
            R{request.uberEstimatedPrice ?? 'N/A'}
          </div>
          <div className="text-gray-600 mb-1">📍 {request.uberPickUpLocation}</div>
          <div className="text-gray-600">📍 {request.uberDropOffLocation}</div>
          <div className="text-sm text-gray-500 mt-2">
            Employee: {request.employeeName}
          </div>
        </div>

        {/* View Details */}
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
                <DialogTitle>Uber Request Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                {[
                  ['Employee', request.employeeName],
                  ['Pick-up Location', request.uberPickUpLocation],
                  ['Drop-off Location', request.uberDropOffLocation],
                  ['Date', request.uberDate?.toLocaleDateString()],
                  ['Pick-up Time', request.uberPickUpTime],
                  ['Ride Type', request.uberRideType],
                  ['Estimated Price', request.uberEstimatedPrice ? `R${request.uberEstimatedPrice}` : undefined],
                  ['Notes', request.uberNotes],
                  ['Request Date', request.requestDate?.toLocaleDateString()],
                ]
                  .filter(([, val]) => val)
                  .map(([label, val]) => (
                    <div key={label}>
                      <strong>{label}:</strong> <span className="text-gray-700">{val}</span>
                    </div>
                  ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-2">
        <Button
          className="flex gap-4 justify-center bg-green-600 hover:bg-green-700 text-white"
          onClick={handleApprove}
        >
          <FaCircleCheck />
          Approve
        </Button>

        {/* Reject */}
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
              placeholder="Why are you rejecting this request?"
            />
            <Button className="mt-2 w-full bg-red-600 hover:bg-red-700" onClick={handleReject}>
              Send Rejection
            </Button>
          </PopoverContent>
        </Popover>

        {/* Request More Info */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className="flex gap-4 justify-center bg-blue-600 hover:bg-blue-700 text-white">
              <FaCircleInfo />
              Request Info
            </Button>
          </PopoverTrigger>
          <PopoverContent side="left" className="flex flex-col gap-4" style={{ background: lightBlue }}>
            <label className="text-sm font-medium">Additional information needed</label>
            <Textarea
              value={additionalInfoRequest}
              onChange={(e) => setAdditionalInfoRequest(e.target.value)}
              placeholder="Ask for more details..."
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

export default RequestReviewUberCard;
