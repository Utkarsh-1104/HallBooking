import axios from "axios";
import { atom, selector } from "recoil";

export const hallAtom = atom({
    key: 'hallAtom',
    default: selector({
        key: "getHallsSelector",
        get: async () => {
            const halls = await axios.get('http://localhost:3000/gethalls', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            return halls.data
        }
    }, Array)
})