import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import GoogleMapComponent from "./GoogleMapComponent"

import { MdLocationOn, MdDriveEta, MdOutlineMarkUnreadChatAlt } from 'react-icons/md';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";


// date imports

import { format } from "date-fns"
import { CalendarIcon, LucideGitPullRequest } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea";
import { FaArrowRight, FaBusAlt, FaPlaneDeparture } from "react-icons/fa";
import { Label } from "@radix-ui/react-label";

import logo from "@/assets/img/logo.png"
import { useNavigate } from "react-router-dom";

const SubmitTravelRequest = () => {

  const [pickupLocation, setPickupLocation] = useState('123 Main St, Johannesburg');
  const [dropoffLocation, setDropoffLocation] = useState('456 Elm St, Sandton');
  const [rideType, setRideType] = useState('Standard');

  const [date, setDate] = useState<Date>()

  const navigate = useNavigate()

  return (

    <div className="flex flex-col  px-4">

      <header className="bg-[#45062e] p-4  text-white flex flex-row w-full justify-center items-center gap-4">
        <img src={logo} width={40} height={40} alt="" />
        <h3>Create a Travel Request</h3>
      </header>

      <main className="w-screen min-h-screen flex flex-row gap-2 p-4">
        {/* left section */}
        <section className="flex flex-col w-[60vw]  p-2 gap-4">
          {/* Input search bar */}
          <div className="flex flex-row gap-2">
            <Input placeholder="Search location to center map on" className="w-full" />
            <Button className="bg-[#ED8E6B] font-bold"> Search </Button>
          </div>

          <GoogleMapComponent />
          <div className="flex flex-row justify-between gap-4">

            <Select>
              <SelectTrigger className="w-[180px]">
                <FaBusAlt /> <SelectValue placeholder="Select a Shuttle" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>  Bus Services</SelectLabel>
                  <SelectItem value="intercape">Intercape</SelectItem>
                  <SelectItem value="greyhound">Greyhound</SelectItem>
                  <SelectItem value="translux">Translux</SelectItem>
                  <SelectItem value="eldos">Eldo Coaches</SelectItem>
                  <SelectItem value="citiliner">Citiliner</SelectItem>
                  <SelectItem value="bazbus">Baz Bus</SelectItem>

                </SelectGroup>
              </SelectContent>
            </Select>

            <Button className="grow">Uber </Button>

            <Select>
              <SelectTrigger className="w-[180px]">
                <FaPlaneDeparture /> <SelectValue placeholder="Select Flight" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Flights</SelectLabel>
                  <SelectItem value="flysafair">FlySafair</SelectItem>
                  <SelectItem value="airlink">Airlink</SelectItem>
                  <SelectItem value="lift">LIFT</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col rounded-xl grow">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 mx-auto">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-2xl font-semibold">Ride Details</h3>
              </div>
              <div className="space-y-4">
                {/* Pickup Location */}
                <div className="flex items-center space-x-2">
                  <MdLocationOn className="text-xl text-gray-600" />
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter pickup location"
                  />
                </div>

                {/* Dropoff Location */}
                <div className="flex items-center space-x-2">
                  <MdLocationOn className="text-xl text-gray-600" />
                  <input
                    type="text"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter dropoff location"
                  />
                </div>

                {/* Ride Type */}
                <div className="flex items-center space-x-2">
                  <MdDriveEta className="text-xl text-gray-600" />
                  <select
                    value={rideType}
                    onChange={(e) => setRideType(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>

                {/* Estimated Price */}
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Estimated Price:</span>
                  <span className="text-gray-600">R150</span>
                </div>
              </div>
            </div>
          </div>

        </section>




        {/* right section */}
        <section className="flex flex-col grow  p-2 justify-between">
          <div className="flex flex-col gap-4">
            {/* date component */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Departure date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* reason for travel */}
            <Textarea className="min-h-[200px]" placeholder="Reason for travel" />

            <hr />

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label >Supporting Documentation</Label>
              <Input id="picture" type="file" />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label >Ride Screenshot (optional) </Label>
              <Input id="picture" type="file" />
            </div>

            <Button className="flex flex-row gap-2 p-6" onClick={() => navigate('/hotel-booking')}> <p>Also Book Hotel</p> <FaArrowRight size={60} /></Button>
          </div>

          <Button className="py-8 flex flex-row gap-4 bg-[#ED8E6B] font-bold"> <p>Submit Request </p> <LucideGitPullRequest size={40} /> </Button>
        </section>
      </main>
    </div>

  )
}

export default SubmitTravelRequest