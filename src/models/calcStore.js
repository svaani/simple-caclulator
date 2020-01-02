import React from 'react';

const CalcStore = React.createContext({
    result : 0,
    stack : [0]
});

export default CalcStore;