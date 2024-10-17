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
    <div className='w-full flex flex-col sm:flex-row justify-between items-center bg-blue-600 rounded-xl p-6 shadow-2xl text-white sm:px-10'>
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-0">{name}</h1>
      <button 
        className='w-full sm:w-auto px-4 py-2 bg-[#E17833] text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center'
        onClick={() => { navigate(`/adminpage/hallsettings/viewhalladmin?id=${id}`); }}
        >
        View <VisibilityIcon className='ml-2' fontSize='small' />
      </button>
    </div>
  </>
  );
};


export default HallForAdmin;
