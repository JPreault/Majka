import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import useOnClickOutside from '../../hooks/useOnClickOutside';

// Structure du corps de la modal
function Modal ({ id = null, active, setActive, children })
{
    const [opacity, setOpacity] = useState(false);
    // Défini les ref
    const modalContent = useRef(null);

    useEffect(() => {
        if (active) {
            setTimeout(() => {
                setOpacity(true);
            }, 50);
        } else {
            setOpacity(false);
        }
    }, [active]);

    // Quand la selectList est ouverte, détecte le clic à l'extérieur des div ayant pour ref 'thisSelectList' et 'thisSelectListInput' pour refermer la selectList
    useOnClickOutside(modalContent, (number) => setActive(false), (id !== 'childOfModal'));

    return ReactDOM.createPortal(<>
        {active && <div id={ (id !== null) ? id : ''} className={'filterPopup '}>
            <div className='popup open'>
                <div ref={modalContent} className={'contentModal' + (opacity ? ' opacity' : '')}>
                    {children}
                </div>
            </div>
        </div>}
    </>
    , document.getElementById('root'));
}
export default Modal;
