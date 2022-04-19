import React, {FC, useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import styles from "./product-details-page.module.css";
import {GoBackIcon} from "../../components/icons/go-back-icon/go-back-icon";
import {addProdToCart, removeFromCart} from "../../store/goods";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {localStorageService} from "../../services/localStorage.service";

export const ProductDetailsPage: FC = (): JSX.Element => {
    const dispatch = useDispatch()
    const {id} = useParams<{ type: string, id: string }>()
    const {data, cart} = useSelector((state: RootState) => state.data)
    const findProduct = data.find(item => item._id === id)
    const [count, setCount] = useState(1)
    const [total, setTotal] = useState<number | null>(null)
    const [addedInCart, setAddedToCart] = useState(false)
    const {price, image, name, inStock} = findProduct || {}

    const handleAddProductToCart = useCallback((id, count) => {
        let payload = {id, count}
        cart.forEach(item => {
            if (item.id === id) {
                payload.count = item.count + count
                dispatch(addProdToCart(payload))
                dispatch(removeFromCart(id))
            }
        })
        dispatch(addProdToCart(payload))
        setAddedToCart(true)
    }, [dispatch])

    useEffect(() => {
        price && setTotal(count * price)
    }, [count, findProduct, price])

    const handleIncrementCount = useCallback(() => {
        setCount(prevState => prevState + 1)
    }, [])

    const handleDecrementCount = useCallback(() => {
        if (count > 1) {
            setCount(prevState => prevState - 1)
        }
    }, [count])

    useEffect(() => {
        if (cart.length) {
            localStorageService.setCart(JSON.stringify(cart))
        }
    }, [cart])

    return (
        <>
            {findProduct &&
            (<div className={styles.wrapper}>
                <GoBackIcon/>
                <div className="container">
                    <picture>
                        <img className="img" src={image} alt={name}/>
                    </picture>
                    <div className="content">
                        <p className={styles.product_name}>{name}</p>
                        <p className={styles.product_count}>
                            <span>в наличии:</span>
                            &nbsp;
                            {inStock
                                ? <span>{inStock}</span>
                                : <span style={{
                                    backgroundColor: "grey",
                                    color: "aliceblue",
                                    padding: 5
                                }}>нет в наличии</span>}
                        </p>
                        <p className={styles.product_count}>{`количество: ${count}`}
                            &nbsp;
                            {inStock
                                ? (<span>
                                    {inStock && ((count < inStock) &&
                                        <i className="bi bi-caret-up-fill" onClick={handleIncrementCount}/>)}
                                    {count > 1 && <i className="bi bi-caret-down-fill" onClick={handleDecrementCount}/>}
                                    </span>)
                                : ""}
                        </p>
                        <p className={styles.product_price}>{`стоимость: $ ${total}`}</p>
                        {addedInCart && <p style={{color: '#00cc00'}}>Товар добавлен в карзину</p>}
                        <p className={styles.product_id}>{`id: ${id.slice(-4)}`}</p>
                        {inStock ? (<button
                            className={`btn ${styles.btn_position}`}
                            onClick={() => handleAddProductToCart(id, count)}
                        >
                            Добавить в корзину
                        </button>) : ""}
                    </div>
                </div>
            </div>)
            }
        </>
    )
}