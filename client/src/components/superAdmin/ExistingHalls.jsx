/* eslint-disable react/prop-types */
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import { capitalize } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { eventAtom, textAtom } from '../../atoms/adminRegisterAtoms';
import Popup from '../../ui/Alert';

const ExistingHalls = (props) => {
  const navigate = useNavigate();
  const name = capitalize(props.hall_name);
  const id = props.id;

  const [result, setResult] = useRecoilState(eventAtom);
  const [msg, setMsg] = useRecoilState(textAtom);

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Popup state={open} handleClose={handleClose} event={result} text={msg} />
      <div className='w-full bg-[#605e5e] bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-2xl text-white'>
        <div className='flex flex-col sm:flex-row justify-between items-center'>
          <h1 className="text-xl sm:text-2xl tracking-wide font-bold mb-4 sm:mb-0">{name}</h1>
          <div className='flex flex-wrap justify-center gap-2 sm:gap-4'>
            <button 
              className='w-full sm:w-auto px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:from-purple-600 hover:to-pink-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center'
              onClick={() => { navigate(`/superadminpage/hallsettings/viewhall?id=${id}`); }}
            >
              View <VisibilityIcon className="ml-2" fontSize='small' />
            </button>
            <button 
              className='w-full sm:w-auto px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:from-purple-600 hover:to-pink-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center'
              onClick={() => { navigate(`/superadminpage/hallsettings/edithall?id=${id}`); }}
            >
              Edit <EditIcon className="ml-2" fontSize='small' />
            </button>
            <button 
              className='w-full sm:w-auto px-5 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:from-red-600 hover:to-pink-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center justify-center'
              onClick={() => deleteHall(id, setOpen, setResult, setMsg)}
            >
              Delete <DeleteForeverIcon className="ml-2" fontSize='small' />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

async function deleteHall(id, setOpen, setResult, setMsg) {
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

export default ExistingHalls;