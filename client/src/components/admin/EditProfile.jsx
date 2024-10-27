import { useRecoilState, useRecoilValue } from 'recoil'
import { accessAtom } from '../../atoms/accessAtom'
import Unauthorized from '../../ui/Unauthorized'
import React from 'react'
 import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { newPasswordAtom, newUsernameAtom } from '../../atoms/editProfile'
import { eventAtom, textAtom } from '../../atoms/adminRegisterAtoms'
import Popup from '../../ui/Alert'
const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT
const EditProfile = () => {
    const auth = useRecoilValue(accessAtom) 
    return (
      <div className="bg-gradient-to-br from-slate-100 to-slate-400 min-h-screen text-white">
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
        const response = await axios.patch(`${BACKEND_ENDPOINT}/editprofile/${admin_id}`, {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-400 flex items-center justify-center p-4 ">
      <Popup state={open} handleClose={handleClose} event={result} text={msg} />
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md">
        <div className="bg-blue-600 py-6 px-8 text-white">
          <h1 className="text-[2rem] font-bold">Edit Profile</h1>
          <p className='text-blue-100 text-base'>Leave the field empty for the details you dont wanna update.</p>
        </div>
        <div className="p-8">
          <form onSubmit={updateDetails} className="space-y-6 text-gray-700">
            <div>
              <label htmlFor="username" className="block text-lg font-medium text-gray-700">New Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter new username"
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">New Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter new password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
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
    </div>
  )
}

export default EditProfile