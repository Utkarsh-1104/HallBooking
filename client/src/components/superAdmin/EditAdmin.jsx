import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { designationAtom, eventAtom, fnameAtom, lnameAtom, passwordAtom, roleAtom, textAtom, usernameAtom } from "../../atoms/adminRegisterAtoms.js";
import axios from 'axios';
import Popup from '../../ui/Alert.jsx';
import { useSearchParams } from "react-router-dom";
import { superAdminAccessAtom } from "../../atoms/accessAtom.js";
import Unauthorized from "../../ui/Unauthorized.jsx";

const EditAdminsPage = () => {
    const access = useRecoilValue(superAdminAccessAtom);

    return (
        <div>
            {(access.msg === 'Authorized') ? <EditAdmin /> : <Unauthorized />}
        </div>
    );
}

const EditAdmin = () => {
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

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    async function handleSubmit(e) {
        e.preventDefault();

        if (fname === "" || (fname.toLowerCase() !== fname.toUpperCase())) {
            if (lname === "" || (lname.toLowerCase() !== lname.toUpperCase())) {
                if (username === "" || ((username.toLowerCase() !== username.toUpperCase()) && username.length >= 6)) {
                    if (password === "" || password.length >= 6) {
                        editAdmin(id);
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
                const response = await axios.patch(`http://localhost:3000/updateadmins/${id}`, {
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
                });
                console.log(response.data);
                if (response.data.status === 200) {
                    setOpen(true);
                    setResult('success');
                    setMsg('Admin updated successfully.');
                } else {
                    setOpen(true);
                    setResult('error');
                    setMsg(response.data.msg);
                }
                console.log(fname, lname, username, password, role, designation);
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
        <div className="bg-black flex items-center justify-center text-white px-4 sm:px-6 lg:px-8 h-full py-10 min-h-screen">
            <div className="w-full max-w-lg mx-auto bg-[#1C1C1C] py-6 px-4 sm:px-6 lg:px-10 rounded-lg">
                <div className="h-fit w-full flex flex-col items-center">
                    <h1 className="text-[1.65rem] md:text-2xl lg:text-3xl text-center">Edit Admin</h1>
                    <p className="text-base md:text-lg lg:text-xl font-[100] pt-2 text-center text-blue-100">Edit existing admin in the system.</p>
                    <Popup state={open} handleClose={handleClose} event={result} text={msg} />
                    <form className="flex flex-col items-center w-full" action="" method="">
                        <div className="flex flex-col sm:flex-row sm:gap-4 md:gap-6 mt-8 w-full">
                            <input type="text" placeholder="First Name" className="w-full sm:w-1/2 h-12 ps-3 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none " value={fname} onChange={(e) => (setfname(e.target.value))} />
                            <input type="text" placeholder="Last Name" className="w-full sm:w-1/2 h-12 mt-4 sm:mt-0 ps-3 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none " value={lname} onChange={(e) => (setlname(e.target.value))} />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:gap-4 md:gap-6 mt-6 w-full">
                            <input type="text" placeholder="Username" className="w-full sm:w-1/2 h-12 ps-3 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none " value={username} onChange={(e) => (setusername(e.target.value))} />
                            <input type="password" name="adminPass" placeholder="Password" id="adminPass" className="w-full sm:w-1/2 h-12 mt-4 sm:mt-0 ps-3 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none" value={password} onChange={(e) => (setpassword(e.target.value))} />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:gap-4 md:gap-6 mt-6 w-full">
                            <select name="role" id="role" className="w-full sm:w-1/2 h-12 ps-3 mb-4 sm:mb-0 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none " value={role} onChange={(e) => (setrole(e.target.value))}>
                                <option value="admin">Admin</option>
                                <option value="superadmin">Super Admin</option>
                            </select>
                            <input type="text" placeholder="Designation" className="w-full sm:w-1/2 h-12 ps-3 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none " value={designation} onChange={(e) => (setdesignation(e.target.value))} />
                        </div>
                        <button className="w-full sm:w-96 h-12 sm:h-14 lg:h-16 mt-10 text-lg sm:text-xl lg:text-2xl text-white bg-black border border-white rounded hover:bg-white hover:text-black focus:outline-none transition-colors duration-300" type="submit" onClick={handleSubmit}>Update Admin</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditAdminsPage;
