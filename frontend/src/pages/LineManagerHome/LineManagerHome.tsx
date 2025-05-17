import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import useThemeStore from "../themeStore";
import { CiEdit, CiSettings } from "react-icons/ci";

import { FcManager } from "react-icons/fc";
import RequestReviewUberCard from "./RequestReviewUberCard";
import RequestReviewRentCarCard from "./RequetReviewRentCarCard";

const LineManagerHome = () => {

  const { bondiBlue, blackBrown, mainBlue, lightBlue } = useThemeStore();

  return (
    <div className="w-screen min-h-screen flex flex-col items-start gap-1  ">

      <header
        style={{ borderColor: blackBrown, backgroundColor: mainBlue }}
        className="flex flex-row justify-between items-center w-full p-2 ">

        {/* left side of header */}
        <div className="flex flex-row gap-2 p-2 items-center">
          Home / <h4 className="text-sm text-gray-600 flex gap-2 items-center"> <FcManager size={20} /> Line Manager [Jimmy Kawasoki]</h4>
        </div>

        {/* right side of header */}
        <div className="flex flex-row gap-4 h-full items-center underline font-bold">
          <p>notifications (8)</p>
          <p>settings</p>
          <p>profile</p>
          <p>home</p>
        </div>


      </header>


      <main className="flex flex-col w-full gap-4 p-2">

        <div className="flex flex-row gap-4 w-full items-center">
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



        <section className="flex flex-col gap-1">
          <RequestReviewUberCard />
          <RequestReviewRentCarCard />
          <RequestReviewUberCard />
          <RequestReviewRentCarCard />
          <RequestReviewUberCard />
        </section>


      </main>


    </div>
  )
}

export default LineManagerHome