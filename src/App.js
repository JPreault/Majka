import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useOnResize from './hooks/useOnResize';
import Menu from './components/Menu';
import { lightenDarkerColor } from './functions/Color';

function App () {
    const [finish, setFinish] = useState(null);
    const updateHeight = useCallback(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--doc-height', `${vh}px`);
    }, []);

    const context = useMemo(() => {
        if(finish) {
            localStorage.setItem('finish', JSON.stringify(finish))
        }
        return { finish: finish, setFinish: setFinish };
    }, [finish]);

    useOnResize(() => {
        updateHeight();
    });

    useEffect(() => {
        if(localStorage.getItem('finish') !== null){
            setFinish(JSON.parse(localStorage.getItem('finish')));
        }else{
            setFinish({
                game1: false,
                game2: false,
                game3: false
            });
        }
        if(localStorage.getItem('colors') !== null) {
            const colors = JSON.parse(localStorage.getItem('colors'));
            document.documentElement.style.setProperty('--color-error', colors.error);
            document.documentElement.style.setProperty('--color-theme', colors.theme);
            document.documentElement.style.setProperty('--color-theme-hover', lightenDarkerColor(colors.theme, -30));
            document.documentElement.style.setProperty('--color-valid', colors.valid);
        }
    }, [])
    
    updateHeight();

    return (
        <div id='app' className="App">
            <GameContext.Provider value={context}>
                <Menu/>
                <Outlet/>
            </GameContext.Provider>
        </div>
    );
}

export default App;


export const GameContext = React.createContext();
