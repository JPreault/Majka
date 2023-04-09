import React, { useEffect, useState } from 'react';

function Question ({question, answer1, answer2, answer3, answer4, name, error = [], updateSave}) {
    const [state, setState] = useState('');

    useEffect(() => {
        if(error.length !== 0) {
            if(error.includes(name)){
                setState('error');
            }else{
                setState('valid');
            }
        } else {
            setState('');
        }
    }, [error,name])

    function selectChild(id) {
        [1,2,3,4].forEach(element => {
            document.getElementsByClassName(`${name}-${element}`)[0].classList.remove('selected');
        });
        document.getElementsByClassName(`${name}-${id}`)[0].classList.add('selected');
    }

    return (<div className={'questionBlock' + (state !== "" ? (' ' + state) : '')}>  
        <div className='question title'>{question}</div>
        <div className='answersList'>
            <label className='answer' onClick={() => {selectChild(1); updateSave(name, 1);}} htmlFor={`${name}-1`}>
                <div className={`${name}-1 point`}></div><div className='text'>{answer1}</div>
            </label>
            <label className='answer' onClick={() => {selectChild(2); updateSave(name, 2);}} htmlFor={`${name}-2`}>
                <div className={`${name}-2 point`}></div><div className='text'>{answer2}</div>
            </label>
            <label className='answer' onClick={() => {selectChild(3); updateSave(name, 3);}} htmlFor={`${name}-3`}>
                <div className={`${name}-3 point`}></div><div className='text'>{answer3}</div>
            </label>
            <label className='answer' onClick={() => {selectChild(4); updateSave(name, 4);}} htmlFor={`${name}-4`}>
                <div className={`${name}-4 point`}></div><div className='text'>{answer4}</div>
            </label>
            <input type="radio" name={name} id={`${name}-1`}/>
            <input type="radio" name={name} id={`${name}-2`}/>
            <input type="radio" name={name} id={`${name}-3`}/>
            <input type="radio" name={name} id={`${name}-4`}/>
        </div>
    </div>);
}

export default Question;
