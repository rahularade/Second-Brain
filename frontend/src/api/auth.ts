import api from "../lib/axios"
import type { ChangePasswordInput, UserSigninInput, UserSignupInput } from "../schemas/user.schema"

export const signup = async (data: UserSignupInput) => {
    const res = await api.post("/user/signup", data)
    return res.data
}

export const signin = async (data: UserSigninInput) => {
    const res = await api.post("/user/signin", data)
    return res.data
}

export const changePassword = async (data: ChangePasswordInput) => {
    const res = await api.post("/user/change-password", {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
    })
    return res.data
}

export const signout = async () => {
    const res = await api.post("/user/signout")
    return res.data
}

export const deleteAccount = async () => {
    const res = await api.delete("/user/me")
    return res.data
}