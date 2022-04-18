import React, {FC, useCallback, useEffect, useState} from "react";
import {useHistory, useLocation, useParams} from "react-router-dom";
import styles from "./search.module.css";

export const Search: FC = (): JSX.Element => {
    const history = useHistory()
    const {pathname} = useLocation<any>()
    const [inputVal, setInputVal] = useState<string>('')

    const handleChange = useCallback((e) => {
        setInputVal(e.target.value)
    }, [])

    useEffect(() => {
        if(pathname !== '/'){
            setInputVal('')
        }
    }, [pathname])

    useEffect(() => {
        if (inputVal.length) {
            history.push({pathname: '/', search: `?name=${inputVal}`})
        } else {
            history.push("/")
        }
    }, [history, inputVal])

    return (
        <div className={styles.search_container}>
            <input
                value={inputVal}
                onChange={handleChange}
                type="search"
                placeholder="поиск по названию"
            />
        </div>
    )
}