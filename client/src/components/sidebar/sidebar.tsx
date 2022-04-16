import React, {useCallback, useEffect, useState} from "react";
import styles from "./sidebar.module.css";
import {NavLink, useHistory, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

export const Sidebar = () => {
    const {type} = useParams<{ type: string }>()
    const history = useHistory()
    const {data, hasError} = useSelector((state: RootState) => state.data)
    const [typeProducts, setTypeProducts] = useState<Array<string>>([])

    useEffect(() => {
        if (data) {
            const tempArr: Array<string> = []
            data.forEach(item => {
                if (tempArr.indexOf(item.type) === -1) {
                    tempArr.push(item.type)
                }
            })
            setTypeProducts(tempArr)
        }
    }, [data])

    const productType = (type: string) => {
        return type === "smartphones" ? "Смартфоны" : type === "televisions" ? "Телевизоры" : type === "refrigerators" && "Холодильники"
    }

    const handleClearFilter = useCallback(() => {
        history.replace({pathname: "/"})
    }, [history])

    return (
        <>
            {(!hasError && data.length) &&
                (<ul className={`sidebar_container ${styles.sidebar_container__position}`}>
                    {typeProducts.map((type, index) => <li key={index}><NavLink activeClassName="activeLink"
                                                                                to={`/products/${type}`}>{productType(type)}</NavLink>
                    </li>)}
                    {type && <li>
                        <button className={styles.clearBtn} onClick={handleClearFilter}>Очистить фильтры</button>
                    </li>}
                </ul>)
            }
        </>
    )
}