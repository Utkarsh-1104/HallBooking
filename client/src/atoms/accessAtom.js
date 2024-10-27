import axios from "axios";
import { atom, selector } from "recoil";

export const adminAccessAtom = atom({
    key: 'adminAccessAtom',
    default: selector({
        key: 'adminAccessSelector',
        get: async () => {
            const access = await axios.get(`https://lncthalls-server.onrender.com/admindashboard`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            return access.data
        }
    })
})

export const accessAtom = atom({
    key: 'accessAtom',
    default: selector({
        key: 'accessSelector',
        get: async () => {
            const access = await axios.get(`https://lncthalls-server.onrender.com/bothdashboard`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            return access.data
        }
    })
})

export const superAdminAccessAtom = atom({
    key: 'superAdminAccessAtom',
    default: selector({
        key: 'superAdminAccessSelector',
        get: async () => {
            const access = await axios.get(`https://lncthalls-server.onrender.com/superadmindashboard`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            return access.data
        }
    })
})