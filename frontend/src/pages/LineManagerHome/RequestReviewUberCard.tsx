import React from 'react'
import { FaCheckDouble, FaDotCircle } from 'react-icons/fa'
import { FaArrowDownLong, FaCircleCheck } from "react-icons/fa6";
import useThemeStore from '../themeStore';
import { Button } from '@/components/ui/button';
import { GiCancel } from 'react-icons/gi';


const RequestReviewUberCard = () => {

  const { bondiBlue, blackBrown, mainBlue, lightBlue } = useThemeStore();

  return (
    <div style={{ background: bondiBlue }} className='flex gap-4 p-4 rounded-xl border-black border-2'>

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
        <Button className='flex gap-4'> <FaCircleCheck />  Approve</Button>
        <Button className='flex gap-4 justify-start w-fit'> <GiCancel /> Deny</Button>
        <Button >Request Additional Info</Button>

      </div>
    </div>
  )
}

export default RequestReviewUberCard