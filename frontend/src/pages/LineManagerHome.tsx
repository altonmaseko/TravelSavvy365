import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import useThemeStore from "./themeStore";
import { CiEdit, CiSettings } from "react-icons/ci";

import { FcManager } from "react-icons/fc";

const LineManagerHome = () => {

  const { bondiBlue, blackBrown, mainBlue, lightBlue } = useThemeStore();

  return (
    <div className="w-screen h-screen flex flex-col p-4 items-start gap-4  ">

      <header
        style={{ borderColor: blackBrown, backgroundColor: bondiBlue }}
        className="flex flex-row justify-between items-start w-full border-4  rounded-xl p-2 ">

        {/* left side of header */}
        <div className="flex flex-row gap-2 p-2 rounded-xl items-center">
          <img src="https://placehold.co/40" className="rounded-full" alt="Logo" />
          <div className="flex flex-col leading-tight">
            <h2 className="text-base font-semibold">Alton Maseko</h2>
            <h4 className="text-sm text-gray-600 flex gap-2 items-center"> <FcManager size={20} /> Line Manager</h4>
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


      <main className="flex flex-col">



      </main>


    </div>
  )
}

export default LineManagerHome