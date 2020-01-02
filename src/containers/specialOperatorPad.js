import React, { Fragment } from 'react';
import SpecialOperators from '../models/specialOperators';
import Square from './square';
import PropTypes from 'prop-types';

const specialOperatorPad = (props) => {
    let operatorList = [...SpecialOperators].map(
        (eachItem) =>
            <Square classes={["inline-block"]} click={props.click} key={eachItem} text={eachItem} />
    );
    return (
        <Fragment>
            {operatorList}
        </Fragment>
    );
}

specialOperatorPad.propTypes = {
    click: PropTypes.func
}

export default React.memo(specialOperatorPad);