import styles from "../styles/New.module.css"

import React from 'react'

import { FaAngleUp } from "react-icons/fa"

class UpBtn extends React.Component {
    componentDidMount() {
        window.scrollTo(30, 30)
    }

    render() {
        return (
            <div className={styles.upBtn}>
                <a href="#header"><FaAngleUp/></a>
            </div>
        )
    }
}

export default UpBtn;