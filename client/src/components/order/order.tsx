import React, {useEffect, useState} from "react";
import {TOrder} from "../../store/types/order";
import styles from "./order.module.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {TProduct} from "../../types";
import {completeOrder, removeOrder} from "../../store/order";

export const Order: React.FC<TOrder> = ({order, userId, _id: orderId, createdAt, completed}): JSX.Element => {
    const dispatch = useDispatch()
    const {data: goods} = useSelector((state: RootState) => state.data)
    const [currentProducts, setCurrentProducts] = useState<Array<TProduct>>([])

    const handleComplete = (orderId: "" | undefined | string) => {
        dispatch(completeOrder(orderId))
    }

    const handleRemove = (orderId: string | undefined) => {
        const answer = window.confirm(`Вы удаляете заказ № ${orderId && orderId.slice(-4)}. Продолжить?`)
        if (answer) {
            dispatch(removeOrder(orderId))
        }
    }

    useEffect(() => {
        setCurrentProducts([])
        for (const item of goods) {
            for (const orderItem of order) {
                if (item._id === orderItem.id) {
                    setCurrentProducts(prevState => ([
                        ...prevState,
                        {
                            ...item,
                            count: orderItem.count
                        }
                    ]))
                }
            }
        }
    }, [goods, order])

    return (
        <div className={styles.order_container}>
            <p>orderId: <span className={styles.order_title}>{orderId?.slice(-4)}</span></p>
            <p>userId: <span className={styles.order_title}>{userId.slice(-4)}</span></p>
            {createdAt &&
            <p>created_at: <span className={styles.order_title}>{new Date(createdAt).toLocaleString()}</span></p>}
            {completed ? <p style={{color: "#00CC00", fontSize: 16, letterSpacing: 1}}>заказ выполнен</p> :
                <p style={{color: "white", fontSize: 16, letterSpacing: 1}}>заказ не выполнен</p>}
            <div className={styles.currentProducts}>
                {currentProducts.map((item, index) => (
                    <div key={index}>
                        <span>{item._id.slice(-4)}</span>
                        <span>{item.name}</span>
                        <span>{item.manufacturer}</span>
                        <span>{item.price}</span>
                        <span>{item.count}</span>
                        {item.count && <span>{item.price * item.count}</span>}
                    </div>
                ))}
            </div>
            {!completed
                ? <button className="btn" onClick={() => handleComplete(orderId)}>выполнить</button>
                : <button className="btn" style={{backgroundColor: "red"}}
                          onClick={() => handleRemove(orderId)}>удалить</button>
            }
        </div>
    )
}