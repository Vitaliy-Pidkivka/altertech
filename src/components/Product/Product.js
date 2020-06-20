import React, {useEffect, useState} from 'react'
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    error: {
        border: '3px solid red',
        outline: 'none',
        boxShadow: '0 0 4px red'
    },
    cursor: {
        cursor: 'pointer',
        transition: 'all .3s ease',
        '&:hover': {
            background: 'yellow'
        }
    }
})

const Product = ({id, name, count, cost, totalCost, removeProduct, changeProductCount, changeProductCost}) => {
    const classes = useStyles()
    const {error, cursor} = classes

    const [isEditCount, setIsEditCount] = useState(false)
    const [isEditCost, setIsEditCost] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        changeProductCount(id, count)
        changeProductCost(id, cost)
    }, [changeProductCount, count, changeProductCost, cost, id])

    const onRemove = (id) => {
        removeProduct(id)
    }

    const changeCount = (e) => {
        if (e.key === 'Enter') {
            if (!isNaN(+e.currentTarget.value)) {
                changeProductCount(id, e.currentTarget.value)
                setIsEditCount(false)
            } else {setIsError(true)}
        }
    }
    const changeCost = (e) => {
        if (e.key === 'Enter') {
            if (!isNaN(+e.currentTarget.value)) {
                changeProductCost(id, +e.currentTarget.value)
                setIsEditCost(false)
            } else {setIsError(true)}
        }
    }


    return (
        <TableRow key={id}>
            <TableCell component="th"
                       scope="row">
                {name}
            </TableCell>
            <TableCell align="right"
                       className={cursor}
                       onDoubleClick={() => {
                           setIsEditCount(true)
                           setIsError(false)
                       }}
                       onBlur={() => {
                           setIsEditCount(false)
                       }}

            >
                {!isEditCount && count}
                {isEditCount && <input className={(isError && error) || ''}
                                       type="text"
                                       autoFocus={true}
                                       onKeyPress={changeCount}
                                       placeholder={count}
                />}
            </TableCell>
            <TableCell align="right"
                       className={cursor}
                       onDoubleClick={() => {
                           setIsEditCost(true)
                           setIsError(false)
                       }}
                       onBlur={() => {
                           setIsEditCost(false)
                       }}

            >
                {!isEditCost && cost}
                {isEditCost && <input className={(isError && error) || ''}
                                      type="text"
                                      autoFocus={true}
                                      onKeyPress={changeCost}
                                      placeholder={cost}
                />}
            </TableCell>
            <TableCell align="right">
                {totalCost}
            </TableCell>
            <TableCell align="right">
                <IconButton aria-label="delete"
                            onClick={() => {
                                onRemove(id)
                            }}
                >
                    <DeleteIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default Product