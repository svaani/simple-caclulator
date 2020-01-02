import React, { Fragment, useEffect } from 'react';
import Numbers from '../models/numbers';
import Square from './square';
import NoDOM from '../hoc/nodom';

const NumberPad = (props) => {

    useEffect(()=>{console.log("numPad Changed"+props)},[props])
   
    let numberedSquares = [...Numbers].map(
        (eachNum) =>
            <Square classes={["inline-block"]} click={props.click} key={eachNum} text={eachNum} />
    );
    
    return (
        //NoDOM similar to Fragment
        <NoDOM>
            {/* Render 3 numbers in a row */}
            <div>{numberedSquares.slice(0, 3)}</div>
            <div>{numberedSquares.slice(3, 6)}</div>
            <div>{numberedSquares.slice(6, 9)}</div>
            {/* not to wrap the below line with div, because it will misalign with other buttons */}
            {numberedSquares.slice(9, 10)}

        </NoDOM>
    );
}

//React.memo has rarely advantage here as it rerenders anyway for every "defaults" change
// export default React.memo(NumberPad);//(x,y)=> true

export default NumberPad;