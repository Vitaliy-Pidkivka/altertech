import {reset} from 'redux-form';

const ADD_PRODUCT = 'shoppingBasket/ADD-PRODUCT';
const REMOVE_PRODUCT = 'shoppingBasket/REMOVE-PRODUCT';
const CHANGE_PRODUCT_COUNT = 'shoppingBasket/CHANGE-PRODUCT-COUNT';
const CHANGE_PRODUCT_COST = 'shoppingBasket/CHANGE-PRODUCT-COST';
const SORT_ALPHABETICALLY = 'shoppingBasket/SORT-ALPHABETICALLY';

let initialState = {
    products: [
        {id: 1, name: 'Alcatel', count: 3, cost: 30, totalCost: null},
        {id: 2, name: 'Nokia', count: 1, cost: 40, totalCost: null},
        {id: 3, name: 'Siemens C65', count: 2, cost: 1000, totalCost: null},
    ],
    newProductId: 0,
}

let appReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_PRODUCT:
            state.products.map(product => {
                if (product.id > state.newProductId) {
                    state.newProductId = product.id
                }
                return null
            })
            return {
                ...state,
                products: [
                    ...state.products,
                    {id: state.newProductId + 1, ...action}
                ]
            }
        case REMOVE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.id)
            }

        case CHANGE_PRODUCT_COUNT:
            return {
                ...state,
                products: state.products.map(product => {
                    if (product.id === action.id) {
                        return {
                            ...product,
                            count: action.count,
                            totalCost: product.cost * product.count
                        }
                    } else {
                        return product
                    }
                })
            }
        case CHANGE_PRODUCT_COST:
            return {
                ...state,
                products: state.products.map(product => {
                    if (product.id === action.id) {
                        return {
                            ...product,
                            cost: action.cost,
                            totalCost: product.cost * product.count
                        }
                    } else {
                        return product
                    }
                })
            }
        default:
            return {
                ...state,
                products: state.products.map(product => {
                    return {
                        ...product,
                        totalCost: product.cost * product.count
                    }
                })
            }
    }
}

export const addProduct = ({name, count, cost}) => ({type: ADD_PRODUCT, name, count, cost})
export const removeProduct = (id) => ({type: REMOVE_PRODUCT, id})
export const changeProductCount = (id, count) => ({type: CHANGE_PRODUCT_COUNT, id, count})
export const changeProductCost = (id, cost) => ({type: CHANGE_PRODUCT_COST, id, cost})
// thunk
export const addNewProduct = (values) => dispatch => {
 dispatch(addProduct(values))
    dispatch(reset('productCreator'))
}

export default appReducer