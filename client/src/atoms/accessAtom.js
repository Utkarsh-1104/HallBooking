import axios from "axios";
import { atom, selector } from "recoil";

export const adminAccessAtom = atom({
    key: 'adminAccessAtom',
    default: selector({
        key: 'adminAccessSelector',
        get: async () => {
            const access = await axios.get('http://localhost:3000/admindashboard', {
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
            const access = await axios.get('http://localhost:3000/superadmindashboard', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            return access.data
        }
    })
})