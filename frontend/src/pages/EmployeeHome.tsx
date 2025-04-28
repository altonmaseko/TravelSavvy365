import { CiEdit, CiSettings } from "react-icons/ci"
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md"
import TravelStrip from "./TravelStrip"

import { TfiWrite } from "react-icons/tfi";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import useThemeStore from "./themeStore";


const EmployeeHome = () => {

  const { bondiBlue, blackBrown, mainBlue, lightBlue } = useThemeStore();


  const navigate = useNavigate()

  return (
    <div className="w-screen flex flex-col p-4 items-start gap-4  ">

      <header
        style={{ borderColor: mainBlue }}
        className="flex flex-row justify-between items-start w-full border-4  rounded-xl p-2 ">

        {/* left side of header */}
        <div className="flex flex-row gap-2 p-2 rounded-xl items-center">
          <img src="https://placehold.co/40" className="rounded-full" alt="Logo" />
          <div className="flex flex-col leading-tight">
            <h2 className="text-base font-semibold">Alton Maseko</h2>
            <h4 className="text-sm text-gray-600">IT Intern - Bronze position</h4>
          </div>
          <CiEdit className="ml-auto text-2xl text-[#45062E] hover:scale-110 cursor-pointer" />
        </div>

        {/* right side of header */}
        <div className="flex flex-row gap-2 items-center">
          <div className="min-w-[80px] p-1 flex flex-row border-2 border-black gap-2 rounded items-center">
            <p className="font-extrabold text-xl text-red-500">6</p>
            <p> Unread </p>
            <MdOutlineMarkUnreadChatAlt size={30} />
          </div>
          <CiSettings size={40} className="" />
          <img src="https://placehold.co/10" className="rounded-full" width={35} alt="Logo" />
        </div>


      </header>

      <main className="flex w-full grow flex-col rounded-xl p-2 gap-2">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Price</SelectItem>
            <SelectItem value="dark">Ride</SelectItem>
            <SelectItem value="system">Hotel</SelectItem>
          </SelectContent>
        </Select>

        <section className="flex w-full grow flex-col border-black border-4 rounded-xl p-2 gap-2">
          <h2>Dashboard</h2>
          <TravelStrip status={"completed"} date="9 April 2025" hotelName="Oval Rivers" hotelPrice="R5600" travelPrice="R365" travelType='Uber' />
          {/* create other different travel trips*/}
          <TravelStrip status={"completed"} date="13 April 2025" hotelName="Blue Ocean" hotelPrice="R9600" travelPrice="R110" travelType='Uber' />
          <TravelStrip status={"completed"} date="15 May 2025" hotelName="Kortney Sales" hotelPrice="R8000" travelPrice="R365" travelType='Fish Shuttle' />
          <TravelStrip status={"approved"} date="9 April 2025" hotelName="N/A" hotelPrice="N/A" travelPrice="R365" travelType='Uber' />
          <TravelStrip status={"pending"} date="13 April 2025" hotelName="Blue Ocean" hotelPrice="R6700" travelPrice="R110" travelType='Gautrain' />
          <TravelStrip status={"rejected"} date="15 April 2025" hotelName="N/A" hotelPrice="N/A" travelPrice="R365" travelType='Bolt' />

        </section>

        <Button className="flex flex-row gap-2 w-fit text-lg p-4" onClick={() => navigate('/submit-travel-request')}> <TfiWrite size={40} /> Create request </Button>



      </main>
    </div>
  )
}

export default EmployeeHome