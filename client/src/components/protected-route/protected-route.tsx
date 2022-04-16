import React, {FC} from "react";
import {Redirect, Route, RouteProps} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

export const ProtectedRoute: FC<RouteProps> = ({children, ...rest}): JSX.Element => {
    const {isAuth} = useSelector((state: RootState) => state.user)

    return (
        <Route
            {...rest}
            render={() => {
                return isAuth ? children : <Redirect to="/login"/>
            }}
        />
    )
}