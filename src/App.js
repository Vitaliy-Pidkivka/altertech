import React  from 'react';
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
import {
    addNewProduct,
    changeProductCost,
    changeProductCount,
    removeProduct, sortCostAscending, sortCountAscending, sortTotalCostAscending,
} from "./redux/appReducer";
import {getAppProducts, getState} from "./redux/appSelectors";

const useStyles = makeStyles({
    root: {
        minWidth: 650,
        '& button': {
            padding: '2px 8px',
        },
        '& th': {
            padding: '2px 8px',
        },

        '& td':{
            padding: '2px 8px'
        },

    },
    title: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        margin: '10px 0',
        fontSize: 20
    },
    paper: {
        maxWidth: 650,
        boxShadow: '0 0 10px gray'
    },
    body: {
        height: '160px',
        overflowY: 'auto',
    },
    empty: {
        display: 'none'
    },
    btn:{
        transition: 'all .3s ease',
       '&:hover':{
           cursor: 'pointer',
           background: 'gray'
       }
    }
});


const App = (props) => {
    const {products, addNewProduct, removeProduct, changeProductCount,
        changeProductCost, sortCountAscending, sortCostAscending, sortTotalCostAscending} = props
    const classes = useStyles()
    const {root,title, paper, body, empty, btn} = classes


    const onSubmit = (data) => {
        addNewProduct(data)
    }
    return (
        <div className="App">
            <ProductCreatorForm onSubmit={onSubmit}/>
            <div className="shopBasket">
                <TableContainer className={paper}
                                component={Paper}
                >
                    <p className={title}>Shopping basket</p>
                    <Table className={root}
                           aria-label="simple table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell className={btn}

                                >
                                    Name</TableCell>
                                <TableCell className={btn}
                                           align="right"
                                           onClick={()=> {sortCountAscending()}}
                                >Count</TableCell>
                                <TableCell className={btn}
                                           align="right"
                                           onClick={()=>{sortCostAscending()}}
                                >Cost for 1</TableCell>
                                <TableCell className={btn}
                                           align="right"
                                           onClick={()=>{sortTotalCostAscending()}}
                                >Total Cost</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={body}>
                            {products.map((row) =>
                                <Product {...row}
                                         key={row.id}
                                         removeProduct={removeProduct}
                                         changeProductCount={changeProductCount}
                                         changeProductCost={changeProductCost}
                                />)}
                        </TableBody>
                        <tfoot>
                        <TableRow>
                            <TableCell colSpan={1}><span className={empty}>empty</span></TableCell>
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

const mapStateToProps = (state) => ({
    products: getAppProducts(state),
    state: getState(state)
})
export default connect(mapStateToProps, {addNewProduct, removeProduct,
    changeProductCount, changeProductCost, sortCountAscending, sortCostAscending, sortTotalCostAscending})(App);

