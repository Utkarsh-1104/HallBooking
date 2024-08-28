import { useRecoilValue } from "recoil"
import { superAdminAccessAtom } from "../../atoms/accessAtom"
import Unauthorized from "../../ui/Unauthorized"
import { useNavigate } from "react-router-dom"
import ExistingAdmins from "./ExistingAdmins"
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { adminsAtom } from "../../atoms/getAdminsAtom"

const AdminSettings = () => {
  const access = useRecoilValue(superAdminAccessAtom)
  return (
    <div className="bg-black h-full font-[Roboto]" >
      { (access.msg === 'Authorized') ?  <Settings /> : <Unauthorized /> }
    </div>
  )
}

function Settings() {
  const navigate = useNavigate()

  const admins = useRecoilValue(adminsAtom)
  console.log(admins);

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="w-[80%] flex justify-center items-center border text-white mt-10 py-8 px-16">
          <h1 className="text-3xl">Want to add new admin?</h1>
          <button className="text-xl ms-auto w-36 h-10 text-white border flex items-center justify-center gap-2 rounded-sm hover:bg-white hover:text-black" onClick={() => {navigate('/superadminpage/adminsettings/addadmin')}} > Add <PersonAddAlt1Icon fontSize="snall" /></button>
        </div>
      </div>
      <h1 className='text-white font-[Poppins] text-3xl ps-40 pt-16 '>Existing Admins</h1>
      <hr className="mx-auto w-[80%] h-[1.5px] bg-[#373647] border-0 rounded mt-6"/>
      <div className="box-border overflow-x-hidden ">
        <div className="flex flex-col gap-7 items-center justify-center my-10 overflow-y-auto">
          {admins.map(admin => (
            <ExistingAdmins
            key={admin._id}
            id={admin._id}
            fname={admin.fname}
            lname={admin.lname}
            />
          )) }
        </div>
      </div>
    </div>
  )
}

export default AdminSettings