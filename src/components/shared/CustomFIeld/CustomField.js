import React from 'react'
import styles from './CustomField.module.scss'

const CustomField = ({input,meta, meta: {touched, error}, ...props}) => {
    let hasError = touched && error
    let typeField = props.types
    let {id} = props
    return (
        <div className={`${styles['custom-field']} ${hasError ? styles.error : ''}`}>
            {typeField === 'input' && <input {...input} {...props} className={styles.input} id={id}/>}
            {!typeField && <span> </span>}

            {hasError && <div>{error}</div>}
        </div>
    )
}

export  default  CustomField