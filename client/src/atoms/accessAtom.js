import axios from "axios";
import { atom, selector } from "recoil";

const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT

export const adminAccessAtom = atom({
    key: 'adminAccessAtom',
    default: selector({
        key: 'adminAccessSelector',
        get: async () => {
            const access = await axios.get(`${BACKEND_ENDPOINT}/admindashboard`, {
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
            const access = await axios.get(`${BACKEND_ENDPOINT}/bothdashboard`, {
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
            const access = await axios.get(`${BACKEND_ENDPOINT}/superadmindashboard`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            return access.data
        }
    })
})