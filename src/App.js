import React, { useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import useOnResize from './hooks/useOnResize';
import Menu from './components/Menu';

function App () {
    const updateHeight = useCallback(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--doc-height', `${vh}px`);
    }, []);

    useOnResize(() => {
        updateHeight();
    });

    updateHeight();

    return (
        <div className="App">
            <Menu/>
            <Outlet/>
        </div>
    );
}

export default App;
