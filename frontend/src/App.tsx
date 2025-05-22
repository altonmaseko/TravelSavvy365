import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import EmployeeHome from './pages/EmployeeHome/EmployeeHome'
import HotelBooking from './pages/HotelBooking'
import LineManagerHome from './pages/LineManagerHome/LineManagerHome'
import Registration from './pages/Registration'
import SubmitTravelRequest from './pages/CreateTravelRequest/SubmitTravelRequest'
import AdminHome from './pages/AdminHome/AdminHome'
import Login from './pages/Login'
import useThemeStore from './pages/states/themeStore';
import { FcManager } from 'react-icons/fc';
import { useHeader } from './pages/states/useHeader';


function App() {

  const { blackBrown, redBrown, bondiBlue, mainBlue } = useThemeStore();

  const { workerName, workerType, appLocation, setShowHeader, showHeader } = useHeader();


  return (
    <Router>
      {showHeader && <header
        // add bottom shadow
        style={{ borderColor: blackBrown, backgroundColor: mainBlue, boxShadow: `0px 0.5px 10px black` }}
        className="flex flex-row justify-between items-center w-full  p-2 text-white mb-2">

        {/* left side of header */}
        <div className="flex flex-row gap-2 p-2 items-center">
          {appLocation} <h4 className="text-sm text-gray-600 flex gap-2 items-center"> <FcManager size={20} /> {workerType} [{workerName}]</h4>
        </div>

        {/* right side of header */}
        <div className="flex flex-row gap-4 h-full items-center underline font-bold">
          <p>notifications (8)</p>
          <p>settings</p>
          <p>profile</p>
          <p>home</p>
        </div>
      </header>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/employee-home" element={<EmployeeHome />} />
        <Route path="/hotel-booking" element={<HotelBooking />} />
        <Route path="/line-manager-home" element={<LineManagerHome />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/submit-travel-request" element={<SubmitTravelRequest />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App
