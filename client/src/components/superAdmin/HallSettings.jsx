import { useRecoilValue } from "recoil"
import { superAdminAccessAtom } from "../../atoms/accessAtom"
import Unauthorized from "../../ui/Unauthorized";

const HallSettings = () => {
    const access = useRecoilValue(superAdminAccessAtom)
    console.log(access);
    return (
        <div className="bg-black h-screen font-[Roboto] flex items-center justify-center ">
            { (access.msg === 'Authorized') ?  <Settings /> : <Unauthorized /> }
        </div>
    )
}

function Settings() {
    return(
        <h1 className="text-white" >Hall Settings</h1>
    )
}

export default HallSettings