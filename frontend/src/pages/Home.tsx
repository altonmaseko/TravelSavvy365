import { Button } from "@/components/ui/button"

import logo from "@/assets/img/logo.png"
import { useNavigate } from "react-router-dom"
import useThemeStore from "./themeStore";

const Home = () => {
  const navigate = useNavigate();

  const { bondiBlue, blackBrown, mainBlue, lightBlue } = useThemeStore();

  return (
    <div

      className="h-screen w-screen  flex flex-col p-4 text-[1.5rem] justify-between ">

      <section className="flex flex-col gap-6  h-full">
        <header
          style={{ backgroundColor: mainBlue }}
          className={`flex flex-row justify-between gap-4 p-4 w-full rounded-xl text-white`}>

          {/* Left side of header */}
          <div className="flex flex-row items-center gap-4 font-extrabold">
            <img src={logo} width={40} height={40} alt="" />
            <h1>TravelSavvy365</h1>
          </div>

          {/* Right side of header */}
          <div>
            <ul className="flex flex-row items-center gap-4 font-extrabold">
              <li>
                <a href="">About</a>
              </li>
              <li>
                <a href="">Contact</a>
              </li>
            </ul>
          </div>
        </header>

        <main className="flex flex-col gap-4 p-4 flex-1">
          <section
            style={{ backgroundColor: bondiBlue }}
            className={`hero relative w-full border-2 flex-1`}>
            <div
              style={{ backgroundColor: bondiBlue }}
              className={`absolute bottom-0 left-0 p-4 min-w-[300px] w-[80%] text-sm text-white rounded-tr-xl`}>
              <h1 className=" flex text-xl font-extrabold z-10">What we do</h1>
              <p>
                This is a travel management app that allows employees to submit travel requests,
                book hotels, and manage their travel itineraries. It also includes features for
                line managers to approve or reject travel requests and for employees to view their
                travel history.
              </p>
            </div>
          </section>

          <section className="flex flex-row gap-4">
            <Button
              style={{ backgroundColor: blackBrown }}
              className="bg-[#ED8E6B] font-bold" onClick={() => navigate('/registration')} > Register  </Button>
            <Button
              style={{ backgroundColor: blackBrown }}
              className="bg-[#ED8E6B] font-bold"> Login </Button>
          </section>
        </main>

      </section>


      <footer
        style={{ backgroundColor: mainBlue }}
        className="w-full text-center p-4 text-white rounded-xl">
        TravelSavvy365. All rights reserved. &copy; 2025
      </footer>
    </div>

  )
}

export default Home