import { FaArrowAltCircleRight, FaMoneyBillWave } from 'react-icons/fa'
import useThemeStore from '../../states/themeStore';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@radix-ui/react-checkbox';


const RequestReviewUberCard = () => {

  const { bondiBlue, blackBrown, lightBlue } = useThemeStore();

  return (
    <div style={{ background: bondiBlue }} className='flex gap-4 p-4 border-black border-2 flex-wrap'>

      {/* <div className='flex flex-col gap-4 items-center '>
        <FaDotCircle />
        <FaArrowDownLong />
        <FaDotCircle />
      </div> */}

      <div className='flex flex-col gap-2 w-[200px]'>
        <p style={{ borderColor: blackBrown, backgroundColor: lightBlue }} className='gap-2 rounded border-2 p-2'> 23 Sandton </p>
        <p style={{ borderColor: blackBrown, backgroundColor: lightBlue }} className='gap-2 rounded border-2 p-2'> Wits Education Campus</p>
        <h4>R350</h4>

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
            <div style={{ backgroundColor: lightBlue }} className='flex flex-col gap-4 p-4 rounded text-black border-2 border-black'>
              <h5>Transfer to <i className='font-normal'>Albert Holmes</i> </h5>
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

            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default RequestReviewUberCard