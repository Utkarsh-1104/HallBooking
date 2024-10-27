import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from 'axios';
import Popup from '../../ui/Alert.jsx';
import { hallBuildingAtom, hallCapacityAtom, hallCollegeAtom, hallNameAtom } from "../../atoms/addHallAtom.js";
import { eventAtom, textAtom } from "../../atoms/adminRegisterAtoms.js";
import { superAdminAccessAtom } from "../../atoms/accessAtom.js";
import Unauthorized from "../../ui/Unauthorized.jsx";
import { useSearchParams } from "react-router-dom";
const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT
const EditHallsPage = () => {
    const access = useRecoilValue(superAdminAccessAtom);

    return (
        <div className="bg-gradient-to-br from-slate-100 to-slate-400 text-gray-800">
            {(access.msg === 'Authorized') ? <EditHall /> : <Unauthorized />}
        </div>
    );
}

const EditHall = () => {
    const [hallName, setHallName] = useRecoilState(hallNameAtom);
    const [hallCapacity, setHallCapacity] = useRecoilState(hallCapacityAtom);
    const [hallBuilding, setHallBuilding] = useRecoilState(hallBuildingAtom);
    const [hallCollege, setHallCollege] = useRecoilState(hallCollegeAtom);

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
                if (hallBuilding === "" || (hallBuilding.toLowerCase() !== hallBuilding.toUpperCase())) {
                    if (hallCollege === "" || (hallCollege.toLowerCase() !== hallCollege.toUpperCase())) {
                        edithall(id);
                    } else {
                        setOpen(true);
                        setResult('error');
                        setMsg('College name should be a string.');
                    }
                } else {
                    setOpen(true);
                    setResult('error');
                    setMsg('Building name should be a string.');
                }    
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
                const response = await axios.patch(`${BACKEND_ENDPOINT}/updatehall/${id}`, {
                    hall_name: hallName,
                    hall_capacity: hallCapacity,
                    college: hallCollege,
                    building: hallBuilding
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
            setHallBuilding('');
            setHallCollege('');
        }
    }

    return (
        <>
            <Popup state={open} handleClose={handleClose} event={result} text={msg} />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-400 p-4 sm:p-6">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="bg-blue-600 py-6 px-8 text-white">
                        <h1 className="text-[2rem] font-bold">Edit Halls</h1>
                        <p className="text-blue-100 text-lg mt-1">Leave the field empty for the details you dont wanna update.</p>
                    </div>
                    <div className="p-8">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="hallName" className="block text-lg font-medium text-gray-700">
                                    Hall Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="New Hall Name"
                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    value={hallName}
                                    onChange={(e) => {
                                    setHallName(e.target.value);
                                    }}
                                />
                            </div>

                            <div>
                                <label htmlFor="hallCapacity" className="block text-lg font-medium text-gray-700">
                                    Hall Capacity
                                </label>
                                <input
                                    type="number"
                                    placeholder="New Hall Capacity"
                                    id="superPass"
                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    value={hallCapacity}
                                    onChange={(e) => {
                                        setHallCapacity(e.target.value);
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="hallBuilding" className="block text-lg font-medium text-gray-700">
                                    Building Name
                                </label>
                                <input
                                    type="text"
                                    id="hallBuilding"
                                    placeholder="Enter building name"
                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    value={hallBuilding}
                                    onChange={(e) => setHallBuilding(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="hallCollege" className="block text-lg font-medium text-gray-700">
                                    College Name
                                </label>
                                <input
                                    type="text"
                                    id="hallCollege"
                                    placeholder="Enter college name"
                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    value={hallCollege}
                                    onChange={(e) => setHallCollege(e.target.value)}
                                />
                            </div>
                            <button
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 transition-all duration-300 ease-in-out transform hover:bg-blue-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
                            type="submit"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Edit Hall
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditHallsPage;
