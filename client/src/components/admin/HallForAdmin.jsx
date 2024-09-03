/* eslint-disable react/prop-types */
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { capitalize } from '@mui/material';

const HallForAdmin = (props) => {
  const navigate = useNavigate();
  const name = capitalize(props.hall_name);
  const id = props.id;

  return (
    <>
    <div className='xl:w-[80%] w-full flex flex-col sm:flex-row justify-between items-center bg-[#1C1C1C] text-white p-6 sm:px-20 rounded-md'>
      <h1 className="text-xl sm:text-2xl text-center sm:text-left mb-4 sm:mb-0">{name}</h1>
      <button 
        className='w-full sm:w-28 h-8 border flex items-center justify-center gap-2 py-4 hover:bg-white hover:text-black'
        onClick={() => { navigate(`/adminpage/hallsettings/viewhalladmin?id=${id}`); }}
        >
        View <VisibilityIcon fontSize='small' />
      </button>
    </div>
  </>
  );
};


export default HallForAdmin;
