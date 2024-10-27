import axios from "axios";
import { atom, selector } from "recoil";
const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT
export const adminsAtom = atom({
    key: 'adminsAtom',
    default: selector({
        key: 'adminsAtomSelector',
        get: async () => {
            const admins = await axios.get(`${BACKEND_ENDPOINT}/getadmins`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            return admins.data
        }
    })
})