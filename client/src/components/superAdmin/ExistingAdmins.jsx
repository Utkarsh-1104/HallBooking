/* eslint-disable react/prop-types */
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useNavigate } from 'react-router-dom';
import { capitalize } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { eventAtom, textAtom } from '../../atoms/adminRegisterAtoms';
import Popup from '../../ui/Alert';

const ExistingAdmins = (props) => {
  const navigate = useNavigate();
  const name = capitalize(props.fname) + " " + capitalize(props.lname);
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
        <h1 className="text-xl sm:text-2xl font-bold tracking-wider mb-4 sm:mb-0">{name}</h1>
        <div className='flex flex-wrap justify-center gap-2 sm:gap-4'>
          <button 
            className='w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:from-purple-600 hover:to-pink-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center'
            onClick={() => { navigate(`/superadminpage/adminsettings/viewadmin?id=${id}`); }}
            >
            View <VisibilityIcon className="ml-2" fontSize='small' />
          </button>
          <button 
            className='w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:from-purple-600 hover:to-pink-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center'
            onClick={() => { navigate(`/superadminpage/adminsettings/editadmin?id=${id}`); }}
            >
            Edit <EditIcon className="ml-2" fontSize='small' />
          </button>
          <button 
            className='w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:from-red-600 hover:to-pink-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center justify-center'
            onClick={deleteAdmin.bind(this, id, setOpen, setResult, setMsg)}
            >
            Delete <PersonRemoveIcon className="ml-2" fontSize='small' />
          </button>
        </div>
      </div>
    </div>
  </>
  );
};

async function deleteAdmin(id, setOpen, setResult, setMsg) {
  
  const response = await axios.delete(`https://lncthalls-server.onrender.com/removeadmins/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }); 
  const res = await response.data;

  if (res.status === 200) {
    setOpen(true);
    setResult('success');
    setMsg(res.msg + " Please refresh the page.");

    const refresh = setTimeout(() => {
      window.location.reload();
      clearTimeout(refresh);
    }, 2000);
    
  } else {
    setOpen(true);
    setResult('error');
    setMsg(res.msg);
  }

}

export default ExistingAdmins;
