import React, { useEffect, useState } from 'react';

function BlockOfContent ({className = null, state = null, children}) {

  const [displayState, setDisplayState] = useState(false);

  useEffect (() => {
    setDisplayState(state !== null && (state === "valid" || state === "error"))
  }, [state])

    return (
        <div className={'blockOfContent' + (className !== null ? ' ' + className : '')}>
            {displayState && <div className={'state ' + state}></div>}
            {children}
        </div>
    );
}

export default BlockOfContent;
