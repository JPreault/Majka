import React, { useEffect, useRef, useState } from 'react';
import ReactDOMClient from 'react-dom/client';
import TitlePage from '../components/tools/TitlePage';
import BlockOfContent from '../components/tools/BlockOfContent';
import image1 from '../images/jpg/1-valo.png';
import image2 from '../images/jpg/2-valo.png';
import image3 from '../images/jpg/3-valo.png';
import image4 from '../images/jpg/4-valo.png';
import ReactDOM from 'react-dom';

function Line ({selectedImage, startPosition, endPosition}) {
    return ReactDOM.createPortal(<>{selectedImage && startPosition && endPosition && <>
            <svg className="game-line">
                <line x1={startPosition.x} y1={startPosition.y} x2={endPosition.x} y2={endPosition.y} />
            </svg>
        </>}</>, document.getElementById('app')
    );
}

function Game2 () {
    const [selectedImage, setSelectedImage] = useState(null);
    const [startPosition, setStartPosition] = useState(null);
    const [endPosition, setEndPosition] = useState(null);
    const [answers, setAnswers] = useState({
        0: {enabled: false, points: null, pointStart: null, pointEnd: null, state: null},
        1: {enabled: false, points: null, pointStart: null, pointEnd: null, state: null},
        2: {enabled: false, points: null, pointStart: null, pointEnd: null, state: null},
        3: {enabled: false, points: null, pointStart: null, pointEnd: null, state: null}
    })
    const gameRef = useRef(null);

    const handleImageClick = (event, side, index) => {
        const point = event.target.parentNode.children[(side === 'L' ? 1 : 0)].getBoundingClientRect();
        if (selectedImage && selectedImage.side !== side) {
            const newAnswers = {
                ...answers
            };
            Object.entries(answers).forEach(element => {
                if(element[1]?.enabled && (element[1].points).includes(side + index)) {
                    newAnswers[element[0]] = {enabled: false, pointLeft: null, pointRight: null, state: null}
                }
            });
            const indexLeft = (selectedImage.side === 'L' ? selectedImage.index : index) - 1;
            newAnswers[indexLeft].enabled = true;
            newAnswers[indexLeft].points = selectedImage.side + selectedImage.index + side + index;
            newAnswers[indexLeft].pointStart = startPosition;
            newAnswers[indexLeft].pointEnd = {
                x: point.x + point.width / 2,
                y: point.y + point.height / 2
            };
            setAnswers(newAnswers)
            setSelectedImage(null);
            setEndPosition(null);
        }else{
            const newAnswers = {
                ...answers
            };
            Object.entries(answers).forEach(element => {
                if(element[1]?.enabled && (element[1].points).includes(side + index)) {
                    newAnswers[element[0]] = {enabled: false, pointLeft: null, pointRight: null, state: null}
                }
            });
            setAnswers(newAnswers);
            setSelectedImage({
                index: index,
                side: side
            });
            setStartPosition({
                x: point.x + point.width / 2,
                y: point.y + point.height / 2
            });
        }
    };

    const handleMouseMove = (event) => {
        if (selectedImage) {
            setEndPosition({
                x: event.clientX,
                y: event.clientY
            });
        }
    };

    const handleMouseUp = (event, index) => {
        if (selectedImage) {
            const lines = document.getElementsByClassName('line');
            let onImage = false;
            Object.values(lines).forEach(element => {
                const coords = element.getBoundingClientRect();
                if (endPosition.x < coords.x + coords.width && endPosition.x > coords.x && endPosition.y < coords.y + coords.height && endPosition.y > coords.y){
                    onImage = true;
                }
            });
            if(!onImage) {
                setSelectedImage(null);
                setEndPosition(null);
            }
        }
    };

    return (
        <>
            <TitlePage
                main="Game 2"
                title="Will you be able to find which skin is in which pack ? "
                rule="Connects the points corresponding to the skin and the packs"
            />
            <BlockOfContent>
                <div ref={gameRef} className="game" onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} >
                    <div className="game-column">
                        <div className='line' onClick={(event) => handleImageClick(event, 'L', 1)}>
                            <img src={image1} alt="Image 1" draggable={false}/>
                            <div className='point'></div>
                        </div>
                        <div className='line' onClick={(event) => handleImageClick(event, 'L', 2)}>
                            <img src={image2} alt="Image 2" draggable={false}/>
                            <div className='point'></div>
                        </div>
                        <div className='line' onClick={(event) => handleImageClick(event, 'L', 3)}>
                            <img src={image3} alt="Image 3" draggable={false}/>
                            <div className='point'></div>
                        </div>
                        <div className='line' onClick={(event) => handleImageClick(event, 'L', 4)}>
                            <img src={image4} alt="Image 4" draggable={false}/>
                            <div className='point'></div>
                        </div>
                    </div>
                    <div className="game-column">
                        <div className='line' onClick={(event) => handleImageClick(event, 'R', 1)}>
                            <div className='point'></div>
                            <img src={image1} alt="Image 1 match" draggable={false}/>
                        </div>
                        <div className='line' onClick={(event) => handleImageClick(event, 'R', 2)}>
                            <div className='point'></div>
                            <img src={image2} alt="Image 2 match" draggable={false}/>
                        </div>
                        <div className='line' onClick={(event) => handleImageClick(event, 'R', 3)}>
                            <div className='point'></div>
                            <img src={image3} alt="Image 3 match" draggable={false}/>
                        </div>
                        <div className='line' onClick={(event) => handleImageClick(event, 'R', 4)}>
                            <div className='point'></div>
                            <img src={image4} alt="Image 4 match" draggable={false}/>
                        </div>
                    </div>
                    {Object.values(answers).map((answer, key) => {
                        return <Line key={key} selectedImage={answer.enabled} startPosition={answer?.pointStart} endPosition={answer?.pointEnd}/>;
                    })}
                    <Line selectedImage={selectedImage} startPosition={startPosition} endPosition={endPosition}/>
                </div>
            </BlockOfContent>
        </>
    );
}

export default Game2;
