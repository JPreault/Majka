import React from 'react';

function Question ({question, answer1, answer2, answer3, answer4, name, state = ""}) {

    return (<div className={'questionBlock' + (state !== "" ? (' ' + state) : '')}>  
        <div className='question'>{question}</div>
        <div className='answersList'>
            <div className='answer'>
                <input type="radio" name={name} id={`${name}-1`}/><div>{answer1}</div>
            </div>
            <div className='answer'>
                <input type="radio" name={name} id={`${name}-2`}/><div>{answer2}</div>
            </div>
            <div className='answer'>
                <input type="radio" name={name} id={`${name}-3`}/><div>{answer3}</div>
            </div>
            <div className='answer'>
                <input type="radio" name={name} id={`${name}-4`}/><div>{answer4}</div>
            </div>
        </div><div></div>
    </div>);
}

export default Question;
