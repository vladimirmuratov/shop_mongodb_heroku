import React, {FC} from "react";
import {LoginForm} from "../../components/login-form/login-form";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Redirect} from "react-router-dom";

export const LoginPage: FC = (): JSX.Element => {
    const {isAuth} = useSelector((state: RootState) => state.user)

    if(isAuth){
        return  <Redirect to="/"/>
    }
    return (
        <LoginForm/>
    )
}