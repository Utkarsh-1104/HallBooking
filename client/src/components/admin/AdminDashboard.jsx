import { useRecoilValue } from "recoil"
import BookHall from "../hall/BookHall"
import { adminAccessAtom } from "../../atoms/accessAtom"
import { useNavigate } from "react-router-dom"
// import { useEffect, useState } from "react"
// import axios from "axios"

const AdminDashboard = () => {
  // const [auth, setAuth] = useState({})

  // useEffect(() => {
  //   async function checkAuth() {
  //     try {
  //       const access = await axios.get('http://localhost:3000/admindashboard', {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`
  //         }
  //       })
  //       setAuth(access.data)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   checkAuth()
  // })

  const auth = useRecoilValue(adminAccessAtom) 
  console.log(auth);
  
  return (
    <div className="bg-black h-screen font-[Roboto] flex flex-col items-center justify-center ">
      {(auth.msg === "Authorized") ? <Dashboard /> : <h1 className="text-white text-xl " >Unauthorized user. Login to continue.</h1>}
    </div>
  )
}

function Dashboard() {
  const navigate = useNavigate()
  return (
    <div>
      <h1 className="text-white text-center font-[Poppins] ">Admin Page</h1>
      <BookHall />
      <button className="w-32 h-10 bg-slate-500 text-white rounded-md " onClick={ async () => {
        localStorage.removeItem('token')
        navigate("/login")
        window.location.reload()
      }} >Logout</button>
    </div>
  )
}

export default AdminDashboard