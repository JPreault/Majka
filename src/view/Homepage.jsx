import React, { useContext } from 'react';
import TitlePage from '../components/tools/TitlePage';
import BlockOfContent from '../components/tools/BlockOfContent';
import Game from '../components/tools/Game';
import game2 from '../images/jpg/game2.png'
import { GameContext } from '../App';
import { useNavigate } from 'react-router';

function HomePage () {
    const navigate = useNavigate();
    const {finish} = useContext(GameContext);

    return (
        <>
            <TitlePage
                main="Welcome to your birthday website !!!!!"
                title={"Here you can choose between 4 games, you have to finish all of them.\nGood luck and have fun."}
            />
            <BlockOfContent>
                <Game state={finish.game2} title="Game 2" image={game2} onClick={() => navigate('/game2')}/>
            </BlockOfContent>
        </>
    );
}

export default HomePage;
