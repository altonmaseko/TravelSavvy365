import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useThemeStore from "./states/themeStore"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

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
  const { mainBlue } = useThemeStore();


  const [searchTerm, setSearchTerm] = useState("")


  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRequest = (hotelName: string) => {
    alert(`Hotel request submitted for ${hotelName}`)
  }

  return (
    <div className="min-h-screen w-screen py-10 px-4">
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


                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="mt-auto  hover:bg-[#e67853] text-[#8c4843] font-semibold">
                      Request Hotel
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="left" className="w-80">
                    {/* create content here */}
                    <div className="flex flex-col gap-4 rounded p-2">
                      <h3>Confirm Details</h3>
                      <div className="flex gap-4">
                        <Input type="date" placeholder="Stay Start Date" />
                        <Input type="number" placeholder="# of Nights" />
                      </div>
                      <Button
                        onClick={() => handleRequest(hotel.name)}
                      >Confirm</Button>
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
