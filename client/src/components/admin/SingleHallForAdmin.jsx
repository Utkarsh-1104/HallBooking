/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SingleHallForAdmin = () => {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 min-h-screen font-[Roboto] text-white">
        {<ViewHallAdmin />}
      </div>
    );
}

function ViewHallAdmin() {

    const [hall, setHall] = useState({});
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        async function singeAdmin() {
            try {
                const res = await axios.get(`https://lncthalls-server.onrender.com/gethalls/${id}`)
                setHall(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        singeAdmin();
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
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <>
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
            <p className="text-xl"><span>Booking ID:</span> {props.booking_id}</p>
          </div>
        )}
        </div>
        </>
    );
}

export default SingleHallForAdmin