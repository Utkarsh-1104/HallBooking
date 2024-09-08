import { useRecoilValue } from "recoil";
import { adminAccessAtom } from "../../atoms/accessAtom";
import Unauthorized from "../../ui/Unauthorized";
import { useState } from 'react'

const BookHall = () => {
    const auth = useRecoilValue(adminAccessAtom) 
    console.log(auth);
  
  return (
    <div className="bg-black min-h-screen font-[Roboto] ">
      {(auth.msg === "Authorized") ? <BookDetails /> : <Unauthorized /> }
    </div>
  )
}

function BookDetails() {
    const availableHalls = [
        { name: "Grand Ballroom", capacity: 500 },
        { name: "Conference Room A", capacity: 100 },
        { name: "Auditorium", capacity: 300 },
        { name: "Meeting Room 1", capacity: 20 },
        { name: "Exhibition Hall", capacity: 1000 },
    ]
    const [showResults, setShowResults] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    setShowResults(true)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 font-[ Roboto]">
      <h1 className="text-4xl font-bold mb-8 text-center">Find Your Perfect Event Space</h1>
      <form onSubmit={handleSearch} className="space-y-6 mb-12 max-w-2xl mx-auto">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="fromDate" className="block text-sm font-medium mb-1">From Date</label>
            <input 
              id="fromDate"
              type="date" 
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300" 
            />
          </div>
          <div>
            <label htmlFor="toDate" className="block text-sm font-medium mb-1">To Date</label>
            <input 
              id="toDate"
              type="date" 
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300" 
            />
          </div>
          <div>
            <label htmlFor="fromTime" className="block text-sm font-medium mb-1">From Time</label>
            <input 
              id="fromTime"
              type="time" 
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300" 
            />
          </div>
          <div>
            <label htmlFor="toTime" className="block text-sm font-medium mb-1">To Time</label>
            <input 
              id="toTime"
              type="time" 
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300" 
            />
          </div>
        </div>
        <button 
          type="submit" 
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Find Available Spaces
        </button>
      </form>
      {showResults && (
        <div className="space-y-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Available Event Spaces</h2>
          {availableHalls.map((hall, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-bold mb-3">{hall.name}</h3>
              <div className="flex justify-between items-center">
                <p className="text-lg">Capacity: {hall.capacity} guests</p>
                <button className="py-2 px-6 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-full shadow-md hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transform hover:scale-105 transition duration-300 ease-in-out">
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

export default BookHall