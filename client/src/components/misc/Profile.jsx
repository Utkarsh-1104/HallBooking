import { useRecoilValue } from 'recoil'
import { adminAccessAtom } from '../../atoms/accessAtom'
import Unauthorized from '../../ui/Unauthorized'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Profile = () => {
    const auth = useRecoilValue(adminAccessAtom) 
  
    return (
      <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 min-h-screen font-[Roboto] text-white">
        {(auth.msg === "Authorized") ? <MyProfile /> : <Unauthorized /> }
      </div>
    )
}

function MyProfile() {
  const [searchParams] = useSearchParams()
  const admin_id = searchParams.get('id')
  const [admin, setAdmin] = useState({})

  useEffect(() => {
    async function getProfile() {

      const response = await axios.get(`http://localhost:3000/getprofile/${admin_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setAdmin(response.data.admin)
    }
    getProfile()
  }, [admin_id])
  const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center p-4">
          <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-md p-8">
            <h1 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-md">My Profile</h1>
            <div className="text-center mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                JD
              </div>
              <h2 className="text-3xl font-semibold text-white mt-4 drop-shadow-md">{`${admin.fname} ${admin.lname}`}</h2>
              <p className="text-xl text-blue-100">{admin.designation}</p>
            </div>
            <div className="space-y-6">
              <button className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white py-3 px-6 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 shadow-lg flex items-center justify-center space-x-2" onClick={() => {navigate(`/editprofile/?id=${admin._id}`)}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit Profile</span>
              </button>
              <button className="w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white py-3 px-6 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50 shadow-lg flex items-center justify-center space-x-2"
              onClick={() => {navigate(`/mybookings/?id=${admin._id}`)}}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>My Bookings</span>
              </button>
              <button className="w-full bg-gradient-to-r from-red-400 to-yellow-500 hover:from-red-500 hover:to-yellow-600 text-white py-3 px-6 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50 shadow-lg flex items-center justify-center space-x-2"
                onClick={ async () => {
                  localStorage.removeItem('token')
                  navigate("/login")
                  window.location.reload()
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )
}


export default Profile