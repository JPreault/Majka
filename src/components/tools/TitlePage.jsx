import React from 'react';

function TitlePage ({main = null, title = null, rule = null}) {

    return (
        <>
            {main !== null && <div className='titlePage main'>{main}</div>}
            {title !== null && <div className='titlePage'>{title}</div>}
            {rule !== null && <div className='titlePage rule'>{rule}</div>}
        </>
    );
}

export default TitlePage;
