import { useRecoilValue } from "recoil"
import AdminRegister from "./AdminRegister" 
import { superAdminAccessAtom } from "../../atoms/accessAtom"
import { useNavigate } from "react-router-dom"

const SuperAdminDashboard = () => {

  const access = useRecoilValue(superAdminAccessAtom)

  return (
    <div className='bg-black h-screen font-[Roboto] flex flex-col items-center justify-center '>
      <div>
        <h1 className='text-white text-center font-[Poppins] '>Super Admin Page</h1>
        { (access.msg === 'Authorized') ?  <Dashboard /> : <h1 className='text-white text-xl '>Unauthorized user. Login to continue.</h1> }
      </div>
    </div>
  )
}

function Dashboard() {
  const navigate = useNavigate()
  return (
    <div>
      <h1 className="text-white text-center font-[Poppins] ">Admin Page</h1>
      <AdminRegister />
      <button className="w-32 h-10 bg-slate-500 text-white rounded-md " onClick={ async () => {
        localStorage.removeItem('token')
        navigate("/login")
        window.location.reload()
      }} >Logout</button>
    </div>
  )
}

export default SuperAdminDashboard