import React from 'react';
import TitlePage from '../components/tools/TitlePage';
import BlockOfContent from '../components/tools/BlockOfContent';
import Game from '../components/tools/Game';

function HomePage () {

    return (
        <>
            <TitlePage
                main="Welcome to your birthday website !!!!!"
                title={"Here you can choose between 4 games, you have to finish all of them.\nGood luck and have fun."}
            />
            <BlockOfContent>
                <Game state={false} title="Game 1"/>
            </BlockOfContent>
        </>
    );
}

export default HomePage;
