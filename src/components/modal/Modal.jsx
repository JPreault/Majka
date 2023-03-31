import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Icon from '../tools/Icon';
import { ReactComponent as Close } from '../../images/svg/close.svg';

// Structure du corps de la modal
function Modal ({ id = null, active, setActive, closable = false, children })
{
    const modalContent = useRef(null);

    // Quand la selectList est ouverte, détecte le clic à l'extérieur des div ayant pour ref 'thisSelectList' et 'thisSelectListInput' pour refermer la selectList
    useOnClickOutside(modalContent, (number) => { closable && setActive(false)}, (id !== 'childOfModal'));

    return ReactDOM.createPortal(<>
        {active && <div id={ (id !== null) ? id : ''} className={'filterPopup '}>
            <div ref={modalContent} className={'popup' + (closable ? '' : ' haveButton')}>
                {closable && <Icon className='close' onClick={() => setActive(!active)}>
                    <Close/>
                </Icon>}
                {children}
            </div>
        </div>}
    </>
    , document.getElementById('root'));
}
export default Modal;
