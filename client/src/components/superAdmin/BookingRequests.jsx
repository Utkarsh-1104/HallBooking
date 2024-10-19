/* eslint-disable react/prop-types */
import { useRecoilState, useRecoilValue } from 'recoil'
import {bookingRequests} from '../../atoms/getBookingReqsAtom'
import axios from 'axios'
import Popup from '../../ui/Alert'
import { useState } from 'react'
import { eventAtom, textAtom } from '../../atoms/adminRegisterAtoms'
import { superAdminAccessAtom } from '../../atoms/accessAtom'
import Unauthorized from '../../ui/Unauthorized'

export default function BookingRequests() {
  const access = useRecoilValue(superAdminAccessAtom);
  const name = access.fname + ' ' + access.lname;
  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-400 min-h-screen text-gray-800">
      {(access.msg === 'Authorized') ? <BookingRequestsPage name={name} /> : <Unauthorized />}
    </div>
  );
}


function BookingRequestsPage(props) {
  const handleApprove = async (hall_name, id) => {
    try {
      const response = await axios.put(`http://localhost:3000/approvebooking`,
        {
          hall_name: hall_name,
          reqId: id,
          superadmin_name: props.name
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
          reqId: id,
          superadmin_name: props.name
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

  function convertDateFormat(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }

  function convertTimeFormat(timeString) {
    let [hours, minutes] = timeString.split(':');  
    hours = parseInt(hours, 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  return (
    <div className="px-8 py-12 ">
      <Popup state={open} handleClose={handleClose} event={result} text={msg} />
      <h1 className="text-4xl font-bold text-center mb-10">Booking Requests</h1>
      {bookingReqs.length === 0 && <h1 className="text-2xl font-semibold text-center text-gray-600">No booking requests found.</h1>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookingReqs.map((booking) => (
          <div key={booking._id} className="bg-white rounded-lg max-h-fit shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
            <div className="bg-blue-600 p-4">
              <h2 className="text-2xl font-bold text-white">{booking.hall_name}</h2>
              <p className="text-lg text-white opacity-85">Requested by: {booking.booked_by}</p>
            </div>
            <div className="p-6 flex flex-col justify-stretch gap-6">
              <div className='flex flex-col gap-4' >
                <div>
                    <p className="text-xl font-bold text-gray-700">Date: <span className='font-medium'>{convertDateFormat(booking.date_from)} to {convertDateFormat(booking.date_to)}</span></p>
                </div>
                <div>
                    <p className="text-xl font-bold text-gray-700">Time: <span className='font-medium'>{convertTimeFormat(booking.time_from)} - {convertTimeFormat(booking.time_to)}</span></p>
                </div>
                <div>
                    <p className="text-xl font-bold text-gray-700">Event: <span className='font-medium'>{booking.event_name}</span></p>
                </div>
                <div>
                    <p className="text-xl font-bold text-gray-700">Participants: <span className='font-medium'>{booking.number_of_attendees} people</span></p>
                </div>
                { booking.hall_building !== "undefined" && (<div>
                    <p className="text-xl font-bold text-gray-700">Builidng: <span className='font-medium'>{booking.hall_building}</span></p>
                </div>)}
                { booking.hall_college !== "undefined" && (<div>
                    <p className="text-xl font-bold text-gray-700">College: <span className='font-medium'>{booking.hall_college}</span></p>
                </div>)}
              </div>
              <div>
                <button
                    onClick={() => handleApprove(booking.hall_name, booking._id)}
                    className="w-full bg-blue-600 mb-4 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105"
                    >
                    Approve Booking
                </button>
                <button
                    onClick={() => handleDelete(booking.hall_name, booking._id)}
                    className="w-full bg-[#e14733] hover:bg-[#b03d2e] text-white font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105"
                    >
                    Delete Request
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}