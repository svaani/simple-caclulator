import React, {useContext} from 'react';
import CalcStore from '../models/calcStore';

const ResultPad = (props) => {
  return (
    <CalcStore.Consumer>
      {(defaults) => (
        <div className="result">{defaults.result}</div>
      )}
    </CalcStore.Consumer>
  );
}

export default ResultPad;