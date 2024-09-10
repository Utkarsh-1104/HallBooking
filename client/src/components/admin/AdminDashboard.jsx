import { useRecoilValue } from "recoil"
import { adminAccessAtom } from "../../atoms/accessAtom"
import { useNavigate } from "react-router-dom"
import Unauthorized from "../../ui/Unauthorized";
import AddHomeIcon from '@mui/icons-material/AddHome';
import { hallAtom } from "../../atoms/getHallsAtom";
import HallForAdmin from "./HallForAdmin";

const AdminDashboard = () => {

  const auth = useRecoilValue(adminAccessAtom) 
  
  return (
    <div className="bg-black min-h-screen font-[Roboto] ">
      {(auth.msg === "Authorized") ? <Dashboard /> : <Unauthorized /> }
    </div>
  )
}

function Dashboard() {
  const navigate = useNavigate();

  const halls = useRecoilValue(hallAtom);

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center border text-white mt-10 py-8 px-6 sm:px-16">
          <h1 className="text-xl sm:text-3xl text-center">Want to book a hall?</h1>
          <button
            className="text-lg sm:text-xl mt-4 sm:mt-0 sm:ml-auto w-full sm:w-36 h-10 text-white border flex items-center justify-center gap-2 rounded-sm hover:bg-white hover:text-black"
            onClick={() => { navigate('/bookhall'); }}
          >
            Book <AddHomeIcon fontSize="small" />
          </button>
        </div>
      </div>
      <h1 className='text-white font-[Poppins] text-xl sm:text-3xl text-center sm:text-left ps-0 sm:ps-40 pt-16'>
        Existing Halls
      </h1>
      <hr className="mx-auto w-full sm:w-[80%] h-[1.5px] bg-[#373647] border-0 rounded mt-6" />
      <div className="flex flex-col gap-4 items-center justify-center my-10 overflow-y-auto">
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