import React, {FC, useCallback} from "react";
import {useHistory} from "react-router-dom";
import {TProduct} from "../../types";
import styles from "./card.module.css";

export const Card: FC<TProduct> = ({_id, type, image, name, price, manufacturer}): JSX.Element => {
    const history = useHistory()

    const handleBtnClick = useCallback(() => {
        history.push({pathname: `/products/${type}/${_id}`})
    }, [history, _id, type])

    return (
        <li className="container">
            <picture>
                <img className="img" src={image} alt={name}/>
            </picture>
            <div className="content">
                <p className={styles.card_name}>{name}</p>
                <p className={styles.card_id}>{`id: ${_id.slice(-4)}`}</p>
                <p className={styles.card_manufacturer}>{`Производитель: ${manufacturer}`}</p>
                <p className={styles.card_price}>{`$ ${price}`}</p>
                <button className={`btn ${styles.btn_position}`} onClick={handleBtnClick}>Открыть карточку</button>
            </div>
        </li>)
}