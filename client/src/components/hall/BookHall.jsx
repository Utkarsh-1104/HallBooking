import { useRecoilState, useRecoilValue } from "recoil"
import { adminAccessAtom } from "../../atoms/accessAtom"
import Unauthorized from "../../ui/Unauthorized"
 import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import { eventAtom, textAtom } from "../../atoms/adminRegisterAtoms"
import Popup from "../../ui/Alert"
import axios from "axios"

const BookHall = () => {
    const auth = useRecoilValue(adminAccessAtom) 
  
    return (
      <div className="bg-black min-h-screen font-[Roboto] ">
        {(auth.msg === "Authorized") ? <BookHallFunction /> : <Unauthorized /> }
      </div>
    )
}


function BookHallFunction() {
  const [searchParams] = useSearchParams()
  const hall_id = searchParams.get('hall_id')
  const admin_id = searchParams.get('admin_id')
  const time_from = searchParams.get('time_from')
  const time_to = searchParams.get('time_to')
  const date_from = searchParams.get('date_from')
  const date_to = searchParams.get('date_to')

  const [eventName, setEventName] = useState('')
  const [bookedBy, setBookedBy] = useState('')

  const [result, setResult] = useRecoilState(eventAtom);
  const [msg, setMsg] = useRecoilState(textAtom);

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }
      setOpen(false);
  };

  function handleBook(e) {
    e.preventDefault()
    if ((eventName.toLowerCase() !== eventName.toUpperCase())) {
      if ((bookedBy.toLowerCase() !== bookedBy.toUpperCase())) {
        postEvent();
        console.log(time_from, time_to, date_from, date_to, eventName, bookedBy, admin_id);
      } else {
        setOpen(true);
        setResult('error');
        setMsg('Booked by should be a string.');
      }
    } else {
      setOpen(true);
      setResult('error');
      setMsg('Event name should be a string.');
    }


    async function postEvent() {
      try {
        const response = await axios.patch(`http://localhost:3000/bookhall/${hall_id}`, {
          time_from: time_from,
          time_to: time_to,
          date_from: date_from,
          date_to: date_to,
          event_name: eventName,
          booked_by: bookedBy,
          admin_booking_id: admin_id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.status === 200) {
          setOpen(true);
          setResult('success');
          setMsg('Hall updated successfully.');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-gray-100 py-12 px-4 font-[Poppins] sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Book Your Event
          </h1>
          <p className="mt-2 text-sm text-gray-400">Fill in the details to reserve your spot.</p>
        </div>
        <form onSubmit={handleBook} className="mt-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="dateFrom" className="text-sm font-medium text-gray-300">
                Date From
              </label>
              <input
                type="date"
                id="dateFrom"
                value={date_from}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="dateTo" className="text-sm font-medium text-gray-300">
                Date To
              </label>
              <input
                type="date"
                id="dateTo"
                value={date_to}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="timeFrom" className="text-sm font-medium text-gray-300">
                Time From
              </label>
              <input
                type="time"
                id="timeFrom"
                value={time_from}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="timeTo" className="text-sm font-medium text-gray-300">
                Time To
              </label>
              <input
                type="time"
                id="timeTo"
                value={time_to}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                readOnly
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="eventName" className="text-sm font-medium text-gray-300">
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Enter event name"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="bookedBy" className="text-sm font-medium text-gray-300">
              Booked By
            </label>
            <input
              type="text"
              id="bookedBy"
              value={bookedBy}
              onChange={(e) => setBookedBy(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:from-purple-600 hover:to-pink-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            onClick={handleBook}
          >
            Book Event
          </button>
        </form>
      </div>
      <Popup state={open} handleClose={handleClose} event={result} text={msg} />
    </div>
  )
}

export default BookHall