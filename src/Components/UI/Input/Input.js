import React from 'react';

import classes from './Input.css';

const Input = (props) => {
    let inputHtml = '';
    const inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case 'input':
            inputHtml = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                onChange={props.onChange}
                value={props.value} />;
            break;
        case 'textarea':
            inputHtml = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                onChange={props.onChange}
                value={props.value} />;
            break;
        case 'select':
            inputHtml = <select
                className={inputClasses.join(' ')}
                onChange={props.onChange}
                value={props.value}>
                {props.elementConfig.options.map((option) => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>;
            break;
        default:
            inputHtml = '';
    }
    return (
        <div className={classes.Input}>
            <label className={classes.label} >{props.label}</label>
            {inputHtml}
        </div>
    )
};

export default Input;