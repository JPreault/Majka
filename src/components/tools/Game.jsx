import React from 'react';
import Icon from './Icon';
import { ReactComponent as Certified } from '../../images/svg/certified.svg';

function Game ({title = null, state = false, image = null, imageFinish, onClick, children}) {

    return (
      <div className='gameBlock'>
        {title !== null && <div className='title'>
          {title}
          <Icon type="svg" className={'certified' + (state ? ' finish' : '')}>
            <Certified/>
          </Icon>
        </div>}
        {image !== null && <div className='containImageGame' onClick={onClick}>
          {!state && <div className='blur'></div>}
          <img alt='title' src={(!state ? image : imageFinish)}></img>
          <div className='border'></div>
        </div>}
        {children}
      </div>
    );
}

export default Game;
