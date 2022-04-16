import React from "react";
import {useForm} from "react-hook-form";
import {TProduct} from "../../types";
import styles from "./edit-form.module.css";
import {useHistory} from "react-router-dom";
import {create, loadGoods, update} from "../../store/goods";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {toast} from "react-toastify";

type TProps = {
    product?: TProduct;
    onClose: () => void;
    isAdd?: boolean;
}

export const EditForm: React.FC<TProps> = ({product = {}, onClose, isAdd}): JSX.Element => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {data, message} = useSelector((state: RootState) => state.data)
    const {_id, image, inStock, price, manufacturer, name, type} = product
    const {register, handleSubmit, formState: {errors}} = useForm()
    // console.log('errors', Object.keys(errors).length)

    const nextId = "0" + String(data.length + 1)

    function getTypes() {
        const types: Array<string> = []
        data.forEach(item => {
            if (!types.includes(item.type)) {
                types.push(item.type)
            }
        })
        return types
    }

    function getImages() {
        const images: Array<string> = []
        data.forEach(item => {
            if (!images.includes(item.image)) {
                images.push(item.image)
            }
        })
        return images
    }

    const onSubmit = async (data: any) => {
        if (Object.keys(errors).length === 0) {
            if (!isAdd) {
                try {
                    await dispatch(update(data))
                    await dispatch(loadGoods())
                    history.push("/admin")
                } catch (error) {
                    if (message) toast(message)
                }
            } else {
                try {
                    await dispatch(create(data))
                    await dispatch(loadGoods())
                    history.push("/admin")

                } catch (error) {
                    if (message) toast(message)
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`container ${styles.editForm_wrapper}`}>
            <input {...register("_id", {required: true})} defaultValue={_id ? _id : nextId} placeholder="id"/>
            {errors.id?.type === "required" && <span className="error">поле обязательно для заполнения</span>}
            <input {...register("name", {required: true})} defaultValue={name ? name : ""} placeholder="наименование"/>
            {errors.name?.type === "required" && <span className="error">поле обязательно для заполнения</span>}
            <input {...register("manufacturer", {required: true})} defaultValue={manufacturer ? manufacturer : ""}
                   placeholder="производитель"/>
            {errors.manufacturer?.type === "required" && <span className="error">поле обязательно для заполнения</span>}
            <select {...register("type", {required: true})} defaultValue="">

                {type
                    ? <option value={type}>{type}</option>
                    : <>
                        <option value="" disabled hidden>Выберите тип...</option>
                        {getTypes().map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </>
                }
            </select>
            {errors.type?.type === "required" && <span className="error">поле обязательно для заполнения</span>}
            <input {...register("price", {required: true})} defaultValue={price ? price : ""} placeholder="цена"/>
            {errors.price?.type === "required" && <span className="error">поле обязательно для заполнения</span>}
            <input {...register("inStock", {required: true})} defaultValue={inStock ? inStock : ""}
                   placeholder="в наличии"/>
            {errors.inStock?.type === "required" && <span className="error">поле обязательно для заполнения</span>}
            <select {...register("image", {required: true})} defaultValue="">

                {image
                    ? <option value={image}>{type}</option>
                    : <>
                        <option value="" disabled hidden>Выберите фото...</option>
                        {getTypes().map((type, index) => (
                            <option key={type} value={getImages()[index]}>{type}</option>
                        ))}
                    </>
                }
            </select>
            {errors.image?.type === "required" && <span className="error">поле обязательно для заполнения</span>}
            <button type="submit" className="btn">СОХРАНИТЬ</button>
            &nbsp;
            <button type="button" className="btn" onClick={onClose}>ОТМЕНА</button>
        </form>
    )
}