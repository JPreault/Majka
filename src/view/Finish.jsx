import React, { useState, useEffect, useContext, useRef } from 'react';
import TitlePage from '../components/tools/TitlePage';
import BlockOfContent from '../components/tools/BlockOfContent';
import card1 from '../images/jpg/card1.png';
import card2 from '../images/jpg/card2.png';
import Modal from '../components/modal/Modal';
import Button from '../components/tools/Button';
import { GameContext } from '../App';
import { useNavigate } from 'react-router-dom';

function Finish () {
    const [active, setActive] = useState(false);
    const [moove, setMoove] = useState('left');
    const {finish} = useContext(GameContext);
    const navigate = useNavigate();
    const aCard1 = useRef(null);
    const aCard2 = useRef(null);

    useEffect(() => {
        if(!(finish?.game1) || !(finish?.game2) || !(finish?.game3)) {
            navigate('/');
        }    
    }, [finish, navigate])

    return (
        <>
            <TitlePage
                main="Happy Birthday"
                title="Thank you so much for taking the time to play my little game, it was a pleasure to do it for you and I appreciate you agreeing to play it even if you don't like the gifts <3"
            />
            <BlockOfContent className='finish'>
                <img alt='card1' src={card1} className="preview"></img>
                <Button text="open card" onClick={() => setActive(true)}/>
                <Button text="Download card" onClick={() => {aCard1.current.click();aCard2.current.click();}}/>
            </BlockOfContent>
            <a ref={aCard1} href={card1} target={'_blank'} download="FirstPage.png" style={{ display: 'none' }} rel="noreferrer" content='card1'>Card1</a>
            <a ref={aCard2} href={card2} target={'_blank'} download="SecondPage.png" style={{ display: 'none' }} rel="noreferrer" content='card1'>Card2</a>
            {active && <Modal active={active} setActive={setActive} closable={true}>
                <div className='card'>
                    <Button text="<" onClick={() => setMoove('left')} disabled={moove === 'left'}/>
                    <div className='containCards'>
                        <div className={'moovingImg' + (moove === 'right' ? ' right' : '')}>
                            <img alt='card1' src={card1}></img>
                            <img alt='card2' src={card2}></img>
                        </div>
                    </div>
                    <Button text=">" onClick={() => setMoove('right')} disabled={moove === 'right'}/>
                </div>
            </Modal>}
        </>
    );
}

export default Finish;
