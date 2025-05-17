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
import useThemeStore from "../themeStore";
import { FcManager } from "react-icons/fc";


const EmployeeHome = () => {

  const { bondiBlue, blackBrown, mainBlue, lightBlue } = useThemeStore();


  const navigate = useNavigate()

  return (
    <div className="w-screen min-h-screen flex flex-col items-start justify-start gap-4 ">

      <header
        style={{ borderColor: mainBlue, background: bondiBlue }}
        className="flex flex-row justify-between items-center w-full  p-2 ">

        {/* left side of header */}
        <div className="flex flex-row gap-2 p-2 items-center">
          Home / <h4 className="text-sm text-gray-600 flex gap-2 items-center"> <FcManager size={20} /> Employee [Alton Maseko]</h4>
        </div>

        {/* right side of header */}
        <div className="flex flex-row gap-4 h-full items-center underline font-bold">
          <p>notifications (8)</p>
          <p>settings</p>
          <p>profile</p>
          <p>home</p>
        </div>


      </header>

      <main className="flex w-full grow flex-col p-1 gap-2">
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

        <section className="flex w-full grow flex-col border-black border-t-1  gap-1">
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
    </div >
  )
}

export default EmployeeHome