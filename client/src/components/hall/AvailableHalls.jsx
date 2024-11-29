/* eslint-disable react/prop-types */
import { useRecoilState, useRecoilValue } from "recoil";
import { accessAtom } from "../../atoms/accessAtom";
import Unauthorized from "../../ui/Unauthorized";
import React, { useState } from 'react'
import { dateFromAtom, dateToAtom, timeFromAtom, timeToAtom } from "../../atoms/bookHallAtoms";
import { eventAtom, textAtom } from "../../atoms/adminRegisterAtoms";
import Popup from "../../ui/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const AvailableHalls = () => {
  const auth = useRecoilValue(accessAtom)
  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-400 min-h-screen text-gray-800 ">
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
  const dateNow = new Date
  // console.log(dateNow.getHours(), dateNow.getMinutes());
  const newDateFrom = dateFrom.split('-')
  // console.log(newDateFrom);
  const newDateTo = dateTo.split('-')
  const newTimeFrom = timeFrom.split(':')
  // console.log(newTimeFrom);
  const newTimeTo = timeTo.split(':')
  // console.log(newTimeTo);

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!dateFrom || !dateTo || !timeFrom || !timeTo) {
      setOpen(true);
      setResult('error');
      setMsg('Please fill in all fields.');
      return
    }

    //date from ka year greater than current year then direct check date to no need of month and date
    if ((parseInt(newDateFrom[0]) > dateNow.getFullYear())) {
      //date to year greater than date from then no need of month and date
      if (parseInt(newDateFrom[0]) < parseInt(newDateTo[0]) ) {
        checkTimeAndSearch()
      } else if(parseInt(newDateFrom[0]) === parseInt(newDateTo[0])) {
        if (parseInt(newDateFrom[1]) < parseInt(newDateTo[1]) ) {
          checkTimeAndSearch()
        } else if (parseInt(newDateFrom[1]) === parseInt(newDateTo[1])) {
          if (parseInt(newDateFrom[2]) <= parseInt(newDateTo[2])) {
            checkTimeAndSearch()
          } else {
            setOpen(true);
            setResult('error');
            setMsg('Please select a future date.');
            return
          }
        } else {
          setOpen(true);
          setResult('error');
          setMsg('Please select a future date.');
          return
        }
      }
       else {
        setOpen(true);
        setResult('error');
        setMsg('Please select a future date.');
        return
      }
    } else if (parseInt(newDateFrom[0]) === dateNow.getFullYear()) {
      if (parseInt(newDateFrom[1]) > (dateNow.getMonth() + 1)) {
        // date to year check with date from year
        if (parseInt(newDateFrom[0]) < parseInt(newDateTo[0]) ) {
          checkTimeAndSearch()
        } else if (parseInt(newDateFrom[0]) === parseInt(newDateTo[0])) {
          if (parseInt(newDateFrom[1]) < parseInt(newDateTo[1]) ) {
            checkTimeAndSearch()
          } else if (parseInt(newDateFrom[1]) === parseInt(newDateTo[1])) {
            if (parseInt(newDateFrom[2]) <= parseInt(newDateTo[2])) {
              checkTimeAndSearch()
            } else {
              setOpen(true);
              setResult('error');
              setMsg('Please select a future date.');
              return
            }
          } else {
            setOpen(true);
            setResult('error');
            setMsg('Please select a future date.');
            return
          }
        } else {
          setOpen(true);
          setResult('error');
          setMsg('Please select a future date.');
          return
        }
      } else if (parseInt(newDateFrom[1]) === (dateNow.getMonth() + 1)) {
        if (parseInt(newDateFrom[2]) > dateNow.getDate()) {
          if (parseInt(newDateFrom[0]) < parseInt(newDateTo[0]) ) {
            checkTimeAndSearch()
          } else if (parseInt(newDateFrom[0]) === parseInt(newDateTo[0])) {
            if (parseInt(newDateFrom[1]) < parseInt(newDateTo[1]) ) {
              checkTimeAndSearch()
            } else if (parseInt(newDateFrom[1]) === parseInt(newDateTo[1])) {
              if (parseInt(newDateFrom[2]) <= parseInt(newDateTo[2])) {
                checkTimeAndSearch()
              } else {
                setOpen(true);
                setResult('error');
                setMsg('Please select a future date.');
                return
              }
            } else {
              setOpen(true);
              setResult('error');
              setMsg('Please select a future date.');
              return
            }
          } else {
            setOpen(true);
            setResult('error');
            setMsg('Please select a future date.');
            return
          }
        } else if (parseInt(newDateFrom[2]) === dateNow.getDate()) {
          if (parseInt(newDateFrom[0]) < parseInt(newDateTo[0]) ) {
            if (!((parseInt(newTimeFrom[0]) < dateNow.getHours()) || (parseInt(newTimeFrom[1]) < dateNow.getMinutes()))) {
              checkTimeAndSearch()
            } else {
              setOpen(true);
              setResult('error');
              setMsg('Please select a future time.');
            }
          } else if (parseInt(newDateFrom[0]) === parseInt(newDateTo[0])) {
            if (parseInt(newDateFrom[1]) < parseInt(newDateTo[1]) ) {
              if (!((parseInt(newTimeFrom[0]) < dateNow.getHours()) || (parseInt(newTimeFrom[1]) < dateNow.getMinutes()))) {
                checkTimeAndSearch()
              } else {
                setOpen(true);
                setResult('error');
                setMsg('Please select a future time.');
              }
            } else if (parseInt(newDateFrom[1]) === parseInt(newDateTo[1])) {
              if (parseInt(newDateFrom[2]) <= parseInt(newDateTo[2])) {
                if (!((parseInt(newTimeFrom[0]) < dateNow.getHours()) || (parseInt(newTimeFrom[1]) < dateNow.getMinutes()))) {
                  checkTimeAndSearch()
                } else {
                  setOpen(true);
                  setResult('error');
                  setMsg('Please select a future time.');
                }
              } else {
                setOpen(true);
                setResult('error');
                setMsg('Please select a future date.');
                return
              }
            } else {
              setOpen(true);
              setResult('error');
              setMsg('Please select a future date.');
              return
            }
          } else {
            setOpen(true);
            setResult('error');
            setMsg('Please select a future date.');
            return
          }
        }
        else {
          setOpen(true);
          setResult('error');
          setMsg('Please select a future date.');
          return
        }
      } else {
        setOpen(true);
        setResult('error');
        setMsg('Please select a future date.');
        return
      }
    } else {
      setOpen(true);
      setResult('error');
      setMsg('Please select a future date.');
      return
    }

    async function checkTimeAndSearch() {
      if (!((parseInt(newTimeTo[0]) < parseInt(newTimeFrom[0])) || (parseInt(newTimeTo[1]) < parseInt(newTimeFrom[1]))) ) {
          try {
            const response = await axios.post(`https://lncthalls-server.onrender.com/availablehalls`, {
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
        } else {
          setOpen(true);
          setResult('error');
          setMsg('Please select a future time.');
          return
        }
    }
  }

  const navigate = useNavigate();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <Popup state={open} handleClose={handleClose} event={result} text={msg} />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-center ">
            Find Available Halls
          </h1>
          <p className="mt-2 text-xl font-semibold text-gray-700">Select your dates and time to search for available halls.</p>
        </div>

        <form onSubmit={handleSearch} className="mb-8 bg-[#dddddd] rounded-xl p-6 shadow-2xl">
          <div className="grid grid-cols-2 gap-4 mb-4 text-black">
            <div className="space-y-2">
              <label htmlFor="dateFrom" className="text-lg font-medium">
                Date From
              </label>
              <input
                type="date"
                id="dateFrom"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="dateTo" className="text-lg font-medium">
                Date To
              </label>
              <input
                type="date"
                id="dateTo"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6 text-black">
            <div className="space-y-2">
              <label htmlFor="timeFrom" className="text-lg font-medium">
                Time From
              </label>
              <input
                type="time"
                id="timeFrom"
                value={timeFrom}
                onChange={(e) => setTimeFrom(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="timeTo" className="text-lg font-medium">
                Time To
              </label>
              <input
                type="time"
                id="timeTo"
                value={timeTo}
                onChange={(e) => setTimeTo(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 text-lg bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={handleSearch}
          >
            <SearchIcon className="" />
            Search Available Halls
          </button>
        </form>
        {showResults && (
        <div className="bg-gray-300 rounded-xl p-6 shadow-2xl">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-700 ">
            Available Halls
          </h2>
          {availableHalls.length > 0 ? (
              <ul className="space-y-4">
                {availableHalls.map((hall) => ( 
                  <li key={hall._id} className="w-full flex flex-col sm:flex-row justify-between items-center bg-blue-600 rounded-xl p-3 py-5 sm:p-6 shadow-2xl text-white sm:px-10">
                    <div className="text-center sm:text-left mb-4 sm:mb-0" >
                      <h3 className="text-xl font-bold sm:mb-0">{hall.hall_name}</h3>
                      <p className="text-lg text-gray-200"> <span className="font-semibold">Capacity:</span> {hall.hall_capacity}</p>
                      { hall.building && <p className="text-lg text-gray-100"> <span className="font-semibold">Building:</span> {hall.building}</p>}  
                      { hall.college && <p className="text-lg text-gray-100"> <span className="font-semibold">College:</span> {hall.college}</p>}
                    </div>
                    <button
                      onClick={() => { navigate(`/bookhall/?hall_id=${hall._id}&hall_name=${hall.hall_name}&hall_capacity=${hall.hall_capacity}&hall_building=${hall.building}&hall_college=${hall.college}&date_from=${dateFrom}&date_to=${dateTo}&time_from=${timeFrom}&time_to=${timeTo}`); }}
                      className="bg-[#E17833] text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:bg-[#E17833] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#9f5625] focus:ring-opacity-50"
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
