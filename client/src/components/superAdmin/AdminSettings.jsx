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
    <div className="bg-black min-h-screen font-[Roboto]">
      {(access.msg === 'Authorized') ? <Settings /> : <Unauthorized />}
    </div>
  );
};

function Settings() {
  const navigate = useNavigate();

  const admins = useRecoilValue(adminsAtom);

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center border text-white mt-10 py-8 px-6 sm:px-16">
          <h1 className="text-xl sm:text-3xl text-center">Want to add new admin?</h1>
          <button
            className="text-lg sm:text-xl mt-4 sm:mt-0 sm:ml-auto w-full sm:w-36 h-10 text-white border flex items-center justify-center gap-2 rounded-sm hover:bg-white hover:text-black"
            onClick={() => { navigate('/superadminpage/adminsettings/addadmin'); }}
          >
            Add <PersonAddAlt1Icon fontSize="small" />
          </button>
        </div>
      </div>
      <h1 className='text-white font-[Poppins] text-xl sm:text-3xl text-center sm:text-left ps-0 sm:ps-40 pt-16'>
        Existing Admins
      </h1>
      <hr className="mx-auto w-full sm:w-[80%] h-[1.5px] bg-[#373647] border-0 rounded mt-6" />
      <div className="flex flex-col gap-4 items-center justify-center my-10 overflow-y-auto">
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
