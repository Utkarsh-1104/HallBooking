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
  const name = access.fname + ' ' + access.lname;
  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-400 min-h-screen font-[Roboto] text-gray-800">
      {(access.msg === 'Authorized') ? <ViewHall name={name} /> : <Unauthorized />}
    </div>
  );
}

function ViewHall(props) {
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
      <h1 className='text-3xl font-bold mb-8 text-center sm:text-left text-black'>
        View Hall Details
      </h1>
      <hr className="w-full h-[1.5px] bg-gray-900 border-0 rounded mb-8" />
      <div className=" bg-blue-600 rounded-xl p-6 shadow-xl mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">{hall.hall_name}</h2>
        <p className="text-lg mb-2 text-gray-200">Capacity: {hall.hall_capacity}</p>
        <p className="text-lg mb-2 text-gray-200">Building: {hall.building}</p>
        <p className="text-lg mb-2 text-gray-200">College: {hall.college}</p>
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-gray-800 ">Bookings</h3>
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
              superadmin_name={props.name}
            />
          ))
        ) : (
          <p className="text-gray-600 text-xl ">No bookings available for this hall.</p>
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
    <>
      <Popup state={open} handleClose={handleClose} event={result} text={msg} />
      <div className="bg-white rounded-xl p-4 shadow-lg transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div>
            <h3 className="text-2xl font-semibold underline decoration-[#E17833] underline-offset-4 text-gray-800 pb-2">{props.event_name}</h3>
            <p className="text-xl text-gray-600">
              From {convertDateFormat(props.date_from)} - {convertDateFormat(props.date_to)}
            </p>
            <p className="text-xl text-gray-600">
              {convertTimeFormat(props.from)} to {convertTimeFormat(props.to)}
            </p>
          </div>
          <ExpandMoreIcon fontSize="large" className={`text-blue-600 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
        {isExpanded && (
          <div className="mt-4 text-xl space-y-2 border-t border-gray-200 pt-4">
            <p className="text-gray-700"><span className="font-semibold" >Booked by:</span> {props.booked_by}</p>
            <p className="text-gray-700"><span className="font-semibold" >Number of participants: </span>{props.number_of_attendees}</p>
            <p className="text-gray-700"><span className="font-semibold" >Booking ID:</span> {props.booking_id}</p>
            <button
              onClick={() => deleteBooking(props.hall_id, props.booking_id, props.superadmin_name, setOpen, setResult, setMsg)}
              className=" px-4 py-2 bg-[#e14733] text-lg text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:bg-[#b03d2e] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center"
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

async function deleteBooking(hall_id, booking_id, superadmin_name, setOpen, setResult, setMsg) {
  try {
    const response = await axios.post(`http://localhost:3000/removebooking/${hall_id}`,
      {
        booking_id: booking_id,
        superadmin_name: superadmin_name
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