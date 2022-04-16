import React, {useState} from "react";
import styles from "./header.module.css";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {logoutUser} from "../../store/user";
import {MobileMenuIcon} from "../icons/mobile-menu-icon/mobile-menu-icon";

export const Header = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {isAuth, data} = useSelector((state: RootState) => state.user)
    const {name, image, email} = data
    const {cart} = useSelector((state: RootState) => state.data)
    const isAdmin = email.toLowerCase().includes("admin")
    const [isShowMobileMenuList, setIsShow] = useState(false)

    const toggleMenuList = () => setIsShow(!isShowMobileMenuList)

    const handleLogOut = () => {
        dispatch(logoutUser())
        history.push("/")
    }

    return (
        <>
            <header className={styles.header_container}>
                <Link to="/"><h1>Internet Shop</h1></Link>
                <div className={styles.block_links}>
                    {isAuth
                        ? (<>
                            <Link to="/cart" className={styles.cart_container}>
                                Карзина
                                {cart.length !== 0 && <span className={styles.cart_counter}>{cart.length}</span>}
                            </Link>
                            <div className={styles.block_name}>
                            <span className={styles.link_name}>
                                {name}
                            </span>
                                <ul className={styles.drop_menu}>
                                    {isAdmin && <li><Link to="/admin">admin_panel</Link></li>}
                                    <li><Link to="/profile">Profile</Link></li>
                                    <li onClick={handleLogOut}>Log Out</li>
                                </ul>
                                <span className={styles.triangle_icon}/>
                            </div>
                            <img src={image} alt="avatar" height="40"/>
                        </>)

                        : <Link to="/login">Вход/Регистрация</Link>
                    }
                </div>
                <span className={styles.mobile_menu} onClick={toggleMenuList}><MobileMenuIcon/></span>
            </header>
            {isShowMobileMenuList &&
                <ul className={styles.mobile_menu__list}>
                    {isAuth
                        ? (<>
                            <li>
                                <Link to="/cart" className={styles.cart_container}>
                                    Карзина
                                    {cart.length !== 0 && <span className={styles.cart_counter}>{cart.length}</span>}
                                </Link>
                            </li>
                            {isAdmin && <li><Link to="/admin">admin_panel</Link></li>}
                            <li>Profile</li>
                            <li onClick={handleLogOut}>Log Out</li>
                        </>)
                        : (<li><Link to="/login">Вход/Регистрация</Link></li>)
                    }
                </ul>
            }
        </>
    )
}