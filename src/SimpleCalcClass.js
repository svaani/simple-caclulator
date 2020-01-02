import React, { Component, setState } from 'react';

import ToggleScienceMode from './containers/toggleScienceMode';
import ToggleTheme from './containers/toggleTheme';
import KeyPadClasses from './containers/keyPadClasses';

import CSSClass from './SimpleCalc.css';

//Class based approach which refers KeyPadClasses
class SimpleCalcClass extends Component  {

  state ={
    theme :"LIGHT",
    mode:"Normal"
  }

  //--------------------Operations
  _changeMode = () => {
    let newMode = this.state.mode === "Normal" ? "Science" : "Normal";
    this.setState({mode:newMode});
  }

  _toggleTheme = (val) => {
    this.setState({theme:val});
  }

  render(){
    return (
      <div className={"CalcBox " + this.state.theme}>
          <KeyPadClasses mode={this.state.mode}/>
          <ToggleScienceMode toggle={this._changeMode} />
          <ToggleTheme click={this._toggleTheme} />
      </div>
    );
  }
}

export default SimpleCalcClass;
