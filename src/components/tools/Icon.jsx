import React from 'react';

function Icon ({type = null, className = null, onClick, children}) {

    return (
        <div className={"iconTool" + (type !== null ? ' '+type : '') + (className !== null ? ' '+className : '')} onClick={onClick}>
            {children}
        </div>
    );
}

export default Icon;
