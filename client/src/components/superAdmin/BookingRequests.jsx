import { useRecoilState, useRecoilValue } from 'recoil'
import {bookingRequests} from '../../atoms/getBookingReqsAtom'
import axios from 'axios'
import Popup from '../../ui/Alert'
import { useState } from 'react'
import { eventAtom, textAtom } from '../../atoms/adminRegisterAtoms'


export default function BookingRequests() {
  const handleApprove = async (hall_name, id) => {
    try {
      const response = await axios.put(`http://localhost:3000/approvebooking`,
        {
          hall_name: hall_name,
          reqId: id
        }, 
        {
          headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      if (response.data.status === 200) {
        setOpen(true)
        setResult('success')
        setMsg('Booking request approved.')
        setTimeout(() => {
          window.location.reload()
        }, 1500);
      } else {
        setOpen(true)
        setResult('error')
        setMsg(response.data.msg)
      }

    } catch (error) {
      setOpen(true)
      setResult('error')
      setMsg("An error occured. Please try again.")
    }
  }

  const handleDelete = async (hall_name, id) => {
    try {
      const response = await axios.put(`http://localhost:3000/deletebookingreq`,
        {
          hall_name: hall_name,
          reqId: id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      if (response.data.status === 200) {
        setOpen(true)
        setResult('success')
        setMsg('Booking request deleted.')

        setTimeout(() => {
          window.location.reload()
        }, 1500);

      } else {
        setOpen(true)
        setResult('error')
        setMsg(response.data.msg)
      }
    } catch (error) {
      setOpen(true)
      setResult('error')
      setMsg("An error occured. Please try again.")
    }
  }

  const bookingReqs = useRecoilValue(bookingRequests) 

  const [result, setResult] = useRecoilState(eventAtom);
  const [msg, setMsg] = useRecoilState(textAtom);

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <div className="min-h-screen font-[Roboto] bg-gradient-to-br from-purple-100 to-pink-100 p-8">
      <Popup state={open} handleClose={handleClose} event={result} text={msg} />
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">Booking Requests</h1>
      {bookingReqs.length === 0 && <h1 className="text-2xl font-semibold text-center text-gray-600">No booking requests found.</h1>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookingReqs.map((booking) => (
          <div key={booking._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
              <h2 className="text-2xl font-semibold text-white">{booking.hall_name}</h2>
              <p className="text-lg text-white opacity-75">Requested by: {booking.booked_by}</p>
            </div>
            <div className="p-6">
                <div className="mb-4">
                    <p className="text-lg text-gray-600">Date: <span className='font-medium'>{booking.date_from} to {booking.date_to}</span></p>
                    <p className="font-medium"></p>
                </div>
                <div className="mb-4">
                    <p className="text-lg text-gray-600">Time: <span className='font-medium'>{booking.time_from} - {booking.time_to}</span></p>
                    <p className="font-medium"></p>
                </div>
                <div className="mb-4">
                    <p className="text-lg text-gray-600">Event: <span className='font-medium'>{booking.event_name}</span></p>
                    <p className="font-medium"></p>
                </div>
                <div className="mb-6">
                    <p className="text-lg text-gray-600">Participants: <span className='font-medium'>{booking.number_of_attendees} people</span></p>
                    <p className="font-medium"></p>
                </div>
                <div className="mb-6">
                    <p className="text-lg text-gray-600">Builidng name: <span className='font-medium'>Lakshmi Narain Block</span></p>
                    <p className="font-medium"></p>
                </div>
                <div className="mb-6">
                    <p className="text-lg text-gray-600">College: <span className='font-medium'>LNCT</span></p>
                    <p className="font-medium"></p>
                </div>
                <button
                    onClick={() => handleApprove(booking.hall_name, booking._id)}
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 mb-4 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
                    >
                    Approve Booking
                </button>
                <button
                    onClick={() => handleDelete(booking.hall_name, booking._id)}
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
                    >
                    Delete Request
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}