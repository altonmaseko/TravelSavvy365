
import logo from "@/assets/img/logo.png"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@radix-ui/react-dropdown-menu"
import { useEffect, useState } from "react"
import { FaCloudUploadAlt } from "react-icons/fa"


const Registration = () => {

  const [position, setPosition] = useState("Role at organization")

  useEffect(() => {
    console.log("Position changed to: ", position)
  }, [position])

  return (
    <div className="w-screen min-h-screen flex flex-row p-4">

      {/* left half of page */}
      <section className="flex-1 flex flex-col items-start gap-4">
        <div className="bg-[#45062e] p-4 rounded-xl text-white flex flex-row w-full justify-center items-center gap-4">
          <img src={logo} width={40} height={40} alt="" />
          <h1>Register</h1>
        </div>


        <main className="flex flex-col gap-4 p-2 rounded-xl w-full h-full justify-between  ">

          <section className="flex flex-col gap-4 rounded-xl w-full ">
            <Input type="text" placeholder="Name" />
            <Input type="text" placeholder="Surname" />
            <Input type="email" placeholder="Email" />
            <Input type="date" placeholder="Date of Birth" />

            {/* Role Dropdown */}
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

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label >Upload ID</Label>
              <Input id="picture" type="file" />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label >Other Supporting Documents (optional)</Label>
              <Input id="picture" type="file" />
            </div>
          </section>

          <section className="flex flex-col gap-4 p-2 rounded-xl w-full ">
            <Button className="bg-[#ED8E6B] font-bold"> Send Registration </Button>
          </section>

        </main>



      </section>
      {/* right half of page */}
      <section className="flex-1 flex flex-col justify-center">
        <div className="w-full h-[400px] rounded-full border-2 border-black relative">
          {/* placeholder image */}
          <img src="https://placehold.co/300" alt="Placeholder" className="w-full h-full object-cover rounded-full" />

          <div className="flex justify-center absolute bottom-5 w-full">
            <FaCloudUploadAlt className="hover:scale-110 active:scale-100 hover:cursor-pointer" size={30} />
          </div>


        </div>

        <div className="grid w-full gap-1.5">
          <Label>Bio</Label>
          <Textarea placeholder="Describe yourself" id="message-2" />
          <p className="text-sm text-muted-foreground">
            This will appear on your profile. You can change it later.
          </p>
        </div>
      </section>


    </div>
  )
}

export default Registration