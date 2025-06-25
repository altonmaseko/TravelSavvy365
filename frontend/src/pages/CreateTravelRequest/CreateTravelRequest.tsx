import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import GoogleMapComponent from "./GoogleMapComponent"

import { MdCarRental } from 'react-icons/md';

import { toast } from 'react-hot-toast';

import axios from 'axios';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";


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
import UberBookingCard from "./UberBookingCard";
import CarRentalBookingCard from "./CarRentalBookingCard";
import ShuttleBookingCard from "./ShuttleBookingCard";
import FlightBookingCard from "./FlightBookingCard";
import { useRequests } from "@/states/useRequests";

const CreateTravelRequest = () => {
  const navigate = useNavigate()

  const [reasonForTravel, setReasonForTravel] = useState<string>("")

  const [travelType, setTravelType] = useState<'uber' | 'shuttle' | 'rental' | 'flight'>("uber");


  const { shuttleCompany, flightCompany, rentalCompany, setFlightCompany, setRentalCompany, setShuttleCompany } = useRequests();
  const requests = useRequests();

  const handleTravelTypeChange = (travelType: 'uber' | 'shuttle' | 'rental' | 'flight', subType: string) => {
    setTravelType(travelType);
    console.log(`Travel type changed to: ${subType}`);

    if (travelType === 'flight') {
      setFlightCompany(subType as 'flysafair' | 'airlink' | 'lift');
    } else if (travelType === 'shuttle') {
      setShuttleCompany(subType as 'intercape' | 'greyhound' | 'translux' | 'eldos' | 'citiliner' | 'bazbus');
    } else if (travelType === 'rental') {
      setRentalCompany(subType as 'avis' | 'hertz' | 'enterprise rent-a-car' | 'europcar');
    }
  }

  const handleSubmit = async () => {

    console.log("Submitting travel request...");

    let destination =
      travelType === 'uber' ? requests.uberDropOffLocation :
        travelType === 'flight' ? requests.flightReturnCity :
          travelType === 'shuttle' ? requests.shuttlePickUpLocation :
            travelType === 'rental' ? requests.rentalPickUpLocation :
              'unknown';
    let startDate =
      travelType === 'uber' ? requests.uberDate :
        travelType === 'flight' ? requests.flightDepartureDate :
          travelType === 'shuttle' ? requests.shuttleDate :
            travelType === 'rental' ? requests.rentalPickUpDate :
              'YYYY-MM-DD';

    let endDate =
      travelType === 'uber' ? requests.uberDate :
        travelType === 'flight' ? requests.flightReturnDate :
          travelType === 'shuttle' ? requests.shuttleDate :
            travelType === 'rental' ? requests.rentalReturnDate :
              'YYYY-MM-DD';

    let estimatedCost =
      travelType === 'uber' ? requests.uberEstimatedPrice :
        travelType === 'flight' ? requests.flightEstimatedTotalPrice :
          travelType === 'shuttle' ? requests.shuttleTotalPrice :
            travelType === 'rental' ? requests.rentalEstimatedPrice :
              0; // Default value if not applicable

    let additionalNotes =
      travelType === 'uber' ? requests.uberNotes :
        travelType === 'flight' ? requests.flightSpecialRequests :
          travelType === 'shuttle' ? requests.shuttleSpecialRequests :
            travelType === 'rental' ? "Good car in working condition needed." :
              'No additional notes';


    try {
      const response = await axios.post('http://localhost:3001/api/travel/request', {
        destination: destination,
        startDate: startDate,
        endDate: endDate,
        purpose: reasonForTravel,
        transportationType: travelType,
        accommodationRequired: false,
        estimatedCost: estimatedCost,
        additionalNotes: additionalNotes
      })

      toast.success("Travel request submitted successfully!");
      navigate('/employee-home');

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Request failed: ${error.response.data.message || 'An error occurred'}`);
      } else {
        toast.error("Request failed! Please try again later.");
      }
    }

  }


  useEffect(() => {
    // Set the initial travel type to Uber
    setTravelType('uber');
  }, []);



  return (

    <div className="flex flex-col">
      <main className="min-h-screen flex flex-row gap-2 p-1">
        {/* left section */}
        <section className="flex flex-col w-[60vw]  p-2 gap-4">
          {/* Input search bar */}
          <div className="flex flex-row gap-2">
            <Input placeholder="Search location to center map on" className="w-full" />
            <Button className="font-bold"> Search </Button>
          </div>

          <GoogleMapComponent />

          {/* Transport booking card container */}
          <div className="flex flex-row flex-wrap justify-between gap-4">

            <Select onValueChange={(value) => handleTravelTypeChange('shuttle', value)}>
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

            <Button className="grow" onClick={() => handleTravelTypeChange('uber', '')}>Uber </Button>

            <Select onValueChange={(value) => handleTravelTypeChange('flight', value)}>
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

            <Select onValueChange={(value) => handleTravelTypeChange('rental', value)}>
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
            {
              travelType === 'shuttle' ? (
                <ShuttleBookingCard />
              ) : travelType === 'rental' ? (
                <CarRentalBookingCard />
              ) : travelType === 'flight' ? (
                <FlightBookingCard />
              ) : travelType === 'uber' ? (
                <UberBookingCard />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Please select a transportation option.</p>
                </div>
              )
            }

            {/* <ShuttleBookingCard /> */}
            {/* <CarRentalBookingCard /> */}
            {/* <FlightBookingCard /> */}
            {/* <UberBookingCard /> */}
          </div>

        </section>




        {/* right section */}
        <section className="flex flex-col grow  p-2 justify-between">
          <div className="flex flex-col gap-4">
            {/* date component */}
            {/* <Popover>
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
            </Popover> */}

            {/* reason for travel */}
            <Textarea
              value={reasonForTravel}
              onChange={(e) => setReasonForTravel(e.target.value)}
              className="min-h-[200px]" placeholder="Reason for travel" />

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

          <Button onClick={handleSubmit} className="py-8 flex flex-row gap-4 bg-[#ED8E6B] font-bold"> <p>Submit Request </p> <LucideGitPullRequest size={40} /> </Button>
        </section>
      </main>
    </div>

  )
}

export default CreateTravelRequest