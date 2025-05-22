import { Button } from "@/components/ui/button"

import logo from "@/assets/img/logo.png"
import { useNavigate } from "react-router-dom"
import useThemeStore from "./states/themeStore";
import { useHeader } from "./states/useHeader";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  const { blackBrown } = useThemeStore();

  const { setShowHeader, showHeader } = useHeader();

  useEffect(() => {
    setShowHeader(false)
  }, [])

  return (
    <div

      className="h-screen w-screen  flex flex-col justify-between">

      <section className="flex flex-col gap-6  h-full">
        <header
          className={`flex flex-row justify-between gap-4 p-4 w-full  `}>

          {/* Left side of header */}
          <div className="flex flex-row items-center gap-4 font-extrabold">
            <img src={logo} width={40} height={40} alt="" />
            <h1>TravelSavvy365</h1>
          </div>

          {/* Right side of header */}
          <div>
            <ul className="flex flex-row items-center gap-4 h-full  font-extrabold underline">
              <li>
                <a href="">Pricing</a>
              </li>
              <li>
                <a href="">Features</a>
              </li>
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
          <section className="flex gap-4 h-[400px] items-center p-8">
            <p className="grow">
              This is a travel management app that allows employees to submit travel requests,
              book hotels, and manage their travel itineraries. It also includes features for
              line managers to approve or reject travel requests and for employees to view their
              travel history.
            </p>
            <img className="grow h-full" src={logo} alt="" />


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


      <footer className="bg-gray-900 text-white px-6 py-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto justify-center m-auto">

          <div className="space-y-2">
            <h4 className="text-lg font-semibold">TravelSavvy365</h4>
            <p>809 Queens 8</p>
            <p>Suite 900</p>
            <p>Johannesburg</p>
            <p>South Africa</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <p>Partners</p>
            <p>How it works</p>
            <p>IOS</p>
            <p>Android</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Help</h4>
            <p>FAQs</p>
            <p>Support Center</p>
            <p>Affiliates</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Information</h4>
            <p>About Us</p>
            <p>Work with us</p>
            <p>Privacy Policy</p>
            <p>Terms of Use</p>
            <p>Our Vision</p>
          </div>

        </div>
      </footer>

    </div>

  )
}

export default Home