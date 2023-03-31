import React, { useEffect, useRef, useState } from 'react';
import TitlePage from '../components/tools/TitlePage';
import BlockOfContent from '../components/tools/BlockOfContent';
import image1 from '../images/jpg/1-valo.png';
import image2 from '../images/jpg/2-valo.png';
import image3 from '../images/jpg/3-valo.png';
import image4 from '../images/jpg/4-valo.png';
import image5 from '../images/jpg/5-valo.png';
import image6 from '../images/jpg/6-valo.png';
import image7 from '../images/jpg/7-valo.png';
import image8 from '../images/jpg/8-valo.png';
import ReactDOM from 'react-dom';
import Button from '../components/tools/Button';
import Modal from '../components/modal/Modal';


function Line ({selectedImage, startPosition, endPosition, color = null, gameRef = null}) {
    if(gameRef && gameRef.current) {
        return ReactDOM.createPortal(<>{selectedImage !== null && startPosition && endPosition && <>
            <svg className={"game-line" + (color !== null ? ' ' + color : '')}>
                <circle cx={startPosition.x} cy={startPosition.y} r="0.3em"/>
                <line x1={startPosition.x} y1={startPosition.y} x2={endPosition.x} y2={endPosition.y} />
                {selectedImage?.enabled && <circle cx={endPosition.x} cy={endPosition.y} r="0.3em"/>}
            </svg>
        </>}</>, gameRef.current);
    }
}

function Item ({side = null, image = null, pack = null, id, onClick}) {

    function onClickFunctionContent (event) {
        onClick(event.target.parentNode.children[(side === 'L' ? 1 : 0)], side, id)
    }

    function onClickFunctionPoint (event) {
        onClick(event.target, side, id)
    }

    return (<div className='line'>
        {image !== null && <>
            <img src={image} alt="1" draggable={false} onClick={(event) => onClickFunctionContent(event)}/>
            <div className='point' onClick={(event) => onClickFunctionPoint(event)}></div>
        </>}
        {pack !== null && <>
            <div className='point' onClick={(event) => onClickFunctionPoint(event)}></div>
            <div className='pack' onClick={(event) => onClickFunctionContent(event)}>{pack}</div>
        </>}        
    </div>);
}

function Game2 () {
    const [selectedImage, setSelectedImage] = useState(null);
    const [startPosition, setStartPosition] = useState(null);
    const [endPosition, setEndPosition] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [answers, setAnswers] = useState(null);
    const [finish, setFinish] = useState(false);
    const [active, setActive] = useState(false);
    const game2 = useRef(null);
    const images = [{id:1, image:image1},{id:2, image:image2},{id:3, image:image3},{id:4, image:image4},{id:5, image:image5},{id:6, image:image6},{id:7, image:image7},{id:8, image:image8}];
    const packs = [{id:4, pack:"Singularity"},{id:1, pack:"Prime 2.0"},{id:7, pack:"Smite"},{id:3, pack:"Genesis"},{id:8, pack:"Glitchpop"},{id:2, pack:"Champions 2021"},{id:6, pack:"Ruin"},{id:5, pack:"Hivemind"}];

    useEffect(() => {
        if(answers === null){
            if(localStorage.getItem('game2') !== undefined && localStorage.getItem('game2') !== null) {
                setAnswers(JSON.parse(localStorage.getItem('game2')));
            } else {
                setAnswers({
                    0: {enabled: false, points: null, pointStart: null, pointEnd: null, state: null},
                    1: {enabled: false, points: null, pointStart: null, pointEnd: null, state: null},
                    2: {enabled: false, points: null, pointStart: null, pointEnd: null, state: null},
                    3: {enabled: false, points: null, pointStart: null, pointEnd: null, state: null},
                    4: {enabled: false, points: null, pointStart: null, pointEnd: null, state: null},
                    5: {enabled: false, points: null, pointStart: null, pointEnd: null, state: null},
                    6: {enabled: false, points: null, pointStart: null, pointEnd: null, state: null},
                    7: {enabled: false, points: null, pointStart: null, pointEnd: null, state: null}
                });
            }
        } else {
            let newDisabled = false;
            Object.entries(answers).forEach(element => {
                if(element[1]?.enabled === false){
                    newDisabled = true
                }
            });
            setDisabled(newDisabled);
        }
    }, [answers])

    const handleImageClick = (target, side, index) => {
        const point = target.getBoundingClientRect();
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
                x: point.x + point.width / 2 - game2.current.getBoundingClientRect().x,
                y: point.y + point.height / 2 - game2.current.getBoundingClientRect().y
            };
            setAnswers(newAnswers)
            localStorage.setItem('game2', JSON.stringify(newAnswers));
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
            localStorage.setItem('game2', JSON.stringify(newAnswers));
            setSelectedImage({
                index: index,
                side: side
            });
            setStartPosition({
                x: point.x + point.width / 2 - game2.current.getBoundingClientRect().x,
                y: point.y + point.height / 2 - game2.current.getBoundingClientRect().y
            });
        }
    }; 

    const handleMouseMove = (event) => {
        if (selectedImage) {
            setEndPosition({
                x: event.clientX - game2.current.getBoundingClientRect().x,
                y: event.clientY - game2.current.getBoundingClientRect().y
            });
        }
    };

    const handleMouseUp = (event, index) => {
        if (selectedImage) {
            const lines = document.getElementsByClassName('line');
            let onImage = false;
            Object.values(lines).forEach(element => {
                const coords = element.getBoundingClientRect();
                if (endPosition.x + game2.current.getBoundingClientRect().x < coords.x + coords.width && endPosition.x + game2.current.getBoundingClientRect().x > coords.x && endPosition.y + game2.current.getBoundingClientRect().y < coords.y + coords.height && endPosition.y + game2.current.getBoundingClientRect().y > coords.y){
                    onImage = true;
                }
            });
            if(!onImage) {
                setSelectedImage(null);
                setEndPosition(null);
            }
        }
    };

    const sumbit = () => {
        const newAnswers = {
            ...answers
        };
        Object.entries(answers).forEach(element => {
            const points = (element[1]?.points).split('');
            if(points[1] === points[3]){
                newAnswers[element[0]].state = true;
            }else{
                newAnswers[element[0]].state = false;
            }
        });
        setAnswers(newAnswers);
        localStorage.setItem('game2', JSON.stringify(newAnswers));
    }

    const reset = () => {
        localStorage.removeItem('game2');
        setAnswers(null);
    }

    useEffect(() => {
        answers !== null && Object.entries(answers).forEach(element => {
            if(element[1]?.state === true){
                setFinish(true);
                setActive(true);
            }
        });
    }, [answers])

    return (
        <>
            <TitlePage
                main="Game 2"
                title="Will you be able to find which skin is in which pack ? "
                rule="Connects the points corresponding to the skin and the packs"
            />
            <BlockOfContent className='game2'>
                <div ref={game2} className="game" onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} >
                    <div className="game-column">
                        {images.map((image, key) => {
                            return <Item key={key} side='L' id={image.id} image={image.image} onClick={handleImageClick}/>;
                        })}
                    </div>
                    <div className="game-column">
                        {packs.map((pack, key) => {
                            return <Item key={key} side='R' id={pack.id} pack={pack.pack} onClick={handleImageClick}/>;
                        })}
                    </div>
                    {answers !== null && Object.values(answers).map((answer, key) => {
                        return <Line key={key} selectedImage={answer} startPosition={answer?.pointStart} endPosition={answer?.pointEnd} color={answer?.state} gameRef={game2}/>;
                    })}
                    <Line selectedImage={selectedImage} startPosition={startPosition} endPosition={endPosition} gameRef={game2}/>
                </div>
                <div className='buttons'>
                    <Button text={'reset'} type="reset" onClick={reset}/>
                    <Button text={'submit answer'} onClick={sumbit} disabled={disabled}/>
                </div>
            </BlockOfContent>
            <Modal active={active} setActive={setActive}>
                <p>Gagné</p>
            </Modal>
        </>
    );
}

export default Game2;
