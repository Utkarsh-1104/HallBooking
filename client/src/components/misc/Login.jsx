import { useRecoilState } from "recoil";
import { loginMsgAtom, loginStatusAtom, passwordAtom, usernameAtom } from "../../atoms/loginAtom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React from "react";
import Popup from "../../ui/Alert";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useRecoilState(usernameAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [status, setStatus] = useRecoilState(loginStatusAtom);
  const [msg, setMsg] = useRecoilState(loginMsgAtom);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/loginadmin", {
      username,
      password
    });

    if (response.data.status === 200) {
      setOpen(true);
      setStatus('success');
      setMsg(response.data.msg);
      localStorage.setItem('token', response.data.token);
      const page = response.data.role === 'superadmin' ? 'superadminpage' : 'adminpage';
      navigate(`/${page}?id=${response.data.id}&role=${response.data.role}`);
      setUsername('');
      setPassword('');
    } else {
      setOpen(true);
      setStatus('error');
      setMsg(response.data.msg);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-400 p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 py-6 px-8 text-white">
          <h1 className="text-[2rem] font-bold">Welcome</h1>
          <p className="text-blue-100 text-lg mt-1">Please login to access your account</p>
        </div>
        <div className="p-8">
          <Popup state={open} handleClose={handleClose} event={status} text={msg} />
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-lg font-medium text-gray-700">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="superPass" className="block text-lg font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="superPass"
                id="superPass"
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;