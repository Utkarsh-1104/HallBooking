import axios from "axios";
import { atom, selector } from "recoil";

export const hallAtom = atom({
    key: 'hallAtom',
    default: selector({
        key: "getHallsSelector",
        get: async () => {
            const halls = await axios.get(`https://lncthalls-server.onrender.com/gethalls`)
            return halls.data
        }
    }, Array)
})