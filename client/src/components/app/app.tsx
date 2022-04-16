import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import styles from './app.module.css';
import {MainPage} from "../../pages/main-page/main-page";
import {Header} from "../header/header";
import {ProductDetailsPage} from "../../pages/product-details-page/product-details-page";
import {NotFindPage} from "../../pages/not-found-page/not-found-page";
import {Loader} from "../icons/loader/loader";
import {LoginPage} from "../../pages/login-page/login-page";
import {CartPage} from "../../pages/cart-page/cart-page";
import {ProtectedRoute} from '../protected-route/protected-route';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {AdminPage} from "../../pages/admin-page/admin-page";
import {loadGoods} from "../../store/goods";
import {getCurrentUser} from "../../store/user";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {ProfilePage} from "../../pages/profile-page/profile-page";

function App() {
    const dispatch = useDispatch()
    const {isLoading, hasError, message} = useSelector((state: RootState) => state.data)

    useEffect(() => {
        dispatch(loadGoods())
        dispatch(getCurrentUser())
    }, [dispatch])

    return (
        <div className={styles.app}>
            <Header/>
            {isLoading
                ? <Loader/>
                : (<>
                    <Switch>
                        <ProtectedRoute exact path="/cart">
                            <CartPage/>
                        </ProtectedRoute>
                        <ProtectedRoute exact path="/admin">
                            <AdminPage/>
                        </ProtectedRoute>
                        <Route exact path="/login" component={LoginPage}/>
                        <Route exact path="/admin" component={AdminPage}/>
                        <Route exact path="/profile" component={ProfilePage}/>
                        <Route exact path="/:products?/:type?" component={MainPage}/>
                        <Route exact path="/products/:type/:id" component={ProductDetailsPage}/>
                        <Route path="*" component={NotFindPage}/>
                    </Switch>
                </>)
            }
            {hasError && message && <div className={styles.block_error}>{message}</div>}
            <ToastContainer/>
        </div>
    );
}

export default App;
