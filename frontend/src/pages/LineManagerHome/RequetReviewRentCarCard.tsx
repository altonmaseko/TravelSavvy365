import React from 'react'
import { FaCanadianMapleLeaf, FaDotCircle } from 'react-icons/fa'
import { FaArrowDownLong, FaCircleCheck } from "react-icons/fa6";
import useThemeStore from '../themeStore';
import { Button } from '@/components/ui/button';

import { GiCancel } from "react-icons/gi";

const RequestReviewRentCarCard = () => {

  const { bondiBlue, blackBrown, mainBlue, lightBlue } = useThemeStore();

  return (
    <div className='flex gap-4 p-4 rounded-xl border-black border-2 bg-orange-300'>

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
        <Button className='flex gap-4 justify-start w-fit'> <FaCircleCheck />  Approve</Button>
        <Button className='flex gap-4 justify-start w-fit'> <GiCancel /> Deny</Button>
        <Button>Request Additional Info</Button>
      </div>
    </div>
  )
}

export default RequestReviewRentCarCard;
