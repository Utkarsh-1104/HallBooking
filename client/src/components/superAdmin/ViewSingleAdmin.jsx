/* eslint-disable react/prop-types */
import { useRecoilValue } from "recoil";
import { superAdminAccessAtom } from "../../atoms/accessAtom";
import Unauthorized from "../../ui/Unauthorized";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const ViewSingleAdmin = () => {
    const access = useRecoilValue(superAdminAccessAtom);
    return (
      <div className="bg-gradient-to-br from-slate-100 to-slate-400 text-gray-800">
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-400 p-4 sm:p-6">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-blue-600 py-6 px-8 text-white">
                    <h1 className='text-[2rem] font-bold'>
                        View admin details
                    </h1>
                    
                </div>
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-2xl rounded-xl p-6 text-center shadow-2xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-10">
                            <AdminDetailItem label="First Name" value={admin.fname} />
                            <AdminDetailItem label="Last Name" value={admin.lname} />
                            <AdminDetailItem label="Username" value={admin.username} />
                            <AdminDetailItem label="Role" value={admin.role} />
                            <AdminDetailItem label="Designation" value={admin.designation} />
                            <AdminDetailItem label="Branch" value={admin.branch} />
                            <AdminDetailItem label="College" value={admin.college} />
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
            <h2 className="text-2xl font-medium text-amber-600">{label}</h2>
            <p className="text-[1.5rem] mt-1">{value}</p>
        </div>
    );
}

export default ViewSingleAdmin;