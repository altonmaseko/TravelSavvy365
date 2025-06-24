import { useState } from "react";
import { IoIosSettings, IoIosNotifications } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { FaCaretLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const sidebarVariants = {
    open: {
      width: 250,
      transition: { duration: 0.3 },
    },
    collapsed: {
      width: 60,
      transition: { duration: 0.3 },
    },
  };

  const items = [
    { icon: <IoIosSettings size={24} />, label: "Settings" },
    { icon: <IoIosNotifications size={24} />, label: "Notifications" },
    { icon: <IoPersonCircle size={24} />, label: "Profile" },
  ];

  return (
    <motion.div
      className="h-full bg-gray-100 text-lg py-4 px-2 flex flex-col gap-6 shadow-md"
      animate={isOpen ? "open" : "collapsed"}
      variants={sidebarVariants}
    >
      {/* Collapse/Expand Toggle */}
      <div className="flex justify-end pr-4">
        <FaCaretLeft
          size={30}
          className={`cursor-pointer transition-transform duration-300 ${!isOpen ? "rotate-180" : ""
            }`}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Sidebar Items */}
      <div className="flex flex-col gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            {item.icon}
            {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
