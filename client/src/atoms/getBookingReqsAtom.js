import axios from "axios";
import { atom, selector } from "recoil";

export const bookingRequests = atom({
    key: 'bookingRequests',
    default: selector({
        key: "getBookingReqsSelector",
        get: async () => {
            const bookingReqs = await axios.get('http://localhost:3000/getbookingreqs',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            const reqs = []
            bookingReqs.data.bookingReqs.forEach(req => {
                if (req.length > 0) {
                    reqs.push(req)
                }
            });
            return reqs
        }
    })
})