import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Navbar from './pages/Navbar'
import EmployeeHome from './pages/EmployeeHome'
import HotelBooking from './pages/HotelBooking'
import LineManagerHome from './pages/LineManagerHome'
import Registration from './pages/Registration'
import SubmitTravelRequest from './pages/CreateTravelRequest/SubmitTravelRequest'

function App() {

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/employee-home' element={<EmployeeHome />}></Route>
        <Route path='/hotel-booking' element={<HotelBooking />}></Route>
        <Route path='/line-manager-home' element={<LineManagerHome />}></Route>
        <Route path='/registration' element={<Registration />}></Route>
        <Route path='/submit-travel-request' element={<SubmitTravelRequest />}></Route>
      </Routes>
    </Router>
  )
}

export default App
