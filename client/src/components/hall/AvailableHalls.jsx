/* eslint-disable react/prop-types */
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
      {(auth.msg === "Authorized") ? <BookDetails auth={auth} /> : <Unauthorized /> }
    </div>
  )
}

function BookDetails(props) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Popup result={result} msg={msg} open={open} handleClose={handleClose} />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Find Available Halls
          </h1>
          <p className="mt-2 text-sm text-gray-400">Select your dates and times to search for available halls</p>
        </div>

        <form onSubmit={handleSearch} className="mb-8 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-2xl">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <label htmlFor="dateFrom" className="text-sm font-medium text-gray-300">
                Date From
              </label>
              <input
                type="date"
                id="dateFrom"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="dateTo" className="text-sm font-medium text-gray-300">
                Date To
              </label>
              <input
                type="date"
                id="dateTo"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label htmlFor="timeFrom" className="text-sm font-medium text-gray-300">
                Time From
              </label>
              <input
                type="time"
                id="timeFrom"
                value={timeFrom}
                onChange={(e) => setTimeFrom(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="timeTo" className="text-sm font-medium text-gray-300">
                Time To
              </label>
              <input
                type="time"
                id="timeTo"
                value={timeTo}
                onChange={(e) => setTimeTo(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:from-purple-600 hover:to-pink-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            onClick={handleSearch}
          >
            Search Available Halls
          </button>
        </form>
        {showResults && (
        <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-600">
              Available Halls
          </h2>
          {availableHalls.length > 0 ? (
              <ul className="space-y-4">
                {availableHalls.map((hall) => (
                  <li key={hall.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                    <div>
                      <h3 className="text-lg font-semibold">{hall.hall_name}</h3>
                      <p className="text-sm text-gray-400">Capacity: {hall.hall_capacity}</p>
                    </div>
                    <button
                      onClick={() => { navigate(`/bookhall/?hall_id=${hall._id}&admin_id=${props.auth.id}&date_from=${dateFrom}&date_to=${dateTo}&time_from=${timeFrom}&time_to=${timeTo}`); }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:from-purple-600 hover:to-pink-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    >
                      Book Now
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-400">No halls available for the selected time period.</p>
            )}
        </div>
        )}
        
      </div>
    </div>
  )
}

export default AvailableHalls