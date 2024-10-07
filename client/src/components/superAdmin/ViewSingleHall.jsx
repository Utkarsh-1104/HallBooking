/* eslint-disable react/prop-types */
import { useRecoilState, useRecoilValue } from "recoil";
import { superAdminAccessAtom } from "../../atoms/accessAtom";
import Unauthorized from "../../ui/Unauthorized";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { eventAtom, textAtom } from "../../atoms/adminRegisterAtoms";
import Popup from "../../ui/Alert";

const ViewSingleHall = () => {
  const access = useRecoilValue(superAdminAccessAtom);
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 min-h-screen font-[Roboto] text-white">
      {(access.msg === 'Authorized') ? <ViewHall /> : <Unauthorized />}
    </div>
  );
}

function ViewHall() {
  const [hall, setHall] = useState({});
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    async function singleHall() {
      try {
        const res = await axios.get(`http://localhost:3000/gethalls/${id}`)
        setHall(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    singleHall();
  }, [id])

  return (
    <div className="container mx-auto xl:px-24 px-6 py-8">
      <h1 className='text-3xl font-bold mb-8 text-center sm:text-left text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
        View Hall Details
      </h1>
      <hr className="w-full h-px bg-gray-600 border-0 rounded mb-8" />
      <div className=" bg-[#605e5e] bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-2xl mb-8">
        <h2 className="text-[1.7rem] font-semibold mb-4">{hall.hall_name}</h2>
        <p className="text-lg mb-2">Capacity: {hall.hall_capacity}</p>
      </div>
      <h3 className="text-[1.6rem] font-semibold mb-4">Bookings</h3>
      <div className="space-y-4">
        {hall.hall_availability && hall.hall_availability.length > 0 ? (
          hall.hall_availability.map((booking) => (
            <HallBookings
              key={booking._id}
              hall_id={hall._id}
              booking_id={booking.booking_id}
              date_from={booking.date_from}
              date_to={booking.date_to}
              from={booking.time_from}
              to={booking.time_to}
              booked_by={booking.booked_by}
              event_name={booking.event_name}
              number_of_attendees={booking.number_of_attendees}
            />
          ))
        ) : (
          <p className="text-gray-400">No bookings available for this hall.</p>
        )}
      </div>
    </div>
  );
}

function HallBookings(props) {
  const [result, setResult] = useRecoilState(eventAtom);
  const [msg, setMsg] = useRecoilState(textAtom);
  const [open, setOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Popup state={open} handleClose={handleClose} event={result} text={msg} />
      <div className="bg-[#605e5e] bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-4 shadow-lg transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div>
            <h3 className="text-2xl pb-2">{props.event_name}</h3>
            <p className="text-xl">
              From {props.date_from} - {props.date_to}
            </p>
            <p className="text-xl text-gray-400">
              {props.from} to {props.to}
            </p>
          </div>
          <ExpandMoreIcon className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
        {isExpanded && (
          <div className="mt-4 space-y-2 border-t border-gray-700 pt-4">
            <p className="text-xl"><span>Booked by:</span> {props.booked_by}</p>
            <p className="text-xl"><span>Number of participants: </span>{props.number_of_attendees}</p>
            <p className="text-xl"><span>Booking ID:</span> {props.booking_id}</p>
            <button
              onClick={() => deleteBooking(props.hall_id, props.booking_id, setOpen, setResult, setMsg)}
              className="mt-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:from-red-600 hover:to-pink-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              Delete Booking
              <DeleteForeverIcon className="ml-2" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

async function deleteBooking(hall_id, booking_id, setOpen, setResult, setMsg) {
  try {
    const response = await axios.post(`http://localhost:3000/removebooking/${hall_id}`,
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
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      setOpen(true);
      setResult('error');
      setMsg(res.msg);
    }
  } catch (error) {
    setOpen(true);
    setResult('error');
    setMsg("Some error occurred. Couldn't delete booking.");
  }
}

export default ViewSingleHall;