/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useRecoilState, useRecoilValue } from 'recoil'
import { adminAccessAtom } from '../../atoms/accessAtom'
import Unauthorized from '../../ui/Unauthorized'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { eventAtom, textAtom } from '../../atoms/adminRegisterAtoms'
import Popup from '../../ui/Alert'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { pink } from '@mui/material/colors';

const MyBookings = () => {
    const auth = useRecoilValue(adminAccessAtom) 
  
    return (
      <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 min-h-screen font-[Roboto] text-white">
        {(auth.msg === "Authorized") ? <MyBookingsPage /> : <Unauthorized /> }
      </div>
    )
}

function MyBookingsPage() {
    const [searchParams] = useSearchParams()
    const admin_id = searchParams.get('id')

    const [bookings, setBookings] = useState([])

    const [result, setResult] = useRecoilState(eventAtom);
    const [msg, setMsg] = useRecoilState(textAtom);

    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        async function getBookings() {
            const response = await axios.get(`https://lncthalls-server.onrender.com/getbookedhalls/${admin_id}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setBookings(response.data.hallsBookedByAdmin)
        }
        getBookings()
        console.log(bookings);
    }, [admin_id])

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 font-[Roboto] p-4 sm:p-6 md:p-8">
          <Popup state={open} handleClose={handleClose} event={result} text={msg} />
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-md">My Bookings</h1>
            
            {bookings.length === 0 ? (
              <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center">
                <p className="text-xl text-white">You don't have any bookings yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.booking_id} className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-6 transition duration-300 ease-in-out transform hover:scale-105">
                    <div className="flex flex-col space-y-4">
                      <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-semibold text-white">{booking.hall_name}</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-blue-100">
                        <div>
                          <h2 className='text-xl' >Event Name: {booking.hall_bookings.event_name}</h2>
                          <p><span className="font-medium">Date From:</span> {booking.hall_bookings.date_from} Date To: {booking.hall_bookings.date_to}</p>
                          <p><span className="font-medium">Time From:</span> {booking.hall_bookings.time_from} Time To: {booking.hall_bookings.time_to}</p>
                          <p>hall id : {booking.hall_id} </p>
                          <p>Booking id: {booking.hall_bookings.booking_id} </p>
                        </div>
                        <div className="flex sm:justify-end items-center space-x-2">
                          <button 
                            onClick={deleteBooking.bind(this, booking.hall_id, booking.hall_bookings.booking_id, setOpen, setResult, setMsg)}
                            className="px-4 py-2 bg-violet-700 hover:bg-red-600 text-white rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-vibg-violet-700 focus:ring-opacity-50"
                          >
                            Delete <DeleteForeverIcon sx={{ color: pink[500] }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
    )
}

async function deleteBooking(hall_id, booking_id, setOpen, setResult, setMsg) {
  try {
      const response = await axios.post(`https://lncthalls-server.onrender.com/removebooking/${hall_id}`,
      {
        booking_id: booking_id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const res = await response.data;

      if (res.status === 200) {
          setOpen(true);
          setResult('success');
          setMsg(res.msg + " Please refresh the page.");
          
          const refresh = setTimeout(() => {
          window.location.reload();
          clearTimeout(refresh);
          }, 2000);
      } else {
          setOpen(true);
          setResult('error');
          setMsg(res.msg);
      }
  } catch (error) {
      setOpen(true);
      setResult('error');
      setMsg("Some error occured. Couldn't delete booking.");
      
  }
  
}

export default MyBookings