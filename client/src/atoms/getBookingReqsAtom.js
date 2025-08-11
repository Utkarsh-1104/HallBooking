import axios from "axios";
import { atom, selector } from "recoil";

export const bookingRequests = atom({
    key: 'bookingRequests',
    default: selector({
        key: "getBookingReqsSelector",
        get: async () => {
            const bookingReqs = await axios.get(`https://lncthalls-server.onrender.com/getbookingreqs`,
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
            const final_reqs = []
            reqs.forEach(req => {
                req.forEach(indi_req => {
                    final_reqs.push(indi_req)
                })
            })
            final_reqs.sort((a, b) => new Date(b.booking_req_at) - new Date(a.booking_req_at))
            return final_reqs
        }
    })
})
