import React from "react";
import styles from "./sort-sidebar.module.css";

type TProps = {
    onSort: (iteratees, orders) => void;
    onClear: () => void;
    priceOrderType: string;
    nameOrderType: string;
    manufacturerOrderType: string;
    isSorted: boolean;
}

export const SortSideBar: React.FC<TProps> = ({
                                                  onSort,
                                                  priceOrderType,
                                                  nameOrderType,
                                                  manufacturerOrderType,
                                                  isSorted,
                                                  onClear
                                              }): JSX.Element => {
    return (
        <ul className={`sidebar_container ${styles.sort_sidebar_container} ${styles.sort_sidebar_container__position}`}>
            <li>Сортировка по:</li>
            <li className={styles.sort_sidebar_title} onClick={() => onSort("price", priceOrderType)}>
                цена:
                {
                    priceOrderType === "asc"
                        ? <span className={styles.sort_sidebar_subtitle}>по возрастанию</span>
                        : <span className={styles.sort_sidebar_subtitle}>по убыванию</span>
                }
            </li>
            <li className={styles.sort_sidebar_title} onClick={() => onSort("name", nameOrderType)}>
                наименование:
                {
                    nameOrderType === "asc"
                        ? <span className={styles.sort_sidebar_subtitle}>по возрастанию</span>
                        : <span className={styles.sort_sidebar_subtitle}>по убыванию</span>
                }
            </li>
            <li className={styles.sort_sidebar_title} onClick={() => onSort("manufacturer", manufacturerOrderType)}>
                производитель:
                {
                    manufacturerOrderType === "asc"
                        ? <span className={styles.sort_sidebar_subtitle}>по возрастанию</span>
                        : <span className={styles.sort_sidebar_subtitle}>по убыванию</span>
                }
            </li>
            {isSorted
                ? <li
                    className={styles.sort_sidebar_title__clear}
                    onClick={onClear}
                >
                    очистить
                </li>
                : ""
            }
        </ul>
    )
}