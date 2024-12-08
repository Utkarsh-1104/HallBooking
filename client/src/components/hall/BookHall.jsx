/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useRecoilState, useRecoilValue } from "recoil"
import { accessAtom } from "../../atoms/accessAtom"
import Unauthorized from "../../ui/Unauthorized"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import { eventAtom, textAtom } from "../../atoms/adminRegisterAtoms"
import Popup from "../../ui/Alert"
import axios from "axios"
import { capitalize } from "@mui/material"

const BookHall = () => {
  const auth = useRecoilValue(accessAtom) 
  return (
    <div className="text-gray-800 ">
      {(auth.msg === "Authorized") ? <BookHallFunction auth={auth} /> : <Unauthorized /> }
    </div>
  )
}


function BookHallFunction(props) {
  const [searchParams] = useSearchParams()
  const hall_name = searchParams.get('hall_name')
  const hall_id = searchParams.get('hall_id')
  const hall_capacity = searchParams.get('hall_capacity')
  const admin_id = props.auth.id
  const time_from = searchParams.get('time_from')
  const time_to = searchParams.get('time_to')
  const date_from = searchParams.get('date_from')
  const date_to = searchParams.get('date_to')
  const fname = props.auth.fname
  const lname = props.auth.lname
  const role = props.auth.role
  const hall_building = searchParams.get('hall_building')
  const hall_college = searchParams.get('hall_college')
  const username = props.auth.username
  const hall_cap = parseInt(hall_capacity);
  const booked_by = capitalize(fname) + " " + capitalize(lname)

  const [eventName, setEventName] = useState('')
  const [noOfParticipants, setNoOfParticipants] = useState('')

  const [result, setResult] = useRecoilState(eventAtom);
  const [msg, setMsg] = useRecoilState(textAtom);

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }
      setOpen(false);
  };

  const [disable, setDisable] = useState(false);

  function handleBook(e) {
    e.preventDefault()
    if ((eventName.toLowerCase() !== eventName.toUpperCase())) {
      if (noOfParticipants && noOfParticipants > 0 && noOfParticipants <= hall_cap) {
        postEvent();
      } else {
        setOpen(true);
        setResult('error');
        setMsg('Number of participants should be positive and less than hall capacity.');
      }
    } else {
      setOpen(true);
      setResult('error');
      setMsg('Event name should be a string.');
    }

    async function postEvent() {
      setDisable(true);
      try {
        const response = await axios.patch(`https://lncthalls-server.onrender.com/bookhall/${hall_id}`, {
          time_from: time_from,
          time_to: time_to,
          date_from: date_from,
          date_to: date_to,
          event_name: eventName,
          booked_by: booked_by,
          admin_booking_id: admin_id,
          number_of_attendees: noOfParticipants,
          role: role,
          username: username,
          hall_name: hall_name,
          hall_building: hall_building,
          hall_college: hall_college
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.status === 200) {
          setOpen(true);
          setResult('success');
          setMsg(response.data.msg);

          setTimeout(() => {
            window.location.reload();
          }, 2000)

        } else {
          setOpen(true);
          setResult('error');
          setMsg(response.data.msg);
        }
      } catch (error) {
        setOpen(true);
        setResult('error');
        setMsg('An error occurred. Please try again.');
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-400 p-4 sm:p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 py-6 px-8 text-white">
          <h1 className="text-3xl font-bold">
            Book Your Event at {hall_name}
          </h1>
          <p className="text-blue-100 text-lg mt-1">Fill in the details to reserve your spot.</p>
        </div>
        <div className="p-8">
          <form onSubmit={handleBook} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="dateFrom" className="text-base font-bold text-gray-700">
                  Date From
                </label>
                <input
                  type="date"
                  id="dateFrom"
                  value={date_from}
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="dateTo" className="text-base font-bold text-gray-700">
                  Date To
                </label>
                <input
                  type="date"
                  id="dateTo"
                  value={date_to}
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  readOnly
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="timeFrom" className="text-base font-bold text-gray-700">
                  Time From
                </label>
                <input
                  type="time"
                  id="timeFrom"
                  value={time_from}
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="timeTo" className="text-base font-bold text-gray-700">
                  Time To
                </label>
                <input
                  type="time"
                  id="timeTo"
                  value={time_to}
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  readOnly
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="eventName" className="text-base font-bold text-gray-700">
                Event Name
              </label>
              <input
                type="text"
                id="eventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Enter event name"
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="noOfParticipants" className="text-base font-bold text-gray-700">
                Number of Participants
              </label>
              <input
                type="number"
                id="noOfParticipants"
                min="1"
                step="1"
                value={noOfParticipants}
                onChange={(e) => setNoOfParticipants(e.target.value)}
                placeholder="Enter number of participants"
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="bookedBy" className="text-base font-bold text-gray-700">
                Booked By
              </label>
              <input
                type="text"
                id="bookedBy"
                value={booked_by}
                placeholder="Enter your name"
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                readOnly
              />
            </div>
            { role === "admin" ? (hall_name === "Srinivas Ramanujan Auditorium" || hall_name === "Aryabhata Auditorium" ) ? <p className="text-amber-700 font-bold text-lg mt-1">Note: This hall requires a super-admin's approval for booking.</p> : null : null }
            <button
              type="submit"
              disabled={disable}
              className={`w-full text-lg bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:bg-blue-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50`}
              onClick={handleBook}
            >
              {role === "admin" && (hall_name === "Srinivas Ramanujan Auditorium" || hall_name === "Aryabhata Auditorium" ) ? "Request Booking" : "Book Event"}
            </button>
          </form>
        </div>
      </div>
      <Popup state={open} handleClose={handleClose} event={result} text={msg} />
    </div>
  )
}

export default BookHall
