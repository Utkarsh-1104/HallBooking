import { atom } from "recoil";

export const newUsernameAtom = atom({
    key: 'newUsernameAtom',
    default: ''
})

export const newPasswordAtom = atom({
    key: 'newPasswordAtom',
    default: ''
})