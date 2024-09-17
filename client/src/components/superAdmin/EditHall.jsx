import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from 'axios';
import Popup from '../../ui/Alert.jsx';
import { hallCapacityAtom, hallNameAtom } from "../../atoms/addHallAtom.js";
import { eventAtom, textAtom } from "../../atoms/adminRegisterAtoms.js";
import { superAdminAccessAtom } from "../../atoms/accessAtom.js";
import Unauthorized from "../../ui/Unauthorized.jsx";
import { useSearchParams } from "react-router-dom";

const EditHallsPage = () => {
    const access = useRecoilValue(superAdminAccessAtom);

    return (
        <div>
            {(access.msg === 'Authorized') ? <EditHall /> : <Unauthorized />}
        </div>
    );
}

const EditHall = () => {
    const [hallName, setHallName] = useRecoilState(hallNameAtom);
    const [hallCapacity, setHallCapacity] = useRecoilState(hallCapacityAtom);

    const [result, setResult] = useRecoilState(eventAtom);
    const [msg, setMsg] = useRecoilState(textAtom);

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    async function handleSubmit(e) {
        e.preventDefault();

        if (hallName === "" || (hallName.toLowerCase() !== hallName.toUpperCase())) {
            if (hallCapacity || (!isNaN(hallCapacity))) {
                edithall(id);
               
            } else {
                setOpen(true);
                setResult('error');
                setMsg('Hall capacity should be a number.');
            }
        } else {
            setOpen(true);
            setResult('error');
            setMsg('New hall name should be a string.');
        }

        async function edithall(id) {
            try {
                const response = await axios.patch(`http://localhost:3000/updatehall/${id}`, {
                    hall_name: hallName,
                    hall_capacity: hallCapacity,
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
            } catch (e) {
                console.log(e);
            }

            setHallName('');
            setHallCapacity('');
        }
    }

    return (
        <>
            <Popup state={open} handleClose={handleClose} event={result} text={msg} />
            <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 min-h-screen flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-lg bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-2xl">
            <h1 className="text-3xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Edit Halls</h1>
            <p className="text-xl text-blue-100 text-center mb-6">Edit existing hall in the system.</p>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="hallName" className="block text-xl font-medium text-gray-300 mb-1">
                        Hall Name
                    </label>
                    <input
                        type="text"
                        placeholder="New Hall Name"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={hallName}
                        onChange={(e) => {
                        setHallName(e.target.value);
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="hallCapacity" className="block text-xl font-medium text-gray-300 mb-1">
                        Hall Capacity
                    </label>
                    <input
                        type="number"
                        placeholder="New Hall Capacity"
                        id="superPass"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={hallCapacity}
                        onChange={(e) => {
                            setHallCapacity(e.target.value);
                        }}
                    />
                </div>
                <button
                className="w-full text-lg px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:from-purple-600 hover:to-pink-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                type="submit"
                >
                Edit Hall
                </button>
            </form>
            </div>
        </div>
      </>
    );
}

export default EditHallsPage;
