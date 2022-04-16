import React from "react";
import styles from "./not-found-page.module.css";
import {Link} from "react-router-dom";

export const NotFindPage = () => (
    <div className={styles.error_page_container}>
        <h1>404</h1>
        <p>Page Not Found</p>
        <Link to="/">Home</Link>
    </div>
)