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
    <div className="bg-gradient-to-br from-slate-100 to-slate-400 min-h-screen text-gray-800">
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
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
          Admin Dashboard
        </h1>
        <button
          className="p-2 sm:px-4 sm:py-2 bg-blue-600 text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
          onClick={() => navigate(`/myprofile/?id=${props.auth.id}`)}
        >
          <PersonIcon className="sm:mr-2" />
          <span className="hidden sm:inline">My Profile</span>
        </button>
      </div>

      <div className="bg-[#dddddd] rounded-xl p-6 shadow-2xl mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <h2 className="text-xl sm:text-2xl mb-4 sm:mb-0 text-gray-700 font-medium">Want to book a hall?</h2>
          <button
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
            onClick={() => navigate('/availablehalls')}
          >
            <span>Book</span>
            <AddHomeIcon className="ml-2" />
          </button>
        </div>
      </div>

      <h2 className='text-2xl mb-4 text-gray-700'>Existing Halls</h2>
      <hr className="w-full h-[1.5px] bg-gray-900 border-0 rounded mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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