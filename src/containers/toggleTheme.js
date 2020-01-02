import React, { useEffect, useRef, useState } from 'react';

const ToggleTheme = (props) => {

    const lightThemeRef = useRef(true);
    const darkThemeRef = useRef(false);

    const [theme, setTheme] = useState(
        lightThemeRef
    );

    const THEME = { 
        "LIGHT": { value: 0, ref: lightThemeRef }, 
        "DARK": { value: 1, ref: darkThemeRef } 
    };

    useEffect(() => {
        theme.current.checked = true;
        props.click(theme.current.value);
    },[theme]);

    useEffect(()=>{
        console.log("[ToggleTheme] render");
    });

    const _toggleClick = (event) => {
        setTheme(THEME[event.target.value].ref); 
    }

    return (
        <div style={{margin:"10px"}}>
            <div className="inline-block lt-box">
                <input ref={lightThemeRef} type='radio' name='toggleTheme' onClick={_toggleClick} value="LIGHT" id="lt-random88" />
                <label htmlFor="lt-random88">Light Theme</label>
            </div>
            <div className="inline-block dt-box">
                <input ref={darkThemeRef} type='radio' name='toggleTheme' onClick={_toggleClick} value="DARK" selected id="dt-random88" />
                <label htmlFor="dt-random88">Dark Theme</label>
            </div>
        </div>);
}

export default React.memo(ToggleTheme);
// export { THEME };