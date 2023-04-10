import React, { useContext, useEffect, useState } from 'react';
import TitlePage from '../components/tools/TitlePage';
import BlockOfContent from '../components/tools/BlockOfContent';
import Button from '../components/tools/Button';
import Modal from '../components/modal/Modal';
import { GameContext } from '../App';
import { FinishedNUmber } from '../functions/FinishedNumer';
import Question from '../components/tools/Question';

function Game3 () {
    const [active, setActive] = useState(false);
    const {finish, setFinish} = useContext(GameContext);
    const [howManyFinished, setHowManyFinished] = useState(0);
    const [error, setError] = useState([]);
    const [save, setSave] = useState([]);
    const data = [
        ['1 - What is the name of Kururo\'s book?', 'Skill thief', 'Abilitie Hunter', 'Skill hunter', 'Abilitie thief'],
        ['2 - What is the first number that Biscuit shows with his nen?', '1', '2', '3', '4'],
        ['3 - What is the Kirua hunter exam assignment?', '287', '288', '289', '290'],
        ['4 - What is the name of Biscuit\'s magical esthetician?', 'Kukki', 'Kuukyi', 'Coockie', 'Cookie'],
        ['5 - What is Kuroro\'s place in the arm wrestling brigade\'s ranking ', '1st', '3rd', '5th', '7th'],
        ['6 - How old is Killua ?', '8 years old', '12 years old', 'Over 30 years old', 'We don\'t know, it\'s not said.'],
        ['7 - At what age did he start killing?', '2 years old', '3 years old', '4 years old', '5 years old'],
        ['8 - How many members are there in the Zoldyck siblings?', '3', '4', '5', '6'],
        ['9 - What was Killua\'s number in the Hunter test?', '99', '302', '44', '406'],
        ['10 - What color is Killua\'s skateboard?', 'Yellow', 'Green', 'Red', 'Pink']
    ]
   
    function finishGame3() {
        const newFinish = {...finish};
        newFinish.game3 = true;
        setFinish(newFinish);
    }

    function reset() {
        localStorage.removeItem('game3');
        const newFinish = {...finish};
        newFinish.game3=false;
        setFinish(newFinish);
        setError([]);
        data.forEach((element, index) => {
            const questions = [1,2,3,4];
            questions.forEach(littleIndex => {
                document.getElementById(`Q${index+1}-${littleIndex}`).checked = false
                document.getElementsByClassName(`Q${index+1}-${littleIndex}`)[0].classList.remove('selected');
            });            
        });
    }

    function submit() {
        const errorList=[];
        const correctAnswers=["3","1","2","4","4","2","2","3","1","2"];
        correctAnswers.forEach((element, index) => {
            if (!(document.getElementById(`Q${index+1}-${element}`).checked)){
                errorList.push(`Q${index+1}`);
            }
        });
        setError(errorList);
        const newFinish = {...finish};
        if(errorList.length === 0) {
            setActive(true);
            let numberFinish = 1;
            Object.entries(finish).forEach(element => {
                if(element[1] && element[0] !== 'game3'){
                    numberFinish++
                }
            });
            setHowManyFinished(numberFinish)
        } else {
            newFinish.game3 = false;
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
        localStorage.setItem('game3', JSON.stringify(save));
    }

    useEffect(() => {
        if(localStorage.getItem('game3') !== null && save.length === 0) {
            const newSave = JSON.parse(localStorage.getItem('game3'));
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
            <BlockOfContent className='game3'>
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
                            finish={finish.game3}
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
                {finish !== null && <div className='textPopup'>{FinishedNUmber(howManyFinished)}</div>}
                <div className='containButton'>
                    <Button text={'let\'s go !!'} onClick={() => {setActive(!active); finishGame3();}}/>
                </div>
            </Modal>
        </>
    );
}

export default Game3;
