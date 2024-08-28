/* eslint-disable react/prop-types */
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useNavigate } from 'react-router-dom';
import { capitalize } from '@mui/material';

const ExistingAdmins = (props) => {
  const navigate = useNavigate();
  const name = capitalize(props.fname) + " " + capitalize(props.lname);
  const id = props.id;

  return (
    <div className='xl:w-[80%] w-full flex flex-col sm:flex-row justify-between items-center bg-[#1C1C1C] text-white p-6 sm:px-8 rounded-md'>
      <h1 className="text-xl sm:text-2xl text-center sm:text-left mb-4 sm:mb-0">{name}</h1>
      <div className='flex gap-2 sm:gap-4 flex-wrap justify-center'>
        <button 
          className='w-full sm:w-28 h-8 border flex items-center justify-center gap-2 py-4 hover:bg-white hover:text-black'
          onClick={() => { navigate(`/superadminpage/adminsettings/viewadmin:${id}`); }}
        >
          View <VisibilityIcon fontSize='small' />
        </button>
        <button 
          className='w-full sm:w-28 h-8 border flex items-center justify-center gap-2 py-4 hover:bg-white hover:text-black'
          onClick={() => { navigate(`/superadminpage/adminsettings/editadmin:${id}`); }}
        >
          Edit <EditIcon fontSize='small' />
        </button>
        <button 
          className='w-full sm:w-28 h-8 border flex items-center justify-center gap-2 py-4 hover:bg-white hover:text-black'
          onClick={() => { navigate(`/superadminpage/adminsettings/deleteadmin:${id}`); }}
        >
          Delete <PersonRemoveIcon fontSize='small' />
        </button>
      </div>
    </div>
  );
};

export default ExistingAdmins;
