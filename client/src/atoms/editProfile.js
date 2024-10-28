import { atom } from "recoil";

export const newPasswordAtom = atom({
    key: 'newPasswordAtom',
    default: ''
})

export const confirmPasswordAtom = atom({
    key: 'confirmPasswordAtom',
    default: ''
})
