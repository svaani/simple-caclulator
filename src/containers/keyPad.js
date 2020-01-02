import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CalcStore from '../models/calcStore';

import NumberPad from './numberPad';
import OperatorPad, { Equals, Clear } from './operatorPad';
import SpecialOperatorPad from './specialOperatorPad';
import ResultPad from './resultPad';

//Same as KeyPadClasses but it is functional component
const KeyPad = (props) => {

    const [defaults, setDefaults] = useState({ result: 0, stack: [0] });

    useEffect(()=>{
        console.log("[KeyPad] render");
        
    });
  
    //--------------Handlers
    //tried to see to minimize rerendering on useCallback but with no help 
    //because everytime defaults change, it has to rerender
    // one advantage is on change of switch to science mode, this won't rerender
    // const _numberClickHandler = useCallback((event) => {
    const _numberClickHandler = (event) => {

        let userEntry = event.currentTarget.innerText;

        //if the previous entry was number just append it to previous number as string
        if (!isNaN(defaults.stack[defaults.stack.length - 1])) {

            let lastVal = defaults.stack.pop();
            let newResult = lastVal.toString() + userEntry.toString();
            defaults.stack.push(newResult);

            //using spread operator on defaults to not miss any additional entry that we might add later on
            setDefaults({ ...defaults, result: newResult, stack: defaults.stack });
        } else {
            setDefaults({ ...defaults, result: defaults.result + userEntry, stack: [...defaults.stack, userEntry] });
        }

    };
    //part of useCallback
    //},[defaults]);

    //added for testing purpose
    // useEffect(()=>{
    //   console.log("_numberClickHandlerPre"+"change");
    // },[_numberClickHandler]);


    const _operatorClickHandler = (event) => {

        let userEntry = event.currentTarget.innerText;

        //if two consecutive operators are entered replace the last
        if (isNaN(defaults.stack[defaults.stack.length - 1])) {

            defaults.stack.pop();
            defaults.stack.push(userEntry);
            let newResult = defaults.result.slice(0, -1);
            setDefaults({ ...defaults, result: newResult + userEntry, stack: [...defaults.stack] });

        } else {
            setDefaults({ ...defaults, result: defaults.result + userEntry, stack: [...defaults.stack, userEntry] });
        }


    }

    const _spOperatorClickHandler = (event) => {

        let userEntry = event.currentTarget.innerText;
        let newDefaults = {};

        let newResult = this._equals(event);
        switch (userEntry) {
            case '-ve':
                //if already -ve is marked, not to repeat
                if (isNaN(this.state.result.toString().charAt(0))) {
                    break;
                }
                newDefaults = {  result: "-" + newResult, stack: ["-" + newResult] };
                break;
            case 'SQ':
                newDefaults = {  result: newResult * newResult, stack: [newResult * newResult] };
                break;
            case 'SQRT':
                newDefaults = {  result: Math.sqrt(newResult), stack: [Math.sqrt(newResult)] };
                break;
        }
        this.setState(newDefaults);
    }

    const _equals = () => {

        //if the last entered input is operator, no action is performed
        if (isNaN(defaults.stack[defaults.stack.length - 1])) {
            return;
        }

        //reversing the array for the easy usage of array.pop
        // performance tradeoff with space if another array is created to do the same task
        defaults.stack.reverse();

        let intermediateResult = defaults.result;
        while (defaults.stack.length > 1) {
            let val1 = defaults.stack.pop();
            let op = defaults.stack.pop();
            let val2 = defaults.stack.pop();

            //removing octal values by Number
            //plus operator will work because op is always a string
            //usage of FUnction which is similar to eval but safe
            intermediateResult = Function('"use strict";return (' + (Number(val1) + op + Number(val2)) + ')')();

            defaults.stack.push(intermediateResult);
        }

        setDefaults({ ...defaults, result: intermediateResult.toString(), stack: [intermediateResult.toString()] })
        return intermediateResult;
    }

    const _clear = () => {
        setDefaults({ ...defaults, result: 0, stack: [0] })
    }


    return (
        <CalcStore.Provider value={defaults}>
            <ResultPad />
            <div className="inline-block">
                <NumberPad click={_numberClickHandler} />
                <Clear click={_clear} />
                <Equals click={_equals} />
            </div>
            <OperatorPad click={_operatorClickHandler} />
            <div className={props.mode === "Science" ? "visiblity" : "hideVisibility"}>
                <SpecialOperatorPad click={_spOperatorClickHandler} />
            </div>
        </CalcStore.Provider>
    );
}

KeyPad.propTypes = {
    mode: PropTypes.string
}

export default React.memo(KeyPad);