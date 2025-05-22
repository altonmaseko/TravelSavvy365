import { FaDotCircle } from 'react-icons/fa'
import { FaArrowDownLong, FaCircleCheck, FaCircleInfo } from "react-icons/fa6";
import useThemeStore from '../states/themeStore';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';


const RequestReviewUberCard = () => {

  const { bondiBlue, blackBrown, lightBlue } = useThemeStore();

  return (
    <div style={{ background: bondiBlue }} className='flex gap-4 p-4 border-black border-1'>

      <div className='flex flex-col gap-2 items-center self-center'>
        <FaDotCircle />
        <FaArrowDownLong />
        <FaDotCircle />
      </div>

      <div className='flex flex-col gap-2 w-[400px]'>
        <h4>R350</h4>
        <p style={{ borderColor: blackBrown, backgroundColor: lightBlue }} className='gap-2 rounded border-2 p-2'> 23 Sandton </p>
        <p style={{ borderColor: blackBrown, backgroundColor: lightBlue }} className='gap-2 rounded border-2 p-2'> Wits Education Campus</p>
      </div>


      <div className='flex flex-col gap-4'>
        <h3>Reason:</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
        </p>
      </div>

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

export default RequestReviewUberCard