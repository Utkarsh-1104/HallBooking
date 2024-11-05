import { useRecoilValue } from "recoil"
import { hallAtom } from "../../atoms/getHallsAtom"
import HallForAdmin from "../admin/HallForAdmin"

const ViewBookings = () => {
    const halls = useRecoilValue(hallAtom)
  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-400 min-h-screen text-gray-800">
        <div className="py-10 px-6 sm:px-24">
            <h1 className="text-2xl mb-8 sm:text-3xl font-bold text-center sm:text-left">
            View Bookings
            </h1>
            <hr className="w-full h-[1.5px] bg-gray-900 border-0 rounded mb-8" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {halls.map(hall => (
                <HallForAdmin
                    key={hall._id}
                    id={hall._id}
                    hall_name={hall.hall_name}
                />
                ))}
            </div>
        </div>
    </div>
  )
}

export default ViewBookings