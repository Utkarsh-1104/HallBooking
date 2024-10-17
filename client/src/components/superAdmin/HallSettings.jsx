/* eslint-disable react/prop-types */
import { useRecoilValue } from "recoil";
import { superAdminAccessAtom } from "../../atoms/accessAtom";
import Unauthorized from "../../ui/Unauthorized";
import { useNavigate } from "react-router-dom";
import ExistingHalls from "./ExistingHalls";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AddHomeIcon from '@mui/icons-material/AddHome';
import VisibilityIcon from '@mui/icons-material/Visibility';

const HallSettings = () => {
  const access = useRecoilValue(superAdminAccessAtom);
  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-400 min-h-screen text-gray-800">
      {(access.msg === 'Authorized') ? <Settings /> : <Unauthorized />}
    </div>
  );
};

function Settings() {

  const options = [
    {
      title: 'Want to book a hall?',
      nav: '/availablehalls',
      icon: <AddHomeIcon className="ml-2" fontSize="small" />,
      button: 'Book'
    },
    {
      title: 'View booking requests.',
      nav: '/superadminpage/bookingrequests',
      icon: <VisibilityIcon className="ml-2" fontSize="small" />,
      button: 'View'
    },
    {
      title: 'Want to add new hall?',
      nav: '/superadminpage/adminsettings/addhall',
      icon: <MeetingRoomIcon className="ml-2" fontSize="small" />,
      button: 'Add'
    }
  ]

  return (
    <div className="py-10 px-6 sm:px-24">
      <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left mb-8">
        Hall Settings
      </h1>
      
      <div className="flex flex-col gap-6 mb-12">
        { options.map(option => (
          <SettingsComp
            key={option.title}
            title={option.title}
            nav={option.nav}
            button={option.button}
            icon={option.icon}
          />
        )) }
      </div>
      
      <h2 className='text-2xl mb-4 text-gray-700'>Existing Halls</h2>
      <hr className="w-full h-[1.5px] bg-gray-900 border-0 rounded mb-8" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <ExistingHalls />
      </div>
    </div>
  );
}

export default HallSettings;


function SettingsComp(props) {
  const navigate = useNavigate();
  return (
    <div className="bg-[#dddddd] rounded-xl p-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <h2 className="text-xl sm:text-2xl mb-4 sm:mb-0 text-gray-700 font-medium">{props.title}</h2>
        <button
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
          onClick={() => { navigate(`${props.nav}`); }}
        >
          {props.button} {props.icon}
        </button>
      </div>
    </div>
  )
}