import axios from "axios";
import { atom, selector } from "recoil";

export const adminsAtom = atom({
    key: 'adminsAtom',
    default: selector({
        key: 'adminsAtomSelector',
        get: async () => {
            const admins = await axios.get('https://lncthalls-server.onrender.com/getadmins',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            return admins.data
        }
    })
})