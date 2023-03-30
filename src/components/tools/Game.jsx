import React from 'react';
import Icon from './Icon';
import { ReactComponent as Certified } from '../../images/svg/certified.svg';

function Game ({title = null, state = false, children}) {

    return (
      <div className='game'>
        {title !== null && <div className='title'>
          {title}
          <Icon type="svg" className={'certified' + (state ? ' finish' : '')}>
            <Certified/>
          </Icon>
        </div>}
        {children}
      </div>
    );
}

export default Game;
