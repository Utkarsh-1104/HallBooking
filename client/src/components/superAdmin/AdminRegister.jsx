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
                    setMsg('Username must be at least 6 characters.');
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
                });
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
        <div className="text-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="h-fit w-full flex flex-col items-center ">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl">Add Admins.</h1>
                    <p className="text-xl font-[100] pt-2 text-center">Add new admins to the system.</p>
                    <Popup state={open} handleClose={handleClose} event={result} text={msg} />
                    <form className="flex flex-col items-center w-full" action="" method="">
                        <div className="flex flex-col sm:flex-row sm:gap-6 mt-8 w-full">
                            <input type="text" placeholder="First Name" className="w-full sm:w-1/2 h-12 ps-3 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none " value={fname} onChange={(e) => (setfname(e.target.value))} />
                            <input type="text" placeholder="Last Name" className="w-full sm:w-1/2 h-12 mt-4 sm:mt-0 ps-3 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none " value={lname} onChange={(e) => (setlname(e.target.value))} />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:gap-6 mt-6 w-full">
                            <input type="text" placeholder="Username" className="w-full sm:w-1/2 h-12 ps-3 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none " value={username} onChange={(e) => (setusername(e.target.value))} />
                            <input type="password" name="adminPass" placeholder="Password" id="adminPass" className="w-full sm:w-1/2 h-12 mt-4 sm:mt-0 ps-3 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none" value={password} onChange={(e) => (setpassword(e.target.value))} />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:gap-6 mt-6 w-full">
                            <select name="role" id="role" className="w-full sm:w-1/2 h-12 ps-3 mb-4 sm:mb-0 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none " value={role} onChange={(e) => (setrole(e.target.value))}>
                                <option value="admin">Admin</option>
                                <option value="superadmin">Super Admin</option>
                            </select>
                            <input type="text" placeholder="Designation" className="w-full sm:w-1/2 h-12 ps-3 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none " value={designation} onChange={(e) => (setdesignation(e.target.value))} />
                        </div>
                        <button className="w-full sm:w-96 h-16 mt-10 text-2xl text-white bg-black border border-white rounded hover:bg-white hover:text-black focus:outline-none " type="submit" onClick={handleSubmit}>Register Admin</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminRegister;
