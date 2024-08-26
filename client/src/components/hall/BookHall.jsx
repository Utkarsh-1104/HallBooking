import { useRecoilValue } from "recoil"
import { hallAtom } from "../../atoms/getHallsAtom"

const BookHall = () => { 
    
    const halls = useRecoilValue(hallAtom)
    return (
        <div className="text-white px-4 sm:px-6 lg:px-8">
            <h1>Book Halls</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {halls.map(hall => (
                    <div key={hall._id} className="bg-gray-700 p-4 rounded-lg">
                    <h2>{hall.hall_name}</h2>
                    <p>{hall.hall_capacity}</p>
                </div>
                ))}
            </div>
        </div>
    )
}

export default BookHall