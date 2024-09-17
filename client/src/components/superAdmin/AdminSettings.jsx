import { useRecoilValue } from "recoil";
import { superAdminAccessAtom } from "../../atoms/accessAtom";
import Unauthorized from "../../ui/Unauthorized";
import { useNavigate } from "react-router-dom";
import ExistingAdmins from "./ExistingAdmins";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { adminsAtom } from "../../atoms/getAdminsAtom";

const AdminSettings = () => {
  
  const access = useRecoilValue(superAdminAccessAtom);
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 min-h-screen font-[Roboto] text-white">
      {(access.msg === 'Authorized') ? <Settings /> : <Unauthorized />}
    </div>
  );
};

function Settings() {
  const navigate = useNavigate();

  const admins = useRecoilValue(adminsAtom);

  return (
    <div className="py-10 px-6 sm:px-24">
      <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center sm:text-left mb-8">
        Admin Settings
      </h1>
      <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-2xl mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <h2 className="text-xl sm:text-2xl mb-4 sm:mb-0">Want to add new admin?</h2>
          <button
            className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:from-purple-600 hover:to-pink-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center"
            onClick={() => { navigate('/superadminpage/adminsettings/addadmin'); }}
          >
            <span>Add</span>
            <PersonAddAlt1Icon className="ml-2" fontSize="small" />
          </button>
        </div>
      </div>

      <h2 className='text-2xl mb-4'>Existing Admins</h2>
      <hr className="w-full h-px bg-gray-600 border-0 rounded mb-6" />

      <div className="flex flex-col gap-4 items-center justify-center">
        {admins.map(admin => (
          <ExistingAdmins
            key={admin._id}
            id={admin._id}
            fname={admin.fname}
            lname={admin.lname}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminSettings;
