import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { branchAtom, collegeAtom, designationAtom, eventAtom, fnameAtom, lnameAtom, passwordAtom, roleAtom, textAtom, usernameAtom } from "../../atoms/adminRegisterAtoms";
import axios from 'axios';
import Popup from '../../ui/Alert.jsx';
import { superAdminAccessAtom } from "../../atoms/accessAtom.js";
import Unauthorized from "../../ui/Unauthorized.jsx";
import AddIcon from '@mui/icons-material/Add';
const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT
export default function AdminRegister() {
    const access = useRecoilValue(superAdminAccessAtom);
    return (
        <div className="bg-gradient-to-br from-slate-100 to-slate-400 text-gray-800">
        {(access.msg === 'Authorized') ? <AdminRegisterPage /> : <Unauthorized />}
        </div>
    );
}

const AdminRegisterPage = () => {
    const [fname, setfname] = useRecoilState(fnameAtom);
    const [lname, setlname] = useRecoilState(lnameAtom);
    const [username, setusername] = useRecoilState(usernameAtom);
    const [password, setpassword] = useRecoilState(passwordAtom);
    const [role, setrole] = useRecoilState(roleAtom);
    const [designation, setdesignation] = useRecoilState(designationAtom);
    const [branch, setbranch] = useRecoilState(branchAtom);
    const [college, setcollege] = useRecoilState(collegeAtom);

    const [result, setResult] = useRecoilState(eventAtom);
    const [msg, setMsg] = useRecoilState(textAtom);

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    async function handleSubmit(e) {
        e.preventDefault();

        if ((fname.toLowerCase() !== fname.toUpperCase())) {
            if ((lname.toLowerCase() !== lname.toUpperCase())) {
                if ((username.toLowerCase() !== username.toUpperCase()) && username.length >= 6) {
                    if (password.length >= 6) {
                        if ((designation.toLowerCase() !== designation.toUpperCase())) {
                            if ((branch.toLowerCase() !== branch.toUpperCase())) {
                                if ((college.toLowerCase() !== college.toUpperCase())) {
                                    postAdmin();
                                } else {
                                    setOpen(true);
                                    setResult('error');
                                    setMsg('College should be a string.');
                                }
                            } else {
                                setOpen(true);
                                setResult('error');
                                setMsg('Branch should be a string.');
                            }
                        } else {
                            setOpen(true);
                            setResult('error');
                            setMsg('Designation should be a string.');
                        }
                    } else {
                        setOpen(true);
                        setResult('error');
                        setMsg('Password must be at least 6 characters.');
                    }
                } else {
                    setOpen(true);
                    setResult('error');
                    setMsg('Username must be a string and at least 6 characters.');
                }
            } else {
                setOpen(true);
                setResult('error');
                setMsg('Last name should be a string.');
            }
        } else {
            setOpen(true);
            setResult('error');
            setMsg('First name should be a string.');
        }

        async function postAdmin() {
            try {
                const response = await axios.post(`${BACKEND_ENDPOINT}/postadmins`, {
                    fname: fname,
                    lname: lname,
                    username: username,
                    password: password,
                    role: (role === "") ? 'admin' : role,
                    designation: designation,
                    branch: branch,
                    college: college
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
                console.log(response.data);
                if (response.data.status === 200) {
                    setOpen(true);
                    setResult('success');
                    setMsg('Admin registered successfully.');
                } else {
                    setOpen(true);
                    setResult('error');
                    setMsg(response.data.msg);
                }
            } catch (e) {
                console.log(e);
            }

            setfname('');
            setlname('');
            setusername('');
            setpassword('');
            setrole('');
            setdesignation('');
            setbranch('');
            setcollege('');
        }
    }

    return (
        <>
            <Popup state={open} handleClose={handleClose} event={result} text={msg} />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-400 p-4 sm:p-6">
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="bg-blue-600 py-6 px-8 text-white">
                        <h1 className="text-[2rem] font-bold">Add Admins</h1>
                        <p className="text-blue-100 text-lg mt-1">Add new admins to the system.</p>
                    </div>
                    <div className="p-8">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fname" className="block text-xl font-medium text-gray-700">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fname"
                                        placeholder="Enter first name"
                                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={fname}
                                        onChange={(e) => setfname(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lname" className="block text-xl font-medium text-gray-700">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lname"
                                        placeholder="Enter last name"
                                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={lname}
                                        onChange={(e) => setlname(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                
                                <div>
                                    <label htmlFor="fname" className="block text-xl font-medium text-gray-700">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter username"
                                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={username}
                                        onChange={(e) => setusername(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="fname" className="block text-xl font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fname" className="block text-xl font-medium text-gray-700">
                                        Role
                                    </label>
                                    <select
                                        name="role"
                                        id="role"
                                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={role}
                                        onChange={(e) => setrole(e.target.value)}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="superadmin">Super Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="fname" className="block text-xl font-medium text-gray-700">
                                        Designation
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter designation"
                                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={designation}
                                        onChange={(e) => setdesignation(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">                              
                                <div>
                                    <label htmlFor="fname" className="block text-xl font-medium text-gray-700">
                                        Branch
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter branch"
                                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={branch}
                                        onChange={(e) => setbranch(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="fname" className="block text-xl font-medium text-gray-700">
                                        College
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter college"
                                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={college}
                                        onChange={(e) => setcollege(e.target.value)}
                                        />
                                </div>
                            </div>
                            <button
                                className="w-full flex justify-center items-center gap-1 py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 transition-all duration-300 ease-in-out transform hover:bg-blue-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                type="submit"
                            >
                                Register Admin
                                <AddIcon fontSize="medium" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}