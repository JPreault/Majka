import React, { useContext, useEffect, useRef, useState } from 'react';
import TitlePage from '../components/tools/TitlePage';
import BlockOfContent from '../components/tools/BlockOfContent';
import Button from '../components/tools/Button';
import Modal from '../components/modal/Modal';
import { GameContext } from '../App';
import { FinishedNUmber } from '../functions/FinishedNumer';
import Crossword from '@jaredreisinger/react-crossword';
import ReactDOM from 'react-dom';

function Game2 () {
    const [active, setActive] = useState(false);
    const {finish, setFinish} = useContext(GameContext);
    const [game, setGame] = useState((JSON.parse(localStorage.getItem('game3'))).guesses);
    const crossword = useRef(null);
    const data = {
      down: {
        1: {
          clue: 'I\'m indestructible in survival mode.',
          answer: 'BEDROCK',
          row: 0,
          col: 8,
        },
        2: {
          clue: 'I\'m coming to give you a big punch if you look me in the eye.',
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
    
    useEffect(() => {
      if(crossword && crossword.current) {
        const crosswordElement = document.getElementsByClassName('crossword grid')[0];
        const mySVG = crosswordElement.firstChild.firstChild;
        mySVG.setAttribute("viewBox", "0 0 162 212");
        if(localStorage.getItem('game3') !== undefined && localStorage.getItem('game3') !== null) {
          const answers = (JSON.parse(localStorage.getItem('game3'))).guesses;
          Object.entries(answers).forEach(element => {
            console.log(element);
            if(element[1] !== '') {
              const coords = element[0].split('_');
              console.log('('+coords[0]+', '+coords[1]+', '+element[1]+')');
              crossword.current.setGuess(coords[0], coords[1], element[1]);
            }
          });
        }
      }  
    }, [crossword])



    function reset() {
      if(crossword && crossword.current) {
        crossword.current.reset();
        const allCells = document.getElementsByClassName('clue-cell');
        Object.values(allCells).forEach(cell => {
          const background = cell.firstChild;
          background.classList.remove("incorrect");
          background.classList.remove("correct");
        });
      }
      /* localStorage.removeItem('game2');
      const newFinish = {...finish};
      newFinish.game2=false;
      setAnswers(null);
      setFinish(newFinish) */
    }

    function sumbit() {
      if(crossword && crossword.current) {
        if(crossword.current.isCrosswordCorrect() ) {
          //rgba(var(--clr-text-primary-hover), 1)
        }
        console.log(crossword.current);
        const allCells = document.getElementsByClassName('clue-cell');
        Object.values(allCells).forEach(cell => {
          const background = cell.firstChild;
          const letter = cell.lastChild;
          if(letter.classList.contains('guess-text-incorrect')) {
            background.setAttribute('stroke', 'rgba(var(--clr-other-error))');
            background.classList.remove("correct");
            background.classList.add("incorrect");
          }else{
            background.setAttribute('stroke', 'rgba(var(--clr-other-valid))');
            background.classList.remove("incorrect");
            background.classList.add("correct");
          }
        });
      }
      /* const newAnswers = {
          ...answers
      };
      let finishGame2 = true;
      Object.entries(answers).forEach(element => {
          const points = (element[1]?.points).split('');
          if(points[1] === points[3]){
              newAnswers[element[0]].state = true;
          }else{
              newAnswers[element[0]].state = false;
          }
          if(newAnswers[element[0]].state === null || !newAnswers[element[0]].state){
              finishGame2 = false;
          }
      });
      setAnswers(newAnswers);
      localStorage.setItem('game2', JSON.stringify(newAnswers));
      if(finishGame2){
          setActive(finishGame2);
      }else{
          const newFinish = {...finish};
          newFinish.game2 = false;
          setFinish(newFinish);
      } */
    }

    return (
        <>
            <TitlePage
                main="Game 3"
                title="Will you be able to find which skin is in which pack ? "
                rule="Connects the points corresponding to the skin and the packs"
            />
            <BlockOfContent className='game3'>
              <div className='containGameplay'>
                <Crossword
                  data={data}
                  ref={crossword}
                  storageKey="game3"
                  theme={{
                    cellBackground: 'rgb(255,255,255)',
                    focusBackground: 'rgb(var(--clr-background-secondary))'
                  }}
                />
              </div>
              <div className='containButtons'>
                    <Button text={'Reset'} type="white_bg" onClick={reset}/>
                    <Button text={'submit crossword'} onClick={sumbit}/>
                </div>
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
