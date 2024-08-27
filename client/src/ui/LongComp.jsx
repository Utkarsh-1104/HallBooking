/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import GroupsIcon from '@mui/icons-material/Groups';
import { common } from '@mui/material/colors'
const LongComp = (props) => {
  const navigate = useNavigate()
  return (
      <div className="w-[80%] flex gap-7 justify-center items-center ">
        <div className="w-[4.5rem] bg-[#363636] text-center p-2 rounded-xl">
          { (props.icon === "MeetingRoomIcon") ? <MeetingRoomIcon sx={{ color: common.white, fontSize: 40}} /> : <GroupsIcon sx={{ color: common.white, fontSize: 40}} /> }
        </div>
        <div className="">
          <h3 className="text-2xl text-white font-medium">{props.title}</h3>
          <p className="text-lg font-medium text-[#959595]">{props.msg}</p>
        </div>
        <button className="w-44 h-10 text-white border rounded-sm xl:ms-auto hover:bg-white hover:text-black" onClick={() => {navigate(`/superadminpage/${props.page}`)}} >Go to Page</button>
      </div>
  )
}


export default LongComp