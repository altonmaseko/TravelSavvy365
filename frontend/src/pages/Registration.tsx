
import logo from "@/assets/img/logo.png"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@radix-ui/react-dropdown-menu"
import { useEffect, useState } from "react"
import { FaCloudUploadAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import useThemeStore from "../states/themeStore"


const Registration = () => {

  const [position, setPosition] = useState("Role at organization")

  const navigate = useNavigate();

  const { lightBlue } = useThemeStore();


  useEffect(() => {
    console.log("Position changed to: ", position)
  }, [position])

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center">

      <Carousel className="h-[600px] w-[600px] p-1  ">
        <CarouselContent>

          {/* First Slide */}
          <CarouselItem className="w-full">
            <main
              style={{ background: lightBlue }}
              className="flex flex-col gap-4 p-2 w-full h-full justify-between border-1">
              <section className="flex flex-col gap-4 rounded-xl w-full">
                <div className="flex gap-4 items-center">
                  <img src={logo} width={40} height={40} alt="" />
                  <h6>Register</h6>
                </div>
                <hr />

                <Input type="text" placeholder="Name" />
                <Input type="text" placeholder="Surname" />
                <Input type="email" placeholder="Email" />
                <Input type="date" placeholder="Date of Birth" />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="hover:scale-100" variant="outline">{position}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                      <DropdownMenuRadioItem value="ceo">CEO</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="manager">Manager</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="engineer">Engineer</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="intern">Intern</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="hr-director">HR Director</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="hr-manager">HR Manager</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="hr-assistant">HR Assistant</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="hr-intern">HR Intern</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="it-director">IT Director</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="it-manager">IT Manager</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="it-assistant">IT Assistant</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="it-intern">IT Intern</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>


              </section>

              <section className="flex flex-col gap-4 p-2 rounded-xl w-full">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>Upload ID</Label>
                  <Input id="picture" type="file" />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label>Other Supporting Documents (optional)</Label>
                  <Input id="picture" type="file" />
                </div>
              </section>
            </main>
          </CarouselItem>

          {/* Second Slide */}
          <CarouselItem
            className="w-full">
            <section
              style={{ background: lightBlue }}

              className="flex-1 flex flex-col items-center justify-center gap-4 w-full border-1 p-2">
              <div className="h-[400px] w-[400px] rounded-full border-2 border-black relative overflow-hidden">
                <img
                  src="https://placehold.co/300"
                  alt="Placeholder"
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="flex justify-center absolute bottom-5 w-full">
                  <FaCloudUploadAlt className="hover:scale-110 active:scale-100 hover:cursor-pointer" size={30} />
                </div>
              </div>

              <div className="grid w-full gap-1.5 text-black">
                <Label>Bio</Label>
                <Textarea className="text-black" placeholder="Describe yourself" id="message-2" />
                <p className="text-sm  text-black">
                  This will appear on your profile. You can change it later.
                </p>
              </div>
              <Button
                className="bg-[#ED8E6B] font-bold self-end"
                onClick={() => {
                  alert("Registration sent. You will have access once Admin approves.")
                  navigate('/employee-home')
                }}
              >
                Send Registration
              </Button>
            </section>
          </CarouselItem>

        </CarouselContent>

        <CarouselPrevious className="rounded-none" />
        <CarouselNext className="rounded-none" />
      </Carousel>


    </div >
  )
}

export default Registration