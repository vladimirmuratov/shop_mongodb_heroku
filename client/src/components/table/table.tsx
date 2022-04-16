import React, {useEffect, useState} from "react";
import {TProduct} from "../../types";
import styles from "./table.module.css";
import {CloseIcon} from "../icons/close-icon/close-icon";
import {EditIcon} from "../icons/edit-icon/edit-icon";
import {ModalComponent} from "../modal-component/modal-component";
import {removeFromTable} from "../../store/goods";
import {useDispatch} from "react-redux";
import {Loader} from "../icons/loader/loader";
import {toast} from "react-toastify";

type TProps = {
    data: Array<TProduct>;
    isLoading: boolean;
    message: {};
}

export const Table: React.FC<TProps> = ({data, isLoading, message}): JSX.Element => {
    const dispatch = useDispatch()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [currentProduct, setCurrentProduct] = useState<TProduct>()

    useEffect(() => {
        if (message) {
            toast(message)
        }
    }, [message])

    const handleDelete = (id: string) => {
        const answer = window.confirm(`Вы подтверждаете удаление?`)
        if (answer) {
            dispatch(removeFromTable(id))
        }
    }

    const handleEdit = (id: string) => {
        const prod = data?.find(item => item._id === id)
        setCurrentProduct(prod)
        setModalIsOpen(true)
    }

    const handleModalClose = () => {
        setModalIsOpen(false)
    }

    return (<>
            {!isLoading
                ? <div className={styles.table_wrap}>
                    <table>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Наименование</th>
                            <th>Производитель</th>
                            <th>Стоимость</th>
                            <th>Кол-во</th>
                            <th>Фото</th>
                            <th>Действие</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data?.map(item => (
                            <tr key={item._id}>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td>{item.manufacturer}</td>
                                <td>{item.price}</td>
                                <td>{item.inStock}</td>
                                <td>url</td>
                                <td>
                                    <EditIcon onClick={() => handleEdit(item._id)}/>
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    <CloseIcon onClick={() => {
                                        handleDelete(item._id)
                                    }}/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                : <Loader/>
            }
            {currentProduct &&
            <ModalComponent modalIsOpen={modalIsOpen} onClose={handleModalClose} product={currentProduct}/>}
        </>
    )
}