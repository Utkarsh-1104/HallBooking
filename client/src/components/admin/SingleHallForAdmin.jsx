/* eslint-disable react/prop-types */
// import { useRecoilState } from "recoil";
// import { superAdminAccessAtom } from "../../atoms/accessAtom";
// import Unauthorized from "../../ui/Unauthorized";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import { pink } from '@mui/material/colors';
// import { eventAtom, textAtom } from "../../atoms/adminRegisterAtoms";
// import Popup from "../../ui/Alert";


const SingleHallForAdmin = () => {
    return (
      <div className="bg-black min-h-screen font-[Roboto]">
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
                const res = await axios.get(`http://localhost:3000/gethalls/${id}`)
                setHall(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        singeAdmin();
    }, [id])

    return (
        <div className="h-fit p-4 ">
            <h1 className='text-white font-[Poppins] text-xl sm:text-3xl text-center sm:text-left ps-0 pt-16 sm:ps-40 '>
                View Hall Details
            </h1>
            <hr className="mx-auto w-full sm:w-[80%] h-[1.5px] bg-[#373647] border-0 rounded mt-6" />
            <div className="min-h-[80%] flex flex-wrap items-center justify-center my-10 overflow-y-auto">
                <div className="flex flex-col justify-between items-stretch bg-[#1C1C1C] text-white text-2xl gap-3 p-6 sm:px-8 rounded-md">
                    <h1>Hall name: {hall.hall_name}</h1>
                    <h1>Hall Capacity: {hall.hall_capacity}</h1>
                    <h1>Hall Bookings: </h1>
                    <div className="flex flex-wrap gap-4" >
                        {hall.hall_availability && hall.hall_availability.map((booking) => (
                            <HallBookings
                            key={booking._id}
                            hall_id={hall._id}
                            booking_id={booking.booking_id}
                            date={booking.date}
                            from={booking.time_from}
                            to={booking.time_to}
                            booked_by={booking.booked_by}
                            event_name={booking.event_name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function HallBookings(props) {
    // const [result, setResult] = useRecoilState(eventAtom);
    // const [msg, setMsg] = useRecoilState(textAtom);

    // const [open, setOpen] = useState(false);

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setOpen(false);
    // };
    return (
        <>
            {/* <Popup state={open} handleClose={handleClose} event={result} text={msg} /> */}
            <div className="flex items-start justify-start gap-6 border p-4 ">
                <div>
                    <h1>Date: {props.date} </h1>
                    <h1>From: {props.from} </h1>
                    <h1>To: {props.to} </h1>
                    <h1>Booked by: {props.booked_by} </h1>
                    <h1>Event: {props.event_name} </h1>
                    <h1>Id: {props.booking_id} </h1>
                </div>
                {/* <button onClick={deleteBooking.bind(this, props.hall_id, props.booking_id, setOpen, setResult, setMsg)}>
                    <DeleteForeverIcon sx={{ color: pink[500] }} />
                </button> */}
            </div>
        </>
    );
}

// async function deleteBooking(hall_id, booking_id, setOpen, setResult, setMsg) {
//     try {
//         const response = await axios.post(`http://localhost:3000/removebooking/${hall_id}`,
//             {
//                 booking_id: booking_id
//             },
//         {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         });
//         const res = await response.data;

//         if (res.status === 200) {
//             setOpen(true);
//             setResult('success');
//             setMsg(res.msg + " Please refresh the page.");
            
//             const refrest = setTimeout(() => {
//             window.location.reload();
//             clearTimeout(refrest);
//             }, 2000);
//         } else {
//             setOpen(true);
//             setResult('error');
//             setMsg(res.msg);
//         }
//     } catch (error) {
//         setOpen(true);
//         setResult('error');
//         setMsg("Some error occured. Couldn't delete booking.");
        
//     }
    
// }

export default SingleHallForAdmin