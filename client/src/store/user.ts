import {createSlice} from "@reduxjs/toolkit";
import userService from "../services/user.service";
import {httpAuthService} from "../services/httpAuth.service";
import {localStorageService} from "../services/localStorage.service";
import {TUserState} from "./types/user";

const initialState: TUserState = {
    isAuth: false,
    isLoading: false,
    hasError: false,
    message: "",
    data: {
        _id: "",
        name: "",
        email: "",
        image: ""
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        requested(state) {
            state.isLoading = true
            state.hasError = false
            state.message = ""
            state.data = {
                _id: "",
                name: "",
                email: "",
                image: ""
            }
        },
        received(state, action) {
            state.data = action.payload
            state.isAuth = true
            state.isLoading = false
            state.hasError = false
            state.message = ""
        },
        failed(state, action) {
            state.isLoading = false
            state.hasError = true
            state.message = action.payload
        },
        logout(state) {
            state.isAuth = false
            state.isLoading = false
            state.message = ""
            state.hasError = false
            state.data = {
                _id: "",
                name: "",
                email: "",
                image: ""
            }
        }
    }
})

const {actions, reducer: userReducer} = userSlice
const {requested, received, failed, logout} = actions

export const getCurrentUser = () => async (dispatch: any) => {
    if (localStorageService.getAccessToken()) {
        dispatch(requested())
        try {
            const {content} = await userService.getCurrentUser()
            if (content) {
                dispatch(received(content))
            }
        } catch (error) {
            dispatch(failed(error))
        }
    }
}

export const registerUser = (payload: { email: string; password: string; }) => async (dispatch: any) => {
    dispatch(requested())
    try {
        await httpAuthService.signUp(payload)
        dispatch(getCurrentUser())
    } catch (error) {
        dispatch(failed(error))
    }
}

export const loginUser = (payload: { email: string; password: string; }) => async (dispatch: any) => {
    dispatch(requested())
    try {
        await httpAuthService.signIn(payload)
        dispatch(getCurrentUser())
    } catch (error) {
        dispatch(failed(error))
    }
}

export const logoutUser = () => {
    localStorageService.removeToken()
    return logout()
}

export default userReducer