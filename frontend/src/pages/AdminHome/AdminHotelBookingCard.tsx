import useThemeStore from '../states/themeStore';
import { FaArrowAltCircleRight, FaMoneyBillWave } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const AdminHotelBookingCard = () => {

  const { mainBlue, lightBlue } = useThemeStore();


  return (
    <div
      style={{ background: mainBlue }}
      className='flex flex-col gap-2 p-4 border-2 border-black '>
      <h3 className='px-2 pt-2 border-2 border-black rounded'>Blue Ocean Hotel</h3>
      <div style={{ background: lightBlue }} className='flex justify-between items-center rounded p-2 border-2 border-black'>
        <p className='font-[cursive]'>Cape Town</p>
        <p>R3200/night</p>
        <h5>[R8000]</h5>
      </div>
      <hr />

      <p style={{ background: lightBlue }} className='flex gap-2 rounded p-2 border-2 border-black font-bold'>
        3/11/2025 - 6/11/2025 </p>

      <div className='flex gap-2'>
        <Button className='flex'>Auto Book  <FaArrowAltCircleRight /> </Button>

        {/* Transmit Funds Button Pop up */}
        <Popover>
          <PopoverTrigger asChild>
            <Button className='flex gap-4 justify-start w-fit'>  Transmit Funds <FaMoneyBillWave /> </Button>

          </PopoverTrigger>
          <PopoverContent side="left" className="flex flex-col gap-4" style={{ background: lightBlue }}>
            {/* create content here */}
            <div className='flex flex-col gap-4  rounded text-black'>
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

export default AdminHotelBookingCard