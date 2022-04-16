import React from "react";
import {AdminPanel} from "../../components/admin-panel/admin-panel";
import styles from "./admin-page.module.css";

export const AdminPage: React.FC = (): JSX.Element => {
    return(
        <div className={styles.adminPage_wrapper}>
            <AdminPanel/>
        </div>
    )
}