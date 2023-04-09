import React, { useContext, useEffect, useRef, useState } from 'react';
import TitlePage from '../components/tools/TitlePage';
import BlockOfContent from '../components/tools/BlockOfContent';
import Button from '../components/tools/Button';
import Modal from '../components/modal/Modal';
import { GameContext } from '../App';
import { FinishedNUmber } from '../functions/FinishedNumer';
import Crossword from '@jaredreisinger/react-crossword';

function Game3 () {
    const [active, setActive] = useState(false);
    const [save, setSave] = useState([]);
    const {finish, setFinish} = useContext(GameContext);
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

    function finishGame3() {
        const newFinish = {...finish};
        newFinish.game3 = true;
        setFinish(newFinish);
    }

    function addColor () {
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
      localStorage.removeItem('game3');
      const newFinish = {...finish};
      newFinish.game3=false;
      setFinish(newFinish);
    }

    function submit() {
      if(crossword && crossword.current) {
        addColor();
        const newFinish = {...finish};
        if(crossword.current.isCrosswordCorrect() ) {
          setActive(true);
          crossword.current.fillAllAnswers();
        } else {
          newFinish.game3 = false;
        }
        setFinish(newFinish);
      }
    }

    function onCellChange(row, col, char) {
      let alreadySaved = false;
      save.forEach((element, key) => {
        if(element[0] === row && element[1] === col){
          save[key] = [row, col, char];
          alreadySaved = true;
        }
      });
      if(!alreadySaved) {
        save.push([row, col, char]);
      }
      setSave(save);
      localStorage.setItem('game3', JSON.stringify(save));
    }

    useEffect(() => {
      if(localStorage.getItem('game3') !== null && save.length === 0) {
        const newSave = JSON.parse(localStorage.getItem('game3'));
        setSave(newSave);
        setTimeout(() => {
          newSave.forEach(element => {
            crossword.current.setGuess((parseInt(element[0])), (parseInt(element[1])), element[2]);
          });
        }, 30);
        setTimeout(() => {
          if(finish.game3) {
            addColor();
          }
        }, 50);
      } 
    }, [save.length, finish.game3])
    
    useEffect(() => {
      if(crossword !== null && crossword.current !== null) {
        const crosswordElement = document.getElementsByClassName('crossword grid')[0];
        const mySVG = crosswordElement.firstChild.firstChild;
        mySVG.setAttribute("viewBox", "0 0 162 212");
      }  
    }, [crossword])

    return (
        <>
            <TitlePage
                main="Game 3"
                title="Can you find each of the words hidden in this grid?"
                rule="Read the definitions and try to find the associated words to complete the grid."
            />
            <BlockOfContent className='game3'>
              <div className='containGameplay'>
                <Crossword
                  data={data}
                  ref={crossword}
                  onCellChange={onCellChange}
                  theme={{
                    cellBackground: 'rgb(255,255,255)',
                    focusBackground: 'rgb(var(--clr-background-secondary))'
                  }}
                />
              </div>
              <div className='containButtons'>
                    <Button text={'Reset'} type="white_bg" onClick={reset}/>
                    <Button text={'submit crossword'} onClick={submit}/>
                </div>
            </BlockOfContent>
            <Modal active={active} setActive={setActive}>
                <div className='titlePopup'>Congratulations !!!!!!!</div>
                {finish !== null && <div className='textPopup'>{FinishedNUmber(finish)}</div>}
                <div className='containButton'>
                    <Button text={'let\'s go !!'} onClick={() => {setActive(!active); finishGame3();}}/>
                </div>
            </Modal>
        </>
    );
}

export default Game3;
