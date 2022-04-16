import React, {useEffect, useState} from "react";
import styles from "./login-form.module.css";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {Loader} from "../icons/loader/loader";
import {toast} from "react-toastify";
import {loginUser, registerUser} from "../../store/user";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {getRandomAvatar} from "../../utils/getRandomAvatar";

export const LoginForm: React.FC = (): JSX.Element => {
    const dispatch = useDispatch()
    const {isLoading, hasError, message} = useSelector((state: RootState) => state.user)
    const [status, setStatus] = useState<"login" | "register">("login")
    const [type, setType] = useState<"password" | "text">("password")
    const [isEqual, setIsEqual] = useState<boolean | undefined>(undefined)
    const {register, handleSubmit, formState: {errors}} = useForm()

    useEffect(() => {
        if (hasError && message) {
            toast(message)
        }
    }, [hasError, message])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (data.password === data.repeat_password) {
            setIsEqual(true)
        } else {
            setIsEqual(false)
        }
        if (status === "register" && data.password === data.repeat_password && !errors.email && !errors.password) {
            const dataRegister = {
                name: data.name,
                email: data.email,
                password: data.password,
                image: getRandomAvatar()
            }
            dispatch(registerUser(dataRegister))
        }
        if (status === "login") {
            const payload = {email: data.email, password: data.password}
            dispatch(loginUser(payload))
        }
    }

    const toggleStatus = () => {
        setStatus(status === "login" ? "register" : "login")
    }

    const toggleType = () => {
        setType(prevState => prevState === "password" ? "text" : "password")
    }

    return (
        <>
            {!isLoading
                ? (<div className="form_position container">
                    <h1 className={styles.form_title}>{status === "login" ? "ВХОД" : status === "register" && "РЕГИСТРАЦИЯ"}</h1>
                    <form className="form_container" onSubmit={handleSubmit(onSubmit)}>
                        {status === "register" && (
                            <>
                                <label>имя</label>
                                <input
                                    {...register("name", {required: true})}
                                />
                                {errors.name?.type === "required" &&
                                <span className="error">поле обязательно для заполнения</span>}
                            </>
                        )}
                        <label>email</label>
                        <input
                            {...register("email", {
                                required: true,
                                pattern: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
                            })}
                        />
                        {errors.email?.type === "required" &&
                        <span className="error">поле обязательно для заполнения</span>}
                        {errors.email?.type === "pattern" &&
                        <span className="error">email введен некорректно</span>}
                        <label>пароль</label>
                        <input
                            type={type}
                            onDoubleClick={toggleType}
                            {...register("password", {
                                required: true,
                                minLength: 8,
                                pattern: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]/g
                            })}
                        />
                        {errors.password?.type === "required" &&
                        <span className="error">поле обязательно для заполнения</span>}
                        {errors.password?.type === "minLength" &&
                        <span className="error">пароль должен быть не менее 8 символов</span>}
                        {errors.password?.type === "pattern" &&
                        <span className="error">пароль должен состоять не менее чем из одной цифры, одного спец.символа, одной строчной и прописной латинской буквы</span>}
                        {status === "register" &&
                        (<>
                            <label>повторите пароль</label>
                            <input
                                {...register("repeat_password", {
                                    required: true
                                })}
                            />
                            {errors.repeat_password?.type === "required" &&
                            <span className="error">поле обязательно для заполнения</span>}
                            {isEqual === false && <span className="error">повтор не верен</span>}
                        </>)
                        }
                        <button type="submit" className={styles.btn_login_form}>Submit</button>
                        {status === "login" &&
                        <p className={styles.wrapper_link}>
                            Ещё не зарегистрированы?
                            &nbsp;
                            <span className={styles.link} onClick={toggleStatus}>Регистрация</span>
                        </p>}
                        {status === "register" &&
                        <p className={styles.wrapper_link}>
                            Вспомнили пароль?
                            &nbsp;
                            <span className={styles.link} onClick={toggleStatus}>Вход</span>
                        </p>}
                    </form>
                </div>)
                : <Loader/>
            }
        </>
    )
}