
import AdminRentCarCard from "./AdminRentCarCard";
import AdminUberCard from "./AdminUberCard";
import AdminHotelBookingCard from "./AdminHotelBookingCard";
import { useHeader } from "../states/useHeader";
import { useEffect } from "react";

const AdminHome = () => {

  // const { blackBrown, redBrown } = useThemeStore();


  const { setWorkerName, setWorkerType } = useHeader();

  useEffect(() => {
    setWorkerName("John Calistroe")
    setWorkerType("Admin")
  }, [])

  return (
    <div className="w-screen min-h-screen flex flex-col items-start gap-4  ">

      <main className="flex flex-col w-full gap-4 justify-center items-center">

        <div className="flex flex-row gap-4 items-center justify-center">
          <h3>Filter By: </h3>
          <div className="flex grow gap-4">
            {/* Employee */}
            <select className="border-2 border-black p-2">
              <option value="all">Employee</option>
              <option value="john">John</option>
              <option value="sarah">Sarah</option>
              <option value="michael">Michael</option>
              <option value="emily">Emily</option>
              <option value="david">David</option>
              <option value="sophie">Sophie</option>
              <option value="daniel">Daniel</option>
              <option value="olivia">Olivia</option>
              <option value="james">James</option>
              <option value="sophia">Sophia</option>
              <option value="ethan">Ethan</option>
              <option value="ava">Ava</option>
              <option value="lucas">Lucas</option>
              <option value="isabella">Isabella</option>
              <option value="benjamin">Benjamin</option>
              <option value="mia">Mia</option>
              <option value="william">William</option>
              <option value="grace">Grace</option>
              <option value="alexander">Alexander</option>
            </select>

            {/* Travel Type */}
            <select className="border-2 border-black p-2">
              <option value="date">Travel Type</option>
              <option value="economy">Economy</option>
              <option value="suv">SUV</option>
              <option value="luxury">Luxury</option>
              <option value="van">Van</option>
            </select>

            {/* Date */}
            <div className="flex flex-col gap-2 ">
              <input
                type="date"
                className="border-2 border-black  p-2"
              />
            </div>

          </div>
        </div>


        <hr />


        <section className="flex flex-col gap-4 items-center">
          {/* <div className="flex flex-wrap gap-2  justify-center"> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-1">
            <AdminRentCarCard />
            <AdminUberCard />
            <AdminHotelBookingCard />
            <AdminRentCarCard />
            <AdminUberCard />
            <AdminRentCarCard />
            <AdminUberCard />
            <AdminHotelBookingCard />
            <AdminUberCard />
            <AdminUberCard />
            <AdminHotelBookingCard />
          </div>

        </section>


      </main>


    </div>
  )
}

export default AdminHome