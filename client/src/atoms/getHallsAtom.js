import axios from "axios";
import { atom, selector } from "recoil";
const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT
export const hallAtom = atom({
    key: 'hallAtom',
    default: selector({
        key: "getHallsSelector",
        get: async () => {
            const halls = await axios.get(`${BACKEND_ENDPOINT}/gethalls`)
            return halls.data
        }
    }, Array)
})