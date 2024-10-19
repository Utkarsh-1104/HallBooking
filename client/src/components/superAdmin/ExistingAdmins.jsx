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

  const bg = (props.role === 'superadmin') ? 'bg-[#261063]' : 'bg-blue-600';

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
    <div className={`w-full flex flex-col justify-between items-center gap-3 ${bg} rounded-xl p-4 shadow-2xl text-white`}>
      <div className='flex flex-col justify-between items-center gap-3'>
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">{name}</h1>
        <div className='flex flex-wrap justify-center gap-3 '>
          <button 
            className='w-full sm:w-auto px-4 py-2 bg-[#E17833] text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center'
            onClick={() => { navigate(`/superadminpage/adminsettings/viewadmin?id=${id}`); }}
            >
            View <VisibilityIcon className="ml-2" fontSize='small' />
          </button>
          <button 
            className='w-full sm:w-auto px-4 py-2 bg-[#E17833] text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center'
            onClick={() => { navigate(`/superadminpage/adminsettings/editadmin?id=${id}`); }}
            >
            Edit <EditIcon className="ml-2" fontSize='small' />
          </button>
          <button 
            className='w-full sm:w-auto px-4 py-2 bg-[#e14733] text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:bg-[#b03d2e] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center'
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
  
  const response = await axios.delete(`http://localhost:3000/removeadmins/${id}`,
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
