import React, {FC, useEffect, useState} from "react";
import styles from "./main-page.module.css";
import {FilterSidebar} from "../../components/filter-sidebar/filter-sidebar";
import {TProduct} from "../../types";
import {Card} from "../../components/card/card";
import {useLocation, useParams} from "react-router-dom";
import query from "query-string";
import {usePagination} from "../../hooks/usePagination";
import {Pagination} from "../../components/pagination/pagination";
import {Search} from "../../components/search/search";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {SortSideBar} from "../../components/sort-sidebar/sort-sidebar";
import _ from "lodash";

export const MainPage: FC = (): JSX.Element => {
    const {data} = useSelector((state: RootState) => state.data)
    const {type} = useParams<{ type: string }>()
    const {search} = useLocation()
    const [isResetPage, setIsResetPage] = useState(false)
    const [filterByType, setFilterByType] = useState<Array<TProduct>>()
    const [filterByName, setFilterByName] = useState<Array<TProduct>>()
    const [sortProducts, setSortProducts] = useState<Array<TProduct>>()
    const [isSorted, setIsSorted] = useState(false)
    const [priceOrderType, setPriceOrderType] = useState<"asc" | "desc">("asc")
    const [nameOrderType, setNameOrderType] = useState<"asc" | "desc">("asc")
    const [manufacturerOrderType, setManufacturerOrderType] = useState<"asc" | "desc">("asc")
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
        setIsResetPage(prevState => !prevState)
    }, [name])

    const handleSort = (iteratees, orders) => {
        if (iteratees === "price") {
            const numberPrice = data.map(item => ({
                ...item,
                price: Number(item.price)
            }))
            const sortedArr = _.orderBy(numberPrice, [iteratees], [orders])
            setSortProducts(sortedArr)
            setPriceOrderType(prevState => prevState === "asc" ? "desc" : "asc")
            setIsSorted(true)
        } else {
            const sortedArr = _.orderBy(data, [iteratees], [orders])
            setSortProducts(sortedArr)
            if (iteratees === "name") {
                setNameOrderType(prevState => prevState === "asc" ? "desc" : "asc")
                setIsSorted(true)
            } else if (iteratees === "manufacturer") {
                setManufacturerOrderType(prevState => prevState === "asc" ? "desc" : "asc")
                setIsSorted(true)
            }
        }
    }

    const handleClear = () => {
        setIsSorted(false)
        setSortProducts(undefined)
    }

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

    const productsOnPage = name ? filterByName : type ? filterByType : sortProducts ? sortProducts : data

    return (
        <>
            <Search/>
            <main className={styles.mainPage_container}>
                <FilterSidebar/>
                <ul className={styles.mainPage_content}>
                    {name && !filterByName?.length &&
                    <p className={styles.error}>{`По запросу "${name}" ничего не найдено`}</p>}
                    {productsOnPage?.slice(firstContentIndex, lastContentIndex).map(item => <Card
                        key={item._id} {...item}/>)}
                </ul>
                <SortSideBar
                    onSort={handleSort}
                    priceOrderType={priceOrderType}
                    nameOrderType={nameOrderType}
                    manufacturerOrderType={manufacturerOrderType}
                    isSorted={isSorted}
                    onClear={handleClear}
                />
                {totalPages && (<div className={styles.mainPage_pagination}>
                    <Pagination page={page} totalPages={totalPages} firstContentIndex={firstContentIndex}
                                lastContentIndex={lastContentIndex} nextPage={nextPage} prevPage={prevPage}
                                setPage={setPage} isResetPage={isResetPage}/>
                </div>)}
            </main>
        </>
    )
}