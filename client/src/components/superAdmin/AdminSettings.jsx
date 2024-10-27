import { useRecoilValue } from "recoil";
import { superAdminAccessAtom } from "../../atoms/accessAtom";
import Unauthorized from "../../ui/Unauthorized";
import { useNavigate } from "react-router-dom";
import ExistingAdmins from "./ExistingAdmins";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
// import { adminsAtom } from "../../atoms/getAdminsAtom"
import { useEffect, useState } from "react";
import axios from "axios";

const AdminSettings = () => {
  
  const access = useRecoilValue(superAdminAccessAtom);
  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-400 min-h-screen text-gray-800">
      {(access.msg === 'Authorized') ? <Settings /> : <Unauthorized />}
    </div>
  );
};

function Settings() {
  const navigate = useNavigate();

  const [admins, setAdmins]  = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get(`https://lncthalls-server.onrender.com/getadmins?filter=${filter}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
      setAdmins(response.data)
    })
  }, [filter])

  return (
    <div className="py-10 px-6 sm:px-20">
      <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left mb-8">
        Admin Settings
      </h1>
      <div className="bg-[#dddddd] rounded-xl p-6 shadow-2xl mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <h2 className="text-xl sm:text-2xl mb-4 sm:mb-0 text-gray-700 font-medium">Want to add a new admin?</h2>
          <button
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
            onClick={() => { navigate('/superadminpage/adminsettings/addadmin'); }}
          >
            <span>Add</span>
            <PersonAddAlt1Icon className="ml-2" fontSize="small" />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 justify-between mb-4">
        <h2 className='text-2xl text-gray-700'>Existing Admins</h2>
        <input type="search" onChange={(e) => {setFilter(e.target.value)}} className="w-[20rem] px-3 py-2 text-black bg-gray-250 border-4 border-blue-400 rounded-md text-base shadow-sm placeholder-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Search admin" name="" id="" />
      </div>
      <hr className="w-full h-[1.5px] bg-gray-900 border-0 rounded mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {admins.map(admin => (
          <ExistingAdmins
            key={admin._id}
            id={admin._id}
            fname={admin.fname}
            lname={admin.lname}
            role={admin.role}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminSettings;
