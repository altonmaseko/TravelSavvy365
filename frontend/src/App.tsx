import { BrowserRouter as Routes, Route } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import EmployeeHome from './pages/EmployeeHome/EmployeeHome'
import HotelBooking from './pages/HotelBooking/HotelBooking'
import LineManagerHome from './pages/LineManagerHome/LineManagerHome'
import Registration from './pages/Registration'
import CreateTravelRequest from './pages/CreateTravelRequest/CreateTravelRequest'
import AdminHome from './pages/AdminHome/AdminHome'
import Login from './pages/Login'
import useThemeStore from './states/themeStore';
import { FcManager } from 'react-icons/fc';
import { useHeader } from './states/useHeader';
import Sidebar from './pages/Sidebar/Sidebar'
import { useSidebar } from './states/useSidebar'
import { useEffect } from 'react'

function App() {

  const { blackBrown, mainBlue } = useThemeStore();

  const { workerName, workerType, appLocation, showHeader, setShowHeader } = useHeader();

  const { showSidebar, setShowSidebar } = useSidebar();

  const navigate = useNavigate();

  // Show or hide header and sidebar based on page location
  const noSidebarRoutes = ['/', '/login', '/registration', '/about', '/create-travel-request'];
  const noHeaderRoutes = ['/', '/login', '/registration', '/about',];
  useEffect(() => {
    setShowSidebar(!noSidebarRoutes.includes(location.pathname));
    setShowHeader(!noHeaderRoutes.includes(location.pathname));
  }, [location.pathname, setShowSidebar]);



  return (
    <div className="min-w-screen flex flex-col min-h-screen">
      {/* HEADER */}
      {showHeader && <header
        // add bottom shadow
        style={{ borderColor: blackBrown, backgroundColor: mainBlue, boxShadow: `0px 0.5px 10px black` }}
        className="flex flex-row justify-between items-center w-full  py-2 px-4 text-white mb-2">

        {/* left side of header */}
        <div className="flex flex-row gap-2 p-2 items-center">
          {appLocation} <h4 className="text-sm text-gray-600 flex gap-2 items-center"> <FcManager size={20} /> {workerType} [{workerName}]</h4>
        </div>

        {/* right side of header */}
        <div className="flex flex-row gap-4 h-full items-center underline font-bold">
          <a onClick={() => navigate('/')}>home</a>
        </div>
      </header>}

      <div className="flex flex-1">
        {/* SIDEBAR */}
        {showSidebar && <Sidebar />}
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/employee-home" element={<EmployeeHome />} />
            <Route path="/hotel-booking" element={<HotelBooking />} />
            <Route path="/line-manager-home" element={<LineManagerHome />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/create-travel-request" element={<CreateTravelRequest />} />
            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App
