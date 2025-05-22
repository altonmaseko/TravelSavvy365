import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import GoogleMapComponent from "./GoogleMapComponent"

import { MdCarRental } from 'react-icons/md';

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

import { useNavigate } from "react-router-dom";
import useThemeStore from "../states/themeStore";
import UberBookingCard from "./UberBookingCard";
import CarRentalBookingCard from "./CarRentalBookingCard";
import { FcManager } from "react-icons/fc";

const SubmitTravelRequest = () => {

  const { mainBlue } = useThemeStore();

  const [date, setDate] = useState<Date>()

  const navigate = useNavigate()

  return (

    <div className="flex flex-col  px-4">

      <header style={{ backgroundColor: mainBlue }} className="p-2  text-white flex flex-row w-full justify-between items-center gap-2">
        {/* left side of header */}
        <div className="flex flex-row gap-2 p-2 items-center">
          <FcManager size={20} />Line Manager / <h4 className="text-sm text-gray-600 flex gap-2 items-center"> Create Travel Request</h4>
        </div>

        {/* right side of header */}
        <div className="flex flex-row gap-4 h-full items-center underline font-bold">
          <p>settings</p>
          <p>my requests</p>
          <p>home</p>
        </div>
      </header>

      <main className="w-screen min-h-screen flex flex-row gap-2 p-1">
        {/* left section */}
        <section className="flex flex-col w-[60vw]  p-2 gap-4">
          {/* Input search bar */}
          <div className="flex flex-row gap-2">
            <Input placeholder="Search location to center map on" className="w-full" />
            <Button className="font-bold"> Search </Button>
          </div>

          <GoogleMapComponent />
          <div className="flex flex-row flex-wrap justify-between gap-4">

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

            <Select>
              <SelectTrigger className="w-[180px]">
                <MdCarRental /> <SelectValue placeholder="Rent a Car" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Car Rentals</SelectLabel>
                  <SelectItem value="avis">Avis</SelectItem>
                  <SelectItem value="hertz">Hertz</SelectItem>
                  <SelectItem value="enterprise rent-a-car">Enterprise Rent-A-Car</SelectItem>
                  <SelectItem value="europcar">Europcar</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col rounded-xl grow p-2 ">
            <UberBookingCard />
            <CarRentalBookingCard />
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