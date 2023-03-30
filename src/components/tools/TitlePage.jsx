import React from 'react';
import Icon from './Icon';
import { ReactComponent as Rule } from '../../images/svg/rule.svg';

function TitlePage ({main = null, title = null, rule = null}) {

    return (
        <>
            {main !== null && <div className='titlePage main'>{main}</div>}
            {title !== null && <div className='titlePage'>{title}</div>}
            {rule !== null && <div className='titlePage rule'>
              <Icon type="svg" className='rule'>
                <Rule/>
              </Icon>
              {rule}
            </div>}
        </>
    );
}

export default TitlePage;
