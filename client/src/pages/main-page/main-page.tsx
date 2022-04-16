import React, {FC, useEffect, useState} from "react";
import styles from "./main-page.module.css";
import {Sidebar} from "../../components/sidebar/sidebar";
import {TProduct} from "../../types";
import {Card} from "../../components/card/card";
import {useLocation, useParams} from "react-router-dom";
import query from "query-string";
import {usePagination} from "../../hooks/usePagination";
import {Pagination} from "../../components/pagination/pagination";
import {Search} from "../../components/search/search";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

export const MainPage: FC = (): JSX.Element => {
    const {data} = useSelector((state: RootState) => state.data)
    const {type} = useParams<{ type: string }>()
    const {search} = useLocation()
    const [filterByType, setFilterByType] = useState<Array<TProduct>>()
    const [filterByName, setFilterByName] = useState<Array<TProduct>>()
    const {name} = query.parse(search)
    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        setPage,
        totalPages,
    } = usePagination({
        contentPerPage: 2,
        count: name ? filterByName?.length : type ? filterByType?.length : data?.length,
    })

    useEffect(() => {
        if (type) {
            const filteredItems = data?.filter(item => item.type === type)
            setFilterByType(filteredItems)
        }
    }, [data, type])

    useEffect(() => {
        if (name?.length !== 0) {
            if (typeof name === "string") {
                const filterItems = data?.filter(item => item.name.toLowerCase().includes(name))
                setFilterByName(filterItems)
            }
        }
    }, [data, name])

    const productsOnPage = name ? filterByName : type ? filterByType : data

    return (
        <>
            <Search/>
            <main className={styles.mainPage_container}>
                <Sidebar/>
                <ul className={styles.mainPage_content}>
                    {name && !filterByName?.length &&
                    <p className={styles.error}>{`По запросу "${name}" ничего не найдено`}</p>}
                    {productsOnPage?.slice(firstContentIndex, lastContentIndex).map(item => <Card
                        key={item._id} {...item}/>)}
                </ul>
                {totalPages && (<div className={styles.mainPage_pagination}>
                    <Pagination page={page} totalPages={totalPages} firstContentIndex={firstContentIndex}
                                lastContentIndex={lastContentIndex} nextPage={nextPage} prevPage={prevPage}
                                setPage={setPage}/>
                </div>)}
            </main>
        </>
    )
}