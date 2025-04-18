import { Button } from "@/components/ui/button"

import logo from "@/assets/img/logo.png"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen  flex flex-col p-4 text-[1.5rem] justify-between bg-[#EDE6F2]">

      <section className="flex flex-col gap-6  h-full">
        <header className="flex flex-row justify-between gap-4 p-4 w-full bg-[#45062E] rounded-xl text-white">

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
          <section className="hero relative w-full border-orange-400 border-2 flex-1">
            <div className="absolute bottom-0 left-0 p-4 min-w-[300px] w-[80%] text-sm text-white bg-[#45062e] rounded-tr-xl">
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
            <Button className="bg-[#ED8E6B] font-bold" onClick={() => navigate('/registration')} > Register  </Button>
            <Button className="bg-[#ED8E6B] font-bold"> Login </Button>
          </section>
        </main>

      </section>


      <footer className="w-full text-center bg-[#45062E] p-4 text-white rounded-xl">
        TravelSavvy365. All rights reserved. &copy; 2025
      </footer>
    </div>

  )
}

export default Home