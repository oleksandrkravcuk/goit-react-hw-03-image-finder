import React from 'react';
import styles from '../styles.module.css';
const Button = ({ onClick }) => {
    return (
        <button className={styles.Button} onClick={onClick}>
        Load more
        </button>
    );
};

export default Button;