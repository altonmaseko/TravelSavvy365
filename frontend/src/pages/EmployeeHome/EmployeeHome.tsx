import TravelStrip from "./TravelStrip"

import UberCard from "./UberCard";
import ShuttleCard from "./ShuttleCard";
import FlightCard from "./FlightCard";
import RentalCard from "./RentalCard";

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
import { useHeader } from "../../states/useHeader";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";


const EmployeeHome = () => {


  const { setWorkerName, setWorkerType } = useHeader();

  let employeeRequests

  const getRequests = async () => {
    const employeeId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}")._id : null;

    try {
      const response = await axios.get('http://localhost:3001/api/travel/requests' + '?employeeId=' + employeeId)

      employeeRequests = response.data.requests;

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Failed to retrieve your past requests: ${error.response.data.message || 'An error occurred'}`);
      } else {
        toast.error("Failed to retrieve your past requests. Please try again later.");
      }
    }
  }

  useEffect(() => {
    setWorkerName("Ana Kimberly")
    setWorkerType("Employee")
  }, [])




  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-start justify-start gap-4 ">

      <main className="flex flex-col w-full gap-4 justify-center ">
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

          <UberCard status="pending" uberDate={new Date()} uberDropOffLocation="Wits Digital Dome"
            uberEstimatedPrice={250} uberPickUpLocation="Wits University" uberPickUpTime="10:00 AM" uberRideType="Standard" uberNotes="Please be on time" />

          <ShuttleCard status="approved" shuttleDate={new Date()} shuttleDropOffLocation="Wits Digital Dome"
            shuttlePickUpLocation="Wits University" shuttlePickUpTime="10:00 AM" shuttleCompany="greyhound" shuttleLuggage={4} shuttlePassengers={2}
            shuttleSpecialRequests="Please drive slowly. I have a baby with me." shuttleTotalPrice={3000} />

          <FlightCard status="approved" flightAdultPassengers={2} flightChildPassengers={1} flightDepartureCity={'Johannesburg'} flightCheckedBags={2} flightDepartureDate={new Date()} flightReturnCity={'Cape Town'}
            flightClass="Economy" flightReturnDate={new Date()} flightEstimatedTotalPrice={5000} flightSpecialRequests="Please provide a baby seat." flightCompany={"airlink"} flightInfantPassengers={1} flightDepartureTimePreference="morning"
            flightReturnTimePreference="afternoon" flightTripType="one-way" />

          {/* <UberCard status="rejected" uberDate={new Date()} uberDropOffLocation="FNB Stadium"
            uberEstimatedPrice={600} uberPickUpLocation="Wits University" uberPickUpTime="12:00 PM" uberNotes="Please arrive 15 minutes early"
            uberRideType="Luxury" /> */}

          <RentalCard rentalPickUpDate={new Date()} rentalReturnDate={new Date()} rentalCarType="Luxury"
            status="rejected" rentalCompany="avis" rentalPickUpLocation="Wits University" rentalEstimatedPrice={4000} />
        </section>

        <Button className="flex flex-row gap-2 w-fit text-lg p-4" onClick={() => navigate('/create-travel-request')}> <TfiWrite size={40} /> Create request </Button>



      </main>
    </div >
  )
}

export default EmployeeHome