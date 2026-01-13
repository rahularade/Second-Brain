import api from "../lib/axios"
import type { UserSigninInput, UserSignupInput } from "../schemas/user.schema"

export const signup = async (data: UserSignupInput) => {
    const res = await api.post("/user/signup", data)
    return res.data
}

export const signin = async (data: UserSigninInput) => {
    const res = await api.post("/user/signin", data)
    return res.data
}