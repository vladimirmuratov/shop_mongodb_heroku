import React, {FC} from "react";
import styles from "./pagination.module.css";

type TProps = {
    page: number;
    totalPages: number;
    firstContentIndex: number;
    lastContentIndex: number;
    nextPage: () => void;
    prevPage: () => void;
    setPage: (page: number) => void;
}

export const Pagination: FC<TProps> = ({page, totalPages, prevPage, setPage, nextPage}): JSX.Element => {
    return (
        <div className={styles.pagination}>
            <p className={styles.text}>
                {page}/{totalPages}
            </p>
            <button onClick={prevPage} className={`${styles.page} ${page === 1 && styles.disabled}`}>
                &larr;
            </button>
            {/* @ts-ignore */}
            {[...Array(totalPages).keys()].map((el) => (
                <button
                    onClick={() => setPage(el + 1)}
                    key={el}
                    className={`${styles.page} ${page === el + 1 ? styles.active : ""}`}
                >
                    {el + 1}
                </button>
            ))}
            <button onClick={nextPage} className={`${styles.page} ${page === totalPages && styles.disabled}`}>
                &rarr;
            </button>
        </div>)
}