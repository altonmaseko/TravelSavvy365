
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <ul className='fixed left-0 top-0 w-screen flex flex-row gap-4 justify-evenly'>
      <li> <Link to={'/'}>Home</Link> </li>
      <li> <Link to={'/registration'}>About</Link> </li>
      <li> <Link to={'/contact'}>Contact</Link> </li>
    </ul>
  )
}

export default Navbar