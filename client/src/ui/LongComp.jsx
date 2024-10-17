/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import GroupsIcon from '@mui/icons-material/Groups';
import { common } from '@mui/material/colors'
const LongComp = (props) => {
  const navigate = useNavigate()
  return (
      <div className="flex flex-col gap-6 sm:flex-row items-center justify-between">
        <div className="flex items-center justify-center">
          <div className="w-[4.5rem] text-center p-2 rounded-xl">
            { (props.icon === "MeetingRoomIcon") ? <MeetingRoomIcon sx={{ color: common.gray, fontSize: 50}} /> : <GroupsIcon sx={{ color: common.gray, fontSize: 50}} /> }
          </div>
          <div className="ml-3">
            <h3 className="text-2xl font-bold text-gray-700">{props.title}</h3>
            <p className="text-lg font-medium text-gray-600">{props.msg}</p>
          </div>
        </div>
        <button className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center" onClick={() => {navigate(`/superadminpage/${props.page}`)}} >Go to Page</button>
      </div>
  )
}


export default LongComp