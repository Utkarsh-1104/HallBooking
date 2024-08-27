import { useRecoilValue } from "recoil"
import AdminRegister from "./AdminRegister"
import { superAdminAccessAtom } from "../../atoms/accessAtom"
import Unauthorized from "../../ui/Unauthorized"

const AdminSettings = () => {
  const access = useRecoilValue(superAdminAccessAtom)
  return (
    <div className="bg-black h-screen font-[Roboto] flex items-center justify-center " >
      { (access.msg === 'Authorized') ?  <AdminRegister /> : <Unauthorized /> }
    </div>
  )
}

export default AdminSettings