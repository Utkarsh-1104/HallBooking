/* eslint-disable react/prop-types */
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { eventAtom, textAtom } from '../../atoms/adminRegisterAtoms';
import Popup from '../../ui/Alert';
import { hallAtom } from '../../atoms/getHallsAtom';

const ExistingHalls = () => {
  const halls = useRecoilValue(hallAtom);

  const navigate = useNavigate();

  const [result, setResult] = useRecoilState(eventAtom);
  const [msg, setMsg] = useRecoilState(textAtom);

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  async function deleteHall(id) {
    try {
      const response = await axios.delete(`http://localhost:3000/removehall/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const res = response.data;
  
      if (res.status === 200) {
        setOpen(true);
        setResult('success');
        setMsg(res.msg + " Please refresh the page.");
        
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setOpen(true);
        setResult('error');
        setMsg(res.msg);
      }
    } catch (error) {
      setOpen(true);
      setResult('error');
      setMsg('An error occurred while deleting the hall.');
    }
  }

  return (
    <>
      {<Popup state={open} handleClose={handleClose} event={result} text={msg} />}
      {halls.map(hall => (
        <div key={hall._id} className='w-full flex flex-col sm:flex-row justify-between items-center bg-blue-600 rounded-xl p-6 shadow-2xl text-white'>
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">{hall.hall_name}</h1>
          <div className='flex flex-wrap justify-center gap-2 sm:gap-4'>
            <button 
              className='w-full sm:w-auto px-4 py-2 bg-[#E17833] text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center'
              onClick={() => { navigate(`/superadminpage/hallsettings/viewhall?id=${hall._id}`); }}
            >
              View <VisibilityIcon className="ml-2" fontSize='small' />
            </button>
            <button 
              className='w-full sm:w-auto px-4 py-2 bg-[#E17833] text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center'
              onClick={() => { navigate(`/superadminpage/hallsettings/edithall?id=${hall._id}`); }}
            >
              Edit <EditIcon className="ml-2" fontSize='small' />
            </button>
            <button 
              className='w-full sm:w-auto px-4 py-2 bg-[#e14733] text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:bg-[#b03d2e] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center'
              onClick={() => deleteHall(hall._id, setOpen, setResult, setMsg)}
            >
              Delete <DeleteForeverIcon className="ml-2" fontSize='small' />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};



export default ExistingHalls;