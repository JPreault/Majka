import React, { useContext, useRef, useState } from 'react';
import TitlePage from '../components/tools/TitlePage';
import BlockOfContent from '../components/tools/BlockOfContent';
import Button from '../components/tools/Button';
import Modal from '../components/modal/Modal';
import { GameContext } from '../App';
import { FinishedNUmber } from '../functions/FinishedNumer';
import Crossword from '@jaredreisinger/react-crossword';

function Game2 () {
    const [active, setActive] = useState(false);
    const game3 = useRef(null);
    const {finish, setFinish} = useContext(GameContext);
    const data = {
      down: {
        1: {
          clue: 'I\'m indestructible in survival mode.',
          answer: 'BEDROCK',
          row: 0,
          col: 8,
        },
        2: {
          clue: 'I come to put a big punch on you, you look me in the eyes.',
          answer: 'ENDERMAN',
          row: 2,
          col: 10,
        },
        6: {
          clue: 'Red bull give wings, but you gotta go in the ender to get me.',
          answer: 'ELYTRA',
          row: 9,
          col: 9,
        },
        7: {
          clue: 'I\'m the creator of minecraft, I also gave my name to a special apple.',
          answer: 'NOTCH',
          row: 9,
          col: 13,
        },
        8: {
          clue: 'I\'m an enchantment that increases the attack of the sword I\'m on by 0.625 by level.',
          answer: 'SHARPNESS',
          row: 12,
          col: 7,
        }
      },
      across: {
        3: {
          clue: 'I harbor the only way to go in the end.',
          answer: 'STRONGHOLD',
          row: 3,
          col: 6,
        },
        4: {
          clue: 'I explode when you don\'t expect it.',
          answer: 'CREEPER',
          row: 5,
          col: 8,
        },
        5: {
          clue: 'I\'m an enchantment to repair the weapons, tools and armor I am on.',
          answer: 'MENDING',
          row: 9,
          col: 8,
        },
        9: {
          clue: 'I\'m a boss that needs to be summoned in order to be challenged.',
          answer: 'WITHER',
          row: 13,
          col: 4,
        },
        10: {
          clue: 'I\'m the equivalent of electricity but less dangerous.',
          answer: 'REDSTONE',
          row: 18,
          col: 0,
        },
      },
    };

    function finishGame2() {
        const newFinish = {...finish};
        newFinish.game2 = true;
        setFinish(newFinish);
    }

    //https://github.com/JaredReisinger/react-crossword

    return (
        <>
            <TitlePage
                main="Game 3"
                title="Will you be able to find which skin is in which pack ? "
                rule="Connects the points corresponding to the skin and the packs"
            />
            <BlockOfContent className='game3'>
              <Crossword
                data={data}
              />
            </BlockOfContent>
            <Modal active={active} setActive={setActive}>
                <div className='titlePopup'>Congratulations !!!!!!!</div>
                {finish !== null && <div className='textPopup'>{FinishedNUmber(finish)}</div>}
                <div className='containButton'>
                    <Button text={'let\'s go !!'} onClick={() => {setActive(!active); finishGame2();}}/>
                </div>
            </Modal>
        </>
    );
}

export default Game2;
