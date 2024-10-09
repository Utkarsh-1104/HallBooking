import { useRecoilValue } from 'recoil'
import {bookingRequests} from '../../atoms/getBookingReqsAtom'
// Mock data for booking requests
const bookingRequestsss = [
  {
    id: 1,
    dateFrom: '2023-07-15',
    dateTo: '2023-07-16',
    timeFrom: '14:00',
    timeTo: '22:00',
    hallName: 'Grand Ballroom',
    hallCapacity: 500,
    eventName: 'Annual Gala',
    bookedBy: 'John Doe'
  },
  {
    id: 2,
    dateFrom: '2023-07-20',
    dateTo: '2023-07-20',
    timeFrom: '09:00',
    timeTo: '17:00',
    hallName: 'Conference Room A',
    hallCapacity: 100,
    eventName: 'Tech Symposium',
    bookedBy: 'Jane Smith'
  },
  {
    id: 3,
    dateFrom: '2023-07-25',
    dateTo: '2023-07-27',
    timeFrom: '10:00',
    timeTo: '18:00',
    hallName: 'Exhibition Hall',
    hallCapacity: 1000,
    eventName: 'Art Exhibition',
    bookedBy: 'Alice Johnson'
  },
  {
    id: 4,
    dateFrom: '2023-07-25',
    dateTo: '2023-07-27',
    timeFrom: '10:00',
    timeTo: '18:00',
    hallName: 'Exhibition Hall',
    hallCapacity: 1000,
    eventName: 'Art Exhibition',
    bookedBy: 'Alice Johnson'
  }
]

export default function BookingRequests() {
  const handleApprove = (id) => {
    console.log(`Booking ${id} approved`)
    // Here you would typically make an API call to approve the booking
  }

  const bookingReqs = useRecoilValue(bookingRequests) 
  console.log(bookingReqs);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-8">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">Booking Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookingRequestsss.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
              <h2 className="text-xl font-semibold text-white">{booking.eventName}</h2>
              <p className="text-white opacity-75">Booked by: {booking.bookedBy}</p>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600">Date:</p>
                <p className="font-medium">{booking.dateFrom} to {booking.dateTo}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600">Time:</p>
                <p className="font-medium">{booking.timeFrom} - {booking.timeTo}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600">Hall:</p>
                <p className="font-medium">{booking.hallName}</p>
              </div>
              <div className="mb-6">
                <p className="text-sm text-gray-600">Capacity:</p>
                <p className="font-medium">{booking.hallCapacity} people</p>
              </div>
              <button
                onClick={() => handleApprove(booking.id)}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
              >
                Approve Booking
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}