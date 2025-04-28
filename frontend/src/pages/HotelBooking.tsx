import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useThemeStore from "./themeStore"

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
    image: "https://placehold.co/600x200?text=Blue+Ocean+Resort",
  },
  {
    id: 2,
    name: "Mountain View Lodge",
    location: "Drakensberg",
    price: "R2800 / night",
    image: "https://placehold.co/600x200?text=Mountain+View+Lodge",
  },
  {
    id: 3,
    name: "Safari Sunset Inn",
    location: "Kruger Park",
    price: "R3500 / night",
    image: "https://placehold.co/600x200?text=Safari+Sunset+Inn",
  },
]

const HotelBookingPage = () => {
  const { bondiBlue, blackBrown, mainBlue, lightBlue } = useThemeStore();


  const [searchTerm, setSearchTerm] = useState("")


  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRequest = (hotelName: string) => {
    alert(`Hotel request submitted for ${hotelName}`)
  }

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#8c4843] mb-6 text-center">Book Your Stay</h1>

        <Input
          placeholder="Search hotels by name or location"
          style={{ borderColor: mainBlue }}
          className="mb-8 border-2 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              style={{ borderColor: mainBlue }}
              className="bg-white rounded-lg shadow-md overflow-hidden border  flex flex-col"
            >
              <img src={hotel.image} alt={hotel.name} className="w-full h-40 object-cover" />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-[#8c4843]">{hotel.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{hotel.location}</p>
                <p className="text-sm text-[#8c4843] mb-4">{hotel.price}</p>
                <Button
                  className="mt-auto  hover:bg-[#e67853] text-[#8c4843] font-semibold"
                  onClick={() => handleRequest(hotel.name)}
                >
                  Request Hotel
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HotelBookingPage
