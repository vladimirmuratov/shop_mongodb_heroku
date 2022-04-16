import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrders} from "../../store/order";
import {RootState} from "../../store/store";
import {Order} from "../../components/order/order";
import styles from "./order-page.module.css";
import _ from "lodash";

export const OrderPage: React.FC = (): JSX.Element => {
    const dispatch = useDispatch()
    const {orders} = useSelector((state: RootState) => state.order)
    const sortedOrders = _.orderBy(orders, ["created_at"], ["desc"])

    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch])

    return (
        <>
            {sortedOrders.length
                ? (<div className={styles.orderPage_wrapper}>
                    {sortedOrders.map(order => <Order key={order._id} {...order}/>)}
                </div>)
                : <h1>Заказов нет</h1>
            }
        </>
    )
}