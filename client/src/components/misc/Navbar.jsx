import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../../assets/logo.png'

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <div>
      <nav className="bg-[#261063] shadow-sm text-gray-800 px-4 sm:px-8 md:px-16 py-4 flex justify-between items-center">
        <div className="flex text-white items-center">
          <img src={logo} alt="LNCT Logo" className="h-12 w-auto mr-6" />
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <CloseIcon style={{ fontSize: 28, color: 'white' }} /> : <MenuIcon style={{ fontSize: 28, color: 'white' }} />}
          </button>
        </div>
        <div className={`font-[Poppins] text-white flex flex-col md:flex-row gap-4 md:gap-8 text-lg md:items-center absolute md:static top-[5rem] left-0 w-full bg-blue-600 md:w-auto md:bg-transparent transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} md:translate-x-0 z-10 md:z-auto`}>
          <h3 className="hover:text-[#E17833]  cursor-pointer py-2 md:py-0 px-4 md:px-0" onClick={() => {navigate('/'); toggleMenu();}}>Home</h3>
          <h3 className="hover:text-[#E17833]  cursor-pointer py-2 md:py-0 px-4 md:px-0" onClick={() => {navigate('/login'); toggleMenu();}}>Login</h3>
          <h3 className="hover:text-[#E17833]  cursor-pointer py-2 md:py-0 px-4 md:px-0" onClick={() => {navigate('/adminpage'); toggleMenu();}}>Admin Dashboard</h3>
          <h3 className="hover:text-[#E17833]  cursor-pointer py-2 md:py-0 px-4 md:px-0" onClick={() => {navigate('/superadminpage'); toggleMenu();}}>Super Admin Dashboard</h3>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;