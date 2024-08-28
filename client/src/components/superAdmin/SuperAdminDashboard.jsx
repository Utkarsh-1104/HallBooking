import { useRecoilValue } from "recoil"
//import AdminRegister from "./AdminRegister" 
import { superAdminAccessAtom } from "../../atoms/accessAtom"
import { useNavigate } from "react-router-dom"
import LongComp from "../../ui/LongComp"
import Unauthorized from "../../ui/Unauthorized"

const SuperAdminDashboard = () => {

  const access = useRecoilValue(superAdminAccessAtom)
  const reload = setTimeout(() => {
    window.location.reload()
  }, 1000);
  
  clearTimeout(reload)

  return (
    <div className='bg-black h-screen font-[Roboto] '>
      { (access.msg === 'Authorized') ?  <Dashboard /> : <Unauthorized /> }
    </div>
  )
}

function Dashboard() {
  const navigate = useNavigate()
  return (
    <div >
      {/* <AdminRegister /> */}
      <h1 className='text-white font-[Poppins] text-3xl ps-40 pt-16 '>Super Admin Dashboard</h1>
      <hr className="mx-auto w-[80%] h-[1.5px] bg-[#373647] border-0 rounded mt-6"/>
      <div className="flex flex-col gap-7 items-center justify-center mt-14">
        <LongComp icon="MeetingRoomIcon" title="Halls" msg="Manage Halls" page="hallsettings" />
        <LongComp icon="GroupsIcon" title="Admins" msg="Manage Admins" page="adminsettings" />
      </div>
      <button className="w-32 h-10 bg-slate-500 text-white rounded-md " onClick={ async () => {
        localStorage.removeItem('token')
        navigate("/login")
        window.location.reload()
      }} >Logout</button>
    </div>
  )
}

export default SuperAdminDashboard