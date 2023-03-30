import React from 'react';

function Button ({className = null, onClick = null, text}) {

  function click() {
    if(onClick !== null) {
      onClick();
    }
  }

    return (
      <div className={'blueButton' + (className !== null ? ' ' + className : '')} onClick={click}>{text}</div>
    );
}

export default Button;
