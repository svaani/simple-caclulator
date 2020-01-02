import React, { Fragment } from 'react';
import Operators from '../models/operators';
import Square from './square';
import PropTypes from 'prop-types';

const operatorPad = (props) => {
    let operatorList = [...Operators].map(
        (eachItem) =>
            <Square click={props.click} key={eachItem} text={eachItem} />
    );

    return (
        <div className="inline-block">{operatorList}</div>
    );
}

operatorPad.propTypes = {
    "click": PropTypes.func
}

const Equals = (props) => {
    return <Square classes={["inline-block"]} click={props.click} key={"="} text={"="} />
}

Equals.propTypes = {
    "click": PropTypes.func
}

const Clear = (props) => {
    return <Square classes={["inline-block"]} click={props.click} key={"C"} text={"C"} />
}

Clear.propTypes = {
    "click": PropTypes.func
}

export { Equals, Clear };
export default operatorPad;