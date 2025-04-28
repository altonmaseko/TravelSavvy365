import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import useThemeStore from "../themeStore";
import { CiEdit, CiSettings } from "react-icons/ci";

import { FcManager } from "react-icons/fc";

import AdminRentCarCard from "./AdminRentCarCard";
import AdminUberCard from "./AdminUberCard";

const AdminHome = () => {

  const { bondiBlue, blackBrown, mainBlue, lightBlue, redBrown } = useThemeStore();

  return (
    <div className="w-screen min-h-screen flex flex-col p-4 items-start gap-4  ">

      <header
        style={{ borderColor: blackBrown, backgroundColor: redBrown }}
        className="flex flex-row justify-between items-start w-full border-4  rounded-xl p-2 text-white">

        {/* left side of header */}
        <div className="flex flex-row gap-2 p-2 rounded-xl items-center">
          <img src="https://placehold.co/40" className="rounded-full" alt="Logo" />
          <div className="flex flex-col leading-tight">
            <h2 className="text-base font-semibold">Alton Maseko</h2>
            <h4 className="text-sm text-gray-600 flex gap-2 items-center"> <FcManager size={20} /> Admin</h4>
          </div>
          <CiEdit className="ml-auto text-2xl text-[#45062E] hover:scale-110 cursor-pointer" />
        </div>

        {/* right side of header */}
        <div className="flex flex-row gap-2 items-center">
          <div className="min-w-[80px] p-1 flex flex-row border-2 border-black gap-2 rounded items-center">
            <p className="font-extrabold text-xl text-red-500">6</p>
            <p> Unread </p>
            <MdOutlineMarkUnreadChatAlt size={30} />
          </div>
          <CiSettings size={40} className="" />
          <img src="https://placehold.co/10" className="rounded-full" width={35} alt="Logo" />
        </div>


      </header>


      <main className="flex flex-col w-full gap-4 justify-center items-center">

        <div className="flex flex-row gap-4 items-center justify-center">
          <h3>Filter By: </h3>
          <div className="flex grow gap-4">
            {/* Employee */}
            <select className="border-2 border-black rounded-lg p-2">
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
            <select className="border-2 border-black rounded-lg p-2">
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
                className="border-2 border-black rounded-lg p-2"
              />
            </div>

          </div>
        </div>


        <hr />


        <section className="flex flex-col gap-4 items-center">
          <h3>Requests: </h3>

          <div className="flex flex-wrap gap-2  justify-center">
            <AdminRentCarCard />
            <AdminUberCard />
            <AdminRentCarCard />
            <AdminUberCard />
            <AdminRentCarCard />
            <AdminUberCard />
          </div>

        </section>


      </main>


    </div>
  )
}

export default AdminHome