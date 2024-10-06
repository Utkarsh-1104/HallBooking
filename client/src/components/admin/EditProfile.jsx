import { useRecoilState, useRecoilValue } from 'recoil'
import { adminAccessAtom } from '../../atoms/accessAtom'
import Unauthorized from '../../ui/Unauthorized'
import React from 'react'
 import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { newPasswordAtom, newUsernameAtom } from '../../atoms/editProfile'
import { eventAtom, textAtom } from '../../atoms/adminRegisterAtoms'
import Popup from '../../ui/Alert'

const EditProfile = () => {
    const auth = useRecoilValue(adminAccessAtom) 
  
    return (
      <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 min-h-screen font-[Roboto] text-white">
        {(auth.msg === "Authorized") ? <EditDetails /> : <Unauthorized /> }
      </div>
    )
}

function EditDetails() {

  const [newUsername, setNewUsername] = useRecoilState(newUsernameAtom)
  const [newPassword, setNewPassword] = useRecoilState(newPasswordAtom)
  const [searchParams] = useSearchParams()
  const admin_id = searchParams.get('id')

  const [result, setResult] = useRecoilState(eventAtom);
  const [msg, setMsg] = useRecoilState(textAtom);

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }
      setOpen(false);
  };

  async function updateDetails(e) {
    e.preventDefault()

    if (newUsername === "" || ((newUsername.toLowerCase() !== newUsername.toUpperCase()) && newUsername.length >= 6)) {
      if (newPassword === "" || newPassword.length >= 6) {
        editProfile();
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


    async function editProfile() {
      try {
        const response = await axios.patch(`https://lncthalls-server.onrender.com/editprofile/${admin_id}`, {
          newUsername: newUsername,
          newPassword: newPassword
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setOpen(true);
        setResult('success');
        setMsg(response.data.msg);
      } catch (error) {
        console.error(error)
      }
    }
  }


  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center p-4 font-[Roboto] ">
        <Popup state={open} handleClose={handleClose} event={result} text={msg} />
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-md p-8">
          <h1 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-md">Edit Profile</h1>
          <form onSubmit={updateDetails} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-blue-100 text-xl font-medium mb-2">New Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-4 py-3 rounded-full bg-white bg-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                placeholder="Enter new username"
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-blue-100 text-xl font-medium mb-2">New Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-3 rounded-full bg-white bg-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                placeholder="Enter new password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white py-3 px-6 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 shadow-lg flex items-center justify-center space-x-2"
              onClick={updateDetails}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Update Details</span>
            </button>
          </form>
        </div>
      </div>
  )
}

export default EditProfile