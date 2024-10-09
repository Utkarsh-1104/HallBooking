import { useRecoilValue } from 'recoil'
import {bookingRequests} from '../../atoms/getBookingReqsAtom'


export default function BookingRequests() {
  const handleApprove = (id) => {
    alert(`Booking ${id} approved`)
    
  }

  const bookingReqs = useRecoilValue(bookingRequests) 
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-8">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">Booking Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookingReqs.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
              <h2 className="text-2xl font-semibold text-white">{booking.hall_name}</h2>
              <p className="text-lg text-white opacity-75">Requested by: {booking.booked_by}</p>
            </div>
            <div className="p-6">
                <div className="mb-4">
                    <p className="text-lg text-gray-600">Date: <span className='font-medium'>{booking.date_from} to {booking.date_to}</span></p>
                    <p className="font-medium"></p>
                </div>
                <div className="mb-4">
                    <p className="text-lg text-gray-600">Time: <span className='font-medium'>{booking.time_from} - {booking.time_to}</span></p>
                    <p className="font-medium"></p>
                </div>
                <div className="mb-4">
                    <p className="text-lg text-gray-600">Event: <span className='font-medium'>{booking.event_name}</span></p>
                    <p className="font-medium"></p>
                </div>
                <div className="mb-6">
                    <p className="text-lg text-gray-600">Participants: <span className='font-medium'>{booking.number_of_attendees} people</span></p>
                    <p className="font-medium"></p>
                </div>
                <button
                    onClick={() => handleApprove(booking._id)}
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 mb-4 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
                    >
                    Approve Booking
                </button>
                <button
                    onClick={() => handleApprove(booking._id)}
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
                    >
                    Delete Request
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}