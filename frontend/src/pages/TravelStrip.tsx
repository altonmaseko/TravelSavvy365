import { FaEye, FaHotel, FaRoad } from "react-icons/fa";


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useThemeStore from "./themeStore";


type Travel = {
  date: string;
  travelType: string;
  travelPrice: string;
  hotelPrice: string;
  hotelName: string;

  status: string
}

const TravelStrip = ({ date, travelType, hotelPrice, travelPrice, hotelName, status }: Travel) => {

  const { bondiBlue, blackBrown, mainBlue, lightBlue, redBrown } = useThemeStore();

  return (
    <div
      style={{ borderColor: mainBlue }}
      className="flex flex-row rounded-xl justify-between p-4 border-4 font-bold items-center">
      <p>{date}</p>
      <div className="flex flex-row gap-2">
        <FaRoad style={{ color: redBrown }} className=" text-2xl" />
        <p>{travelType}</p>
      </div>
      <p> -- {travelPrice}</p>

      <div className="flex flex-row gap-2">
        <FaHotel style={{ color: redBrown }} className="text-2xl" />
        <p>{hotelName}</p>
      </div>

      <p> -- {hotelPrice}</p>

      <p> {status} </p>

      <div className="flex justify-center items-center border-2 border-black p-2 rounded">


        <Popover>
          <PopoverTrigger asChild>
            <FaEye style={{ color: redBrown }} className="text-2xl hover:scale-110 cursor-pointer" />

          </PopoverTrigger>
          <PopoverContent side="left" className="w-80">
            {/* create content here */}

            <div className="flex flex-col gap-2">
              <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="https://placehold.co/320x160?text=Hotel+Image"
                  alt="Hotel"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-sm">
                <h3 style={{ color: redBrown }} className="font-bold text-lg ">Hotel Details</h3>
                <p><span className="font-semibold">Name:</span> {hotelName}</p>
                <p><span className="font-semibold">Price:</span> {hotelPrice}</p>
                <p><span className="font-semibold">Check-in:</span> {date}</p>
              </div>

              <div className="border-t pt-2 text-sm">
                <h3 style={{ color: redBrown }} className="font-bold text-lg ">Travel Details</h3>
                <p><span className="font-semibold">Mode:</span> {travelType}</p>
                <p><span className="font-semibold">Pickup:</span> Wits University</p>
                <p><span className="font-semibold">Drop-off:</span> {hotelName}</p>
                <p><span className="font-semibold">Price:</span> {travelPrice}</p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 italic">Trip Date: {date}</p>
              </div>

              {status === "pending" && (
                <div className="border-t pt-3 flex flex-col gap-2">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-sm">
                    Edit Booking
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm">
                    Cancel Booking
                  </button>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>

      </div>

    </div>
  )
}

export default TravelStrip