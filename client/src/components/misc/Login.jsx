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
    <div className="bg-black min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg bg-[#1c1c1c] rounded-lg p-6 flex flex-col items-center">
        <h1 className="text-3xl text-white ">Login</h1>
        <p className="text-xl font-light text-blue-100 text-center pt-2">Welcome <span className="underline underline-offset-4">user</span>, please login to continue.</p>
        <Popup state={open} handleClose={handleClose} event={status} text={msg} />
        <form className="w-full flex flex-col items-center mt-6 text-white" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="w-full h-12 px-3 mt-4 mb-4 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="superPass"
            placeholder="Password"
            id="superPass"
            className="w-full h-12 px-3 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full h-16 mt-6 text-2xl text-white bg-black border border-white rounded hover:bg-white hover:text-black focus:outline-none"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
