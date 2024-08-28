import { useRecoilValue } from "recoil";
import { superAdminAccessAtom } from "../../atoms/accessAtom";
import Unauthorized from "../../ui/Unauthorized";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";


const ViewSingleAdmin = () => {
    const access = useRecoilValue(superAdminAccessAtom);
    return (
      <div className="bg-black h-screen font-[Roboto]">
        {(access.msg === 'Authorized') ? <ViewAdmin /> : <Unauthorized />}
      </div>
    );
}

function ViewAdmin() {

    const [admin, setAdmin] = useState({});
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        async function singeAdmin() {
            try {
                const res = await axios.get(`http://localhost:3000/getadmins/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                setAdmin(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        singeAdmin();
    }, [id])

    return (
        <div className="h-full p-4 sm:p-8">
            <h1 className='text-white font-[Poppins] text-xl sm:text-3xl text-center sm:text-left ps-0 sm:ps-40 pt-16'>
                View Admin
            </h1>
            <hr className="mx-auto w-full sm:w-[80%] h-[1.5px] bg-[#373647] border-0 rounded mt-6" />
            <div className="h-[60%] flex items-center justify-center">
                <div className="w-fit flex flex-col justify-between items-stretch bg-[#1C1C1C] text-white text-2xl gap-3 p-6 sm:px-8 rounded-md">
                    <h1>First name: {admin.fname}</h1>
                    <h1>Last name: {admin.lname}</h1>
                    <h1>Username: {admin.username}</h1>
                    <h1>Role: {admin.role}</h1>
                    <h1>Designation: {admin.designation}</h1>
                </div>
            </div>
        </div>
    );
}

export default ViewSingleAdmin