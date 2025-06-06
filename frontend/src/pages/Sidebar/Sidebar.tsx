
import { IoIosSettings, IoIosNotifications } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-[250px] bg-gray-100 text-lg p-2 gap-4 font-semibold">
      <div className="w-full flex gap-2 items-center"> <IoIosSettings size={32} /> <p>Settings</p> </div>
      <div className="w-full flex gap-2 items-center"> <IoIosNotifications size={32} /> <p>Notifications</p> </div>
      <div className="w-full flex gap-2 items-center"> <IoPersonCircle size={32} /> <p>Profile Settings</p> </div>
    </div>
  )
}

export default Sidebar