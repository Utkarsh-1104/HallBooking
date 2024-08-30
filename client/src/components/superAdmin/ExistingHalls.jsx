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
    <div className='xl:w-[80%] w-full flex flex-col sm:flex-row justify-between items-center bg-[#1C1C1C] text-white p-6 sm:px-8 rounded-md'>
      <h1 className="text-xl sm:text-2xl text-center sm:text-left mb-4 sm:mb-0">{name}</h1>
      <div className='flex gap-2 sm:gap-4 flex-wrap justify-center'>
        <button 
          className='w-full sm:w-28 h-8 border flex items-center justify-center gap-2 py-4 hover:bg-white hover:text-black'
          onClick={() => { navigate(`/superadminpage/adminsettings/viewadmin?id=${id}`); }}
          >
          View <VisibilityIcon fontSize='small' />
        </button>
        <button 
          className='w-full sm:w-28 h-8 border flex items-center justify-center gap-2 py-4 hover:bg-white hover:text-black'
          onClick={() => { navigate(`/superadminpage/adminsettings/editadmin?id=${id}`); }}
          >
          Edit <EditIcon fontSize='small' />
        </button>
        <button 
          className='w-full sm:w-28 h-8 border flex items-center justify-center gap-2 py-4 hover:bg-white hover:text-black'
          onClick={deleteAdmin.bind(this, id, setOpen, setResult, setMsg)}
          >
          Delete <DeleteForeverIcon fontSize='small' />
        </button>
      </div>
    </div>
  </>
  );
};

async function deleteAdmin(id, setOpen, setResult, setMsg) {
  
  const response = await axios.delete(`http://localhost:3000/removehall/${id}`,
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
  } else {
    setOpen(true);
    setResult('error');
    setMsg(res.msg);
  }

}

export default ExistingHalls;
