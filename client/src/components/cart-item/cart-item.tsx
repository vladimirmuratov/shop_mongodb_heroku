import React, {FC, useCallback, useEffect} from "react";
import {TProduct} from "../../types";
import styles from "./cart-item.module.css";
import {CloseIcon} from "../icons/close-icon/close-icon";
import {removeFromCart} from "../../store/goods";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {localStorageService} from "../../services/localStorage.service";

type TProps = TProduct

export const CartItem: FC<TProps> = ({_id, name, image, price, count}): JSX.Element => {
    const dispatch = useDispatch()
    const {cart} = useSelector((state: RootState) => state.data )

    const handleDeleteCartItem = useCallback(() => {
        dispatch(removeFromCart(_id))
    }, [dispatch, _id])

    useEffect(() => {
        localStorageService.setCart(JSON.stringify(cart))
    }, [cart])

    return (
        <li className={styles.cartItem_container}>
                <CloseIcon onClick={handleDeleteCartItem} position={styles.cartItem_delete_icon__position}/>
            <picture>
                <img className={styles.cartItem_image} src={image} alt={name}/>
            </picture>
            <div className={styles.cartItem_section}>
                <p>{`id: ${_id.slice(-4)}`}</p>
                <p className={styles.cartItem_title}>{name}</p>
            </div>
            {count && <p>{`Количество: ${count}`}</p>}
            {count && <p>{`Стоимость: ${(count * price).toLocaleString()}`}</p>}
        </li>
    )
}