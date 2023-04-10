import React, { useState } from 'react';
import TitlePage from '../components/tools/TitlePage';
import BlockOfContent from '../components/tools/BlockOfContent';
import { HexColorPicker } from "react-colorful";
import Modal from '../components/modal/Modal';
import Button from '../components/tools/Button';
import { hexToRgb, lightenDarkerColor } from '../functions/Color';

function HomePage () {
    const [active, setActive] = useState(false);
    const [colors, setColors] = useState({
        error: (document.documentElement.style.getPropertyValue('--color-error') === "" ? "#F44336" : document.documentElement.style.getPropertyValue('--color-error')),
        theme: (document.documentElement.style.getPropertyValue('--color-theme') === "" ? "#495AFF" : document.documentElement.style.getPropertyValue('--color-theme')),
        valid: (document.documentElement.style.getPropertyValue('--color-valid') === "" ? "#97C154" : document.documentElement.style.getPropertyValue('--color-valid')),
    });
    const [color, setColor] = useState({
        name: "",
        color: "",
    });
    
    function handleChange (colorPick) {
        const newColor = color;
        newColor.color = colorPick;
        setColor(newColor);
    };

    function saveColor () {
        setActive(false);
        const newColors = colors;
        switch(color.name){
            case "error":
                newColors.error = color.color;
                break;
            case "theme":
                newColors.theme = color.color;
                break;
            case "valid":
                newColors.valid = color.color;
                break;
            default:break;
        }
        setColors(newColors);
        setColor({name: "",color: ""});
    };

    function reset () {
        setColors({
            error: "#F44336",
            theme: "#495AFF",
            valid: "#97C154",
        })
        localStorage.removeItem('colors');
        document.documentElement.style.setProperty('--color-error', '#F44336');
        document.documentElement.style.setProperty('--color-theme', '#495AFF');
        document.documentElement.style.setProperty('--color-theme-hover', '#2B41E1');
        document.documentElement.style.setProperty('--color-valid', '#97C154');
    }

    function save () {
        localStorage.setItem('colors', JSON.stringify(colors));
        document.documentElement.style.setProperty('--color-error', colors.error);
        document.documentElement.style.setProperty('--color-theme', colors.theme);
        document.documentElement.style.setProperty('--color-theme-hover', lightenDarkerColor(colors.theme, -30));
        document.documentElement.style.setProperty('--color-valid', colors.valid);
    }
    

    return (
        <>
            <TitlePage
                main="Here are the settings !!!"
                title={"You can replace each main color of the website with the ones you want."}
            />
            <BlockOfContent className='color'>
                <div className='colorsChangements'>
                    <div className='changeColorBlock'>
                        <div className='mainLine'>
                            <div className='blockOfColor' onClick={() => {setColor({name: "theme",color: colors.theme}); setActive(true)}} style={{backgroundColor: colors.theme}}></div>
                            <div className='title'>Main theme color</div>
                        </div>
                        <div className='title'>I recommand to choose a dark color cause of  the white text on it.</div>
                    </div>
                    <div className='changeColorBlock'>
                        <div className='mainLine'>
                            <div className='blockOfColor' onClick={() => {setColor({name: "valid",color: colors.valid}); setActive(true)}} style={{backgroundColor: colors.valid}}></div>
                            <div className='title'>Success color</div>
                        </div>
                        <div className='title'>I recommand to choose a color you like.</div>
                    </div>
                    <div className='changeColorBlock'>
                        <div className='mainLine'>
                            <div className='blockOfColor' onClick={() => {setColor({name: "error",color: colors.error}); setActive(true)}} style={{backgroundColor: colors.error}}></div>
                            <div className='title'>Error color</div>
                        </div>
                        <div className='title'>I recommand to choose a color you hate.</div>
                    </div>
                </div>
                <div className='containButtons'>
                    <Button text={'Reset'} type="white_bg" onClick={reset}/>
                    <Button text={'save settings'} onClick={save}/>
                </div>
            </BlockOfContent>
            {active && <Modal active={active} setActive={setActive} closable={true}>
                <HexColorPicker
                    color={color.color}
                    onChange={handleChange}
                />
                <Button
                    className={'validateColor'}
                    text="save color"
                    onClick={saveColor}
                />
            </Modal>}
        </>
    );
}

export default HomePage;
