import { atom } from "recoil";

export const usernameAtom = atom({
    key: 'usernameLoginAtom',
    default: ''
})

export const passwordAtom = atom({
    key: 'passwordLoginAtom',
    default: ''
})

export const loginStatusAtom = atom({
    key: 'loginStatusAtom',
    default: ''
})

export const loginMsgAtom = atom({
    key: 'loginMsgAtom',
    default: ''
})