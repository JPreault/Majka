import React, { useContext } from 'react';
import TitlePage from '../components/tools/TitlePage';
import BlockOfContent from '../components/tools/BlockOfContent';
import Game from '../components/tools/Game';
import game1 from '../images/jpg/game1.png';
import game1finish from '../images/jpg/game1finish.png';
import game2 from '../images/jpg/game2.png';
import game2finish from '../images/jpg/game2finish.png';
import game3 from '../images/jpg/game3.png';
import game3finish from '../images/jpg/game3finish.png';
import { GameContext } from '../App';
import { useNavigate } from 'react-router';

function HomePage () {
    const navigate = useNavigate();
    const {finish} = useContext(GameContext);

    return (
        <>
            <TitlePage
                main="Welcome to your birthday website !!!!!"
                title={"Here you can choose between 3 games, you have to finish all of them.\nGood luck and have fun."}
            />
            <BlockOfContent className='homepage'>
                <div className='gameLine'>
                    <Game state={finish.game1} title="Game 1" image={game1} imageFinish={game1finish}  onClick={() => navigate('/game1')}/>
                    <Game state={finish.game2} title="Game 2" image={game2} imageFinish={game2finish} onClick={() => navigate('/game2')}/>
                </div>
                <div className='gameLine'>
                    <Game state={finish.game3} title="Game 3" image={game3} imageFinish={game3finish}  onClick={() => navigate('/game3')}/>
                </div>
            </BlockOfContent>
        </>
    );
}

export default HomePage;
