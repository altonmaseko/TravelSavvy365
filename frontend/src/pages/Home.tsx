import { Button } from "@/components/ui/button"

const Home = () => {
  return (
    <div className="h-screen w-screen border-red-500 border-4 flex flex-col p-4 text-[1.5rem] justify-between">

      <section className="flex flex-col gap-6">
        <header className="flex flex-row justify-between gap-4 p-4 w-full bg-[#45062E] rounded-xl text-white">

          {/* Left side of header */}
          <div className="flex flex-row items-center gap-4 font-extrabold">
            <img src="./assets/img/logo.png" width={40} height={40} alt="" />
            <h1>TravelSavvy365</h1>
          </div>

          {/* Right side of header */}
          <div>
            <ul className="flex flex-row items-center gap-4 font-extrabold">
              <li>
                About
              </li>
              <li>
                Contact
              </li>
            </ul>
          </div>


        </header>

        <main className="flex flex-col gap-4 p-4">
          <h1 className=" flex text-xl font-extrabold">What we do</h1>
          <p>
            This is a travel management app that allows employees to submit travel requests,
            book hotels, and manage their travel itineraries. It also includes features for
            line managers to approve or reject travel requests and for employees to view their
            travel history.
          </p>
          <div className="flex flex-row gap-4">
            <Button className="bg-[#ED8E6B] font-bold"> Register </Button>
            <Button className="bg-[#ED8E6B] font-bold"> Login </Button>
          </div>
        </main>

      </section>


      <footer className="w-full text-center bg-[#45062E] p-4 text-white rounded-xl">
        TravelSavvy365. All rights reserved. &copy; 2023
      </footer>
    </div>

  )
}

export default Home