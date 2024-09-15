/* eslint-disable react/prop-types */
import { useRecoilValue } from "recoil"
import { superAdminAccessAtom } from "../../atoms/accessAtom"
import { useNavigate } from "react-router-dom"
import LongComp from "../../ui/LongComp"
import Unauthorized from "../../ui/Unauthorized"
import PersonIcon from '@mui/icons-material/Person';

const SuperAdminDashboard = () => {
  const auth = useRecoilValue(superAdminAccessAtom)

  return (
    <div className='bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 min-h-screen font-[Roboto] text-white'>
      { (auth.msg === 'Authorized') ?  <Dashboard auth={auth} /> : <Unauthorized /> }
    </div>
  )
}

function Dashboard(props) {
  const navigate = useNavigate()

  return (
    <div className="py-10 px-6 sm:px-40 sm:py-8">
      <div className="flex sm:flex-row justify-between items-center mb-8 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center sm:text-left">
          Super Admin Dashboard
        </h1>
        <button
          className="p-2 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:from-purple-600 hover:to-pink-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center"
          onClick={() => navigate(`/myprofile/?id=${props.auth.id}`)}
        >
          <PersonIcon className="sm:mr-2" />
          <span className="hidden sm:inline">My Profile</span>
        </button>
      </div>

      <hr className="w-full h-px bg-gray-600 border-0 rounded mb-8"/>

      <div className="flex flex-col gap-7 items-center">
        <div className="w-full max-w-7xl bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-2xl">
          <LongComp icon="MeetingRoomIcon" title="Halls" msg="Manage Halls" page="hallsettings" />
        </div>
        <div className="w-full max-w-7xl bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-2xl">
          <LongComp icon="GroupsIcon" title="Admins" msg="Manage Admins" page="adminsettings" />
        </div>
      </div>
    </div>
  )
}

export default SuperAdminDashboard