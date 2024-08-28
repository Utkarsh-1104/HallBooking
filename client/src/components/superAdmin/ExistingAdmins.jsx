/* eslint-disable react/prop-types */
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useNavigate } from 'react-router-dom';
import { capitalize } from '@mui/material';

const ExistingAdmins = (props) => {
  const navigate = useNavigate();
  const name = capitalize(props.fname) + " " + capitalize(props.lname)
  const id = props.id
  return (
    <div className='w-[80%] flex justify-between items-center bg-[#1C1C1C] text-white py-4 px-8 rounded-md '>
        <h1 className="text-2xl" >{name}</h1>
        <div className='flex gap-4' >
            <button className='w-28 h-8 border flex items-center justify-center gap-2 hover:bg-white hover:text-black' onClick={() => {navigate(`/superadminpage/adminsettings/viewadmin:${id}`)}} >View <VisibilityIcon fontSize='small' /> </button>
            <button className='w-28 h-8 border flex items-center justify-center gap-2 hover:bg-white hover:text-black' onClick={() => {navigate(`/superadminpage/adminsettings/editadmin:${id}`)}} >Edit <EditIcon fontSize='small' /> </button>
            <button className='w-28 h-8 border flex items-center justify-center gap-2 hover:bg-white hover:text-black' onClick={() => {navigate(`/superadminpage/adminsettings/deleteadmin:${id}`)}} >Delete <PersonRemoveIcon fontSize='small' /> </button>
        </div>
    </div>
  )
}

export default ExistingAdmins