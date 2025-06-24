import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useThemeStore from "../../states/themeStore"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Hotel = {
  id: number
  name: string
  location: string
  price: string
  image: string
}

const hotels: Hotel[] = [
  {
    id: 1,
    name: "Blue Ocean Resort",
    location: "Cape Town",
    price: "R3200 / night",
    image: "https://placehold.co/600x300?text=Blue+Ocean+Resort",
  },
  {
    id: 2,
    name: "Mountain View Lodge",
    location: "Drakensberg",
    price: "R2800 / night",
    image: "https://placehold.co/600x300?text=Mountain+View+Lodge",
  },
  {
    id: 3,
    name: "Safari Sunset Inn",
    location: "Kruger Park",
    price: "R3500 / night",
    image: "https://placehold.co/600x300?text=Safari+Sunset+Inn",
  },
]

const HotelBookingPage = () => {
  const { mainBlue } = useThemeStore()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRequest = (hotelName: string) => {
    alert(`Hotel request submitted for ${hotelName}`)
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-muted">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#8c4843] mb-8 text-center">
          Book Your Stay
        </h1>

        <div className="max-w-md mx-auto mb-10">
          <Input
            placeholder="Search by hotel name or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-2 border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
            style={{ borderColor: mainBlue }}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col"
              style={{ borderColor: mainBlue }}
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-[#8c4843]">
                  {hotel.name}
                </h2>
                <p className="text-sm text-gray-600">{hotel.location}</p>
                <p className="text-sm font-medium text-[#8c4843] mb-4">
                  {hotel.price}
                </p>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="mt-auto hover:bg-[#e67853] text-[#8c4843] font-semibold">
                      Request Booking
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="top" className="w-[90vw] sm:w-80">
                    <div className="flex flex-col gap-4">
                      <h3 className="text-lg font-semibold text-[#8c4843]">
                        Booking Details
                      </h3>
                      <Input type="date" placeholder="Start Date" />
                      <Input type="number" placeholder="Number of Nights" />
                      <Button
                        onClick={() => handleRequest(hotel.name)}
                        className="bg-[#8c4843] hover:bg-[#7a3e3a] text-white"
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HotelBookingPage
