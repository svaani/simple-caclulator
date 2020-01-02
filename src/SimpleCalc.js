import React, { useState } from 'react';

import ToggleScienceMode from './containers/toggleScienceMode';
import ToggleTheme from './containers/toggleTheme';
import KeyPad from './containers/keyPad';

import CSSClass from './SimpleCalc.css';

// Functional class base approach that uses KeyPad which is also a functional component
const SimpleCalc = () => {

  const [theme, setTheme] = useState("LIGHT");
  const [mode, setMode] = useState("Normal");

  //--------------------Operations
  const _changeMode = () => {
    setMode(mode === "Normal" ? "Science" : "Normal");
  }

  const _toggleTheme = (val) => {
    setTheme(val);
  }

  return (
    <div className={"CalcBox " + theme}>
        <KeyPad mode={mode}/>
        <ToggleScienceMode toggle={_changeMode} />
        <ToggleTheme click={_toggleTheme} />
    </div>
  );
}

export default SimpleCalc;
