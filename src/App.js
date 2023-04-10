import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useOnResize from './hooks/useOnResize';
import Menu from './components/Menu';

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
