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
        <div className="bg-black min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg bg-[#1c1c1c] rounded-lg p-6 flex flex-col items-center">
          <h1 className="text-3xl text-white ">Add Halls.</h1>
          <p className="text-xl font-light text-blue-100 text-center pt-2">Add new halls to the system.</p>
          <Popup state={open} handleClose={handleClose} event={result} text={msg} />
          <form className="w-full flex flex-col items-center mt-6 text-white" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Hall Name"
              className="w-full h-12 px-3 mt-4 mb-4 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none"
              value={username}
              
            />
            <input
              type="number"
              placeholder="Hall Capacity"
              id="superPass"
              className="w-full h-12 px-3 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none"
              value={password}
       
            />
            <button
              className="w-full h-16 mt-6 text-2xl text-white bg-black border border-white rounded hover:bg-white hover:text-black focus:outline-none"
              type="submit"
            >
              Add Hall
            </button>
          </form>
        </div>
      </div>
    );
}

export default AdminRegister;
