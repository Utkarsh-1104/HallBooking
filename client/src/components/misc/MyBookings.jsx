/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useRecoilState, useRecoilValue } from 'recoil'
import { accessAtom } from '../../atoms/accessAtom'
import Unauthorized from '../../ui/Unauthorized'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { eventAtom, textAtom } from '../../atoms/adminRegisterAtoms'
import Popup from '../../ui/Alert'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const MyBookings = () => {
    const auth = useRecoilValue(accessAtom) 
  
    return (
      <div className="bg-gradient-to-br from-slate-100 to-slate-400 min-h-screen text-white">
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
  }, [admin_id])

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
      <div className="min-h-screen px-6 py-10 md:py-12">
        <Popup state={open} handleClose={handleClose} event={result} text={msg} />
        <div className="lg:px-10  mx-auto">
          <h1 className="text-4xl font-bold text-center text-black mb-8 drop-shadow-2xl">My Bookings</h1>
          
          {bookings.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
              <p className="text-xl text-blue-500">You don't have any bookings yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking) => (
                <div key={booking.hall_id} className="bg-[#dddddd] text-black rounded-2xl shadow-2xl transition duration-300 p-6 ease-in-out transform hover:scale-105">
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl font-semibold">{booking.hall_name}</h2>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <h2 className='text-xl'><span className="font-medium">Event Name:</span> {booking.hall_bookings.event_name}</h2>
                        <p className='text-xl'><span className="font-medium">Date:</span> {convertDateFormat(booking.hall_bookings.date_from)} to {convertDateFormat(booking.hall_bookings.date_to)}</p>
                        <p className='text-xl'><span className="font-medium">Time:</span> {convertTimeFormat(booking.hall_bookings.time_from)} to: {convertTimeFormat(booking.hall_bookings.time_to)}</p>
                        <p className='text-xl'><span className="font-medium">Number of participants:</span> {booking.hall_bookings.number_of_attendees} </p>
                      </div>
                      <button 
                        onClick={deleteBooking.bind(this, booking.hall_id, booking.hall_bookings.booking_id, setOpen, setResult, setMsg)}
                        className="w-fulltext-base px-4 py-2 bg-[#e14733] text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:bg-[#b03d2e] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center"
                      >
                        Delete <DeleteForeverIcon  />
                      </button>
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
  const confirm = window.confirm('Are you sure you want to delete this booking?');
  if (!confirm) return;
    
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
