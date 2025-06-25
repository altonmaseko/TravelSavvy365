import { FaCar, FaEye } from 'react-icons/fa';
import { FaCircleCheck, FaCircleInfo, FaXmark } from 'react-icons/fa6';
import useThemeStore from '../../states/themeStore';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export interface RentalRequestData {
  id?: string;
  employeeName?: string;
  rentalCompany?: 'avis' | 'hertz' | 'enterprise rent-a-car' | 'europcar';
  rentalPickUpDate: Date;
  rentalReturnDate: Date;
  rentalPickUpLocation?: string;
  rentalCarType?: 'Economy' | 'Luxury' | 'SUV' | 'Van';
  rentalEstimatedPrice?: number;
  status?: string;
  requestDate?: Date;
}

interface RequestReviewRentalCardProps {
  request: RentalRequestData;
  onApprove?: (requestId: string) => void;
  onReject?: (requestId: string, reason: string) => void;
  onRequestInfo?: (requestId: string, info: string) => void;
}

const RequestReviewRentalCard: React.FC<RequestReviewRentalCardProps> = ({
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
      alert(`Locally approved. ${request.employeeName} will be notified.`);
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
      alert(`Locally rejected. ${request.employeeName} will be notified.`);
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
      alert(`Info request sent locally. ${request.employeeName} will be notified.`);
    }

    setAdditionalInfoRequest('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-4 max-w-[400px]">
      {/* Header Icon */}
      <div className="flex items-center justify-center mb-4 ">
        <FaCar className="text-3xl" />
      </div>

      {/* Summary */}
      <div className="text-center mb-4">
        <div className="text-2xl font-bold text-gray-800 mb-2">
          R{request.rentalEstimatedPrice ?? 'N/A'}
        </div>
        <div className="text-lg font-semibold  mb-2 capitalize">
          {request.rentalCompany}
        </div>
        <div className="text-gray-600 mb-1">📍 {request.rentalPickUpLocation}</div>
        <div className="text-sm text-gray-500">
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
              <DialogTitle>Rental Request Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 text-sm">
              {[
                ['Employee', request.employeeName],
                ['Rental Company', request.rentalCompany],
                ['Pick-up Location', request.rentalPickUpLocation],
                ['Car Type', request.rentalCarType],
                ['Pick-up Date', request.rentalPickUpDate?.toLocaleDateString()],
                ['Return Date', request.rentalReturnDate?.toLocaleDateString()],
                ['Estimated Price', request.rentalEstimatedPrice ? `R${request.rentalEstimatedPrice}` : undefined],
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

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <Button
          className="flex gap-4 justify-center bg-green-600 hover:bg-green-700 text-white"
          onClick={handleApprove}
        >
          <FaCircleCheck />
          Approve
        </Button>

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
            <Button
              className="mt-2 w-full bg-red-600 hover:bg-red-700"
              onClick={handleReject}
            >
              Send Rejection
            </Button>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button className="flex gap-4 justify-center bg-blue-600 hover:bg-blue-700 text-white">
              <FaCircleInfo />
              Request Additional Info
            </Button>
          </PopoverTrigger>
          <PopoverContent side="left" className="flex flex-col gap-4" style={{ background: lightBlue }}>
            <label className="text-sm font-medium">What do you need?</label>
            <Textarea
              value={additionalInfoRequest}
              onChange={(e) => setAdditionalInfoRequest(e.target.value)}
              placeholder="Request additional info..."
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

export default RequestReviewRentalCard;
