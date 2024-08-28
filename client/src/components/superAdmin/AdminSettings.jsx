import { useRecoilValue } from "recoil"
import { superAdminAccessAtom } from "../../atoms/accessAtom"
import Unauthorized from "../../ui/Unauthorized"
import { useNavigate } from "react-router-dom"
import ExistingAdmins from "./ExistingAdmins"

const AdminSettings = () => {
  const access = useRecoilValue(superAdminAccessAtom)
  return (
    <div className="bg-black h-screen font-[Roboto]" >
      { (access.msg === 'Authorized') ?  <Settings /> : <Unauthorized /> }
    </div>
  )
}

function Settings() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="w-[80%] flex justify-center items-center border text-white mt-10 py-8 px-16">
          <h1 className="text-3xl">Want to add new admin?</h1>
          <button className="text-xl ms-auto w-44 h-10 text-white border rounded-sm hover:bg-white hover:text-black" onClick={() => {navigate('/superadminpage/adminsettings/addadmin')}} >Add Admin</button>
        </div>
      </div>
      <h1 className='text-white font-[Poppins] text-3xl ps-40 pt-16 '>Existing Admins</h1>
      <hr className="mx-auto w-[80%] h-[1.5px] bg-[#373647] border-0 rounded mt-6"/>
      <div className="flex flex-col gap-7 items-center justify-center mt-14">
        <ExistingAdmins />
      </div>
    </div>
  )
}

export default AdminSettings