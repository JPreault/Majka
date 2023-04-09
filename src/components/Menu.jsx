import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/jpg/happyBirthday.png'
import { ReactComponent as Music } from '../images/svg/music.svg';
import { ReactComponent as Line } from '../images/svg/line.svg';
import { ReactComponent as Pen } from '../images/svg/pen.svg';
import { ReactComponent as Question } from '../images/svg/question.svg';
import { ReactComponent as Color } from '../images/svg/color.svg';
import { ReactComponent as Certified } from '../images/svg/certified.svg';
import { ReactComponent as Reset } from '../images/svg/reset.svg';
import Icon from './tools/Icon';
import Button from './tools/Button';
import { GameContext } from '../App';
import Tooltip from './tools/Tooltip';

function Menu ()
{
    const [page, setPage] = useState('/');
    const navigate = useNavigate();
    const {finish, setFinish} = useContext(GameContext);

    function navigateTo (dir) {
        setPage(dir);
        navigate(dir);
    }

    function pourcentageFinished() {
        let pourcentage = 0;
        if(finish !== null){
            Object.values(finish).forEach(element => {
                if(element === true){
                    pourcentage = pourcentage+25;
                }
            });
        }
        return pourcentage;
    }

    function resetAll() {
        localStorage.clear();
        setFinish({
            game1:false,
            game2:false,
            game3:false,
            game4:false
        })
        setPage('/');
        navigate('/');
    }

    return <div id='menu'>
        <div className='topMenu'>
            <div className='logo'>
                <img src={logo} alt="logo" draggable={false}/>
            </div>
            <Button className="long" onClick={() => {navigateTo('/')}} text="back home"/>
            <div className="menuTab">
                <div className='title'>games</div>
                <div className={'link' + (page === '/game1' ? ' selected' : '')} onClick={() => { navigateTo('/game1');}}>
                    <Icon type="svg">
                        <Music/>
                    </Icon>
                    <span className='textLink'>Game 1</span>
                    <Icon type="svg" className={"certified" + (finish?.game1 ? ' valid' : '')}>
                        <Certified/>
                    </Icon>
                </div>
                <div className={'link' + (page === '/game2' ? ' selected' : '')} onClick={() => { navigateTo('/game2');}}>
                    <Icon type="svg">
                        <Line/>
                    </Icon>
                    <span className='textLink'>Game 2</span>
                    <Icon type="svg" className={"certified" + (finish?.game2 ? ' valid' : '')}>
                        <Certified/>
                    </Icon>
                </div>
                <div className={'link' + (page === '/game3' ? ' selected' : '')} onClick={() => { navigateTo('/game3');}}>
                    <Icon type="svg">
                        <Pen/>
                    </Icon>
                    <span className='textLink'>Game 3</span>
                    <Icon type="svg" className={"certified" + (finish?.game3 ? ' valid' : '')}>
                        <Certified/>
                    </Icon>
                </div>
                <div className={'link' + (page === '/game4' ? ' selected' : '')} onClick={() => { navigateTo('/game4');}}>
                    <Icon type="svg">
                        <Question/>
                    </Icon>
                    <span className='textLink'>Game 4</span>
                    <Icon type="svg" className={"certified" + (finish?.game4 ? ' valid' : '')}>
                        <Certified/>
                    </Icon>
                </div>
            </div>
            <div className="menuTab">
                <div className='title'>settings</div>
                <div className={'link' + (page === '/color' ? ' selected' : '')} onClick={() => { navigateTo('/color');}}>
                    <Icon type="svg">
                        <Color/>
                    </Icon>
                    <span className='textLink'>Colors</span>
                </div>
            </div>
        </div>
        <div className='bottomMenu'>
            <div className='title'>
                <div className='text'>Progression</div>
                <Tooltip
                    placement="right"
                    content="Reset the progression"
                    options={[
                        {
                            mode: 'dynamic',
                            offset: {
                                x: 0,
                                y: 0
                            },
                            maxWidth: 318
                        }
                    ]}
                    arrow={true}>
                    <div onClick={resetAll}>
                        <Icon type="svg">
                            <Reset/>
                        </Icon>
                    </div>
                </Tooltip>
                
            </div>
            <div className='progressBar'>
                <div className='progress' style={{width: pourcentageFinished()+'%'}}></div>
            </div>
    </div>
    </div>;
}

export default Menu;
