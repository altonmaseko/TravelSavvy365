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
import { useHeader } from "../../states/useHeader";
import { useEffect } from "react";



// AXIOS =======================
import axios, { AxiosResponse, AxiosError } from 'axios';

// Base URL configuration
const BASE_URL = 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies (for JWT)
});

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// AXIOS ======================

const EmployeeHome = () => {


  const { setWorkerName, setWorkerType } = useHeader();

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const response: AxiosResponse<ApiResponse<any[]>> = await api.get('/travel/requests');

        const data = response.data;
      } catch (error) {

      }
    }

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
          <TravelStrip status={"completed"} date="9 April 2025" hotelName="Oval Rivers" hotelPrice="R5600" travelPrice="R365" travelType='Uber' />
          {/* create other different travel trips*/}
          <TravelStrip status={"completed"} date="13 April 2025" hotelName="Blue Ocean" hotelPrice="R9600" travelPrice="R110" travelType='Uber' />
          <TravelStrip status={"completed"} date="15 May 2025" hotelName="Kortney Sales" hotelPrice="R8000" travelPrice="R365" travelType='Fish Shuttle' />
          <TravelStrip status={"approved"} date="9 April 2025" hotelName="N/A" hotelPrice="N/A" travelPrice="R365" travelType='Uber' />
          <TravelStrip status={"pending"} date="13 April 2025" hotelName="Blue Ocean" hotelPrice="R6700" travelPrice="R110" travelType='Gautrain' />
          <TravelStrip status={"rejected"} date="15 April 2025" hotelName="N/A" hotelPrice="N/A" travelPrice="R365" travelType='Bolt' />

        </section>

        <Button className="flex flex-row gap-2 w-fit text-lg p-4" onClick={() => navigate('/create-travel-request')}> <TfiWrite size={40} /> Create request </Button>



      </main>
    </div >
  )
}

export default EmployeeHome