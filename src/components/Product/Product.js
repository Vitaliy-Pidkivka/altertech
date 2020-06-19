import React, {useEffect, useState} from 'react'
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    error: {
        boxShadow: '0 0 3px red'
    }
})

const Product = ({id, name, count, cost, totalCost, removeProduct, changeProductCount, changeProductCost}) => {
    const classes = useStyles()
    const {error} = classes

    const [isEditCount, setIsEditCount] = useState(false)
    const [isEditCost, setIsEditCost] = useState(false)
    const [isError, setIsError] = useState(false)
    const [tempValue, setTempValue] = useState(null);

    const onRemove = (id) => {
        removeProduct(id)
    }

    const changeCount = (e) => {
        if (e.key === 'Enter') {
            if (tempValue != null) {
                console.log(typeof +tempValue)
                changeProductCount(id, +tempValue)
                setIsEditCount(false)
            } else {
                setIsError(true)
            }
        }
    }
    const onChange = (e) => {
        setTempValue(e.currentTarget.value)
    }

    return (
        <TableRow key={id}>
            <TableCell component="th"
                       scope="row">
                {name}
            </TableCell>
            <TableCell align="right"
                       onDoubleClick={() => {
                           setTempValue('')
                           setIsEditCount(true)
                       }}
                       onBlur={() => {

                           setIsEditCount(false)
                       }}

            >
                {!isEditCount && count}
                {isEditCount && <input className={(isError && error) || ''}
                                       type="text"
                                       autoFocus={true}
                                       onChange={onChange}
                                       onKeyPress={changeCount}
                />}
            </TableCell>
            <TableCell align="right"
                       onDoubleClick={() => {
                           setIsEditCost(true)
                           setTempValue('')
                       }}
                       onBlur={() => {
                           setIsEditCost(false)
                       }}

            >
                {!isEditCost && cost}
                {isEditCost && <input className={(isError && error) || ''}
                                      type="text"
                                      autoFocus={true}
                                      onChange={onChange}
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