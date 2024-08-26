import { useRecoilState } from "recoil"
import { loginMsgAtom, loginStatusAtom, passwordAtom, usernameAtom } from "../../atoms/loginAtom"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import React from "react"
import Popup from "../../ui/Alert"

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useRecoilState(usernameAtom)
  const [password, setPassword] = useRecoilState(passwordAtom)

  const [status,  setStatus] = useRecoilState(loginStatusAtom)
  const [msg, setMsg] = useRecoilState(loginMsgAtom)

  const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

  async function handleSubmit(e) {
    e.preventDefault()
    const response = await axios.post("http://localhost:3000/loginadmin", {
      username,
      password
    })

    if (response.data.status === 200) {
      setOpen(true)
      setStatus('success')
      setMsg(response.data.msg)
      const page = response.data.role === 'superadmin' ? 'superadminpage' : 'adminpage'
      navigate(`/${page}?id=${response.data.id}&fname=${response.data.fname}&lname=${response.data.lname}&designation=${response.data.designation}&role=${response.data.role}`)
      setUsername('')
      setPassword('')
    } else {
      setOpen(true)
      setStatus('error')
      setMsg(response.data.msg)
    }
  }

  return (
    <div className='bg-black h-screen text-white flex items-center justify-center'>
      <div className="h-fit w-fit flex flex-col items-center ">
        <h1 className="text-3xl ">Login</h1>
        <p className="text-xl font-[100] pt-2 ">Welcome <span className="underline underline-offset-4">user</span>, please login to continue. </p>
        <Popup state={open} handleClose={handleClose} event={status} text={msg} />
        <form className="flex flex-col items-center" action="" method="">
          <input type="text" placeholder="Username" className="w-96 h-12 ps-3 mt-8 mb-4 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none " value={username} onChange={(e) => (setUsername(e.target.value))} />
          <input type="password" name="superPass" placeholder="Password" id="superPass" className="w-96 h-12 ps-3 bg-[#363636] border-2 rounded-md focus:border-orange-600 focus:outline-none" value={password} onChange={(e) => (setPassword(e.target.value))} />
          <button className="w-96 h-16 mt-10 text-2xl text-white bg-black border border-white rounded hover:bg-white hover:text-black focus:outline-none " type="submit" onClick={handleSubmit} >Login</button>
        </form>
      </div>
    </div> 
  )
}

export default Login