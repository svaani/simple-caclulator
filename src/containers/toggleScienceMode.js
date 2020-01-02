import React, {useState, useEffect} from 'react';

const ToggleScienceMode = (props) =>{
    let [toggleMode, setToggleMode] = useState("Science");

    useEffect(()=>{
        console.log("[ToggleScienceMode] render");
    });

    const _toggle= ()=>{
        setToggleMode(toggleMode === "Science"? "Normal" : "Science");
        props.toggle();
    }

    return <button className="toggle-button" onClick={_toggle}>Switch To {toggleMode} Mode</button>;
}

export default React.memo(ToggleScienceMode);