import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/jpg/happyBirthday.png'
import { ReactComponent as Music } from '../images/svg/music.svg';
import { ReactComponent as Line } from '../images/svg/line.svg';
import { ReactComponent as Pen } from '../images/svg/pen.svg';
import { ReactComponent as Question } from '../images/svg/question.svg';
import { ReactComponent as Color } from '../images/svg/color.svg';
import { ReactComponent as Certified } from '../images/svg/certified.svg';

function Menu ()
{
    const [page, setPage] = useState('/');
    const navigate = useNavigate();

    function navigateTo (dir) {
        setPage(dir);
        navigate(dir);
    }

    return <div id='menu'>
        <div className='topMenu'>
            <div className='logo'>
                <img src={logo} alt="logo"/>
            </div>
            <div className='blueButton long' onClick={() => {navigateTo('/')}}>homepage</div>
            <div className="menuTab">
                <div className='title'>games</div>
                <div className={'link' + (page === '/game1' ? ' selected' : '')} onClick={() => { navigateTo('/game1');}}>
                    <Music/>
                    <span className='textLink'>Game 1</span>
                    <Certified/>
                </div>
                <div className={'link' + (page === '/game2' ? ' selected' : '')} onClick={() => { navigateTo('/game2');}}>
                    <Line/>
                    <span className='textLink'>Game 2</span>
                    <Certified/>
                </div>
                <div className={'link' + (page === '/game3' ? ' selected' : '')} onClick={() => { navigateTo('/game3');}}>
                    <Pen/>
                    <span className='textLink'>Game 3</span>
                    <Certified/>
                </div>
                <div className={'link' + (page === '/game4' ? ' selected' : '')} onClick={() => { navigateTo('/game4');}}>
                    <Question/>
                    <span className='textLink'>Game 4</span>
                    <Certified/>
                </div>
            </div>
            <div className="menuTab">
                <div className='title'>settings</div>
                <div className={'link hideMobile flex ai-center' + ((new URL(window.location.href)).pathname === '/folder' ? ' select' : '')} onClick={() => { navigate('/folder');}}>
                    <Color/>
                    <span className='textLink'>Colors</span>
                </div>
            </div>
        </div>
        <div className='bottomMenu'>
            <p>Progression</p>
        </div>
    </div>;
}

export default Menu;
