import axios from "axios";
import configFile from "../configFile.json";
import {setTokens} from "./localStorage.service";

export const httpAuth = axios.create({
    baseURL: configFile.apiEndpoint + "/auth"
})

export const httpAuthService = {
    signUp: async ({name, email, password, ...rest}: any) => {
        try {
            const {data} = await httpAuth.post(`/signUp`, {
                name,
                email,
                password,
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            })
            await setTokens(data)
            return data
        } catch (error: any) {
            const {code, message} = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = "Пользователь с таким Email уже существует"
                    throw errorObject;
                }
            }
        }
    },
    signIn: async ({email, password}: { email: string; password: string; }) => {
        try {
            const {data} = await httpAuth.post(`/signInWithPassword`, {
                email,
                password,
                returnSecureToken: true
            })
            setTokens(data)
            return data
        } catch (error: any) {
            const {code, message} = error.response.data.error
            if (code === 400) {
                if (message === 'EMAIL_NOT_FOUND') {
                    const errorObject = "Email введен неверно"
                    throw errorObject
                }
                if (message === 'INVALID_PASSWORD') {
                    const errorObject = "Пароль введен неверно"
                    throw errorObject
                }
            }
        }

    }
}