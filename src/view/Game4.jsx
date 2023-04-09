import React, { useContext, useEffect, useState } from 'react';
import TitlePage from '../components/tools/TitlePage';
import BlockOfContent from '../components/tools/BlockOfContent';
import Button from '../components/tools/Button';
import Modal from '../components/modal/Modal';
import { GameContext } from '../App';
import { FinishedNUmber } from '../functions/FinishedNumer';
import Question from '../components/tools/Question';

function Game4 () {
    const [active, setActive] = useState(false);
    const {finish, setFinish} = useContext(GameContext);
    const [error, setError] = useState([]);
    const [save, setSave] = useState([]);
    const data = [
        ['Question', 'Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
        ['Question', 'Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
        ['Question', 'Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
        ['Question', 'Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
        ['Question', 'Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
        ['Question', 'Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
        ['Question', 'Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
        ['Question', 'Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
        ['Question', 'Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4'],
        ['Question', 'Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4']
    ]
   
    function finishGame3() {
        const newFinish = {...finish};
        newFinish.game4 = true;
        setFinish(newFinish);
    }

    function reset() {
      localStorage.removeItem('game4');
      const newFinish = {...finish};
      newFinish.game4=false;
      setFinish(newFinish);
    }

    function submit() {
        const errorList=[];
        const correctAnswers=["1","2","1","2","1","2","1","2","1","2"];
        correctAnswers.forEach((element, index) => {
            if (!(document.getElementById(`Q${index+1}-${element}`).checked)){
                errorList.push(`Q${index+1}`);
            }
        });
        setError(errorList);
        const newFinish = {...finish};
        if(errorList.length === 0) {
            setActive(true);
        } else {
            newFinish.game4 = false;
        }
        setFinish(newFinish);
    }

    function updateSave(id, answer) {
        let next = false;
        save.forEach((element,index) => {
            if(element[0] === id){
                save[index] = [id,answer];
                next = true;
            }
        });
        if(!next) {
            save.push([id,answer]);
        }
        setSave(save);
        [1,2,3,4].forEach(element => {
            document.getElementsByClassName(`${id}-${element}`)[0].classList.remove('selected');
        });
        document.getElementsByClassName(`${id}-${answer}`)[0].classList.add('selected');
        localStorage.setItem('game4', JSON.stringify(save));
    }

    useEffect(() => {
        if(localStorage.getItem('game4') !== null && save.length === 0) {
            const newSave = JSON.parse(localStorage.getItem('game4'));
            setSave(newSave);
            newSave.forEach(element => {
                const input = document.getElementById(element[0]+'-'+element[1]);
                input.checked = true;
                document.getElementsByClassName(element[0]+'-'+element[1])[0].classList.add('selected');
            });
        }
    }, [save.length])

    return (
        <>
            <TitlePage
                main="Game 4"
                title="Can you find the answer to each of these questions?"
                rule="Read the question and select the answer that you think is true."
            />
            <BlockOfContent className='game4'>
                <div className='gameContent'>
                    {data.map((value, index) => {
                        return <Question
                            key={index+1}
                            question={value[0]}
                            answer1={value[1]}
                            answer2={value[2]}
                            answer3={value[3]}
                            answer4={value[4]}
                            name={`Q${index+1}`}
                            error={error}
                            updateSave={updateSave}
                        />
                    })}
                </div>
                <div className='containButtons'>
                    <p id="resultat"></p>
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

export default Game4;
