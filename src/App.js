import React from 'react';
import './App.css';
import {connect} from "react-redux";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import {makeStyles} from "@material-ui/styles";
import {Paper} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import Product from "./components/Product/Product";
import ProductCreatorForm from "./components/ProductCreator/ProductCreator";
import {addProduct, changeProductCost, changeProductCount, removeProduct} from "./redux/appReducer";
import {getAppProducts} from "./redux/appSelectors";

const useStyles = makeStyles({

    paper: {
        maxWidth: 650,
        boxShadow: '0 0 10px gray'
    },
    table: {
        minWidth: 650,
    },

    body: {
        height: '160px',
        overflowY: 'auto',
    },
});

const App = ({products, addProduct, removeProduct, changeProductCount, changeProductCost}) => {
    const classes = useStyles();
    const {paper, table, body} = classes

    const onSubmit = (data) => {
        addProduct(data)
    }
    return (
        <div className="App">
            <ProductCreatorForm onSubmit={onSubmit}/>
            <div className="shopBasket">
                <TableContainer className={paper}
                                component={Paper}
                >
                    <Table className={table}
                           aria-label="simple table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Count</TableCell>
                                <TableCell align="right">Cost for 1</TableCell>
                                <TableCell align="right">Total Cost</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={body}>
                            {products.map((row) => <Product {...row}
                                                            key={row.id}
                                                            removeProduct={removeProduct}
                                                            changeProductCount={changeProductCount}
                                                            changeProductCost={changeProductCost}
                            />)}
                        </TableBody>
                        <tfoot>
                        <TableRow>
                            <TableCell colSpan={1}></TableCell>
                            <TableCell colSpan={2}><b>Total Price</b></TableCell>
                            <TableCell align="right"> <b>
                                {products.reduce((acc, {totalCost}) => (acc + totalCost), 0)}
                            </b></TableCell>
                        </TableRow>
                        </tfoot>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

let mapStateToProps = (state) => ({
    products: getAppProducts(state)
})
export default connect(mapStateToProps, {addProduct, removeProduct, changeProductCount, changeProductCost})(App);
