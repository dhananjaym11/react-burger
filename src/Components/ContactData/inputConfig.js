const inputConfig = (elementType, type, placeholder, validation, valid, touched) => {
    return {
        elementType: elementType,
        elementConfig: typeof type === 'object' ?
            {
                options: type
            } :
            {
                type: type,
                placeholder: placeholder
            },
        value: '',
        validation: validation ? validation : null,
        valid: typeof valid === 'boolean' ? valid : true,
        touched: touched
    }
}

export default inputConfig;