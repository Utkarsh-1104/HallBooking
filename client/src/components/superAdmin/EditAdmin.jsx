import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { branchAtom, collegeAtom, designationAtom, eventAtom, fnameAtom, lnameAtom, passwordAtom, roleAtom, textAtom, usernameAtom } from "../../atoms/adminRegisterAtoms.js";
import axios from 'axios';
import Popup from '../../ui/Alert.jsx';
import { useSearchParams } from "react-router-dom";
import { superAdminAccessAtom } from "../../atoms/accessAtom.js";
import Unauthorized from "../../ui/Unauthorized.jsx";

const EditAdminsPage = () => {
    const access = useRecoilValue(superAdminAccessAtom);

    return (
        <div className="bg-gradient-to-br from-slate-100 to-slate-400 text-gray-800">
            {(access.msg === 'Authorized') ? <EditAdmin /> : <Unauthorized />}
        </div>
    );
}

const EditAdmin = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const [fname, setfname] = useRecoilState(fnameAtom);
    const [lname, setlname] = useRecoilState(lnameAtom);
    const [username, setusername] = useRecoilState(usernameAtom);
    const [password, setpassword] = useRecoilState(passwordAtom);
    const [role, setrole] = useRecoilState(roleAtom);
    const [designation, setdesignation] = useRecoilState(designationAtom);
    const [branch, setbranch] = useRecoilState(branchAtom);
    const [college, setcollege] = useRecoilState(collegeAtom);
    const [admin, setAdmin] = React.useState({});

    useEffect(() => {
        async function singleAdmin() {
            try {
                const res = await axios.get(`https://lncthalls-server.onrender.com/getadmins/${id}`,
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

        if (fname === "" || (fname.toLowerCase() !== fname.toUpperCase())) {
            if (lname === "" || (lname.toLowerCase() !== lname.toUpperCase())) {
                if (username === "" || ((username.toLowerCase() !== username.toUpperCase()) && username.length >= 6)) {
                    if (password === "" || password.length >= 6) {
                        if (designation === "" || (designation.toLowerCase() !== designation.toUpperCase())) {
                            if (college === "" || (college.toLowerCase() !== college.toUpperCase())) {
                                editAdmin(id);
                            } else {
                                setOpen(true);
                                setResult('error');
                                setMsg('New college should be a string.');
                            }
                        } else {
                            setOpen(true);
                            setResult('error');
                            setMsg('New designation should be a string.');
                        }
                    } else {
                        setOpen(true);
                        setResult('error');
                        setMsg('New password must be at least 6 characters.');
                    }
                } else {
                    setOpen(true);
                    setResult('error');
                    setMsg('New username must be at least 6 characters.');
                }
            } else {
                setOpen(true);
                setResult('error');
                setMsg('New last name should be a string.');
            }
        } else {
            setOpen(true);
            setResult('error');
            setMsg('New first name should be a string.');
        }

        async function editAdmin(id) {
            try {
                const response = await axios.patch(`https://lncthalls-server.onrender.com/updateadmins/${id}`, {
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
                });
                if (response.data.status === 200) {
                    setOpen(true);
                    setResult('success');
                    setMsg('Admin updated successfully.');
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
                        <h1 className="text-[2rem] font-bold">Edit Admin</h1>
                        <p className="text-blue-100 text-lg mt-1">Leave the field empty for the details you dont wanna update.</p>
                    </div>
                    <div className="p-8">
                        <form className="space-y-6" onSubmit={handleSubmit} >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fname" className="block text-xl font-medium text-gray-700">
                                        First Name
                                    </label>
                                    <input type="text" placeholder={admin.fname} className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" value={fname} onChange={(e) => (setfname(e.target.value))} />
                                </div>
                                <div>
                                    <label htmlFor="fname" className="block text-xl font-medium text-gray-700">
                                        Last Name
                                    </label>
                                    <input type="text" placeholder={admin.lname} className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" value={lname} onChange={(e) => (setlname(e.target.value))} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fname" className="block text-xl font-medium text-gray-700">
                                        Username
                                    </label>
                                    <input type="text" placeholder={admin.username} className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" value={username} onChange={(e) => (setusername(e.target.value))} />
                                </div>
                                <div>
                                    <label htmlFor="adminPass" className="block text-xl font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input type="password" name="adminPass" placeholder="Enter password" id="adminPass" className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" value={password} onChange={(e) => (setpassword(e.target.value))} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fname" className="block text-xl font-medium text-gray-700">
                                        Role
                                    </label>
                                    <select name="role" id="role" className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" value={role} onChange={(e) => (setrole(e.target.value))}>
                                        <option value="admin">Admin</option>
                                        <option value="superadmin">Super Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="fname" className="block text-xl font-medium text-gray-700">
                                        Designation
                                    </label>
                                    <input type="text" placeholder={admin.designation} className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" value={designation} onChange={(e) => (setdesignation(e.target.value))} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">                              
                                <div>
                                    <label htmlFor="fname" className="block text-xl font-medium text-gray-700">
                                        Branch
                                    </label>
                                    <input
                                        type="text"
                                        placeholder={admin.branch}
                                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                                        placeholder={admin.college}
                                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={college}
                                        onChange={(e) => setcollege(e.target.value)}
                                        />
                                </div>
                            </div>
                            <button 
                                className="w-full flex justify-center items-center gap-1 py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 transition-all duration-300 ease-in-out transform hover:bg-blue-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" 
                                type="submit" 
                                onClick={handleSubmit}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Update Admin
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditAdminsPage;
