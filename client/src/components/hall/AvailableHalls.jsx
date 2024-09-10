import { useRecoilState, useRecoilValue } from "recoil";
import { adminAccessAtom } from "../../atoms/accessAtom";
import Unauthorized from "../../ui/Unauthorized";
import React, { useState } from 'react'
import { dateFromAtom, dateToAtom, timeFromAtom, timeToAtom } from "../../atoms/bookHallAtoms";
import { eventAtom, textAtom } from "../../atoms/adminRegisterAtoms";
import Popup from "../../ui/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AvailableHalls = () => {
  const auth = useRecoilValue(adminAccessAtom)
  
  return (
    <div className="bg-black min-h-screen font-[Roboto] ">
      {(auth.msg === "Authorized") ? <BookDetails /> : <Unauthorized /> }
    </div>
  )
}

function BookDetails() {
  const [dateFrom, setDateFrom] = useRecoilState(dateFromAtom)
  const [dateTo, setDateTo] = useRecoilState(dateToAtom)
  const [timeFrom, setTimeFrom] = useRecoilState(timeFromAtom)
  const [timeTo, setTimeTo] = useRecoilState(timeToAtom)
  const [availableHalls, setAvailableHalls] = useState([])
  const [showResults, setShowResults] = useState(false)

  const [result, setResult] = useRecoilState(eventAtom);
  const [msg, setMsg] = useRecoilState(textAtom);

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }
      setOpen(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!dateFrom || !dateTo || !timeFrom || !timeTo) {
      setOpen(true);
      setResult('error');
      setMsg('Please fill in all fields.');
      return
    }

    try {
      const response = await axios.post('http://localhost:3000/availablehalls', {
        date_from: dateFrom,
        date_to: dateTo,
        time_from: timeFrom,
        time_to: timeTo,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAvailableHalls(response.data.available_halls)
      setShowResults(true)
    } catch (error) {
      setOpen(true);
      setResult('error');
      setMsg('An error occurred. Please try again.');
    }
  }

  const navigate = useNavigate();
  const admin_id = localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-black text-white p-8 font-[Roboto]">
      <Popup state={open} handleClose={handleClose} event={result} text={msg} />
      <h1 className="text-3xl font-bold mb-8 text-center">Find Your Perfect Event Hall</h1>
      <form onSubmit={handleSearch} className="space-y-6 mb-12 max-w-2xl mx-auto">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="fromDate" className="block text-sm font-medium mb-1">From Date</label>
            <input 
              id="fromDate"
              type="date" 
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300" 
              value={dateFrom}
              onChange={(e) => (setDateFrom(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="toDate" className="block text-sm font-medium mb-1">To Date</label>
            <input 
              id="toDate"
              type="date" 
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300" 
              value={dateTo}
              onChange={(e) => (setDateTo(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="fromTime" className="block text-sm font-medium mb-1">From Time</label>
            <input 
              id="fromTime"
              type="time" 
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300" 
              value={timeFrom}
              onChange={(e) => (setTimeFrom(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="toTime" className="block text-sm font-medium mb-1">To Time</label>
            <input 
              id="toTime"
              type="time" 
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300" 
              value={timeTo}
              onChange={(e) => (setTimeTo(e.target.value))}
            />
          </div>
        </div>
        <button 
          type="submit" 
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transform hover:scale-105 transition duration-300 ease-in-out"
          onClick={handleSearch}
        >
          Find Available Halls
        </button>
      </form>
      {showResults && (
        <div className="space-y-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Available Event Spaces</h2>
          {availableHalls.map((hall) => (
            <div key={hall._id} className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-bold mb-3">{hall.hall_name}</h3>
              <div className="flex justify-between items-center">
                <p className="text-lg">Capacity: {hall.hall_capacity} guests</p>
                <button className="py-2 px-6 bg-gradient-to-r from-green-700 to-blue-700 text-white font-bold rounded-full shadow-md hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transform hover:scale-105 transition duration-300 ease-in-out" onClick={() => { navigate(`/bookhall/?id=${hall._id}/?admin_id=${admin_id}`); }} >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AvailableHalls