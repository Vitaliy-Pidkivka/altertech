const ADD_PRODUCT = 'shopBasket/ADD-PRODUCT';
const REMOVE_PRODUCT = 'shopBasket/REMOVE-PRODUCT';
const CHANGE_PRODUCT_COUNT = 'shopBasket/CHANGE-PRODUCT-COUNT';
const CHANGE_PRODUCT_COST = 'shopBasket/CHANGE-PRODUCT-COST';

let initialState = {
    products: [
        {id: 1, name: 'Alcatel', count: 3, cost: 30, totalCost: null},
        {id: 2, name: 'Nokia', count: 1, cost: 40, totalCost: null},
        {id: 3, name: 'Siemens C65', count: 2, cost: 1000, totalCost: null},
    ],
}

let appReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_PRODUCT:
            let newProductId = state.products.map(product => product.id + 1)
            return {
                ...state,
                products: [
                    ...state.products,
                    {id: newProductId, ...action}
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


export default appReducer