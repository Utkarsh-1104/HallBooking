import { useRecoilValue } from "recoil";
import { superAdminAccessAtom } from "../../atoms/accessAtom";
import Unauthorized from "../../ui/Unauthorized";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const ViewSingleAdmin = () => {
    const access = useRecoilValue(superAdminAccessAtom);
    return (
      <div className="min-h-screen font-[Roboto] text-white">
        {(access.msg === 'Authorized') ? <ViewAdmin /> : <Unauthorized />}
      </div>
    );
}

function ViewAdmin() {
    const [admin, setAdmin] = useState({});
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        async function singleAdmin() {
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
        singleAdmin();
    }, [id])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center p-4">
            <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-2xl">
            <h1 className='text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 '>
                View Admin Details
            </h1>
            <div className="flex items-center justify-center">
                <div className="w-full max-w-2xl bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <AdminDetailItem label="First Name" value={admin.fname} />
                        <AdminDetailItem label="Last Name" value={admin.lname} />
                        <AdminDetailItem label="Username" value={admin.username} />
                        <AdminDetailItem label="Role" value={admin.role} />
                        <AdminDetailItem label="Designation" value={admin.designation} />
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

function AdminDetailItem({ label, value }) {
    return (
        <div className="mb-4">
            <h2 className="text-2xl font-medium text-amber-400">{label}</h2>
            <p className="text-[1.5rem] mt-1">{value}</p>
        </div>
    );
}

export default ViewSingleAdmin;