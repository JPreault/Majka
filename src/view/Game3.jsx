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
          clue: 'BEDROCK',
          answer: 'BEDROCK',
          row: 0,
          col: 8,
        },
        2: {
          clue: 'ENDERMAN',
          answer: 'ENDERMAN',
          row: 2,
          col: 10,
        },
        6: {
          clue: 'ELYTRA',
          answer: 'ELYTRA',
          row: 9,
          col: 9,
        },
        7: {
          clue: 'NOTCH',
          answer: 'NOTCH',
          row: 9,
          col: 13,
        },
        8: {
          clue: 'SHARPNESS',
          answer: 'SHARPNESS',
          row: 12,
          col: 7,
        }
      },
      across: {
        3: {
          clue: 'STRONGHOLD',
          answer: 'STRONGHOLD',
          row: 3,
          col: 6,
        },
        4: {
          clue: 'CREEPER',
          answer: 'CREEPER',
          row: 5,
          col: 8,
        },
        5: {
          clue: 'MENDING',
          answer: 'MENDING',
          row: 9,
          col: 8,
        },
        9: {
          clue: 'WITHER',
          answer: 'WITHER',
          row: 13,
          col: 4,
        },
        10: {
          clue: 'REDSTONE',
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
                theme={{
                  columnBreakpoint: '1000px',
                  gridBackground: 'rgb(255,0,0)',
                  cellBackground: 'rgb(255,255,0)',
                  cellBorder: 'rgb(0, 0,255)',
                  textColor: 'rgb(0,255,0)',
                  numberColor: 'rgb(0,255,255)',
                  focusBackground: 'rgb(255,0,255)',
                  highlightBackground: 'rgb(255,255,255)'
                }}
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
