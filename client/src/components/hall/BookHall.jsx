import { useRecoilValue } from "recoil"
import { adminAccessAtom } from "../../atoms/accessAtom"
import Unauthorized from "../../ui/Unauthorized"

const BookHall = () => {
    const auth = useRecoilValue(adminAccessAtom) 
  
    return (
      <div className="bg-black min-h-screen font-[Roboto] ">
        {(auth.msg === "Authorized") ? <BookHallFunction /> : <Unauthorized /> }
      </div>
    )
}


function BookHallFunction() {
    return (
        <div className="text-white">
            <h1>Book Hall</h1>
        </div>
    )
}

export default BookHall