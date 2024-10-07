import React from "react";
import { useRecoilState } from "recoil";
import { designationAtom, eventAtom, fnameAtom, lnameAtom, passwordAtom, roleAtom, textAtom, usernameAtom } from "../../atoms/adminRegisterAtoms";
import axios from 'axios';
import Popup from '../../ui/Alert.jsx';

const AdminRegister = () => {
    const [fname, setfname] = useRecoilState(fnameAtom);
    const [lname, setlname] = useRecoilState(lnameAtom);
    const [username, setusername] = useRecoilState(usernameAtom);
    const [password, setpassword] = useRecoilState(passwordAtom);
    const [role, setrole] = useRecoilState(roleAtom);
    const [designation, setdesignation] = useRecoilState(designationAtom);

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
                        postAdmin();
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
                const response = await axios.post('http://localhost:3000/postadmins', {
                    fname: fname,
                    lname: lname,
                    username: username,
                    password: password,
                    role: (role === "") ? 'admin' : role,
                    designation: designation
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
        }
    }

    return (
        <>
            <Popup state={open} handleClose={handleClose} event={result} text={msg} />
            <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-lg">
                    <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-2xl">
                        <h1 className="text-3xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                            Add Admins
                        </h1>
                        <p className="text-lg text-blue-100 text-center mb-6">
                            Add new admins to the system
                        </p>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fname" className="block text-xl font-medium text-gray-300 mb-1">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fname"
                                        placeholder="Enter first name"
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        value={fname}
                                        onChange={(e) => setfname(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lname" className="block text-xl font-medium text-gray-300 mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lname"
                                        placeholder="Enter last name"
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        value={lname}
                                        onChange={(e) => setlname(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                
                                <div>
                                    <label htmlFor="fname" className="block text-xl font-medium text-gray-300 mb-1">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter username"
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        value={username}
                                        onChange={(e) => setusername(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="fname" className="block text-xl font-medium text-gray-300 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fname" className="block text-xl font-medium text-gray-300 mb-1">
                                        Role
                                    </label>
                                    <select
                                        name="role"
                                        id="role"
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        value={role}
                                        onChange={(e) => setrole(e.target.value)}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="superadmin">Super Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="fname" className="block text-xl font-medium text-gray-300 mb-1">
                                        Designation
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter designation"
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        value={designation}
                                        onChange={(e) => setdesignation(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button
                                className="w-full text-lg px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:from-purple-600 hover:to-pink-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                                type="submit"
                            >
                                Register Admin
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminRegister;