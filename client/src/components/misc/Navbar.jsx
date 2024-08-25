import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="bg-[#454343] text-white px-4 sm:px-8 md:px-16 py-4 flex justify-between items-center">
        <h1 className="font-[Poppins] text-2xl sm:text-3xl">Navbar</h1>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <CloseIcon style={{ fontSize: 28 }} /> : <MenuIcon style={{ fontSize: 28 }} />}
          </button>
        </div>
        <div className={`font-[Poppins] flex flex-col md:flex-row gap-4 md:gap-8 text-[1rem] md:items-center absolute md:static top-16 left-0 w-full md:w-auto bg-[#454343] md:bg-transparent transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} md:translate-x-0 z-10 md:z-auto`}>
          <h3 className="hover:text-red-500 cursor-pointer py-2 md:py-0 px-4 md:px-0" onClick={() => {navigate('/home'); toggleMenu();}}>Home</h3>
          <h3 className="hover:text-red-500 cursor-pointer py-2 md:py-0 px-4 md:px-0" onClick={() => {navigate('/login'); toggleMenu();}}>Login</h3>
          <h3 className="hover:text-red-500 cursor-pointer py-2 md:py-0 px-4 md:px-0" onClick={() => {navigate('/adminpage'); toggleMenu();}}>Admin Dashboard</h3>
          <h3 className="hover:text-red-500 cursor-pointer py-2 md:py-0 px-4 md:px-0" onClick={() => {navigate('/superadminpage'); toggleMenu();}}>Super Admin Dashboard</h3>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
