import React from 'react'
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/styles";
import {Field, reduxForm} from "redux-form";
import {maxLength, number, required} from "../../utils/validators/validators";
import CustomField from "../shared/CustomFIeld/CustomField";

const max25 = maxLength(15)

const useStyles = makeStyles({
    title: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        margin: '0 0 40px 0',
        fontSize: 20
    },
    form: {
        padding: 40,
        background: 'aqua',
        borderRadius: 10,
        boxShadow: '0 0 10px gray'
    },
    inputGroup: {
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'space-between'
    },
    input: {
        marginLeft: 10,
        borderRadius: 8,
        border: '1px solid black',
        padding: '6px 15px'
    },
    button: {
        width: '100%'
    },
    classError: {
        color: 'red',
        textTransform: 'uppercase',
        padding: 10
    }
});


const ProductCreator = ({handleSubmit, error}) => {
    const classes = useStyles()
    const {inputGroup, input, button, form, classError, title} = classes

    return (
        <>
            <form className={form} onSubmit={handleSubmit}>
                <p className={title}>Product creator</p>
                {error && <div className={classError}> </div>}
                <div className={inputGroup}>
                    Product name:
                    <Field className={input}
                           type="text"
                           placeholder='Product name'
                           name='name'
                           component={CustomField}
                           validate={[required, max25]}
                           types='input'
                    />
                </div>
                <div className={inputGroup}>
                    Product count:
                    <Field className={input}
                           type="text"
                           placeholder='Product count'
                           name='count'
                           component={CustomField}
                           validate={[required, number]}
                           types='input'
                    />
                </div>
                <div className={inputGroup}>
                    Product cost:
                    <Field className={input}
                           type="text"
                           placeholder='Product cost'
                           name='cost'
                           component={CustomField}
                           validate={[required, number]}
                           types='input'
                    />
                </div>
                <Button className={button}
                        variant="contained"
                        color="primary"
                        type='submit'
                >Add product</Button>
            </form>
        </>
    )
}

const ProductCreatorForm = reduxForm({form: 'productCreator'})(ProductCreator)


export default ProductCreatorForm