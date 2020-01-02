import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

const Square = (props) => {

  const _squareClickHandler = (event) => {
    props.click(event);
  }

  //   useEffect(()=>{console.log("Square Changed "+props.text)},[props])

  return (
    //button also can be used instead of div
    <div
      className={props.classes ? [...props.classes, "square"].join(' ') : "square"}
      key={props.text}
      onClick={_squareClickHandler}>
      {props.text}
    </div>
  );
}

Square.propTypes = {
  click: PropTypes.func,
  text: PropTypes.string,
  classes: PropTypes.array
}

export default React.memo(Square);