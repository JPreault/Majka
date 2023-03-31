import React from 'react';

function Button ({className = null, onClick = null, text, disabled = false, type='submit'}) {

  function click() {
    if(onClick !== null && !disabled) {
      onClick();
    }
  }

    return (
      <div className={(type === 'submit' ? 'blueButton' : 'greyButton') + (className !== null ? ' ' + className : '')} onClick={click} disabled={disabled}>{text}</div>
    );
}

export default Button;
