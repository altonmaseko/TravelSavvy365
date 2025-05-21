import { FaArrowAltCircleRight, FaDotCircle, FaMoneyBillWave } from 'react-icons/fa'
import { FaArrowDownLong } from "react-icons/fa6";
import useThemeStore from '../themeStore';
import { Button } from '@/components/ui/button';



import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const RequestReviewRentCarCard = () => {

  const { blackBrown, lightBlue } = useThemeStore();

  return (
    <div className='flex gap-4 p-4  border-black border-2 bg-orange-300'>

      {/* Step Indicator */}
      <div className='flex flex-col gap-2 items-center self-center'>
        <FaDotCircle />
        <FaArrowDownLong />
        <FaDotCircle />
      </div>

      {/* Booking Details Section */}
      <div className='flex flex-col gap-2 w-[200px]'>
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


      {/* Action Buttons */}
      <div className='flex flex-col gap-4'>
        <Button className='flex gap-4 justify-start w-fit'>  Book Manually <FaArrowAltCircleRight />  </Button>


        {/* Transmit Funds Button Pop up */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className='flex gap-4 justify-start w-fit'>  Transmit Funds <FaMoneyBillWave /> </Button>

          </PopoverTrigger>
          <PopoverContent side="left" className="w-80 flex flex-col gap-4">
            {/* create content here */}
            <h5>Transfer to <i className='font-normal'>Kim Nardia</i> </h5>
            <Input placeholder='Amout' type='number'></Input>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Instant EFT
              </label>
            </div>
            <Button>Confirm</Button>
          </PopoverContent>
        </Popover>

      </div>
    </div>
  )
}

export default RequestReviewRentCarCard;
