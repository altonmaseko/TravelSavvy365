import { FaDotCircle } from 'react-icons/fa'
import { FaArrowDownLong, FaCircleCheck, FaCircleInfo } from "react-icons/fa6";
import useThemeStore from '../../states/themeStore';
import { Button } from '@/components/ui/button';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';

const RequestReviewRentCarCard = () => {

  const { blackBrown, lightBlue } = useThemeStore();

  return (
    <div className='flex gap-4 p-4  border-black border-1 bg-orange-300'>

      {/* Step Indicator */}
      <div className='flex flex-col gap-2 items-center self-center'>
        <FaDotCircle />
        <FaArrowDownLong />
        <FaDotCircle />
      </div>

      {/* Booking Details Section */}
      <div className='flex flex-col gap-2 w-[400px]'>
        <h4>Booking Price: R800</h4>

        {/* Pickup Location */}
        <p style={{ borderColor: blackBrown, backgroundColor: lightBlue }} className='gap-2 rounded border-2 p-2'>
          Pickup Location: Sandton
        </p>

        {/* Pickup Date */}
        <p style={{ borderColor: blackBrown, backgroundColor: lightBlue }} className='gap-2 rounded border-2 p-2'>
          Pickup Date: 2025-05-01
        </p>

        {/* Return Date */}
        <p style={{ borderColor: blackBrown, backgroundColor: lightBlue }} className='gap-2 rounded border-2 p-2'>
          Return Date: 2025-05-07
        </p>

        {/* Car Type */}
        <p style={{ borderColor: blackBrown, backgroundColor: lightBlue }} className='gap-2 rounded border-2 p-2'>
          Car Type: SUV
        </p>
      </div>

      {/* Reason for Booking */}
      <div className='flex flex-col gap-4'>
        <h3>Reason for Rental:</h3>
        <p>
          Employee needs the vehicle for an off-site conference in Cape Town. The car is needed to travel between venues and meetings throughout the week.
        </p>
      </div>

      {/* Action Buttons */}
      <div className='flex flex-col gap-4'>
        <Button className='flex gap-4 justify-start '
          onClick={() => { alert("The approval will be sent to admin for finalization. John will be notified.") }}>
          <FaCircleCheck />
          Approve
        </Button>

        {/* Deny Button and PopOver */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className='flex gap-4 justify-start'>  <FaCircleInfo /> Reject </Button>

          </PopoverTrigger>
          <PopoverContent side="left" className="flex flex-col gap-4" style={{ background: lightBlue }}>
            <div className='flex flex-col gap-2'>
              <h6>Reason for rejection</h6>
              <Textarea></Textarea>
              <Button
                onClick={() => { alert("Rejection finalized! John will be notified with the attached reason.") }}>
                Send</Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Additional Info Button and PopOver */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className='flex gap-4 justify-start w-fit'>  <FaCircleInfo /> Request Additional Info  </Button>

          </PopoverTrigger>
          <PopoverContent side="left" className="flex flex-col gap-4" style={{ background: lightBlue }}>
            <div className='flex flex-col gap-2'>
              <h6>Please specify required information</h6>
              <Textarea></Textarea>
              <Button>Send</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default RequestReviewRentCarCard;
