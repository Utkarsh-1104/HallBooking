/* eslint-disable react/prop-types */
import { useRecoilValue } from "recoil"
import { adminAccessAtom } from "../../atoms/accessAtom"
import { useNavigate } from "react-router-dom"
import Unauthorized from "../../ui/Unauthorized";
import AddHomeIcon from '@mui/icons-material/AddHome';
import PersonIcon from '@mui/icons-material/Person';
import { hallAtom } from "../../atoms/getHallsAtom";
import HallForAdmin from "./HallForAdmin";

const AdminDashboard = () => {
  const auth = useRecoilValue(adminAccessAtom) 
  
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 min-h-screen font-[Roboto] text-white">
      {(auth.msg === "Authorized") ? <Dashboard auth={auth} /> : <Unauthorized /> }
    </div>
  )
}

function Dashboard(props) {
  const navigate = useNavigate();
  const halls = useRecoilValue(hallAtom);

  return (
    <div className="py-10 px-6 sm:px-24">
      <div className="flex sm:flex-row justify-between items-center mb-8 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center sm:text-left">
          Admin Dashboard
        </h1>
        <button
          className="p-2 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:from-purple-600 hover:to-pink-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center"
          onClick={() => navigate(`/myprofile/?id=${props.auth.id}`)}
        >
          <PersonIcon className="sm:mr-2" />
          <span className="hidden sm:inline">My Profile</span>
        </button>
      </div>

      <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-2xl mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <h2 className="text-xl sm:text-2xl mb-4 sm:mb-0">Want to book a hall?</h2>
          <button
            className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:from-purple-600 hover:to-pink-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center"
            onClick={() => navigate('/availablehalls')}
          >
            <span>Book</span>
            <AddHomeIcon className="ml-2" />
          </button>
        </div>
      </div>

      <h2 className='text-2xl mb-4'>Existing Halls</h2>
      <hr className="w-full h-px bg-gray-600 border-0 rounded mb-8" />

      <div className="flex flex-col gap-4 items-center justify-center">
        {halls.map(hall => (
          <HallForAdmin
            key={hall._id}
            id={hall._id}
            hall_name={hall.hall_name}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard