import React, { useState, useEffect, PureComponent } from 'react';
import PropTypes from 'prop-types';

import CalcStore from '../models/calcStore';

import NumberPad from './numberPad';
import OperatorPad, { Equals, Clear } from './operatorPad';
import SpecialOperatorPad from './specialOperatorPad';
import ResultPad from './resultPad';

class KeyPadClasses extends PureComponent {

    state = { result: 0, stack: [0] };

    //not needed as PureComponent is used
    // shouldComponentUpdate(nextProp, nextState){
    //     return true;
    // }

    componentDidMount(){
        console.log("[KeyPadClasses] render");
        if(isNaN(this.state.result)){
            alert("wrongnumber");
        }
    }

    //--------------Handlers
    _numberClickHandler = (event) => {

        let userEntry = event.currentTarget.innerText;

        //if the previous entry was number just append it to previous number as string
        if (!isNaN(this.state.stack[this.state.stack.length - 1])) {

            let lastVal = this.state.stack.pop();
            let newResult = lastVal.toString() + userEntry.toString();
            this.state.stack.push(newResult);

            //using spread operator on defaults to not miss any additional entry that we might add later on
            this.setState({ result: newResult, stack: this.state.stack });
        } else {
            this.setState({ result: this.state.result + userEntry, stack: [...this.state.stack, userEntry] });
        }

    };


    _operatorClickHandler = (event) => {

        let userEntry = event.currentTarget.innerText;

        //if two consecutive operators are entered replace the last
        if (isNaN(this.state.stack[this.state.stack.length - 1])) {

            this.state.stack.pop();
            this.state.stack.push(userEntry);
            let newResult = this.state.result.slice(0, -1);
            this.setState({  result: newResult + userEntry, stack: [...this.state.stack] });

        } else {
            this.setState({  result: this.state.result + userEntry, stack: [...this.state.stack, userEntry] });
        }


    }

    _spOperatorClickHandler = (event) => {

        let userEntry = event.currentTarget.innerText;
        let newDefaults = {};

        let newResult = this._equals(event);
        //if _equals returns without operations, don't perform sp operations
        if(isNaN(newResult)){
            return;
        }
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

    _equals = () => {

        //if the last entered input is operator, no action is performed
        if (isNaN(this.state.stack[this.state.stack.length - 1])) {
            return;
        }

        //reversing the array for the easy usage of array.pop
        // performance tradeoff with space if another array is created to do the same task
        this.state.stack.reverse();

        let intermediateResult = this.state.result;
        while (this.state.stack.length > 1) {
            let val1 = this.state.stack.pop();
            let op = this.state.stack.pop();
            let val2 = this.state.stack.pop();

            //removing octal values by Number
            //plus operator will work because op is always a string
            //usage of FUnction which is similar to eval but safe
            intermediateResult = Function('"use strict";return (' + (Number(val1) + op + Number(val2)) + ')')();

            this.state.stack.push(intermediateResult);
        }

        this.setState({ result: intermediateResult.toString(), stack: [intermediateResult.toString()] })
        return intermediateResult;
    }

    _clear = () => {
        this.setState({  result: 0, stack: [0] })
    }


    render() {
        return (
            <CalcStore.Provider value={this.state}>
                <ResultPad />
                <div className="inline-block">
                    <NumberPad click={this._numberClickHandler} />
                    <Clear click={this._clear} />
                    <Equals click={this._equals} />
                </div>
                <OperatorPad click={this._operatorClickHandler} />
                <div className={this.props.mode === "Science" ? "visiblity" : "hideVisibility"}>
                    <SpecialOperatorPad click={this._spOperatorClickHandler} />
                </div>
            </CalcStore.Provider>
        );
    }
}

KeyPadClasses.propTypes = {
    mode: PropTypes.string
}

export default KeyPadClasses;